import { useState } from 'react';
import { COLLEGE_INFO } from '../data/collegeData';
import { useLanguage } from '../contexts/LanguageContext';
import { Award, CheckCircle2, Maximize2, X, Sparkles } from 'lucide-react';

export function BoardHonorsSection() {
  const { dir, t } = useLanguage();
  const s = t.sections.boardHonors;
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);
  const [activeModalTitle, setActiveModalTitle] = useState<string>('');

  const openImageModal = (src: string, title: string) => {
    setActiveModalImage(src);
    setActiveModalTitle(title);
  };

  return (
    <section id="board-results" dir={dir} className="py-16 sm:py-24 bg-[#f4f7f4] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            {s.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            {s.subtitle}
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Official Poster Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative group rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-xl bg-white p-2">
              <img
                src={COLLEGE_INFO.images.boardResultsFlyer}
                alt="Outstanding Board Results Flyer - Govt Girls Zubaida College Hyderabad"
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                onClick={() =>
                  openImageModal(
                    COLLEGE_INFO.images.boardResultsFlyer,
                    'HSC Part-II Computer Science Annual Examination Results Announcement'
                  )
                }
              />
              <button
                onClick={() =>
                  openImageModal(
                    COLLEGE_INFO.images.boardResultsFlyer,
                    'HSC Part-II Computer Science Annual Examination Results Announcement'
                  )
                }
                className="absolute bottom-4 right-4 bg-[#064b36] hover:bg-[#042f28] text-white p-2.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-semibold px-3"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{s.viewBanner}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong>{s.felicitationLabel}</strong> {s.felicitationDesc}
              </div>
            </div>
          </div>

          {/* Right Column: Key Position Holder Details & Stats */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Position Card: Maryam Bibi */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#064b36] text-white border-2 border-amber-300 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-700/80 pb-4 mb-4">
                <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                  {s.positionHeader}
                </span>
                <span className="text-amber-200 text-xs font-mono">
                  {s.rollNoLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                <div className="sm:col-span-2 space-y-2">
                  <span className="text-xs font-semibold text-emerald-200 uppercase tracking-widest block">
                    {s.positionHolderLabel}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                    {s.studentName}
                  </h3>
                  <p className="text-stone-200 text-sm">
                    {s.daughterOfPrefix} <strong className="text-white">{s.fatherName}</strong>
                  </p>
                  <p className="text-emerald-100 text-xs">
                    {s.institutionLabel} <span className="font-semibold text-white">{s.institutionValue}</span>
                  </p>
                  <p className="text-xs text-stone-300 pt-1">
                    {s.examLine}
                  </p>
                </div>

                <div className="bg-[#042f28] p-4 rounded-xl border border-amber-300/40 text-center">
                  <span className="text-[11px] text-stone-300 block uppercase">{s.marksObtained}</span>
                  <div className="font-serif font-bold text-3xl sm:text-4xl text-amber-300 my-1 tabular-nums">
                    916
                  </div>
                  <span className="text-xs text-emerald-200">{s.outOfLabel}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-emerald-700/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-emerald-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  {s.gazettedBadge}
                </span>
                <button
                  onClick={() =>
                    openImageModal(
                      COLLEGE_INFO.images.boardResultsOfficial,
                      'BISE Hyderabad Official Position Holders Gazette Sheet'
                    )
                  }
                  className="text-amber-300 hover:text-white font-semibold underline underline-offset-4 flex items-center gap-1"
                >
                  {s.viewGazetteBtn}
                </button>
              </div>
            </div>

            {/* Department Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm text-center">
                <span className="text-xs text-stone-500 font-medium block">{s.standingsLabel}</span>
                <div className="font-serif font-bold text-2xl text-[#064b36] my-1">
                  {s.standingsValue}
                </div>
                <p className="text-xs text-stone-600">{s.standingsDesc}</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm text-center">
                <span className="text-xs text-stone-500 font-medium block">{s.gradesLabel}</span>
                <div className="font-serif font-bold text-2xl text-[#064b36] my-1">
                  {s.gradesValue}
                </div>
                <p className="text-xs text-stone-600">{s.gradesDesc}</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm text-center">
                <span className="text-xs text-stone-500 font-medium block">{s.passLabel}</span>
                <div className="font-serif font-bold text-2xl text-emerald-700 my-1">
                  {s.passValue}
                </div>
                <p className="text-xs text-stone-600">{s.passDesc}</p>
              </div>
            </div>

            {/* Official Gazette Thumbnail Card */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
              <img
                src={COLLEGE_INFO.images.boardResultsOfficial}
                alt="BISE Hyderabad Gazette"
                loading="lazy"
                decoding="async"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-stone-300 shrink-0 cursor-pointer hover:opacity-90"
                onClick={() =>
                  openImageModal(
                    COLLEGE_INFO.images.boardResultsOfficial,
                    'BISE Hyderabad Official Position Holders Gazette Sheet'
                  )
                }
              />
              <div className="space-y-1 text-center sm:text-start">
                <h4 className="font-bold text-sm text-stone-900">
                  {s.boardName}
                </h4>
                <p className="text-xs text-stone-600">
                  {s.boardDesc}
                </p>
                <button
                  onClick={() =>
                    openImageModal(
                      COLLEGE_INFO.images.boardResultsOfficial,
                      'BISE Hyderabad Official Position Holders Gazette Sheet'
                    )
                  }
                  className="text-xs font-semibold text-[#064b36] hover:text-emerald-700 underline"
                >
                  {s.inspectGazette}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl p-4 text-center border border-stone-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-left">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {activeModalTitle}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalImage(null)}
                className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 max-h-[75vh] overflow-auto flex items-center justify-center">
              <img
                src={activeModalImage}
                alt={activeModalTitle}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between">
              <span>Government Girls Zubaida College Hyderabad</span>
              <button
                onClick={() => setActiveModalImage(null)}
                className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded font-medium"
              >
                {s.closeView}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
