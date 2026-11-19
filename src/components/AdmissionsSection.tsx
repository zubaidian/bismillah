import { ExternalLink, CheckSquare, FileText, Smartphone } from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function AdmissionsSection() {
  const { dir, t } = useLanguage();
  const copy = t.admissions;

  return (
    <section
      id="admissions"
      dir={dir}
      className="scroll-mt-20 py-16 sm:py-24 bg-[#042f28] text-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {copy.title}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            {copy.subtitle}
          </p>
          <div className="pt-1 flex justify-center">
            <LanguageSwitcher variant="dark" />
          </div>
        </div>

        {/* Free Admission Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 text-emerald-950 shadow-xl border-2 border-amber-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-start">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-900 block">
                {copy.bannerEyebrow}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                {copy.bannerTitle}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium">
                {copy.bannerDesc}
              </p>
            </div>

            <a
              href={COLLEGE_INFO.seccapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 shrink-0 active:scale-95"
            >
              <span>{copy.applyBtn}</span>
              <ExternalLink className="w-4 h-4 text-amber-300" />
            </a>
          </div>
        </div>

        {/* Step by Step Application Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Steps List */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-amber-300 mb-6">
              {copy.howToTitle}
            </h3>

            <div className="space-y-4">
              {copy.steps.map((step) => (
                <div
                  key={step.num}
                  className="p-5 rounded-xl bg-[#063f35] border border-emerald-700/60 flex items-start gap-4"
                >
                  <div className="font-serif text-2xl font-bold text-amber-300 bg-[#042f28] w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border border-amber-300/30 tabular-nums">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* SECCAP Direct Features */}
            <div className="mt-8 p-6 rounded-xl bg-[#021f19] border border-amber-300/30">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                {copy.servicesTitle}
              </span>
              <p className="text-xs text-stone-300 mb-4">
                {copy.servicesDesc}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                {copy.serviceLinks.map((label) => (
                  <a
                    key={label}
                    href={COLLEGE_INFO.seccapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded bg-[#064b36] hover:bg-emerald-800 text-amber-200 border border-emerald-700 font-semibold"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Required Documents Checklist & Degree Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#063f35] border-2 border-amber-300/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-300" />
                <h3 className="font-serif text-xl font-bold text-white">
                  {copy.checklistTitle}
                </h3>
              </div>
              <p className="text-xs text-stone-300">
                {copy.checklistDesc}
              </p>

              <div className="space-y-2.5 pt-2">
                {copy.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-200">
                    <CheckSquare className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-emerald-700/80 text-xs text-amber-200">
                <strong>{copy.officeTimingLabel}</strong> {copy.officeTimingValue}
              </div>
            </div>

            {/* University Degree Admissions Box */}
            <div className="p-6 rounded-2xl bg-[#03241e] border border-amber-300/30 text-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider">
                <Smartphone className="w-4 h-4" />
                <span>{copy.degreeEyebrow}</span>
              </div>
              <h4 className="font-serif font-bold text-lg text-white">
                {copy.degreeTitle}
              </h4>
              <p className="text-stone-300 leading-relaxed">
                {copy.degreeDesc}
              </p>
              <a
                href="#contact"
                className="inline-block text-amber-300 font-semibold hover:underline"
              >
                {copy.degreeLink}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
