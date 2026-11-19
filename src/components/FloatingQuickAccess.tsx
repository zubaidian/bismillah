import { useEffect, useState } from 'react';
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Compass,
  Download,
  FileSpreadsheet,
  GraduationCap,
  MapPin,
  X,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface QuickShortcut {
  id: string;
  label: string;
  hint: string;
  href: string;
  icon: typeof GraduationCap;
  priority?: boolean;
}

function scrollToSectionHref(href: string) {
  if (href === '#campus-tour') {
    import('./VirtualCampusTour').catch(() => {});
    window.dispatchEvent(new CustomEvent('campus-tour:open-map'));

    const scrollMap = (behavior: ScrollBehavior = 'smooth') => {
      const target =
        document.querySelector('#campus-virtual-map') ||
        document.querySelector('#campus-tour');
      if (target) {
        target.scrollIntoView({ behavior, block: 'start' });
        return Boolean(document.querySelector('#campus-virtual-map'));
      }
      return false;
    };

    if (scrollMap('smooth')) {
      window.setTimeout(() => scrollMap('smooth'), 240);
      return;
    }

    let attempts = 0;
    const pollMap = () => {
      attempts += 1;
      window.dispatchEvent(new CustomEvent('campus-tour:open-map'));
      if (scrollMap('smooth')) {
        window.setTimeout(() => scrollMap('smooth'), 280);
      } else if (attempts < 25) {
        window.setTimeout(pollMap, 80);
      }
    };
    window.setTimeout(pollMap, 80);
    return;
  }

  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  let attempts = 0;
  const pollTarget = () => {
    attempts += 1;
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (attempts < 20) {
      window.setTimeout(pollTarget, 75);
    }
  };
  window.setTimeout(pollTarget, 75);
}

