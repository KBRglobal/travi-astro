/**
 * TRAVI Translation Generator for Astro
 *
 * משתמש ב-AI Translation Service מהפרויקט המקורי
 * ליצירת תוכן נייטיב לכל 30 השפות
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import from the original project's AI translation service
// We'll use their proven, production-ready system
const ORIGINAL_PROJECT_PATH = '/Users/admin/github-repos/travi-final-website';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  family: 'cjk' | 'rtl' | 'european' | 'slavic' | 'south-asian' | 'southeast-asian';
  preferredProvider: 'deepseek' | 'claude' | 'openai' | 'gemini';
}

const LANGUAGES: Record<string, Language> = {
  // CJK Languages - Best with DeepSeek (native Chinese AI)
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文', direction: 'ltr', family: 'cjk', preferredProvider: 'deepseek' },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', direction: 'ltr', family: 'cjk', preferredProvider: 'deepseek' },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어', direction: 'ltr', family: 'cjk', preferredProvider: 'deepseek' },

  // RTL Languages - Best with Claude
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl', family: 'rtl', preferredProvider: 'claude' },
  he: { code: 'he', name: 'Hebrew', nativeName: 'עברית', direction: 'rtl', family: 'rtl', preferredProvider: 'claude' },
  fa: { code: 'fa', name: 'Persian', nativeName: 'فارسی', direction: 'rtl', family: 'rtl', preferredProvider: 'claude' },
  ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl', family: 'rtl', preferredProvider: 'claude' },

  // European Languages - Best with OpenAI/Gemini
  de: { code: 'de', name: 'German', nativeName: 'Deutsch', direction: 'ltr', family: 'european', preferredProvider: 'openai' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr', family: 'european', preferredProvider: 'openai' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr', family: 'european', preferredProvider: 'openai' },
  it: { code: 'it', name: 'Italian', nativeName: 'Italiano', direction: 'ltr', family: 'european', preferredProvider: 'openai' },
  pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', direction: 'ltr', family: 'european', preferredProvider: 'openai' },
  nl: { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', direction: 'ltr', family: 'european', preferredProvider: 'openai' },
  sv: { code: 'sv', name: 'Swedish', nativeName: 'Svenska', direction: 'ltr', family: 'european', preferredProvider: 'openai' },
  da: { code: 'da', name: 'Danish', nativeName: 'Dansk', direction: 'ltr', family: 'european', preferredProvider: 'openai' },
  no: { code: 'no', name: 'Norwegian', nativeName: 'Norsk', direction: 'ltr', family: 'european', preferredProvider: 'openai' },
  el: { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', direction: 'ltr', family: 'european', preferredProvider: 'openai' },
  cs: { code: 'cs', name: 'Czech', nativeName: 'Čeština', direction: 'ltr', family: 'european', preferredProvider: 'openai' },

  // Slavic Languages - Best with Claude
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', direction: 'ltr', family: 'slavic', preferredProvider: 'claude' },
  pl: { code: 'pl', name: 'Polish', nativeName: 'Polski', direction: 'ltr', family: 'slavic', preferredProvider: 'claude' },
  uk: { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', direction: 'ltr', family: 'slavic', preferredProvider: 'claude' },

  // South Asian Languages - Best with OpenAI
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr', family: 'south-asian', preferredProvider: 'openai' },
  bn: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', direction: 'ltr', family: 'south-asian', preferredProvider: 'openai' },

  // Southeast Asian Languages - Best with OpenAI
  th: { code: 'th', name: 'Thai', nativeName: 'ไทย', direction: 'ltr', family: 'southeast-asian', preferredProvider: 'openai' },
  vi: { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', direction: 'ltr', family: 'southeast-asian', preferredProvider: 'openai' },
  id: { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', direction: 'ltr', family: 'southeast-asian', preferredProvider: 'openai' },
  ms: { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', direction: 'ltr', family: 'southeast-asian', preferredProvider: 'openai' },
  fil: { code: 'fil', name: 'Filipino', nativeName: 'Filipino', direction: 'ltr', family: 'southeast-asian', preferredProvider: 'openai' },
  tr: { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', direction: 'ltr', family: 'southeast-asian', preferredProvider: 'openai' },
};

/**
 * Translate using DeepSeek (best for CJK languages)
 */
