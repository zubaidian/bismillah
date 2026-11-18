import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  AlertCircle,
  Compass,
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

interface StreamPreset {
  id: string;
  label: string;
  subjects: string[];
  samplePrompt: string;
}

const STREAM_PRESETS: StreamPreset[] = [
  {
    id: 'commerce',
    label: 'Commerce (I.Com)',
    subjects: [
      'Principles of Accounting (XI–XII)',
      'Principles of Commerce (XI)',
      'Banking & Money (XII)',
      'Economics / Commercial Geography',
    ],
    samplePrompt:
      'I am studying Principles of Accounting, Commerce, Banking & Money, and Economics/Commercial Geography. What degree options (ADC, BBA, CA, ACCA) and banking/finance careers fit best?',
  },
  {
    id: 'pre-medical',
    label: 'Pre-Medical',
    subjects: ['Biology (Botany & Zoology)', 'Chemistry', 'Physics'],
    samplePrompt:
      'I am in Pre-Medical (Biology, Chemistry, Physics). Besides MBBS/BDS, what high-scope options like BS Zoology at GGZC, Pharm-D, DPT, or Biotechnology should I consider?',
  },
  {
    id: 'cs-eng',
    label: 'Computer Science / Pre-Eng',
    subjects: ['Computer Science (C++/DBMS)', 'Mathematics', 'Physics', 'Chemistry'],
    samplePrompt:
      'I have Computer Science, Mathematics, and Physics in Class XI/XII. Which IT, AI, Software Engineering, or Engineering degrees at University of Sindh or MUET are best?',
  },
  {
    id: 'bs-adp',
    label: 'BS Zoology & ADP (UoS)',
    subjects: ['BS Zoology (4-Yr)', 'AD Commerce (ADC)', 'AD Science (ADS)', 'AD Arts (ADA)'],
    samplePrompt:
      'I am pursuing a 2-year Associate Degree or BS Zoology at GGZC. How can I bridge into research, teaching, banking, or CSS/SPSC civil services?',
  },
];

function renderFormattedText(text: string) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((rawLine, idx) => {
        const line = rawLine.trim();
        if (!line) return <div key={idx} className="h-1" />;

        // Render **bold** spans safely without HTML injection
        const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className="text-amber-200 font-semibold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <React.Fragment key={pIdx}>{part}</React.Fragment>;
        });

        const isBullet = line.startsWith('- ') || line.startsWith('* ');
        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-amber-300 font-bold shrink-0">•</span>
              <span>{parts.slice(0)}</span>
            </div>
          );
        }

        return <p key={idx}>{parts}</p>;
      })}
    </div>
  );
}

export function CareerCounselorChat() {
  const { language, dir, t } = useLanguage();
  const copy = t.examPrep.counselor;

  const [selectedStreamId, setSelectedStreamId] = useState<string>('commerce');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    STREAM_PRESETS[0].subjects
  );
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

  const activePreset =
    STREAM_PRESETS.find((s) => s.id === selectedStreamId) ?? STREAM_PRESETS[0];

  const handleSelectPreset = (preset: StreamPreset) => {
    setSelectedStreamId(preset.id);
    setSelectedSubjects(preset.subjects);
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((item) => item !== subject)
        : [...prev, subject]
    );
  };

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
      const response = await fetch('/api/career-counselor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
          stream: activePreset.label,
          subjects: selectedSubjects,
          language,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !data.reply) {
        setErrorMsg(
          data.error || copy.errorFallback
        );
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
      {/* Subject Profile Selector Card */}
      <div className="bg-[#04362c] border border-emerald-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
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

        {/* Stream & Subject Pickers */}
        <div className="space-y-3" dir="ltr">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mr-1">
              {copy.streamLabel}
            </span>
            {STREAM_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedStreamId === preset.id
                    ? 'bg-amber-400 text-emerald-950 font-bold'
                    : 'bg-[#02251f] text-stone-200 hover:bg-emerald-900 border border-emerald-800'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-emerald-200 mr-1">
              {copy.subjectsLabel}
            </span>
            {activePreset.subjects.map((subj) => {
              const active = selectedSubjects.includes(subj);
              return (
                <button
                  key={subj}
                  type="button"
                  onClick={() => toggleSubject(subj)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
                    active
                      ? 'bg-emerald-700/80 border-amber-300/60 text-white'
                      : 'bg-[#021f19] border-emerald-900 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {active ? '✓ ' : '+ '}
                  {subj}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Conversation Window */}
      <div className="bg-[#02251f] border border-emerald-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
        <div
          ref={scrollBoxRef}
          className="p-4 sm:p-6 space-y-4 min-h-[280px] max-h-[440px] overflow-y-auto"
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
                  {STREAM_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        handleSelectPreset(preset);
                        sendQuestion(preset.samplePrompt);
                      }}
                      className="p-3 rounded-xl bg-[#04362c] hover:bg-[#064b36] border border-emerald-800 hover:border-amber-300/50 text-left text-xs text-stone-100 transition-colors flex items-start gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-amber-200 block mb-0.5">
                          {preset.label}
                        </strong>
                        <span className="text-stone-300 line-clamp-2">
                          {preset.samplePrompt}
                        </span>
                      </span>
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
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm ${
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
