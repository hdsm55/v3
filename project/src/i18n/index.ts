import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';
import trTranslation from './locales/tr.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ar: {
        translation: arTranslation
      },
      tr: {
        translation: trTranslation
      }
    },
    fallbackLng: 'ar',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Add dir function for RTL support
i18n.dir = (lng?: string) => {
  const language = lng || i18n.language;
  return language === 'ar' || language === 'tr' ? 'rtl' : 'ltr';
};

// Set document direction on language change
i18n.on('languageChanged', (lng) => {
  document.dir = i18n.dir(lng);
  document.documentElement.lang = lng;
});

// Set initial direction
document.dir = i18n.dir();
document.documentElement.lang = i18n.language;

export default i18n;