async function translateWithDeepSeek(text: string, targetLang: Language): Promise<string | null> {
  if (!process.env.DEEPSEEK_API_KEY) return null;

  const culturalNotes: Record<string, string> = {
    zh: '- Highlight shopping opportunities and luxury brands\n- Emphasize photo-worthy spots\n- Include practical info (WeChat Pay, Alipay)\n- Use engaging marketing language',
    ja: '- Use formal/polite register (です・ます調)\n- Emphasize cleanliness, safety, efficiency\n- Include precise timing information\n- Mention Japanese-friendly services',
    ko: '- Use formal polite speech (존댓말/합니다체)\n- Emphasize trendy spots and Instagram-worthy locations\n- Highlight K-beauty and shopping\n- Appeal to family travel',
  };

  const prompt = `You are an expert tourism content translator specializing in travel content for ${targetLang.name} speakers.

CRITICAL RULES:
1. Create NATIVE content using LOCAL expressions that ${targetLang.name} tourists actually use
2. Keep proper nouns: "Burj Khalifa", "Dubai Mall", "Paris", "Tokyo", etc.
3. Preserve formatting exactly
4. Use culturally appropriate tone for ${targetLang.name} audience
5. TRAVI is an information repository (like Reuters for travel), NOT selling tickets

CULTURAL ADAPTATIONS FOR ${targetLang.name.toUpperCase()}:
${culturalNotes[targetLang.code] || '- Adapt to local reading habits and preferences'}

Text to translate:
${text}

Return ONLY the ${targetLang.name} text, no explanations.`;

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        max_tokens: 2048,
        temperature: 0.3,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.choices[0]?.message?.content?.trim();
    }
  } catch (error) {
    console.error(`DeepSeek error for ${targetLang.code}:`, error);
  }
  return null;
}

/**
 * Translate using Claude (best for RTL and Slavic languages)
 */
async function translateWithClaude(text: string, targetLang: Language): Promise<string | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;

  const isRTL = targetLang.direction === 'rtl';

  const prompt = `You are a professional travel content localizer for TRAVI.

CRITICAL INSTRUCTIONS:
1. Create NATIVE content for ${targetLang.name} (${targetLang.nativeName}) speakers
2. NOT mechanical translation - adapt to cultural context
3. TRAVI = information repository (like Reuters for travel), NOT ticket sales
4. Tone = editorial/informative, focusing on news and guides
5. Content covers 17 worldwide destinations
${isRTL ? '6. RIGHT-TO-LEFT language - ensure proper text flow' : ''}

Source English:
${text}

Provide ONLY ${targetLang.name} content. No explanations.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.content[0].text.trim();
    }
  } catch (error) {
    console.error(`Claude error for ${targetLang.code}:`, error);
  }
  return null;
}

/**
 * Translate using OpenAI (good for European and Asian languages)
 */
async function translateWithOpenAI(text: string, targetLang: Language): Promise<string | null> {
  if (!process.env.OPENAI_API_KEY) return null;

  const prompt = `You are a professional travel content localizer for TRAVI.

CRITICAL INSTRUCTIONS:
1. Create NATIVE content for ${targetLang.name} (${targetLang.nativeName}) speakers
2. NOT mechanical translation - adapt to cultural context
3. TRAVI = information repository (like Reuters for travel), NOT ticket sales
4. Tone = editorial/informative
5. Content covers 17 worldwide destinations

Source English:
${text}

Provide ONLY ${targetLang.name} content. No explanations.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 2048,
        temperature: 0.3,
        messages: [
          { role: 'system', content: 'You are a professional travel content localizer.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.choices[0].message.content.trim();
    }
  } catch (error) {
    console.error(`OpenAI error for ${targetLang.code}:`, error);
  }
  return null;
}

/**
 * Translate using Gemini (fallback option)
 */
