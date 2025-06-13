import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Initialize i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

// Add dir function for RTL support
i18n.dir = (lng?: string) => {
  const language = lng || i18n.language;
  return language === 'ar' ? 'rtl' : 'ltr';
};

// Set document direction on language change
i18n.on('languageChanged', (lng) => {
  document.dir = i18n.dir(lng);
  document.documentElement.lang = lng;
  document.documentElement.classList.remove('ar', 'en');
  document.documentElement.classList.add(lng);
});

// Set initial direction
document.dir = i18n.dir();
document.documentElement.lang = i18n.language;
document.documentElement.classList.add(i18n.language);

export default i18n;