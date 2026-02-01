# TRAVI - Astro Migration

Dubai Travel Guide rebuilt with Astro for optimal SEO and performance.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── islands/          # React Islands (interactive components)
│   │   └── ui/               # Static Astro components
│   ├── content/
│   │   ├── attractions/      # Attractions data (JSON/MD)
│   │   └── destinations/     # Destinations content (MD)
│   ├── layouts/
│   │   └── BaseLayout.astro  # Main layout with SEO
│   ├── lib/
│   │   ├── i18n.ts          # Internationalization utilities
│   │   └── utils.ts         # Helper functions
│   ├── pages/
│   │   ├── [lang]/          # Multi-language routes
│   │   │   ├── index.astro              # Homepage
│   │   │   ├── about.astro              # About page
│   │   │   ├── contact.astro            # Contact page
│   │   │   └── attractions/
│   │   │       └── index.astro          # Attractions listing
│   │   └── index.astro      # Root redirect to /en
│   └── styles/
│       └── global.css       # Tailwind CSS global styles
├── astro.config.mjs         # Astro configuration
└── package.json
```

## 🌍 Multi-Language Support

Supported languages:
- English (en) - Default
- Arabic (ar)
- Hebrew (he)
- Hindi (hi)
- Chinese (zh)
- French (fr)
- German (de)
- Spanish (es)
- Japanese (ja)

All pages are available at `/{lang}/{page}` (e.g., `/en/about`, `/ar/about`)

## 🎨 Technology Stack

- **Framework**: Astro 4.0
- **UI Framework**: React 19 (Islands Architecture)
- **Styling**: Tailwind CSS 4.0
- **i18n**: Custom implementation with Astro's built-in support
- **SEO**: Sitemap generation, meta tags, structured data ready

## 📝 Content Collections

Content is managed through Astro's Content Collections:

- `src/content/attractions/` - Attraction data
- `src/content/destinations/` - Destination articles

### Adding Content

1. Create a new file in the appropriate collection folder
2. Follow the schema defined in `src/content/config.ts`
3. Build and deploy

## 🧱 React Islands

Interactive components use React Islands architecture for optimal performance:

- `ContactForm.tsx` - Example interactive form
- Add more interactive components in `src/components/islands/`

Use `client:load`, `client:visible`, or `client:idle` directives:

```astro
<ContactForm client:load lang={lang} />
```

## 🔧 Development

### Adding a New Page

1. Create `.astro` file in `src/pages/[lang]/`
2. Add `getStaticPaths()` for all supported languages
3. Use `BaseLayout` for consistent SEO and structure

### Adding a New Language

1. Update `src/lib/i18n.ts` - add language to `languages` and `ui`
2. Update `astro.config.mjs` - add to `locales` array
3. Build will automatically generate routes for new language

## 🎯 SEO Features

- ✅ Server-side rendering (SSR)
- ✅ Static site generation (SSG)
- ✅ Multi-language sitemaps
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ RTL support (Arabic, Hebrew)
- ✅ Semantic HTML
- ✅ Fast page loads (minimal JS)

## 📦 Scripts

- `npm run dev` - Start dev server on port 4321
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

## 🚀 Deployment

The site can be deployed to any static hosting platform:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

## 📚 Migration Status

### ✅ Phase 1: Astro Base Setup (COMPLETE)
- ✅ Astro project initialized
- ✅ React + Tailwind configured
- ✅ i18n routing (9 languages)
- ✅ Content collections setup
- ✅ Base layout with SEO
- ✅ Sample pages (Home, About, Contact, Attractions)
- ✅ React Island example (ContactForm)
- ✅ Build successful (36 pages generated)

### 🔄 Phase 2-5: Continue Migration
See MIGRATION_GUIDE.md for detailed steps to migrate remaining components and content.

## 📖 Resources

- [Astro Documentation](https://docs.astro.build)
- [React Islands](https://docs.astro.build/en/concepts/islands/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro i18n](https://docs.astro.build/en/guides/internationalization/)
