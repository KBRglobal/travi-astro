import type { Language } from './i18n';

// Import all language files
import ar from '../i18n/ar.json';
import bn from '../i18n/bn.json';
import cs from '../i18n/cs.json';
import de from '../i18n/de.json';
import el from '../i18n/el.json';
import en from '../i18n/en.json';
import es from '../i18n/es.json';
import fa from '../i18n/fa.json';
import fil from '../i18n/fil.json';
import fr from '../i18n/fr.json';
import he from '../i18n/he.json';
import hi from '../i18n/hi.json';
import id from '../i18n/id.json';
import it from '../i18n/it.json';
import ja from '../i18n/ja.json';
import ko from '../i18n/ko.json';
import ms from '../i18n/ms.json';
import nl from '../i18n/nl.json';
import pl from '../i18n/pl.json';
import pt from '../i18n/pt.json';
import ru from '../i18n/ru.json';
import sv from '../i18n/sv.json';
import th from '../i18n/th.json';
import tr from '../i18n/tr.json';
import uk from '../i18n/uk.json';
import ur from '../i18n/ur.json';
import vi from '../i18n/vi.json';
import zh from '../i18n/zh.json';

export const translations: Record<Language, any> = {
  ar,
  bn,
  cs,
  da: en, // Danish not available - fallback to English
  de,
  el,
  en,
  es,
  fa,
  fil,
  fr,
  he,
  hi,
  id,
  it,
  ja,
  ko,
  ms,
  nl,
  no: en, // Norwegian not available - fallback to English
  pl,
  pt,
  ru,
  sv,
  th,
  tr,
  uk,
  ur,
  vi,
  zh,
};

/**
 * Get translations for a specific language
 */
export function getTranslations(lang: Language) {
  return translations[lang] || translations.en;
}

/**
 * Get a specific translation by path
 * Example: t('home.hero.title', 'en')
 */
export function t(path: string, lang: Language): string {
  const keys = path.split('.');
  let value: any = getTranslations(lang);

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      // Fallback to English
      value = translations.en;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return path; // In worst case, return the path
        }
      }
      return value || path;
    }
  }

  return typeof value === 'string' ? value : path;
}
