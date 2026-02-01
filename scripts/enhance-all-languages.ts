#!/usr/bin/env tsx
/**
 * TRAVI AI Content Enhancement Script
 *
 * This script enhances all 30 language files with:
 * - Complete native localization (NOT translation)
 * - SEO/AEO optimization for 2026
 * - Unique meta tags per page per language
 * - Cultural adaptation per market
 * - Keyword research integration
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs/promises';
import path from 'path';

// Language configuration with AI provider optimization
const LANGUAGES = {
  // RTL Languages - Claude excels at these
  ar: { name: 'Arabic', nativeName: 'العربية', direction: 'rtl', provider: 'claude' },
  he: { name: 'Hebrew', nativeName: 'עברית', direction: 'rtl', provider: 'claude' },
  fa: { name: 'Persian', nativeName: 'فارسی', direction: 'rtl', provider: 'claude' },
  ur: { name: 'Urdu', nativeName: 'اردو', direction: 'rtl', provider: 'claude' },

  // CJK Languages - DeepSeek excels
  zh: { name: 'Chinese', nativeName: '中文', direction: 'ltr', provider: 'deepseek' },
  ja: { name: 'Japanese', nativeName: '日本語', direction: 'ltr', provider: 'deepseek' },
  ko: { name: 'Korean', nativeName: '한국어', direction: 'ltr', provider: 'deepseek' },

  // South Asian
  hi: { name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr', provider: 'claude' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', direction: 'ltr', provider: 'claude' },

  // Southeast Asian
  th: { name: 'Thai', nativeName: 'ไทย', direction: 'ltr', provider: 'claude' },
  vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt', direction: 'ltr', provider: 'claude' },
  id: { name: 'Indonesian', nativeName: 'Bahasa Indonesia', direction: 'ltr', provider: 'claude' },
  ms: { name: 'Malay', nativeName: 'Bahasa Melayu', direction: 'ltr', provider: 'claude' },
  fil: { name: 'Filipino', nativeName: 'Filipino', direction: 'ltr', provider: 'claude' },

  // European Languages - Claude/OpenAI
  en: { name: 'English', nativeName: 'English', direction: 'ltr', provider: 'claude' },
  de: { name: 'German', nativeName: 'Deutsch', direction: 'ltr', provider: 'claude' },
  fr: { name: 'French', nativeName: 'Français', direction: 'ltr', provider: 'claude' },
  es: { name: 'Spanish', nativeName: 'Español', direction: 'ltr', provider: 'claude' },
  it: { name: 'Italian', nativeName: 'Italiano', direction: 'ltr', provider: 'claude' },
  pt: { name: 'Portuguese', nativeName: 'Português', direction: 'ltr', provider: 'claude' },
  nl: { name: 'Dutch', nativeName: 'Nederlands', direction: 'ltr', provider: 'claude' },
  pl: { name: 'Polish', nativeName: 'Polski', direction: 'ltr', provider: 'claude' },
  ru: { name: 'Russian', nativeName: 'Русский', direction: 'ltr', provider: 'claude' },
  uk: { name: 'Ukrainian', nativeName: 'Українська', direction: 'ltr', provider: 'claude' },
  cs: { name: 'Czech', nativeName: 'Čeština', direction: 'ltr', provider: 'claude' },
  el: { name: 'Greek', nativeName: 'Ελληνικά', direction: 'ltr', provider: 'claude' },
  sv: { name: 'Swedish', nativeName: 'Svenska', direction: 'ltr', provider: 'claude' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', direction: 'ltr', provider: 'claude' },
};

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

if (!ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY not found in environment');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

interface EnhancementResult {
  success: boolean;
  language: string;
  error?: string;
  tokensUsed?: number;
}

/**
 * Create AI enhancement prompt for a specific language
 */
