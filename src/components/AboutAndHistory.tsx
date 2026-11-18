import { COLLEGE_INFO } from '../data/collegeData';
import { useLanguage } from '../contexts/LanguageContext';
import { Quote, Play } from 'lucide-react';

export function AboutAndHistory() {
  const { dir, t } = useLanguage();
  const s = t.sections.about;

  return (
    <section id="about" dir={dir} className="py-16 sm:py-24 bg-[#064b36] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Lead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              {s.headingBefore} <span className="italic font-normal text-amber-300">{s.headingHighlight}</span>
            </h2>

            <p className="text-amber-100/95 text-lg sm:text-xl font-serif italic leading-relaxed">
              {s.leadQuote}
            </p>

            <div className="space-y-4 text-stone-200 text-base leading-relaxed">
              <p>{s.p1}</p>
              <p>{s.p2}</p>
              <p>{s.p3}</p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-sm font-semibold">
              {s.pillars.map((pillar) => (
                <div key={pillar} className="flex items-center gap-2 text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Column: Campus Gate & Pull Quote */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-2xl bg-[#042f28]">
              <img
                src={COLLEGE_INFO.images.campus}
                alt="Historic Entrance of Govt Girls Zubaida College"
                className="w-full h-72 sm:h-80 object-cover object-center"
              />
              <div className="p-4 bg-[#042f28] text-xs text-stone-300 flex items-center justify-between border-t border-emerald-800">
                <span className="font-semibold text-amber-200">{s.gatewayTitle}</span>
                <span>{s.gatewayAddr}</span>
              </div>
            </div>

            {/* Quote Card */}
            <div className="p-6 rounded-2xl bg-[#042f28] border-2 border-amber-300/60 shadow-xl relative text-start">
              <Quote className="w-8 h-8 text-amber-400/40 absolute top-4 right-4" />
              <p className="font-serif italic text-lg sm:text-xl text-amber-200 leading-snug">
                {s.quoteCard}
              </p>
              <div className="mt-4 pt-3 border-t border-emerald-800 flex items-center justify-between text-xs">
                <span className="font-bold text-white tracking-wider uppercase">
                  {s.quoteLabel}
                </span>
                <span className="text-amber-300 font-serif">{s.collegeLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Decade Timeline */}
        <div id="history" className="mt-20 pt-16 border-t border-emerald-800">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {s.timelineTitle}
            </h3>
            <p className="text-sm text-stone-300">
              {s.timelineSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {s.timeline.map((event, index) => (
              <div
                key={event.year}
                className="p-6 rounded-xl bg-[#042f28] border border-amber-300/30 hover:border-amber-300 transition-colors shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      0{index + 1}
                    </span>
                    <span className="text-amber-300 font-bold text-xs tracking-wider">
                      {event.year}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-white mb-2">
                    {event.title}
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Historical Video / Archive Box (Development Only until archive video is linked) */}
          {import.meta.env.DEV && (
            <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#042f28] border border-amber-300/40 max-w-4xl mx-auto shadow-xl">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-full sm:w-64 h-40 rounded-xl overflow-hidden bg-black shrink-0 border border-emerald-700 flex items-center justify-center">
                  <img
                    src={COLLEGE_INFO.images.campus}
                    alt="Zubaida College History Video Poster"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-amber-400/90 text-emerald-950 flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
                    Campus Archive
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white">
                    A Glimpse of Zubaida College Hyderabad
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Experience the living heritage, classrooms, and student community of our storied institution. Archived video footage and special retrospectives are maintained in our college multimedia center.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
