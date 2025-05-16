import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import enTranslations from './locales/en.json';
import etTranslations from './locales/et.json';


i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslations },
            et: { translation: etTranslations },
        },
        defaultNS: 'translation',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
    });

export default i18n; 