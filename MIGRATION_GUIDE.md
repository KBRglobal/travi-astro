# TRAVI Migration Guide - React to Astro

Complete step-by-step guide to migrate remaining components and content from React SPA to Astro.

## Migration Strategy

### Keep as React Islands (Interactive):
- Admin panels (all 46 pages)
- Forms (React Hook Form components)
- Data visualizations (Recharts)
- AI Assistant components
- Command Palette
- Any component with state management (Zustand, TanStack Query)

### Convert to .astro (Static):
- Public pages (content pages)
- About, Contact, Disclosure pages
- Article templates
- Static layouts and UI components
- SEO components (Breadcrumbs, Meta tags)

---

## Phase 2: Migrate Core Components

### Step 1: Port shadcn/ui Components

Copy from `travi-final-website/client/src/components/ui/` to `travi-astro/src/components/ui/`

**Static components** (convert to `.astro`):
- `badge.tsx` → `Badge.astro`
- `card.tsx` → `Card.astro`
- `separator.tsx` → `Separator.astro`
- `breadcrumbs.tsx` → `Breadcrumbs.astro`

**Interactive components** (keep as React Islands):
- `button.tsx` - keep as .tsx
- `dialog.tsx` - keep as .tsx
- `dropdown-menu.tsx` - keep as .tsx
- `accordion.tsx` - keep as .tsx
- All form components - keep as .tsx

### Step 2: Migrate Shared Components

**Convert to .astro:**
```bash
# From travi-final-website/client/src/components/
category-hero.tsx → CategoryHero.astro
category-bento-grid.tsx → CategoryBentoGrid.astro
breadcrumbs.tsx → Breadcrumbs.astro
```

**Keep as React Islands:**
```bash
# Move to travi-astro/src/components/islands/
ai-assistant.tsx
command-palette.tsx
content-blocks-renderer.tsx (has state)
```

### Step 3: Create Astro Component Template

```astro
---
// Example: CategoryHero.astro
interface Props {
  title: string;
  description: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---

<section class="relative h-[400px] overflow-hidden">
  {image && (
    <div class="absolute inset-0">
      <img
        src={image}
        alt={title}
        class="h-full w-full object-cover"
      />
    </div>
  )}
  <div class="relative z-10 container h-full flex flex-col justify-center">
    <h1 class="text-4xl font-bold text-white">{title}</h1>
    <p class="mt-4 text-lg text-white/90">{description}</p>
  </div>
</section>
```

---

## Phase 3: Content Collections Migration

### Step 1: Create Sample Attractions Data

```bash
# Create travi-astro/src/content/attractions/burj-khalifa.json
```

```json
{
  "title": "Burj Khalifa",
  "slug": "burj-khalifa",
  "description": "The world's tallest building",
  "category": "Architecture",
  "location": {
    "lat": 25.1972,
    "lng": 55.2744,
    "address": "1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai"
  },
  "images": [
    "/images/burj-khalifa-1.jpg",
    "/images/burj-khalifa-2.jpg"
  ],
  "rating": 4.8,
  "priceRange": "$$$",
  "openingHours": "8:30 AM - 11:00 PM",
  "website": "https://www.burjkhalifa.ae",
  "tags": ["architecture", "landmark", "observation"],
  "featured": true,
  "publishedAt": "2024-01-01T00:00:00.000Z"
}
```

### Step 2: Query Content Collections

```astro
---
// In pages/[lang]/attractions/[slug].astro
import { getCollection, getEntry } from 'astro:content';

export async function getStaticPaths() {
  const attractions = await getCollection('attractions');
  const languages = ['en', 'ar', 'he', 'hi', 'zh', 'fr', 'de', 'es', 'ja'];

  return languages.flatMap((lang) =>
    attractions.map((attraction) => ({
      params: { lang, slug: attraction.data.slug },
      props: { attraction },
    }))
  );
}

const { attraction } = Astro.props;
const { lang, slug } = Astro.params;
---

<BaseLayout title={attraction.data.title} lang={lang}>
  <h1>{attraction.data.title}</h1>
  <p>{attraction.data.description}</p>
  <!-- Rest of template -->
</BaseLayout>
```

### Step 3: Migrate Existing Data

1. Export data from PostgreSQL:
```sql
SELECT * FROM attractions;
```

2. Convert to JSON files in `src/content/attractions/`

3. Update schema if needed in `src/content/config.ts`

---

## Phase 4: i18n Content Translation

### Step 1: Organize Translations

