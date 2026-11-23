import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  AlertCircle,
  BookOpen,
  GraduationCap,
  RotateCcw,
  Send,
  Sparkles,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

type TutorMode = 'concept' | 'exam-answer' | 'practical' | 'quiz';

interface SubjectOption {
  id: string;
  label: string;
  starters: string[];
}

const SUBJECT_OPTIONS: SubjectOption[] = [
  {
    id: 'biology',
    label: 'Biology (Botany & Zoology)',
    starters: [
      'Explain DNA replication steps with labeled diagram headings for BISE XII Biology.',
      'Write a full In-Paper Practical solution for observing stomata / plasmolysis in epidermal peel.',
    ],
  },
  {
    id: 'chemistry',
    label: 'Chemistry',
    starters: [
      'Explain Le Chatelier’s Principle with industrial Haber process examples for Class XI.',
      'How do I write the In-Paper Practical titration steps & observation table for Oxalic Acid vs KMnO4?',
    ],
  },
  {
    id: 'physics',
    label: 'Physics',
    starters: [
      'Derive the lens maker / thin lens equation and solve a concave lens numerical step by step.',
      'Write an In-Paper Practical solution for finding focal length of a convex lens using two-pin method.',
    ],
  },
  {
    id: 'cs',
    label: 'Computer Science (C++ & DBMS)',
    starters: [
      'Explain C++ for-loop and array dry-run output for the 25-mark practical section.',
      'Write SQL queries using SELECT, WHERE, ORDER BY, and PRIMARY KEY for an MS Access/DBMS table.',
    ],
  },
  {
    id: 'math',
    label: 'Mathematics',
    starters: [
      'Explain how to find the derivative using First Principles with a step-by-step example.',
      'Solve a Cramer’s Rule 3x3 linear system step by step for Class XI Mathematics.',
    ],
  },
  {
    id: 'commerce',
    label: 'Accounting & Commerce (I.Com / ADC)',
    starters: [
      'Explain how to prepare a Bank Reconciliation Statement (BRS) when passbook and cashbook balances differ.',
      'List the essential steps and adjustment entries for Final Accounts (Trading, P&L, Balance Sheet).',
    ],
  },
  {
    id: 'english',
    label: 'English / Pak Studies / Islamiyat',
    starters: [
      'How should I structure a high-scoring Reference-to-Context and précis answer in BISE English?',
      'Outline the key points of the 1940 Lahore Resolution for a 10-mark Class XII Pakistan Studies answer.',
    ],
  },
];

const LEVEL_OPTIONS = [
  'Class XI (HSC Part I)',
  'Class XII (HSC Part II)',
  'BS Zoology / ADP (UoS)',
];

function renderInlineFormatting(line: string) {
  const tokens = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return tokens.map((token, idx) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={idx} className="text-amber-200 font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code
          key={idx}
          dir="ltr"
          className="px-1.5 py-0.5 rounded bg-[#021914] text-emerald-200 font-mono text-[11px] sm:text-xs"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={idx}>{token}</React.Fragment>;
  });
}

