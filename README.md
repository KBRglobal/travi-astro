# 🌍 TRAVI World - Travel Guides Platform

> **מדריכי טיול מקיפים לכל העולם | Comprehensive travel information platform**

Production-ready travel guide website built with Astro, React, Sanity CMS, and full i18n support.

[![CI/CD](https://github.com/KBRglobal/travi-astro/actions/workflows/ci.yml/badge.svg)](https://github.com/KBRglobal/travi-astro/actions/workflows/ci.yml)
[![Deploy](https://github.com/KBRglobal/travi-astro/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/KBRglobal/travi-astro/actions/workflows/deploy-pages.yml)

---

## ✨ Features

### 🎯 **Content Management**
- 🎨 **Sanity CMS** - Visual content editor עם 5 schemas
- 🌐 **30 Languages** - Multi-language support עם document internationalization
- 📄 **691 Static Pages** - SSG מהיר ו-SEO מושלם
- 🔄 **Smart Fallback** - נתוני mock כשאין Sanity

### 🚀 **Performance & SEO**
- ⚡ **1.8s Build Time** - 691 עמודים בזמן שיא
- 🔍 **Perfect SEO** - Open Graph, Twitter Cards, JSON-LD
- 📱 **PWA Ready** - manifest.json + service worker ready
- 🗺️ **Automatic Sitemap** - 30 hreflang tags לכל עמוד

### 💡 **Interactive Components**
- 📧 **ContactForm** - Production-ready עם Resend API
- 🔍 **SearchFilters** - Client-side search + filtering
- 🏝️ **React Islands** - Optimal performance

### 🛡️ **CI/CD & DevOps**
- ✅ **GitHub Actions** - Auto build, test, deploy
- 🔒 **Security Scans** - npm audit + CodeQL weekly
- 🚀 **Vercel Deploy** - Preview + Production
- 📊 **Lighthouse CI** - Performance monitoring

---

## 📊 Statistics

```
📄 Pages:         691 static pages
🌍 Languages:     30 (including RTL support)
⚡ Build Time:    1.81s
🎨 Components:    15+ React Islands
📦 CMS Schemas:   5 (Destination, Attraction, Hotel, Restaurant, Article)
🔒 Security:      npm audit + CodeQL + dependency review
```

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/KBRglobal/travi-astro.git
cd travi-astro

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:4321

# Start Sanity Studio (optional)
npm run studio
# → http://localhost:3333
```

---

## 📁 Project Structure

```
/
├── .github/
│   └── workflows/          # CI/CD pipelines
│       ├── ci.yml         # Main CI/CD
│       ├── deploy-pages.yml
│       └── security.yml
├── public/
│   ├── robots.txt
│   └── manifest.json      # PWA manifest
├── sanity/
│   ├── lib/
│   │   └── client.ts      # Sanity client + queries
│   └── schemas/           # CMS schemas
│       ├── attraction.ts
│       ├── destination.ts
│       ├── hotel.ts
│       ├── restaurant.ts
│       └── article.ts
├── src/
│   ├── components/
│   │   └── islands/       # React Islands
│   │       ├── ContactForm.tsx
│   │       └── SearchFilters.tsx
│   ├── layouts/
│   │   └── BaseLayout.astro   # SEO + hreflang
│   ├── lib/
│   │   └── i18n.ts       # 30 languages config
│   ├── pages/
│   │   ├── api/
│   │   │   └── contact.ts     # Contact form API
│   │   └── [lang]/
│   │       ├── index.astro           # Homepage
│   │       ├── attractions/
│   │       │   ├── index.astro       # List
│   │       │   └── [slug].astro      # Detail (360 pages)
│   │       ├── hotels/index.astro
│   │       ├── dining/index.astro
│   │       ├── guides/index.astro
│   │       ├── articles/index.astro
│   │       ├── about.astro
│   │       └── contact.astro
│   └── styles/
│       └── global.css    # Tailwind + Custom
├── astro.config.mjs
├── sanity.config.ts      # Sanity Studio config
└── package.json
```

---

## 🌍 Supported Languages

**30 Languages** עם תמיכה מלאה:

🇬🇧 en | 🇸🇦 ar | 🇧🇩 bn | 🇨🇿 cs | 🇩🇰 da | 🇩🇪 de | 🇬🇷 el | 🇪🇸 es | 🇮🇷 fa | 🇵🇭 fil
🇫🇷 fr | 🇮🇱 he | 🇮🇳 hi | 🇮🇩 id | 🇮🇹 it | 🇯🇵 ja | 🇰🇷 ko | 🇲🇾 ms | 🇳🇱 nl | 🇳🇴 no
🇵🇱 pl | 🇵🇹 pt | 🇷🇺 ru | 🇸🇪 sv | 🇹🇭 th | 🇹🇷 tr | 🇺🇦 uk | 🇵🇰 ur | 🇻🇳 vi | 🇨🇳 zh

**RTL Support**: Arabic (ar), Hebrew (he), Farsi (fa), Urdu (ur)

---

## 🎨 Technology Stack

### Core
- **Framework**: [Astro 5](https://astro.build) - SSG + Islands Architecture
- **UI Framework**: [React 19](https://react.dev) - Interactive components
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Language**: TypeScript

### Content & Data
- **CMS**: [Sanity](https://sanity.io) - Headless CMS
- **i18n**: [i18next](https://i18next.com) - 30 languages
- **Forms**: [Resend](https://resend.com) - Email API

### DevOps
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel / GitHub Pages
- **Security**: CodeQL + npm audit
- **Monitoring**: Lighthouse CI

---

## 🔧 Configuration

### Environment Variables

Create `.env`:

```env
# Sanity CMS (Required for content)
PUBLIC_SANITY_PROJECT_ID=abc123
PUBLIC_SANITY_DATASET=production

# Email API (Optional - ContactForm)
RESEND_API_KEY=re_xxxxx
```

### GitHub Secrets

For CI/CD deployment:

```
SANITY_PROJECT_ID=abc123
RESEND_API_KEY=re_xxxxx
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx
```

---

## 📦 Available Scripts

```bash
# Development
npm run dev              # Dev server (localhost:4321)
npm run build            # Build production (691 pages)
npm run preview          # Preview build

# Sanity Studio
npm run studio           # Start Studio (localhost:3333)
npm run studio:deploy    # Deploy to Sanity Cloud
npm run studio:build     # Build Studio

# Localization (optional AI tools)
npm run localize         # Generate translations
npm run enhance          # Enhance existing translations
```

---

## 🎯 Sanity CMS Setup

### 1. Create Sanity Project

```bash
# Login to Sanity
npx sanity login

# Initialize (or use existing project)
# Get your PROJECT_ID from https://sanity.io/manage
```

### 2. Configure Environment

```bash
cp .env.example .env
# Add your PROJECT_ID to .env
```

### 3. Start Studio

```bash
npm run studio
# Open http://localhost:3333
```

### 4. Add Content

1. Create **Destination** (e.g., Dubai)
2. Add **Attractions** (link to destination)
3. Translate to other languages
4. Publish

📚 **Full guide**: See [SANITY_SETUP.md](./SANITY_SETUP.md)

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# → Settings → Environment Variables
```

### Option 2: GitHub Pages

1. Enable Pages: Settings → Pages → Source: GitHub Actions
2. Push to main → Auto-deploys
3. URL: `https://[username].github.io/travi-astro`

### Option 3: Netlify / Cloudflare Pages

```bash
npm run build
# Upload dist/ folder
```

---

## 📖 API Routes

### POST `/api/contact`

שליחת טופס יצירת קשר.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Features:**
- ✅ Rate limiting (5/hour per IP)
- 🔒 Honeypot anti-spam
- 📧 Resend integration
- ✅ Email validation

---

## 🛡️ Security Features

- 🔒 **CodeQL** - Weekly security scans
- 📦 **npm audit** - Dependency vulnerability checks
- 🚫 **Rate Limiting** - Anti-spam protection
- 🍯 **Honeypot** - Bot detection
- 🔐 **CSP Ready** - Content Security Policy support

---

## 📊 SEO Features

- ✅ **Open Graph Tags** - Facebook, LinkedIn
- ✅ **Twitter Cards** - Rich previews
- ✅ **JSON-LD** - Organization, WebSite, BreadcrumbList schemas
- ✅ **30 hreflang Tags** - Multi-language SEO
- ✅ **Canonical URLs** - Duplicate content prevention
- ✅ **robots.txt** - Search engine directives
- ✅ **Sitemap** - Auto-generated for all 691 pages
- ✅ **PWA Manifest** - Mobile app experience

---

## 🧪 Testing

```bash
# Build test
npm run build

# Lighthouse (local)
npm run preview
# Then run Lighthouse in Chrome DevTools

# Security audit
npm audit

# Check outdated packages
npm outdated
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

**Commit Convention**: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- CMS powered by [Sanity](https://sanity.io)
- Deployed on [Vercel](https://vercel.com)
- i18n with [i18next](https://i18next.com)

---

## 📞 Support

- 📧 Email: contact@travi.world
- 🐛 Issues: [GitHub Issues](https://github.com/KBRglobal/travi-astro/issues)
- 📖 Docs: [SANITY_SETUP.md](./SANITY_SETUP.md)

---

**Built with ❤️ by the TRAVI team**

*Last updated: February 2026*
