import { useState } from 'react';
import { COLLEGE_INFO } from '../data/collegeData';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone, PhoneCall, ChevronUp, ChevronDown } from 'lucide-react';

export function FloatingCallWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { dir, t } = useLanguage();
  const cw = t.callWidget;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Quick Dial Card */}
      {isExpanded && (
        <div
          dir={dir}
          className="mb-2 p-4 rounded-2xl bg-white border-2 border-emerald-800 shadow-2xl max-w-xs w-72 text-start animate-fadeIn text-stone-900"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-200">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                {cw.collegeTag}
              </span>
              <h4 className="font-serif font-bold text-sm text-stone-900">
                {cw.title}
              </h4>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700"
              aria-label="Close phone menu"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {/* College Landline */}
            <a
              href={`tel:${COLLEGE_INFO.phoneRaw}`}
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-[#064b36] transition-colors group"
            >
              <div>
                <span className="text-[10px] text-emerald-700 font-bold uppercase block">
                  {cw.landlineLabel}
                </span>
                <span dir="ltr" className="font-mono font-bold text-sm text-[#064b36] inline-block">
                  {COLLEGE_INFO.phone}
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#064b36] text-amber-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                <PhoneCall className="w-4 h-4" />
              </div>
            </a>

            {/* Admission Helpline */}
            <a
              href={`tel:${COLLEGE_INFO.helplineRaw}`}
              className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 transition-colors group"
            >
              <div>
                <span className="text-[10px] text-amber-800 font-bold uppercase block">
                  {cw.helplineLabel}
                </span>
                <span dir="ltr" className="font-mono font-bold text-sm text-amber-950 inline-block">
                  {COLLEGE_INFO.helpline}
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-emerald-950 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
            </a>
          </div>

          <p className="text-[10px] text-stone-500 mt-2 text-center">
            {cw.officeHours}
          </p>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#064b36] hover:bg-[#042f28] text-amber-300 font-bold text-xs shadow-xl border-2 border-amber-400 active:scale-95 transition-all group"
        aria-label="Call Government Girls Zubaida College"
        title="Call Govt Girls Zubaida College: (022) 9210196"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
        </span>
        <Phone className="w-4 h-4 text-amber-300" />
        <span dir="ltr" className="hidden sm:inline font-mono tracking-tight">
          {COLLEGE_INFO.phone}
        </span>
        <span className="sm:hidden font-sans">{cw.callShort}</span>
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-amber-200" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-amber-200" />
        )}
      </button>
    </div>
  );
}
