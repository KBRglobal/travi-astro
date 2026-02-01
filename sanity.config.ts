import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { documentInternationalization } from '@sanity/document-internationalization';

// Import schemas
import { schemaTypes } from './sanity/schemas';

// Supported languages for content
export const supportedLanguages = [
  { id: 'ar', title: 'العربية', isDefault: false },
  { id: 'bn', title: 'বাংলা', isDefault: false },
  { id: 'cs', title: 'Čeština', isDefault: false },
  { id: 'da', title: 'Dansk', isDefault: false },
  { id: 'de', title: 'Deutsch', isDefault: false },
  { id: 'el', title: 'Ελληνικά', isDefault: false },
  { id: 'en', title: 'English', isDefault: true },
  { id: 'es', title: 'Español', isDefault: false },
  { id: 'fa', title: 'فارسی', isDefault: false },
  { id: 'fil', title: 'Filipino', isDefault: false },
  { id: 'fr', title: 'Français', isDefault: false },
  { id: 'he', title: 'עברית', isDefault: false },
  { id: 'hi', title: 'हिन्दी', isDefault: false },
  { id: 'id', title: 'Bahasa Indonesia', isDefault: false },
  { id: 'it', title: 'Italiano', isDefault: false },
  { id: 'ja', title: '日本語', isDefault: false },
  { id: 'ko', title: '한국어', isDefault: false },
  { id: 'ms', title: 'Bahasa Melayu', isDefault: false },
  { id: 'nl', title: 'Nederlands', isDefault: false },
  { id: 'no', title: 'Norsk', isDefault: false },
  { id: 'pl', title: 'Polski', isDefault: false },
  { id: 'pt', title: 'Português', isDefault: false },
  { id: 'ru', title: 'Русский', isDefault: false },
  { id: 'sv', title: 'Svenska', isDefault: false },
  { id: 'th', title: 'ไทย', isDefault: false },
  { id: 'tr', title: 'Türkçe', isDefault: false },
  { id: 'uk', title: 'Українська', isDefault: false },
  { id: 'ur', title: 'اردو', isDefault: false },
  { id: 'vi', title: 'Tiếng Việt', isDefault: false },
  { id: 'zh', title: '中文', isDefault: false },
];

// NOTE: You'll need to create a Sanity project first
// Run: npm create sanity@latest -- --project <your-project-id> --dataset production
// Or create one at https://www.sanity.io/manage

export default defineConfig({
  name: 'travi-world',
  title: 'TRAVI World CMS',

  // TODO: Replace with your actual project ID
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(),
    // Media library for managing images
    media(),
    // Document internationalization
    documentInternationalization({
      supportedLanguages,
      schemaTypes: ['attraction', 'destination', 'hotel', 'restaurant', 'article'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
