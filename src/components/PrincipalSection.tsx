import { COLLEGE_INFO } from '../data/collegeData';
import { useLanguage } from '../contexts/LanguageContext';

export function PrincipalSection() {
  const { dir, t } = useLanguage();
  const s = t.sections.principal;

  return (
    <section id="principal" dir={dir} className="py-16 sm:py-24 bg-[#042f28] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Principal's Photo Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group max-w-sm w-full rounded-2xl overflow-hidden border-2 border-amber-300 shadow-2xl bg-[#02251f] p-3">
              <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-stone-900">
                <img
                  src={COLLEGE_INFO.images.principal}
                  alt="Principal Professor Yasmeen Panhwar - Govt Girls Zubaida College Hyderabad"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="block text-xs font-mono uppercase tracking-widest text-amber-300">
                    {s.deskLabel}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-white mt-1">
                    {s.name}
                  </h3>
                  <span className="text-xs text-stone-300">
                    {s.college}
                  </span>
                </div>
              </div>

              {/* Photo Caption Strip */}
              <div className="mt-3 p-3 bg-[#03221c] rounded-lg border border-emerald-800 text-center text-xs">
                <span className="block font-semibold text-amber-300 tracking-wider uppercase">
                  {s.tagline}
                </span>
                <span className="text-stone-300 text-[11px]">
                  {s.subTagline}
                </span>
              </div>
            </div>
          </div>

          {/* Principal's Message Column */}
          <div className="lg:col-span-7 space-y-6 text-start">
            <div className="space-y-2">
              <p className="font-serif italic text-base text-amber-200">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="text-xs text-stone-300 uppercase tracking-widest font-semibold">
                {s.bismillahSub}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white pt-2">
                {s.headingBefore} <span className="text-amber-300 italic font-normal">{s.headingHighlight}</span>
              </h2>
            </div>

            <div className="space-y-4 text-stone-200 text-base sm:text-lg leading-relaxed border-s-2 border-amber-400/40 ps-5">
              <p>
                <strong className="text-white">{s.welcomeLine}</strong>
              </p>
              <p>{s.p1}</p>
              <p>{s.p2}</p>
              <p>{s.p3}</p>
              <p className="font-serif italic text-amber-200 pt-2">
                {s.closingPrayer}
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-800/80">
              <h4 className="font-serif font-bold text-xl text-white">
                {s.signName}
              </h4>
              <p className="text-xs text-amber-300 font-semibold tracking-wider uppercase mt-0.5">
                {s.signRole}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                {s.signDept}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
