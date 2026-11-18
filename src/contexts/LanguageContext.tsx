import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  PORTAL_TRANSLATIONS,
  PortalLanguage,
  PortalTranslations,
} from '../data/translations';

interface LanguageContextValue {
  language: PortalLanguage;
  setLanguage: (lang: PortalLanguage) => void;
  isRTL: boolean;
  dir: 'ltr' | 'rtl';
  t: PortalTranslations;
}

const STORAGE_KEY = 'ggzc_portal_lang';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLanguage(): PortalLanguage {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'ur' || saved === 'sd') {
      return saved;
    }
  } catch {
    // Ignore storage read errors in restricted iframe contexts
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<PortalLanguage>(getInitialLanguage);

  const setLanguage = (next: PortalLanguage) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage write errors
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const isRTL = language === 'ur' || language === 'sd';
  const dir: 'ltr' | 'rtl' = isRTL ? 'rtl' : 'ltr';
  const t = PORTAL_TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