function renderFormattedText(text: string) {
  const blocks = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 leading-relaxed">
      {blocks.map((block, bIdx) => {
        if (block.startsWith('```') && block.endsWith('```')) {
          const inner = block.replace(/^```[^\n]*\n?/, '').replace(/```$/, '');
          return (
            <pre
              key={bIdx}
              dir="ltr"
              className="p-3 rounded-xl bg-[#021914] border border-emerald-700/80 text-emerald-100 font-mono text-xs overflow-x-auto text-left"
            >
              <code>{inner}</code>
            </pre>
          );
        }

        const lines = block.split('\n');
        return (
          <div key={bIdx} className="space-y-1.5">
            {lines.map((rawLine, lIdx) => {
              const line = rawLine.trim();
              if (!line) return <div key={lIdx} className="h-1" />;

              if (line.startsWith('### ') || line.startsWith('## ')) {
                const headingText = line.replace(/^#{2,3}\s+/, '');
                return (
                  <h4 key={lIdx} className="font-serif font-bold text-amber-300 text-sm sm:text-base pt-1">
                    {renderInlineFormatting(headingText)}
                  </h4>
                );
              }

              if (line.startsWith('- ') || line.startsWith('* ')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 ps-1">
                    <span className="text-amber-300 font-bold shrink-0">•</span>
                    <span>{renderInlineFormatting(line.slice(2))}</span>
                  </div>
                );
              }

              return <p key={lIdx}>{renderInlineFormatting(line)}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export function SubjectTutorChat() {
  const { language, dir, t } = useLanguage();
  const copy = t.examPrep.tutor;

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('biology');
  const [selectedLevel, setSelectedLevel] = useState<string>(LEVEL_OPTIONS[0]);
  const [selectedMode, setSelectedMode] = useState<TutorMode>('concept');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const scrollBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const activeSubject =
    SUBJECT_OPTIONS.find((s) => s.id === selectedSubjectId) ?? SUBJECT_OPTIONS[0];

  const modeOptions: { id: TutorMode; label: string }[] = [
    { id: 'concept', label: copy.modes.concept },
    { id: 'exam-answer', label: copy.modes.examAnswer },
    { id: 'practical', label: copy.modes.practical },
    { id: 'quiz', label: copy.modes.quiz },
  ];

  const sendQuestion = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || loading) return;

    setErrorMsg('');
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/subject-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
          subject: activeSubject.label,
          level: selectedLevel,
          mode: selectedMode,
          language,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !data.reply) {
        setErrorMsg(data.error || copy.errorFallback);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: 'model',
          text: data.reply as string,
        },
      ]);
    } catch {
      setErrorMsg(copy.errorFallback);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  const handleReset = () => {
    setMessages([]);
    setErrorMsg('');
    setInput('');
  };

  return (
    <div dir={dir} className="max-w-5xl mx-auto space-y-5">
      {/* Subject, Class Level & Mode Selector Card */}
      <div className="bg-[#04362c] border border-emerald-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-300">
                {copy.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 mt-0.5">
                {copy.subtitle}
              </p>
            </div>
          </div>

          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#02251f] hover:bg-emerald-900 text-amber-200 border border-emerald-700 text-xs font-semibold shrink-0 self-start cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{copy.resetBtn}</span>
            </button>
          )}
        </div>

        <div className="space-y-3">
          {/* Subject Picker */}
          <div className="flex flex-wrap items-center gap-2" dir="ltr">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mr-1">
              {copy.subjectLabel}
            </span>
            {SUBJECT_OPTIONS.map((subj) => (
              <button
                key={subj.id}
                type="button"
                onClick={() => setSelectedSubjectId(subj.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedSubjectId === subj.id
                    ? 'bg-amber-400 text-emerald-950 font-bold'
                    : 'bg-[#02251f] text-stone-200 hover:bg-emerald-900 border border-emerald-800'
                }`}
              >
                {subj.label}
              </button>
            ))}
          </div>

          {/* Class Level Picker */}
          <div className="flex flex-wrap items-center gap-2" dir="ltr">
            <span className="text-[11px] font-semibold text-emerald-200 mr-1">
              {copy.levelLabel}
            </span>
            {LEVEL_OPTIONS.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-emerald-700/80 border-amber-300/60 text-white'
                    : 'bg-[#021f19] border-emerald-900 text-stone-300 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Answer Style / Mode Picker */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-semibold text-emerald-200 me-1">
              {copy.modeLabel}
            </span>
            {modeOptions.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedMode(mode.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  selectedMode === mode.id
                    ? 'bg-emerald-800 border-amber-300 text-amber-200'
                    : 'bg-[#02251f] border-emerald-900 text-stone-300 hover:bg-emerald-900/60'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Tutor Conversation */}
      <div className="bg-[#02251f] border border-emerald-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
        <div
          ref={scrollBoxRef}
          className="p-4 sm:p-6 space-y-4 min-h-[280px] max-h-[460px] overflow-y-auto"
        >
          {messages.length === 0 ? (
            <div className="space-y-5 py-2">
              <div className="flex items-start gap-3 bg-[#04362c] border border-emerald-800 rounded-2xl p-4">
                <GraduationCap className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <div className="space-y-1.5 text-xs sm:text-sm text-stone-100">
                  <p className="font-semibold text-amber-200">
                    {copy.welcomeHeading}
                  </p>
                  <p className="text-stone-200 leading-relaxed">
                    {copy.welcomeBody}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">
                  {copy.starterTitle}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" dir="ltr">
                  {activeSubject.starters.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendQuestion(prompt)}
                      className="p-3 rounded-xl bg-[#04362c] hover:bg-[#064b36] border border-emerald-800 hover:border-amber-300/50 text-left text-xs text-stone-100 transition-colors flex items-start gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                      <span>{prompt}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[82%] rounded-2xl px-4 py-3 text-xs sm:text-sm ${
                    msg.role === 'user'
                      ? 'bg-amber-400 text-emerald-950 font-semibold shadow-sm'
                      : 'bg-[#04362c] text-stone-100 border border-emerald-700/80 shadow-sm'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    renderFormattedText(msg.text)
                  )}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-4 py-3 bg-[#04362c] border border-emerald-700/80 text-xs text-amber-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                <span>{copy.thinking}</span>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/60 text-rose-100 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Prompt Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="p-3.5 sm:p-4 bg-[#032922] border-t border-emerald-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder={copy.inputPlaceholder}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#021c17] border border-emerald-700 text-xs sm:text-sm text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shrink-0 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{copy.sendBtn}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
