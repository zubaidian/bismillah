import { useEffect, useMemo, useState } from 'react';
import {
  ExamLevel,
  ExamStream,
  IN_PAPER_PRACTICAL_GUIDE,
  InPaperPracticalItem,
  PAPER_PATTERNS,
  PAST_PAPERS,
  PRACTICE_MCQS,
  PastPaperItem,
  PatternGroup,
  PracticeMcqQuestion,
} from '../data/examPrepData';
import { triggerPastPaperDownload } from '../utils/pastPaperPdf';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CareerCounselorChat } from './CareerCounselorChat';
import {
  Award,
  BookCheck,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock,
  Compass,
  Download,
  Eye,
  FileSpreadsheet,
  FlaskConical,
  HelpCircle,
  RotateCcw,
  Search,
  Sparkles,
  X,
  XCircle,
} from 'lucide-react';

type PrepTab = 'papers' | 'pattern' | 'quiz' | 'viva' | 'counselor';

export function ExamPrepSection() {
  const { dir, t } = useLanguage();
  const copy = t.examPrep;

  const [activeTab, setActiveTab] = useState<PrepTab>('papers');
  const [selectedStream, setSelectedStream] = useState<'all' | ExamStream>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | ExamLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPaper, setSelectedPaper] = useState<PastPaperItem | null>(null);
  const [patternGroup, setPatternGroup] = useState<'all' | PatternGroup>('all');

  // Quiz State
  const [quizSubject, setQuizSubject] = useState<string>('all');
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  // Viva State
  const [selectedLab, setSelectedLab] = useState<string>('all');
  const [revealedVivaIds, setRevealedVivaIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!selectedPaper) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPaper(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedPaper]);

  const filteredPapers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PAST_PAPERS.filter((paper) => {
      const matchesStream = selectedStream === 'all' || paper.stream === selectedStream;
      const matchesLevel = selectedLevel === 'all' || paper.level === selectedLevel;
      const matchesSearch =
        !q ||
        paper.subject.toLowerCase().includes(q) ||
        paper.code.toLowerCase().includes(q) ||
        paper.streamLabel.toLowerCase().includes(q) ||
        paper.boardOrUniversity.toLowerCase().includes(q) ||
        paper.topicsCovered.some((topic) => topic.toLowerCase().includes(q));
      return matchesStream && matchesLevel && matchesSearch;
    });
  }, [selectedStream, selectedLevel, searchQuery]);

  const quizSubjects = useMemo(() => {
    const unique = Array.from(new Set(PRACTICE_MCQS.map((q) => q.subjectGroup)));
    return ['all', ...unique];
  }, []);

  const quizPool: PracticeMcqQuestion[] = useMemo(() => {
    if (quizSubject === 'all') return PRACTICE_MCQS;
    return PRACTICE_MCQS.filter((q) => q.subjectGroup === quizSubject);
  }, [quizSubject]);

  const activeQuestion = quizPool[quizIndex] ?? quizPool[0];
  const isQuizFinished = quizIndex >= quizPool.length;

  const handleSelectSubject = (subj: string) => {
    setQuizSubject(subj);
    setQuizIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnsweredCount(0);
  };

  const handleAnswerMcq = (optionIdx: number) => {
    if (selectedOption !== null || !activeQuestion) return;
    setSelectedOption(optionIdx);
    setAnsweredCount((prev) => prev + 1);
    if (optionIdx === activeQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextMcq = () => {
    setSelectedOption(null);
    setQuizIndex((prev) => prev + 1);
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnsweredCount(0);
  };

  const labOptions = useMemo(() => {
    const unique = Array.from(new Set(IN_PAPER_PRACTICAL_GUIDE.map((v) => v.subject)));
    return ['all', ...unique];
  }, []);

  const filteredViva: InPaperPracticalItem[] = useMemo(() => {
    if (selectedLab === 'all') return IN_PAPER_PRACTICAL_GUIDE;
    return IN_PAPER_PRACTICAL_GUIDE.filter((v) => v.subject === selectedLab);
  }, [selectedLab]);

  const toggleVivaAnswer = (id: string) => {
    setRevealedVivaIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPatterns = useMemo(() => {
    if (patternGroup === 'all') return PAPER_PATTERNS;
    return PAPER_PATTERNS.filter((item) => item.group === patternGroup);
  }, [patternGroup]);

  const accuracyPct =
    answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 0;

  return (
    <section
      id="exam-prep"
      dir={dir}
      className="scroll-mt-20 py-16 sm:py-24 bg-[#032922] text-white relative border-t border-emerald-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">
            {copy.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            {copy.title}
          </h2>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
            {copy.subtitle}
          </p>
          <div className="pt-1 flex justify-center">
            <LanguageSwitcher variant="dark" />
          </div>
        </div>

        {/* Mode Switcher Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('papers')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'papers'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-[#064b36] text-emerald-100 hover:bg-[#085c43] border border-emerald-700'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 shrink-0" />
            <span>{copy.tabs.papers}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pattern')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'pattern'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-[#064b36] text-emerald-100 hover:bg-[#085c43] border border-emerald-700'
            }`}
          >
            <ClipboardList className="w-4 h-4 shrink-0" />
            <span>{copy.tabs.pattern}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-[#064b36] text-emerald-100 hover:bg-[#085c43] border border-emerald-700'
            }`}
          >
            <BookCheck className="w-4 h-4 shrink-0" />
            <span>{copy.tabs.quiz}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('viva')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'viva'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-[#064b36] text-emerald-100 hover:bg-[#085c43] border border-emerald-700'
            }`}
          >
            <FlaskConical className="w-4 h-4 shrink-0" />
            <span>{copy.tabs.viva}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('counselor')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'counselor'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-[#064b36] text-emerald-100 hover:bg-[#085c43] border border-emerald-700'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>{copy.tabs.counselor}</span>
          </button>
        </div>

        {/* MODE 1: PAST & MODEL PAPERS */}
        {activeTab === 'papers' && (
          <div className="space-y-6">
            {/* Stream, Level & Search Filter Controls */}
            <div className="bg-[#04362c] border border-emerald-800 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Stream Tabs */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      ['all', copy.streams.all],
                      ['science', copy.streams.science],
                      ['cs', copy.streams.cs],
                      ['commerce', copy.streams.commerce],
                      ['degree', copy.streams.degree],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedStream(id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        selectedStream === id
                          ? 'bg-amber-400 text-emerald-950 font-bold'
                          : 'bg-[#021f19] text-emerald-100 hover:bg-emerald-900 border border-emerald-800'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative lg:w-80 shrink-0">
                  <Search className="w-4 h-4 text-emerald-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={copy.searchPlaceholder}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#021f19] border border-emerald-700 text-xs sm:text-sm text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              </div>

              {/* Level Filter & Match Count */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-emerald-800/80">
                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      ['all', copy.levels.all],
                      ['xi', copy.levels.xi],
                      ['xii', copy.levels.xii],
                      ['degree', copy.levels.degree],
                    ] as const
                  ).map(([lvl, label]) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedLevel(lvl)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                        selectedLevel === lvl
                          ? 'bg-emerald-700 text-amber-200 border border-amber-300/40'
                          : 'text-stone-300 hover:text-white hover:bg-emerald-900/60'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <span className="text-xs font-mono text-amber-200 tabular-nums">
                  {filteredPapers.length} {copy.papersCountLabel}
                </span>
              </div>
            </div>

            {/* Papers Grid */}
            {filteredPapers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPapers.map((paper) => (
                  <article
                    key={paper.id}
                    className="rounded-2xl bg-[#064b36]/90 border border-amber-300/35 hover:border-amber-300/80 p-5 sm:p-6 flex flex-col justify-between gap-5 shadow-lg transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-emerald-800 text-[11px]">
                        <span className="font-bold uppercase tracking-wider text-amber-300">
                          {paper.levelLabel} · {paper.paperType}
                        </span>
                        <span className="font-mono text-emerald-200 tabular-nums">
                          {paper.code}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                          {paper.subject}
                        </h3>
                        <p className="text-xs text-emerald-200 font-medium mt-1">
                          {paper.streamLabel}
                        </p>
                        <p className="text-[11px] text-stone-300 mt-0.5">
                          {paper.boardOrUniversity}
                        </p>
                      </div>

                      {/* Key Syllabus Topics */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {paper.topicsCovered.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 rounded bg-[#02251f] border border-emerald-700/80 text-[11px] text-stone-200"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-emerald-800/80 space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-center bg-[#02251f] rounded-xl p-2.5 border border-emerald-800/70">
                        <div>
                          <span className="block text-[10px] text-stone-400 uppercase">
                            {copy.yearLabel}
                          </span>
                          <span className="font-mono text-xs font-bold text-amber-300 tabular-nums">
                            {paper.year}
                          </span>
                        </div>
                        <div className="border-x border-emerald-800/80">
                          <span className="block text-[10px] text-stone-400 uppercase">
                            {copy.marksLabel}
                          </span>
                          <span className="font-mono text-xs font-bold text-white tabular-nums">
                            {paper.maxMarks}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-stone-400 uppercase">
                            {copy.durationLabel}
                          </span>
                          <span className="font-mono text-xs font-bold text-emerald-200 tabular-nums">
                            {paper.duration}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedPaper(paper)}
                          className="px-3 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 shrink-0" />
                          <span>{copy.viewPaper}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => triggerPastPaperDownload(paper)}
                          className="px-3 py-2.5 rounded-xl bg-[#02251f] hover:bg-[#04372e] text-amber-200 border border-amber-300/40 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 shrink-0" />
                          <span>{copy.downloadPaper}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-[#04362c] border border-emerald-800 rounded-2xl p-10 text-center space-y-3">
                <FileSpreadsheet className="w-10 h-10 text-amber-300 mx-auto" />
                <p className="text-sm text-stone-200">{copy.emptyPapers}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStream('all');
                    setSelectedLevel('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-400 text-emerald-950 font-bold text-xs cursor-pointer"
                >
                  {copy.resetFilters}
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODE 1B: SINDH TEXTBOOK BOARD THEORY & PRACTICAL PAPER PATTERN */}
        {activeTab === 'pattern' && (
          <div className="space-y-6">
            {/* STBB 20-40-40 Formula & Practical Rule Overview */}
            <div className="bg-gradient-to-br from-[#064b36] to-[#04332a] border border-amber-300/40 rounded-2xl p-5 sm:p-7 shadow-xl space-y-5 text-start">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-3xl">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 block">
                    {copy.pattern.eyebrow}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {copy.pattern.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                    {copy.pattern.subtitle}
                  </p>
                </div>

                {/* Visual Theory + Practical in Exam Paper Split Indicator */}
                <div className="bg-[#021f19] border border-emerald-700/80 rounded-xl p-3.5 shrink-0 space-y-2 min-w-[270px]">
                  <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>{copy.pattern.ruleBannerTitle}</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full overflow-hidden flex bg-emerald-950">
                    <div className="w-[17%] bg-amber-400" title={copy.pattern.ratioA} />
                    <div className="w-[36%] bg-emerald-400" title={copy.pattern.ratioB} />
                    <div className="w-[32%] bg-sky-400" title={copy.pattern.ratioC} />
                    <div className="w-[15%] bg-rose-400" title={copy.pattern.ratioPractical} />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[10px] font-semibold text-stone-200">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                      {copy.pattern.ratioA}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                      {copy.pattern.ratioB}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                      {copy.pattern.ratioC}
                    </span>
                    <span className="flex items-center gap-1 text-rose-200">
                      <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                      {copy.pattern.ratioPractical}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100 bg-[#02251f] border border-emerald-800 rounded-xl px-4 py-3 leading-relaxed">
                {copy.pattern.ruleBannerDesc}
              </p>

              {/* Group Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {(
                  [
                    ['all', copy.pattern.groups.all],
                    ['science', copy.pattern.groups.science],
                    ['cs', copy.pattern.groups.cs],
                    ['commerce', copy.pattern.groups.commerce],
                    ['compulsory', copy.pattern.groups.compulsory],
                    ['degree', copy.pattern.groups.degree],
                  ] as const
                ).map(([gid, label]) => (
                  <button
                    key={gid}
                    type="button"
                    onClick={() => setPatternGroup(gid)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      patternGroup === gid
                        ? 'bg-amber-400 text-emerald-950 font-bold'
                        : 'bg-[#021f19] text-emerald-100 hover:bg-emerald-900 border border-emerald-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Pattern Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPatterns.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl bg-[#04362c] border border-amber-300/35 hover:border-amber-300/75 p-5 sm:p-6 flex flex-col justify-between gap-5 shadow-xl text-start transition-colors"
                >
                  <div className="space-y-4">
                    {/* Card Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-emerald-800 pb-3">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                          {item.boardAuthority} · {item.classLevel}
                        </span>
                        <h4 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5 leading-snug">
                          {item.subject}
                        </h4>
                        <p className="text-xs text-emerald-200 font-medium mt-0.5">
                          {item.groupLabel}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-mono bg-[#021f19] px-2.5 py-1.5 rounded-lg border border-emerald-800 text-amber-200 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    {/* Marks Overview Strip: Total / Theory / Practical */}
                    <div className="grid grid-cols-3 gap-2 bg-[#021f19] rounded-xl p-3 border border-emerald-800/80 text-center">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-stone-400">
                          {copy.pattern.totalMarksLabel}
                        </span>
                        <span className="font-mono text-base sm:text-lg font-extrabold text-amber-300 tabular-nums">
                          {item.totalMarks}
                        </span>
                      </div>
                      <div className="border-x border-emerald-800/80">
                        <span className="block text-[10px] uppercase tracking-wider text-stone-400">
                          {copy.pattern.theoryMarksLabel}
                        </span>
                        <span className="font-mono text-base sm:text-lg font-extrabold text-white tabular-nums">
                          {item.theoryMarks}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-stone-400">
                          {copy.pattern.practicalMarksLabel}
                        </span>
                        <span
                          className={`font-mono text-base sm:text-lg font-extrabold tabular-nums ${
                            item.practicalMarks > 0 ? 'text-emerald-300' : 'text-stone-400'
                          }`}
                        >
                          {item.practicalMarks > 0 ? item.practicalMarks : '—'}
                        </span>
                      </div>
                    </div>

                    {/* Theory Distribution (Sections A / B / C) */}
                    <div className="space-y-2.5">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-amber-200 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {copy.pattern.theoryHeading} ({item.theoryMarks} {copy.pattern.marksUnit})
                        </span>
                      </h5>

                      <div className="space-y-2" dir="ltr">
                        {[
                          {
                            ...item.theoryBreakdown.sectionA,
                            accent: 'border-amber-400/40 bg-[#02251f]',
                            badge: 'bg-amber-400 text-emerald-950',
                          },
                          {
                            ...item.theoryBreakdown.sectionB,
                            accent: 'border-emerald-500/40 bg-[#02251f]',
                            badge: 'bg-emerald-400 text-emerald-950',
                          },
                          {
                            ...item.theoryBreakdown.sectionC,
                            accent: 'border-sky-400/40 bg-[#02251f]',
                            badge: 'bg-sky-300 text-slate-950',
                          },
                        ].map((sec) => (
                          <div
                            key={sec.label}
                            className={`p-3 rounded-xl border ${sec.accent} flex items-start justify-between gap-3 text-left`}
                          >
                            <div className="space-y-0.5">
                              <div className="text-xs font-bold text-white">{sec.label}</div>
                              <p className="text-[11px] text-stone-300 leading-snug">{sec.detail}</p>
                            </div>
                            <div className="shrink-0 text-right">
                              <span
                                className={`inline-block px-2 py-0.5 rounded font-mono text-[11px] font-extrabold tabular-nums ${sec.badge}`}
                              >
                                {sec.marks} ({sec.pct})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Practical Portion Integrated Inside Exam Paper */}
                    <div className="space-y-2.5 pt-1">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                        <FlaskConical className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {copy.pattern.practicalHeading}
                          {item.practicalInPaper
                            ? ` (${item.practicalInPaper.marks} ${copy.pattern.marksUnit} · ${item.practicalInPaper.pct})`
                            : ''}
                        </span>
                      </h5>

                      {item.practicalInPaper ? (
                        <div className="p-3.5 rounded-xl bg-[#02251f] border border-rose-400/35 space-y-2.5" dir="ltr">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="px-2 py-0.5 rounded bg-rose-400 text-slate-950 font-mono text-[11px] font-extrabold">
                              {item.practicalInPaper.marks} {copy.pattern.marksUnit} ({item.practicalInPaper.pct})
                            </span>
                            <span className="text-[11px] font-bold text-amber-300">
                              {copy.pattern.inPaperBadge}
                            </span>
                          </div>

                          <p className="text-xs text-stone-200 leading-relaxed text-left">
                            {item.practicalInPaper.questionFormat}
                          </p>

                          <div className="space-y-1 text-left pt-1 border-t border-emerald-800/80">
                            <span className="text-[11px] font-bold text-amber-200 block">
                              {copy.pattern.practicalTopicsHeading}
                            </span>
                            <ul className="space-y-1 text-[11px] text-stone-200">
                              {item.practicalInPaper.keyTopics.map((topic) => (
                                <li key={topic} className="flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-300 shrink-0 mt-0.5" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-[#02251f] border border-emerald-900 text-xs text-stone-300 flex items-start gap-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-900 text-amber-200 font-semibold text-[11px] shrink-0">
                            {copy.pattern.theoryOnlyBadge}
                          </span>
                          <span className="leading-relaxed">{copy.pattern.noPracticalNote}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Passing Rule & STBB Ref */}
                  <div className="pt-3 border-t border-emerald-800 space-y-1.5 text-[11px] text-stone-300" dir="ltr">
                    <p className="text-amber-200 font-semibold">
                      <strong className="text-amber-300">{copy.pattern.passingHeading}</strong>{' '}
                      {item.passingRule}
                    </p>
                    <p>
                      <strong className="text-emerald-200">{copy.pattern.textbookLabel}</strong>{' '}
                      {item.textbookRef}
                    </p>
                    <p className="text-stone-400 italic">{item.stbbNote}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* MODE 2: SELF-CHECK MCQ PRACTICE QUIZ */}
        {activeTab === 'quiz' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-[#04362c] border border-emerald-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800 pb-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-300">
                    {copy.quizTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1">
                    {copy.quizSubtitle}
                  </p>
                </div>

                {/* Live Score & Accuracy Readout */}
                <div className="flex items-center gap-3 shrink-0 bg-[#02251f] px-4 py-2.5 rounded-xl border border-emerald-800">
                  <div className="text-center">
                    <span className="block text-[10px] uppercase text-stone-400">
                      {copy.quizScore}
                    </span>
                    <span className="font-mono text-sm font-bold text-amber-300 tabular-nums">
                      {score}/{quizPool.length}
                    </span>
                  </div>
                  <div className="w-px h-7 bg-emerald-800" />
                  <div className="text-center">
                    <span className="block text-[10px] uppercase text-stone-400">
                      {copy.quizAccuracy}
                    </span>
                    <span className="font-mono text-sm font-bold text-emerald-300 tabular-nums">
                      {accuracyPct}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Subject Group Filter */}
              <div className="flex flex-wrap items-center gap-1.5">
                {quizSubjects.map((subj) => (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => handleSelectSubject(subj)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      quizSubject === subj
                        ? 'bg-amber-400 text-emerald-950 font-bold'
                        : 'bg-[#02251f] text-stone-200 hover:bg-emerald-900 border border-emerald-800'
                    }`}
                  >
                    {subj === 'all' ? copy.quizAllSubjects : subj}
                  </button>
                ))}
              </div>

              {/* Quiz Body */}
              {isQuizFinished || !activeQuestion ? (
                <div className="py-10 text-center space-y-4 bg-[#02251f] rounded-2xl border border-emerald-800 p-6">
                  <Sparkles className="w-10 h-10 text-amber-300 mx-auto" />
                  <h4 className="font-serif text-2xl font-bold text-white">
                    {copy.quizCompletedTitle}
                  </h4>
                  <p className="text-sm text-stone-300">
                    {copy.quizCompletedDesc}
                  </p>
                  <div className="font-mono text-xl font-bold text-amber-300 tabular-nums">
                    {score} / {quizPool.length} ({accuracyPct}%)
                  </div>
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{copy.quizReset}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-5 bg-[#02251f] rounded-2xl border border-emerald-800 p-5 sm:p-6">
                  <div className="flex items-center justify-between text-xs text-stone-300 border-b border-emerald-800/80 pb-3">
                    <span className="font-bold text-amber-300">
                      {activeQuestion.subjectGroup} · {activeQuestion.level}
                    </span>
                    <span className="font-mono tabular-nums">
                      {copy.quizQuestion} {quizIndex + 1} / {quizPool.length}
                    </span>
                  </div>

                  <p className="font-serif text-lg sm:text-xl font-semibold text-white leading-relaxed">
                    {activeQuestion.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" dir="ltr">
                    {activeQuestion.options.map((opt, idx) => {
                      const isAnswered = selectedOption !== null;
                      const isCorrect = idx === activeQuestion.correctIndex;
                      const isChosen = idx === selectedOption;

                      let btnStyle =
                        'bg-[#064b36]/70 hover:bg-[#075940] border-emerald-700 text-stone-100';
                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle =
                            'bg-emerald-600/35 border-emerald-400 text-white font-semibold';
                        } else if (isChosen && !isCorrect) {
                          btnStyle =
                            'bg-rose-900/45 border-rose-400 text-rose-100';
                        } else {
                          btnStyle =
                            'bg-[#03241e] border-emerald-900 text-stone-400 opacity-70';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={isAnswered}
                          onClick={() => handleAnswerMcq(idx)}
                          className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-colors flex items-center justify-between gap-2 ${btnStyle}`}
                        >
                          <span>
                            <strong className="font-mono text-amber-300 mr-2">
                              {String.fromCharCode(65 + idx)}.
                            </strong>
                            {opt}
                          </span>
                          {isAnswered && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                          )}
                          {isAnswered && isChosen && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-300 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption !== null && (
                    <div className="pt-3 border-t border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider block ${
                            selectedOption === activeQuestion.correctIndex
                              ? 'text-emerald-300'
                              : 'text-amber-300'
                          }`}
                        >
                          {selectedOption === activeQuestion.correctIndex
                            ? copy.quizCorrect
                            : copy.quizIncorrect}
                        </span>
                        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed" dir="ltr">
                          {activeQuestion.explanation}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleNextMcq}
                        className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs shrink-0 cursor-pointer"
                      >
                        {copy.quizNext}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODE 3: LABORATORY PRACTICAL & VIVA GUIDE */}
        {activeTab === 'viva' && (
          <div className="space-y-6">
            <div className="bg-[#04362c] border border-emerald-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-300">
                  {copy.vivaTitle}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1">
                  {copy.vivaSubtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {labOptions.map((lab) => (
                  <button
                    key={lab}
                    type="button"
                    onClick={() => setSelectedLab(lab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      selectedLab === lab
                        ? 'bg-amber-400 text-emerald-950 font-bold'
                        : 'bg-[#02251f] text-stone-200 hover:bg-emerald-900 border border-emerald-800'
                    }`}
                  >
                    {lab === 'all' ? copy.vivaAllLabs : lab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredViva.map((item) => {
                const isRevealed = Boolean(revealedVivaIds[item.id]);
                return (
                  <article
                    key={item.id}
                    className="rounded-2xl bg-[#064b36]/85 border border-emerald-700/80 p-5 sm:p-6 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-[11px] border-b border-emerald-800 pb-2">
                        <span className="font-bold uppercase tracking-wider text-amber-300">
                          {item.subject}
                        </span>
                        <span className="text-emerald-200 font-medium">
                          {item.experimentTitle}
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5" dir="ltr">
                        <HelpCircle className="w-4 h-4 text-amber-300 shrink-0 mt-1" />
                        <p className="font-serif text-base sm:text-lg font-semibold text-white leading-snug">
                          {item.question}
                        </p>
                      </div>

                      {isRevealed && (
                        <div
                          dir="ltr"
                          className="mt-3 p-4 rounded-xl bg-[#02251f] border border-amber-300/35 space-y-2 text-xs sm:text-sm"
                        >
                          <p className="text-stone-100 leading-relaxed">
                            {item.modelAnswer}
                          </p>
                          <p className="text-amber-200 text-xs pt-2 border-t border-emerald-800/80">
                            <strong>{copy.vivaTipLabel}</strong> {item.examinerTip}
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleVivaAnswer(item.id)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#02251f] hover:bg-[#033229] text-amber-200 border border-amber-300/40 text-xs font-bold transition-colors cursor-pointer"
                    >
                      {isRevealed ? copy.vivaHide : copy.vivaReveal}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 4: AI CAREER COUNSELOR */}
        {activeTab === 'counselor' && <CareerCounselorChat />}
      </div>

      {/* Interactive Paper Viewer Modal */}
      {selectedPaper && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPaper(null)}
        >
          <div
            className="bg-[#042f28] text-white border border-amber-300/50 rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-emerald-800 flex items-start justify-between gap-4 bg-[#03241e]">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider block">
                  {selectedPaper.code} · {selectedPaper.boardOrUniversity} ({selectedPaper.year})
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {selectedPaper.subject}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300 pt-1">
                  <span>{selectedPaper.levelLabel}</span>
                  <span>·</span>
                  <span className="font-mono tabular-nums">
                    {copy.marksLabel}: {selectedPaper.maxMarks}
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 font-mono tabular-nums">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    {selectedPaper.duration}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => triggerPastPaperDownload(selectedPaper)}
                  className="px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copy.downloadPaper}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPaper(null)}
                  aria-label={copy.closeModal}
                  className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-emerald-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body (Paper Content kept LTR for crisp English/Numeric formatting) */}
            <div dir="ltr" className="p-5 sm:p-6 overflow-y-auto space-y-6 text-left">
              {/* Section A */}
              <div className="space-y-3">
                <h4 className="font-serif text-base font-bold text-amber-300 border-b border-emerald-800 pb-1.5">
                  {copy.sectionA}
                </h4>
                <div className="space-y-3">
                  {selectedPaper.sectionA.map((mcq, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#02251f] border border-emerald-800/80 space-y-2 text-xs sm:text-sm"
                    >
                      <p className="font-medium text-white">
                        {idx + 1}. {mcq.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-300">
                        {mcq.options.map((opt, oIdx) => (
                          <span key={opt}>
                            ({String.fromCharCode(97 + oIdx)}) {opt}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] font-semibold text-emerald-300 pt-1">
                        Answer Key: {mcq.correctAnswer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section B */}
              <div className="space-y-2.5">
                <h4 className="font-serif text-base font-bold text-amber-300 border-b border-emerald-800 pb-1.5">
                  {copy.sectionB}
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {selectedPaper.sectionB.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ol>
              </div>

              {/* Section C */}
              <div className="space-y-2.5">
                <h4 className="font-serif text-base font-bold text-amber-300 border-b border-emerald-800 pb-1.5">
                  {copy.sectionC}
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {selectedPaper.sectionC.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ol>
              </div>

              {/* Section D (Integrated In-Paper Practical Questions) */}
              {selectedPaper.practicalSection && selectedPaper.practicalSection.length > 0 && (
                <div className="space-y-2.5 p-4 rounded-xl bg-rose-950/35 border border-rose-400/40">
                  <h4 className="font-serif text-base font-bold text-rose-300 border-b border-rose-500/30 pb-1.5">
                    {copy.sectionD}
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-stone-100 leading-relaxed">
                    {selectedPaper.practicalSection.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Examiner Marking Tips */}
              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-300/35 space-y-2">
                <h4 className="font-serif text-sm font-bold text-amber-300">
                  {copy.examinerTips}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-stone-200">
                  {selectedPaper.markingTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
