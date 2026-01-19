import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'; // Imports the loader
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // Loads translations from /public/locales
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false, // Set to true to see loading errors in console
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/common.json', 
    }
  });

export default i18n;