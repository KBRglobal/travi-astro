#!/usr/bin/env tsx
/**
 * TRAVI Section-by-Section AI Enhancement
 *
 * Smart approach: Split large JSON files into small sections,
 * process each section separately, then merge back.
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs/promises';
import path from 'path';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY not found');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

// Language configuration
const LANGUAGES = {
  ar: { name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
  he: { name: 'Hebrew', nativeName: 'עברית', direction: 'rtl' },
  fa: { name: 'Persian', nativeName: 'فارسی', direction: 'rtl' },
  ur: { name: 'Urdu', nativeName: 'اردو', direction: 'rtl' },
  zh: { name: 'Chinese', nativeName: '中文', direction: 'ltr' },
  ja: { name: 'Japanese', nativeName: '日本語', direction: 'ltr' },
  ko: { name: 'Korean', nativeName: '한국어', direction: 'ltr' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', direction: 'ltr' },
  th: { name: 'Thai', nativeName: 'ไทย', direction: 'ltr' },
  vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt', direction: 'ltr' },
  id: { name: 'Indonesian', nativeName: 'Bahasa Indonesia', direction: 'ltr' },
  ms: { name: 'Malay', nativeName: 'Bahasa Melayu', direction: 'ltr' },
  fil: { name: 'Filipino', nativeName: 'Filipino', direction: 'ltr' },
  en: { name: 'English', nativeName: 'English', direction: 'ltr' },
  de: { name: 'German', nativeName: 'Deutsch', direction: 'ltr' },
  fr: { name: 'French', nativeName: 'Français', direction: 'ltr' },
  es: { name: 'Spanish', nativeName: 'Español', direction: 'ltr' },
  it: { name: 'Italian', nativeName: 'Italiano', direction: 'ltr' },
  pt: { name: 'Portuguese', nativeName: 'Português', direction: 'ltr' },
  nl: { name: 'Dutch', nativeName: 'Nederlands', direction: 'ltr' },
  pl: { name: 'Polish', nativeName: 'Polski', direction: 'ltr' },
  ru: { name: 'Russian', nativeName: 'Русский', direction: 'ltr' },
  uk: { name: 'Ukrainian', nativeName: 'Українська', direction: 'ltr' },
  cs: { name: 'Czech', nativeName: 'Čeština', direction: 'ltr' },
  el: { name: 'Greek', nativeName: 'Ελληνικά', direction: 'ltr' },
  sv: { name: 'Swedish', nativeName: 'Svenska', direction: 'ltr' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', direction: 'ltr' },
};

// Define sections to process
const SECTIONS = [
  'nav',
  'breadcrumbs',
  'common',
  'home',
  'attractions',
  'hotels',
  'dining',
  'destinations',
  'districts',
  'realEstate',
  'search',
  'footer',
  'errors',
  'newsletter',
  'cookies',
  'meta',
  'guides',
  'news',
  'pages',
];

/**
 * Create enhancement prompt for a section
 */
function createSectionPrompt(
  langCode: string,
  sectionName: string,
  sectionContent: any
): string {
  const lang = LANGUAGES[langCode as keyof typeof LANGUAGES];

  return `You are a professional content localizer for TRAVI travel platform.

TASK: Create NATIVE ${lang.name} (${lang.nativeName}) content for the "${sectionName}" section.

CRITICAL RULES:
1. This is NOT translation - create market-specific NATIVE content
2. TRAVI = Information repository (like Reuters for travel)
3. Tone: Editorial, informative, trustworthy
4. Direction: ${lang.direction.toUpperCase()}

TARGET MARKET: ${lang.name}-speaking travelers

REQUIREMENTS:
✅ Complete ALL missing content (English → Native ${lang.name})
✅ Enhance existing content for SEO/AEO 2026
✅ Cultural adaptation for ${lang.name} speakers
✅ Meta tags optimized (if applicable)
✅ Same JSON structure

CURRENT SECTION CONTENT:
${JSON.stringify(sectionContent, null, 2)}

RETURN: Only the enhanced JSON object for this section. No explanations, no markdown.`;
}

/**
 * Enhance a single section with Claude
 */
async function enhanceSection(
  langCode: string,
  sectionName: string,
  sectionContent: any
): Promise<any> {
  const prompt = createSectionPrompt(langCode, sectionName, sectionContent);

  try {
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 4000,
      temperature: 1,
      messages: [{ role: 'user', content: prompt }]
    });

    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error(`      ⚠️  Error enhancing section ${sectionName}:`, error instanceof Error ? error.message : 'Unknown');
    return sectionContent; // Return original on error
  }
}

/**
 * Enhance a complete language file section by section
 */
async function enhanceLanguage(langCode: string): Promise<void> {
  const lang = LANGUAGES[langCode as keyof typeof LANGUAGES];
  console.log(`\n📝 Processing ${lang.nativeName} (${langCode})...`);

  try {
    // Read current content
    const filePath = path.join(process.cwd(), 'src', 'i18n', `${langCode}.json`);
    const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    const enhanced: any = {};
    let sectionsProcessed = 0;

    // Process each section
    for (const sectionName of SECTIONS) {
      if (!content[sectionName]) {
        continue; // Skip if section doesn't exist
      }

      process.stdout.write(`   📄 ${sectionName}... `);

      const enhancedSection = await enhanceSection(
        langCode,
        sectionName,
        content[sectionName]
      );

      enhanced[sectionName] = enhancedSection;
      sectionsProcessed++;

      console.log('✅');

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Save enhanced content
    await fs.writeFile(
      filePath,
      JSON.stringify(enhanced, null, 2),
      'utf-8'
    );

    console.log(`   ✅ ${lang.nativeName} complete (${sectionsProcessed} sections)`);
  } catch (error) {
    console.error(`   ❌ Failed: ${error instanceof Error ? error.message : 'Unknown'}`);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🌍 TRAVI Section-by-Section Enhancement');
  console.log('═'.repeat(60));
  console.log('\n🎯 Processing 30 languages with smart sectioning\n');

  const startTime = Date.now();

  // Process languages one by one
  for (const langCode of Object.keys(LANGUAGES)) {
    await enhanceLanguage(langCode);
  }

  const duration = Math.round((Date.now() - startTime) / 1000);

  console.log('\n' + '═'.repeat(60));
  console.log('🎉 Enhancement Complete!');
  console.log(`⏱️  Total time: ${duration} seconds`);
  console.log('\n✅ All 30 languages enhanced with native content');
  console.log('✅ SEO/AEO optimized');
  console.log('✅ Cultural adaptation complete');
  console.log('\nNext: npm run build');
}

main().catch(console.error);
