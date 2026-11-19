import { useMemo, useState } from 'react';
import { Calendar, Clock, GraduationCap, BookOpen, Flag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

type CalendarTrack = 'all' | 'intermediate' | 'degree' | 'campus';

interface CalendarMilestone {
  id: string;
  dateRange: string;
  monthTag: string;
  title: string;
  track: Exclude<CalendarTrack, 'all'>;
  audience: string;
  details: string;
}

const ACADEMIC_CALENDAR_2026_27: CalendarMilestone[] = [
  {
    id: 'cal-seccap',
    dateRange: 'June 15 – July 25, 2026',
    monthTag: 'JUN–JUL',
    title: 'SECCAP Online Admissions & Placement Lists',
    track: 'intermediate',
    audience: 'Class XI (Pre-Med, Pre-Eng, CS, I.Com, Arts)',
    details:
      'Centralized online applications via SECCAP Sindh followed by merit list publication and document verification at the College Admission Desk.'
  },
  {
    id: 'cal-xi-start',
    dateRange: 'August 03, 2026',
    monthTag: 'AUG',
    title: 'First Year (Class XI) Orientation & Classes Begin',
    track: 'intermediate',
    audience: 'All Newly Enrolled Intermediate Scholars',
    details:
      'Morning assembly welcome, timetable issuance, lab group allocation, and Central Library membership registration.'
  },
  {
    id: 'cal-bs-adp',
    dateRange: 'September 07 – October 10, 2026',
    monthTag: 'SEP–OCT',
    title: 'BS Zoology & Associate Degree (AD) Admissions & Semester I',
    track: 'degree',
    audience: 'BS Zoology (4-Yr) & ADS / ADA / ADC',
    details:
      'Admission forms, merit lists, and University of Sindh Jamshoro enrollment registration for Fall Semester classes.'
  },
  {
    id: 'cal-midterm',
    dateRange: 'November 16 – November 28, 2026',
    monthTag: 'NOV',
    title: 'First Term Assessments & Practical Pre-Evaluations',
    track: 'intermediate',
    audience: 'Class XI & Class XII',
    details:
      'Departmental mid-session theory tests and Science / Computer Science laboratory journal checks.'
  },
  {
    id: 'cal-winter',
    dateRange: 'December 21 – December 31, 2026',
    monthTag: 'DEC',
    title: 'Winter Vacation & Quaid-e-Azam Day Assembly',
    track: 'campus',
    audience: 'All Faculties & Staff',
    details:
      'Scheduled Sindh College Education Department winter break following December 25th commemorative activities.'
  },
  {
    id: 'cal-semester-exams',
    dateRange: 'January 18 – February 06, 2027',
    monthTag: 'JAN–FEB',
    title: 'University of Sindh Semester Examinations',
    track: 'degree',
    audience: 'BS Zoology & 2-Year Associate Degree Cohorts',
    details:
      'Affiliated semester theory and laboratory examinations conducted per University of Sindh examination schedule.'
  },
  {
    id: 'cal-preboard',
    dateRange: 'February 15 – March 06, 2027',
    monthTag: 'FEB–MAR',
    title: 'Pre-Board Send-Up Exams & Practical Mock Labs',
    track: 'intermediate',
    audience: 'HSC Part I & Part II Candidates',
    details:
      'Full BISE-pattern rehearsal examinations and laboratory practicals in Physics, Chemistry, Botany, Zoology, and Computer Science.'
  },
  {
    id: 'cal-bise-annual',
    dateRange: 'April 26 – May 29, 2027',
    monthTag: 'APR–MAY',
    title: 'BISE Hyderabad Annual HSC Examinations',
    track: 'intermediate',
    audience: 'Class XI & Class XII Regular Candidates',
    details:
      'Board of Intermediate & Secondary Education Hyderabad theory papers and certified science practical examinations.'
  }
];

export function AcademicCalendarSection() {
  const { dir, t } = useLanguage();
  const [selectedTrack, setSelectedTrack] = useState<CalendarTrack>('all');

  const trackFilters: { id: CalendarTrack; label: string }[] = [
    { id: 'all', label: t.calendar.filters.all },
    { id: 'intermediate', label: t.calendar.filters.intermediate },
    { id: 'degree', label: t.calendar.filters.degree },
    { id: 'campus', label: t.calendar.filters.campus },
  ];

  const visibleItems = useMemo(() => {
    if (selectedTrack === 'all') return ACADEMIC_CALENDAR_2026_27;
    return ACADEMIC_CALENDAR_2026_27.filter((item) => item.track === selectedTrack);
  }, [selectedTrack]);

  const getTrackMeta = (track: CalendarMilestone['track']) => {
    switch (track) {
      case 'intermediate':
        return { label: t.calendar.trackLabels.intermediate, Icon: BookOpen };
      case 'degree':
        return { label: t.calendar.trackLabels.degree, Icon: GraduationCap };
      default:
        return { label: t.calendar.trackLabels.campus, Icon: Flag };
    }
  };

  return (
    <section
      id="academic-calendar"
      dir={dir}
      className="scroll-mt-24 py-16 sm:py-24 bg-[#faf8f4] text-stone-900 border-t border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 block">
              {t.calendar.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36] text-balance">
              {t.calendar.title}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {t.calendar.subtitle}
            </p>
            <div className="pt-1">
              <LanguageSwitcher variant="light" />
            </div>
          </div>

          {/* Filter Tabs */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-xl border border-stone-200 shadow-xs"
            role="tablist"
            aria-label="Filter academic calendar by program"
          >
            {trackFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={selectedTrack === filter.id}
                onClick={() => setSelectedTrack(filter.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTrack === filter.id
                    ? 'bg-[#064b36] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Institutional Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {visibleItems.map((item) => {
            const { label, Icon } = getTrackMeta(item.track);
            return (
              <article
                key={item.id}
                dir="ltr"
                className="bg-white rounded-2xl border border-stone-200 hover:border-emerald-700/40 p-5 sm:p-6 transition-colors flex items-start gap-4 text-left shadow-xs"
              >
                {/* Crisp Tabular Date Marker */}
                <div className="w-20 shrink-0 rounded-xl bg-[#042f28] text-amber-300 px-2.5 py-3 text-center border border-emerald-900">
                  <Calendar className="w-4 h-4 mx-auto mb-1 text-amber-300" />
                  <span className="font-mono font-bold text-[11px] tracking-wider tabular-nums block">
                    {item.monthTag}
                  </span>
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-800">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{label}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums text-stone-700 font-semibold">
                      {item.dateRange}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.details}
                  </p>

                  <div className="pt-1 flex items-center gap-1.5 text-[11px] text-stone-500">
                    <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{item.audience}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer Note & Quick Link to Official Notices */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-stone-600">
          <span>{t.calendar.footerNote}</span>
          <a
            href="#notices"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#notices')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-semibold text-[#064b36] hover:underline whitespace-nowrap shrink-0"
          >
            {t.calendar.footerLink}
          </a>
        </div>
      </div>
    </section>
  );
}