export function FloatingQuickAccess() {
  const { dir, t } = useLanguage();
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('admissions');

  const shortcuts: QuickShortcut[] = [
    {
      id: 'admissions',
      label: t.quickAccess.admissions,
      hint: t.quickAccess.admissionsHint,
      href: '#admissions',
      icon: GraduationCap,
      priority: true,
    },
    {
      id: 'exam-prep',
      label: t.quickAccess.examPrep,
      hint: t.quickAccess.examPrepHint,
      href: '#exam-prep',
      icon: FileSpreadsheet,
      priority: true,
    },
    {
      id: 'student-resources',
      label: t.quickAccess.downloads,
      hint: t.quickAccess.downloadsHint,
      href: '#student-resources',
      icon: Download,
      priority: true,
    },
    {
      id: 'academic-calendar',
      label: t.quickAccess.calendar,
      hint: t.quickAccess.calendarHint,
      href: '#academic-calendar',
      icon: CalendarDays,
      priority: true,
    },
    {
      id: 'academics',
      label: t.quickAccess.programs,
      hint: t.quickAccess.programsHint,
      href: '#academics',
      icon: BookOpen,
    },
    {
      id: 'campus-tour',
      label: t.quickAccess.campusMap,
      hint: t.quickAccess.campusMapHint,
      href: '#campus-tour',
      icon: Compass,
    },
    {
      id: 'contact',
      label: t.quickAccess.contact,
      hint: t.quickAccess.contactHint,
      href: '#contact',
      icon: MapPin,
    },
  ];

  // Track which shortcut section is currently closest to the viewport reading line
  useEffect(() => {
    const updateActiveFromScroll = () => {
      const readingOffset = window.scrollY + window.innerHeight * 0.35;
      let currentMatch = 'admissions';
      let bestDistance = Infinity;

      const shortcutIds = [
        'admissions',
        'exam-prep',
        'student-resources',
        'academic-calendar',
        'academics',
        'campus-tour',
        'contact',
      ];

      for (const id of shortcutIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const topAbs = rect.top + window.scrollY;
        const dist = Math.abs(readingOffset - topAbs);
        if (topAbs <= readingOffset + 120 && dist < bestDistance) {
          bestDistance = dist;
          currentMatch = id;
        }
      }

      setActiveId(currentMatch);
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveFromScroll);
  }, []);

  // Close mobile Quick Access drawer with Escape
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileOpen]);

  const handleShortcutClick = (shortcut: QuickShortcut, closeMobile = false) => {
    setActiveId(shortcut.id);
    if (closeMobile) setIsMobileOpen(false);
    scrollToSectionHref(shortcut.href);
  };

  return (
    <>
      {/* Desktop & Tablet Docked Right-Side Floating Quick Access Menu */}
      <aside
        aria-label={t.quickAccess.title}
        className="hidden md:flex fixed right-3 lg:right-4 top-1/2 -translate-y-1/2 z-40 items-center"
      >
        {isDesktopCollapsed ? (
          <button
            type="button"
            onClick={() => setIsDesktopCollapsed(false)}
            aria-expanded="false"
            aria-label={t.quickAccess.title}
            className="flex flex-col items-center gap-2 py-3.5 px-2.5 rounded-xl bg-[#042f28]/95 hover:bg-[#064b36] text-amber-300 border border-amber-300/45 shadow-xl backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-amber-300" />
            <span className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-bold uppercase tracking-widest text-amber-200 whitespace-nowrap">
              {t.quickAccess.title}
            </span>
          </button>
        ) : (
          <nav
            dir={dir}
            aria-label={t.quickAccess.title}
            className="w-52 rounded-2xl bg-[#042f28]/95 border border-amber-300/40 shadow-2xl backdrop-blur-md overflow-hidden"
          >
            {/* Compact Header */}
            <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 border-b border-emerald-800/80 bg-[#03241e]">
              <span className="font-serif text-xs font-bold tracking-wide text-amber-300 whitespace-nowrap">
                {t.quickAccess.title}
              </span>
              <button
                type="button"
                onClick={() => setIsDesktopCollapsed(true)}
                aria-expanded="true"
                aria-label="Minimize Quick Access menu"
                title="Minimize Quick Access"
                className="p-1 rounded-md text-emerald-200 hover:text-amber-300 hover:bg-emerald-900/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Instant Language Switcher */}
            <div className="px-2 pt-2 pb-1">
              <LanguageSwitcher variant="floating" compact />
            </div>

            {/* Shortcut Links */}
            <ul className="p-1.5 space-y-1">
              {shortcuts.map((item) => {
                const Icon = item.icon;
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleShortcutClick(item);
                      }}
                      className={`group flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                        isActive
                          ? 'bg-amber-400 text-emerald-950 shadow-sm'
                          : 'text-stone-100 hover:bg-[#064b36] hover:text-amber-200'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-emerald-950 text-amber-300'
                            : 'bg-[#03241e] text-amber-300 border border-emerald-800/80 group-hover:border-amber-300/40'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-xs font-bold leading-tight whitespace-nowrap truncate ${
                            isActive ? 'text-emerald-950' : 'text-white group-hover:text-amber-200'
                          }`}
                        >
                          {item.label}
                        </span>
                        <span
                          className={`block text-[10px] leading-tight whitespace-nowrap truncate mt-0.5 ${
                            isActive ? 'text-emerald-900 font-medium' : 'text-emerald-200/80'
                          }`}
                        >
                          {item.hint}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </aside>

      {/* Mobile Compact Right-Side Edge Handle & Popover (Respects <=15% Mobile Sticky Cap) */}
      <div className="md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-40">
        {!isMobileOpen ? (
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            aria-expanded="false"
            aria-label={t.quickAccess.title}
            className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-l-xl bg-[#042f28]/95 text-amber-300 border border-r-0 border-amber-300/50 shadow-xl backdrop-blur-md active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-amber-300" />
            <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-bold uppercase tracking-widest text-amber-200 whitespace-nowrap">
              {t.quickAccess.title}
            </span>
          </button>
        ) : (
          <nav
            dir={dir}
            aria-label={t.quickAccess.title}
            className="mr-3 w-56 rounded-2xl bg-[#042f28]/95 border border-amber-300/50 shadow-2xl backdrop-blur-md overflow-hidden"
          >
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-emerald-800/80 bg-[#03241e]">
              <span className="font-serif text-xs font-bold text-amber-300">
                {t.quickAccess.title}
              </span>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close Quick Access menu"
                className="p-1 rounded-md text-stone-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-2 pt-2 pb-1">
              <LanguageSwitcher variant="floating" compact />
            </div>

            <ul className="p-2 space-y-1">
              {shortcuts.map((item) => {
                const Icon = item.icon;
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleShortcutClick(item, true);
                      }}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-amber-400 text-emerald-950 font-bold'
                          : 'text-stone-100 hover:bg-[#064b36]'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-emerald-950' : 'text-amber-300'
                        }`}
                      />
                      <span className="whitespace-nowrap truncate">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