```
src/content/
├── attractions/
│   ├── en/
│   │   ├── burj-khalifa.json
│   │   └── dubai-mall.json
│   ├── ar/
│   │   ├── burj-khalifa.json
│   │   └── dubai-mall.json
│   └── he/
│       ├── burj-khalifa.json
│       └── dubai-mall.json
```

### Step 2: Update Content Collections Config

```typescript
// src/content/config.ts
const attractionsCollection = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    // ... rest of schema
    lang: z.enum(['en', 'ar', 'he', 'hi', 'zh', 'fr', 'de', 'es', 'ja']),
  }),
});
```

### Step 3: Query by Language

```astro
---
const attractions = await getCollection('attractions', ({ data }) => {
  return data.lang === lang;
});
---
```

---

## Phase 5: SEO Implementation

### Step 1: Add Structured Data

```astro
---
// In BaseLayout.astro, add to <head>
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TRAVI - Dubai Travel Guide",
  "url": Astro.site,
  "description": description,
};
---

<script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
```

### Step 2: Add Attraction Schema

```astro
---
// In attraction detail page
const attractionSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": attraction.data.title,
  "description": attraction.data.description,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": attraction.data.rating,
    "bestRating": "5"
  }
};
---
```

### Step 3: Generate Robots.txt

```typescript
// src/pages/robots.txt.ts
export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', Astro.site).href}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
```

---

## Phase 6: Admin Panel Integration

### Keep Admin Separate or as Islands

**Option A: Separate Admin App** (Recommended)
- Keep admin in React SPA at `/admin` subdomain
- Astro handles public site
- Admin uses existing Express API

**Option B: Admin as React Islands**
- Move admin components to `src/components/islands/admin/`
- Create admin routes in `src/pages/admin/`
- Use `client:only="react"` for full React admin panel

Example:
```astro
---
// src/pages/admin/index.astro
import AdminDashboard from '../../components/islands/admin/Dashboard';
---

<AdminDashboard client:only="react" />
```

---

## Phase 7: Testing & Optimization

### Performance Testing

```bash
# Build and analyze
npm run build

# Check bundle size
ls -lh dist/_astro/

# Lighthouse audit
npx lighthouse http://localhost:4321 --view
```

### SEO Audit

```bash
# Install SEO tools
npm install -D @astrojs/check

# Run checks
npx astro check
```

### Cross-browser Testing

Test on:
- Chrome, Firefox, Safari, Edge
- Mobile Safari (iOS)
- Chrome Mobile (Android)
- RTL languages (Arabic, Hebrew)

---

## Quick Reference: Component Conversion

### React Component → Astro Component

**Before (React):**
```tsx
interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: Props) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

**After (Astro):**
```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div class="card">
  <h2>{title}</h2>
  <slot />
</div>
```

### When to Keep as React Island

Keep React when:
- Component has state (`useState`, `useReducer`)
- Uses React hooks (`useEffect`, `useCallback`)
- Requires interactivity (forms, modals, dropdowns)
- Uses external React libraries (TanStack Query, React Hook Form)
- Part of admin panel

Convert to Astro when:
- Pure presentation component
- No interactivity needed
- Static content
- SEO-critical content
- Simple layout/structure

---

## Deployment Checklist

- [ ] All pages build successfully
- [ ] Sitemaps generated
- [ ] robots.txt configured
- [ ] Meta tags on all pages
- [ ] Structured data added
- [ ] Images optimized
- [ ] Performance tested (Lighthouse 90+)
- [ ] SEO audit passed
- [ ] Multi-language tested
- [ ] RTL languages work correctly
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] API endpoints work
- [ ] Database connected
- [ ] Environment variables set
- [ ] Production domain configured

---

## Migration Priority Order

1. ✅ **Phase 1: Base Setup** (DONE)
2. **Phase 2: Core Pages** - Homepage, About, Contact (1-2 hours)
3. **Phase 3: Attractions** - Listing + Detail pages (2-3 hours)
4. **Phase 4: Content Collections** - Import data (1-2 hours)
5. **Phase 5: SEO** - Structured data, sitemaps (1 hour)
6. **Phase 6: Testing** - Performance, SEO audit (1 hour)
7. **Phase 7: Deploy** - Production deployment (30 min)

**Total estimated time: 8-12 hours for MVP migration**

---

## Support & Resources

- [Astro Discord](https://astro.build/chat)
- [Astro Docs](https://docs.astro.build)
- [Migration Examples](https://github.com/withastro/astro/tree/main/examples)
- Original repo: `/Users/admin/github-repos/travi-final-website`
- New repo: `/Users/admin/github-repos/travi-astro`
