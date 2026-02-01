export const languages = {
  ar: 'العربية',
  bn: 'বাংলা',
  cs: 'Čeština',
  da: 'Dansk',
  de: 'Deutsch',
  el: 'Ελληνικά',
  en: 'English',
  es: 'Español',
  fa: 'فارسی',
  fil: 'Filipino',
  fr: 'Français',
  he: 'עברית',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  ms: 'Bahasa Melayu',
  nl: 'Nederlands',
  no: 'Norsk',
  pl: 'Polski',
  pt: 'Português',
  ru: 'Русский',
  sv: 'Svenska',
  th: 'ไทย',
  tr: 'Türkçe',
  uk: 'Українська',
  ur: 'اردو',
  vi: 'Tiếng Việt',
  zh: '中文',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

export const rtlLanguages: Language[] = ['ar', 'he', 'fa', 'ur'];

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.attractions': 'Attractions',
    'nav.about': 'About',
    'nav.contact': 'Contact',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.attractions': 'المعالم',
    'nav.about': 'عن',
    'nav.contact': 'اتصل',
  },
  bn: {
    'nav.home': 'হোম',
    'nav.attractions': 'আকর্ষণ',
    'nav.about': 'সম্পর্কে',
    'nav.contact': 'যোগাযোগ',
  },
  cs: {
    'nav.home': 'Domů',
    'nav.attractions': 'Atrakce',
    'nav.about': 'O nás',
    'nav.contact': 'Kontakt',
  },
  da: {
    'nav.home': 'Hjem',
    'nav.attractions': 'Attraktioner',
    'nav.about': 'Om',
    'nav.contact': 'Kontakt',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.attractions': 'Attraktionen',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
  },
  el: {
    'nav.home': 'Αρχική',
    'nav.attractions': 'Αξιοθέατα',
    'nav.about': 'Σχετικά',
    'nav.contact': 'Επικοινωνία',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.attractions': 'Atracciones',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
  },
  fa: {
    'nav.home': 'خانه',
    'nav.attractions': 'جاذبه‌ها',
    'nav.about': 'درباره',
    'nav.contact': 'تماس',
  },
  fil: {
    'nav.home': 'Home',
    'nav.attractions': 'Mga Atraksyon',
    'nav.about': 'Tungkol',
    'nav.contact': 'Makipag-ugnayan',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.attractions': 'Attractions',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
  },
  he: {
    'nav.home': 'בית',
    'nav.attractions': 'אטרקציות',
    'nav.about': 'אודות',
    'nav.contact': 'צור קשר',
  },
  hi: {
    'nav.home': 'होम',
    'nav.attractions': 'आकर्षण',
    'nav.about': 'के बारे में',
    'nav.contact': 'संपर्क करें',
  },
  id: {
    'nav.home': 'Beranda',
    'nav.attractions': 'Atraksi',
    'nav.about': 'Tentang',
    'nav.contact': 'Kontak',
  },
  it: {
    'nav.home': 'Home',
    'nav.attractions': 'Attrazioni',
    'nav.about': 'Chi siamo',
    'nav.contact': 'Contatti',
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.attractions': 'アトラクション',
    'nav.about': '概要',
    'nav.contact': 'お問い合わせ',
  },
  ko: {
    'nav.home': '홈',
    'nav.attractions': '관광명소',
    'nav.about': '소개',
    'nav.contact': '문의',
  },
  ms: {
    'nav.home': 'Utama',
    'nav.attractions': 'Tarikan',
    'nav.about': 'Tentang',
    'nav.contact': 'Hubungi',
  },
  nl: {
    'nav.home': 'Home',
    'nav.attractions': 'Attracties',
    'nav.about': 'Over ons',
    'nav.contact': 'Contact',
  },
  no: {
    'nav.home': 'Hjem',
    'nav.attractions': 'Attraksjoner',
    'nav.about': 'Om',
    'nav.contact': 'Kontakt',
  },
  pl: {
    'nav.home': 'Strona główna',
    'nav.attractions': 'Atrakcje',
    'nav.about': 'O nas',
    'nav.contact': 'Kontakt',
  },
  pt: {
    'nav.home': 'Início',
    'nav.attractions': 'Atrações',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
  },
  ru: {
    'nav.home': 'Главная',
    'nav.attractions': 'Достопримечательности',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
  },
  sv: {
    'nav.home': 'Hem',
    'nav.attractions': 'Attraktioner',
    'nav.about': 'Om oss',
    'nav.contact': 'Kontakt',
  },
  th: {
    'nav.home': 'หน้าแรก',
    'nav.attractions': 'สถานที่ท่องเที่ยว',
    'nav.about': 'เกี่ยวกับ',
    'nav.contact': 'ติดต่อ',
  },
  tr: {
    'nav.home': 'Ana Sayfa',
    'nav.attractions': 'Cazibe Merkezleri',
    'nav.about': 'Hakkında',
    'nav.contact': 'İletişim',
  },
  uk: {
    'nav.home': 'Головна',
    'nav.attractions': 'Визначні місця',
    'nav.about': 'Про нас',
    'nav.contact': 'Контакти',
  },
  ur: {
    'nav.home': 'ہوم',
    'nav.attractions': 'پرکشش مقامات',
    'nav.about': 'کے بارے میں',
    'nav.contact': 'رابطہ کریں',
  },
  vi: {
    'nav.home': 'Trang chủ',
    'nav.attractions': 'Điểm tham quan',
    'nav.about': 'Giới thiệu',
    'nav.contact': 'Liên hệ',
  },
  zh: {
    'nav.home': '首页',
    'nav.attractions': '景点',
    'nav.about': '关于',
    'nav.contact': '联系',
  },
} as const;

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function isRTL(lang: Language): boolean {
  return rtlLanguages.includes(lang);
}
