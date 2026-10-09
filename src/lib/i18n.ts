import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import { ar } from "@/locales/ar"
import { en } from "@/locales/en"

const resources = {
  en: { translation: en },
  ar: { translation: ar },
} as const

function syncDocumentLanguage(language: string) {
  const resolvedLanguage = language.startsWith("ar") ? "ar" : "en"

  document.documentElement.lang = resolvedLanguage
  document.documentElement.dir = resolvedLanguage === "ar" ? "rtl" : "ltr"
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  })

syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language)
i18n.on("languageChanged", syncDocumentLanguage)

export default i18n
