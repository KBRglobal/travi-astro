/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: "en",
  locales: [
    "ar", // Arabic
    "bn", // Bengali
    "cs", // Czech
    "da", // Danish
    "de", // German
    "el", // Greek
    "en", // English
    "es", // Spanish
    "fa", // Farsi
    "fil", // Filipino
    "fr", // French
    "he", // Hebrew
    "hi", // Hindi
    "id", // Indonesian
    "it", // Italian
    "ja", // Japanese
    "ko", // Korean
    "ms", // Malay
    "nl", // Dutch
    "no", // Norwegian
    "pl", // Polish
    "pt", // Portuguese
    "ru", // Russian
    "sv", // Swedish
    "th", // Thai
    "tr", // Turkish
    "uk", // Ukrainian
    "ur", // Urdu
    "vi", // Vietnamese
    "zh", // Chinese
  ],
  routes: {
    // Custom routes per language (optional)
    he: {
      about: "אודות",
      contact: "צור-קשר",
      attractions: "אטרקציות",
      privacy: "פרטיות",
      terms: "תנאים",
    },
    ar: {
      about: "عن",
      contact: "اتصل",
      attractions: "المعالم",
      privacy: "الخصوصية",
      terms: "الشروط",
    },
  },
  showDefaultLocale: true,
  i18nextServer: {
    debug: false,
    backend: {
      loadPath: "./src/i18n/{{lng}}.json",
    },
    fallbackLng: "en",
    load: "currentOnly",
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  },
  i18nextClient: {
    debug: false,
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
    fallbackLng: "en",
    load: "currentOnly",
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  },
};
