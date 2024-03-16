import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { TRANSLATION_EN_US, TRANSLATION_ES_ES } from "./locales";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources: {
    en: {
      translations: TRANSLATION_EN_US,
    },
    es: {
      translations: TRANSLATION_ES_ES,
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["en", "es"];

export default i18n;