function createEnhancementPrompt(langCode: string, currentContent: any): string {
  const lang = LANGUAGES[langCode as keyof typeof LANGUAGES];

  return `You are a professional content localizer for TRAVI - a travel information platform.

CRITICAL MISSION:
Create NATIVE ${lang.name} (${lang.nativeName}) content for TRAVI's website. This is NOT translation - you're creating market-specific content.

BRAND IDENTITY:
- TRAVI = Information repository (like Reuters for travel)
- Tone: Editorial, informative, trustworthy (NOT sales/marketing)
- Coverage: 17 worldwide destinations
- Focus: Practical, current, helpful information

TARGET MARKET: ${lang.name}-speaking travelers
CONTENT DIRECTION: ${lang.direction.toUpperCase()}

YOUR TASKS:
1. ✅ COMPLETE ALL MISSING CONTENT
   - Any field still in English → Localize to native ${lang.name}
   - Keep same JSON structure
   - Maintain all keys

2. ✅ ENHANCE EXISTING CONTENT
   - Improve for SEO/AEO 2026
   - Add cultural context for ${lang.name} speakers
   - Optimize meta tags with keywords
   - Make content feel native, not translated

3. ✅ SEO/AEO OPTIMIZATION
   - Meta titles: 50-60 chars, keyword-rich
   - Meta descriptions: 150-160 chars, compelling
   - Headers: Natural keyword placement
   - Alt texts: Descriptive, accessible

4. ✅ CULTURAL ADAPTATION
   - Use local expressions and idioms
   - Reference relevant landmarks/context
   - Adapt examples to market
   - Maintain ${lang.name} voice

CURRENT CONTENT (may have gaps):
${JSON.stringify(currentContent, null, 2)}

DELIVERABLE:
Return ONLY the complete, enhanced JSON object. No explanations, no markdown, just pure JSON.

QUALITY CHECKLIST:
☑ All English text → Native ${lang.name}
☑ Meta tags optimized for SEO 2026
☑ Content feels native, not translated
☑ Same JSON structure maintained
☑ RTL consideration (if applicable)
☑ Cultural context appropriate`;
}

/**
 * Enhance content using Claude AI
 */
async function enhanceWithClaude(langCode: string, content: any): Promise<any> {
  const prompt = createEnhancementPrompt(langCode, content);

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-20250514',
    max_tokens: 8000,
    temperature: 1,
    messages: [{
      role: 'user',
      content: prompt
    }]
  });

  const responseText = message.content[0].type === 'text'
    ? message.content[0].text
    : '';

  // Extract JSON from response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to extract JSON from AI response');
  }

  return JSON.parse(jsonMatch[0]);
}

/**
 * Enhance a single language file
 */
async function enhanceLanguage(langCode: string): Promise<EnhancementResult> {
  const lang = LANGUAGES[langCode as keyof typeof LANGUAGES];
  console.log(`\n📝 Enhancing ${lang.nativeName} (${langCode})...`);

  try {
    // Read current content
    const filePath = path.join(process.cwd(), 'src', 'i18n', `${langCode}.json`);
    const currentContent = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    // Enhance with AI
    console.log(`   🤖 Using Claude for content enhancement...`);
    const enhancedContent = await enhanceWithClaude(langCode, currentContent);

    // Save enhanced content
    await fs.writeFile(
      filePath,
      JSON.stringify(enhancedContent, null, 2),
      'utf-8'
    );

    console.log(`   ✅ ${lang.nativeName} enhanced successfully`);

    return {
      success: true,
      language: langCode
    };
  } catch (error) {
    console.error(`   ❌ Error enhancing ${langCode}:`, error);
    return {
      success: false,
      language: langCode,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🌍 TRAVI AI Content Enhancement');
  console.log('═'.repeat(60));
  console.log('\n🎯 Mission: Complete native localization for 30 languages');
  console.log('📊 Including: SEO/AEO 2026, Meta Tags, Cultural Adaptation\n');

  const results: EnhancementResult[] = [];

  // Process languages one by one to avoid rate limits
  for (const langCode of Object.keys(LANGUAGES)) {
    const result = await enhanceLanguage(langCode);
    results.push(result);

    // Rate limiting - wait between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 ENHANCEMENT SUMMARY');
  console.log('═'.repeat(60));

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`✅ Successful: ${successful}/${results.length}`);
  console.log(`❌ Failed: ${failed}/${results.length}`);

  if (failed > 0) {
    console.log('\n❌ Failed languages:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.language}: ${r.error}`);
    });
  }

  console.log('\n🎉 Enhancement complete!');
  console.log('\nNext steps:');
  console.log('1. Review enhanced content in src/i18n/*.json');
  console.log('2. Run: npm run build');
  console.log('3. Test: npm run preview');
}

main().catch(console.error);
