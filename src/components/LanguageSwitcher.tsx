import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PortalLanguage } from '../data/translations';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'dark' | 'light' | 'floating';
  compact?: boolean;
  className?: string;
}

const LANG_OPTIONS: { id: PortalLanguage; short: string; full: string; dir: 'ltr' | 'rtl' }[] = [
  { id: 'en', short: 'EN', full: 'English', dir: 'ltr' },
  { id: 'ur', short: 'اردو', full: 'اردو', dir: 'rtl' },
  { id: 'sd', short: 'سنڌي', full: 'سنڌي', dir: 'rtl' },
];

export function LanguageSwitcher({
  variant = 'light',
  compact = false,
  className = '',
}: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();

  const wrapperStyles = {
    navbar:
      'inline-flex items-center gap-0.5 bg-[#02201b] border border-emerald-700/80 rounded-lg p-0.5',
    dark:
      'inline-flex items-center gap-1 bg-[#021f19]/90 border border-amber-300/35 rounded-lg p-1 shadow-sm',
    light:
      'inline-flex items-center gap-1 bg-stone-100 border border-stone-300 rounded-lg p-1 shadow-xs',
    floating:
      'flex items-center justify-between gap-1 bg-[#021914] border border-emerald-800/90 rounded-xl p-1',
  }[variant];

  const iconColor =
    variant === 'light' ? 'text-[#064b36]' : 'text-amber-300';

  const getButtonClass = (isActive: boolean) => {
    if (variant === 'light') {
      return isActive
        ? 'bg-[#064b36] text-white shadow-xs'
        : 'text-stone-700 hover:bg-stone-200/80 hover:text-[#064b36]';
    }
    return isActive
      ? 'bg-amber-400 text-emerald-950 shadow-xs'
      : 'text-stone-200 hover:text-amber-200 hover:bg-emerald-900/50';
  };

  return (
    <div
      role="group"
      dir="ltr"
      aria-label={t.topBar.languageLabel}
      className={`${wrapperStyles} ${className}`}
    >
      <Globe
        className={`w-3.5 h-3.5 shrink-0 ${compact ? 'mx-1 hidden sm:inline' : 'mx-1.5'} ${iconColor}`}
        aria-hidden="true"
      />
      {LANG_OPTIONS.map((opt) => {
        const isActive = language === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            lang={opt.id}
            dir={opt.dir}
            onClick={() => setLanguage(opt.id)}
            aria-pressed={isActive}
            className={`${
              compact
                ? 'px-2 py-0.5 text-[11px]'
                : 'px-2.5 py-1 text-xs'
            } ${variant === 'floating' ? 'flex-1 text-center' : ''} rounded-md font-bold transition-colors whitespace-nowrap cursor-pointer ${getButtonClass(
              isActive
            )}`}
          >
            {compact ? opt.short : opt.full}
          </button>
        );
      })}
    </div>
  );
}
