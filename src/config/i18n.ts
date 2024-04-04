import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { LOCALES, STORAGE_KEY } from "@app/constant";
import translationEn from "@app/locales/en.json";
import translationVi from "@app/locales/vi.json";
import { getLocalStorage } from "./storage";

const localeStorage = getLocalStorage(STORAGE_KEY.LOCALES);

const resources = {
  en: { translation: translationEn },
  vi: { translation: translationVi },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: localeStorage ?? LOCALES.EN,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
