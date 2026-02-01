// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import astroI18next from 'astro-i18next';

// https://astro.build/config
export default defineConfig({
  site: 'https://travi.world',
  integrations: [
    react(),
    astroI18next(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          ar: 'ar',
          bn: 'bn',
          cs: 'cs',
          da: 'da',
          de: 'de',
          el: 'el',
          en: 'en',
          es: 'es',
          fa: 'fa',
          fil: 'fil',
          fr: 'fr',
          he: 'he',
          hi: 'hi',
          id: 'id',
          it: 'it',
          ja: 'ja',
          ko: 'ko',
          ms: 'ms',
          nl: 'nl',
          no: 'no',
          pl: 'pl',
          pt: 'pt',
          ru: 'ru',
          sv: 'sv',
          th: 'th',
          tr: 'tr',
          uk: 'uk',
          ur: 'ur',
          vi: 'vi',
          zh: 'zh',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['ar', 'bn', 'cs', 'da', 'de', 'el', 'en', 'es', 'fa', 'fil', 'fr', 'he', 'hi', 'id', 'it', 'ja', 'ko', 'ms', 'nl', 'no', 'pl', 'pt', 'ru', 'sv', 'th', 'tr', 'uk', 'ur', 'vi', 'zh'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  server: {
    port: 4321,
  },
});