async function translateWithGemini(text: string, targetLang: Language): Promise<string | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  const prompt = `Translate this travel content to native ${targetLang.name} (${targetLang.nativeName}).
Create natural, culturally appropriate content - NOT mechanical translation.
TRAVI is an information repository for travel, focusing on practical guides and news.

${text}

Return ONLY the ${targetLang.name} text.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text?.trim();
    }
  } catch (error) {
    console.error(`Gemini error for ${targetLang.code}:`, error);
  }
  return null;
}

/**
 * Translate using optimal provider for language family
 */
async function translateWithAI(text: string, targetLang: Language): Promise<string> {
  let result: string | null = null;

  // Try preferred provider first
  switch (targetLang.preferredProvider) {
    case 'deepseek':
      result = await translateWithDeepSeek(text, targetLang);
      if (result) return result;
      // Fallback to OpenAI for CJK
      result = await translateWithOpenAI(text, targetLang);
      if (result) return result;
      break;

    case 'claude':
      result = await translateWithClaude(text, targetLang);
      if (result) return result;
      // Fallback to OpenAI
      result = await translateWithOpenAI(text, targetLang);
      if (result) return result;
      break;

    case 'openai':
      result = await translateWithOpenAI(text, targetLang);
      if (result) return result;
      // Fallback to Claude
      result = await translateWithClaude(text, targetLang);
      if (result) return result;
      break;

    case 'gemini':
      result = await translateWithGemini(text, targetLang);
      if (result) return result;
      break;
  }

  // Last resort fallback
  result = await translateWithGemini(text, targetLang);
  if (result) return result;

  console.warn(`⚠️ All providers failed for ${targetLang.code}, using English`);
  return text;
}

/**
 * Translate an object recursively
 */
async function translateObject(
  obj: any,
  targetLang: Language,
  keyPath = ''
): Promise<any> {
  if (typeof obj === 'string') {
    const translated = await translateWithAI(obj, targetLang);
    process.stdout.write('.');
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
    return translated;
  }

  if (Array.isArray(obj)) {
    const results = [];
    for (const item of obj) {
      results.push(await translateObject(item, targetLang, keyPath));
    }
    return results;
  }

  if (typeof obj === 'object' && obj !== null) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKeyPath = keyPath ? `${keyPath}.${key}` : key;
      result[key] = await translateObject(value, targetLang, newKeyPath);
    }
    return result;
  }

  return obj;
}

/**
 * Generate all language files
 */
async function generateTranslations() {
  console.log('🌍 TRAVI Translation Generator');
  console.log('=' .repeat(60));
  console.log('\nUsing AI Translation Service to create native content\n');

  // Read English source
  const enPath = path.join(__dirname, '../src/i18n/en.json');
  const enContent = JSON.parse(await fs.readFile(enPath, 'utf-8'));

  console.log('✅ Loaded English source content\n');

  // Check available API keys
  const availableProviders: string[] = [];
  if (process.env.DEEPSEEK_API_KEY) availableProviders.push('DeepSeek');
  if (process.env.ANTHROPIC_API_KEY) availableProviders.push('Claude');
  if (process.env.OPENAI_API_KEY) availableProviders.push('OpenAI');
  if (process.env.GEMINI_API_KEY) availableProviders.push('Gemini');

  if (availableProviders.length === 0) {
    console.error('❌ Error: No API key found!');
    console.error('Set one of: DEEPSEEK_API_KEY, ANTHROPIC_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY');
    process.exit(1);
  }

  console.log(`📡 Available providers: ${availableProviders.join(', ')}\n`);

  // Show language family distribution
  const familyStats: Record<string, string[]> = {};
  for (const [code, lang] of Object.entries(LANGUAGES)) {
    const key = `${lang.family} (${lang.preferredProvider})`;
    if (!familyStats[key]) familyStats[key] = [];
    familyStats[key].push(code);
  }

  console.log('📊 Language families and optimal providers:');
  for (const [family, codes] of Object.entries(familyStats)) {
    console.log(`   ${family}: ${codes.join(', ')}`);
  }
  console.log('');

  // Generate each language
  for (const [langCode, langInfo] of Object.entries(LANGUAGES)) {
    try {
      console.log(`\n📝 Creating native content for ${langInfo.nativeName} (${langCode})...`);

      const translatedContent = await translateObject(enContent, langInfo);

      const outputPath = path.join(__dirname, `../src/i18n/${langCode}.json`);
      await fs.writeFile(outputPath, JSON.stringify(translatedContent, null, 2), 'utf-8');

      console.log(`\n✅ ${langInfo.nativeName} (${langCode}) complete`);
    } catch (error) {
      console.error(`\n❌ Error processing ${langInfo.nativeName} (${langCode}):`, error);
    }
  }

  console.log('\n\n🎉 Translation generation complete!');
  console.log('\n📦 Updating translations.ts...\n');

  // Update translations.ts
  await updateTranslationsFile();

  console.log('✅ All done! Your site now has native content in 30 languages.');
  console.log('\nNext steps:');
  console.log('1. Review generated translations in src/i18n/');
  console.log('2. Run: npm run build');
  console.log('3. Deploy: 120 pages in 30 languages');
}

/**
 * Update translations.ts with all language imports
 */
async function updateTranslationsFile() {
  const translationsPath = path.join(__dirname, '../src/lib/translations.ts');

  const allLangs = ['en', ...Object.keys(LANGUAGES)];

  const imports = allLangs.map(lang =>
    `import ${lang} from '../i18n/${lang}.json';`
  ).join('\n');

  const translationsObj = allLangs.map(lang =>
    `  ${lang},`
  ).join('\n');

  const content = `import type { Language } from './i18n';

// Native content for all 30 languages
// Generated by scripts/generate-translations.ts
${imports}

export const translations: Record<Language, any> = {
${translationsObj}
};

/**
 * קבלת תרגומים לשפה מסוימת
 */
export function getTranslations(lang: Language) {
  return translations[lang] || translations.en;
}

/**
 * קבלת תרגום ספציפי לפי נתיב
 * לדוגמה: t('home.hero.title', 'en')
 */
export function t(path: string, lang: Language): string {
  const keys = path.split('.');
  let value: any = getTranslations(lang);

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      // fallback לאנגלית
      value = translations.en;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return path; // במקרה הגרוע ביותר החזר את הנתיב
        }
      }
      return value || path;
    }
  }

  return typeof value === 'string' ? value : path;
}
`;

  await fs.writeFile(translationsPath, content, 'utf-8');
  console.log('✅ translations.ts updated with all 30 languages');
}

// Run
generateTranslations().catch(console.error);
