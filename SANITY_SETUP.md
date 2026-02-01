# 🎨 Sanity CMS Setup Guide

מדריך מלא להתקנה והגדרה של Sanity CMS עבור TRAVI World.

---

## 📋 תוכן עניינים

1. [יצירת Sanity Project](#1-יצירת-sanity-project)
2. [הגדרת Environment Variables](#2-הגדרת-environment-variables)
3. [הפעלת Sanity Studio](#3-הפעלת-sanity-studio)
4. [הוספת תוכן ראשוני](#4-הוספת-תוכן-ראשוני)
5. [חיבור לAstro](#5-חיבור-לastro)
6. [Deployment](#6-deployment)

---

## 1. יצירת Sanity Project

### אופציה A: דרך CLI (מומלץ)

```bash
# התחבר ל-Sanity (פותח דפדפן)
npx sanity login

# צור project חדש
npx sanity init --project-id <your-project-id> --dataset production

# בחר:
# - Project name: TRAVI World
# - Dataset: production
# - Schema: No (כבר יש לנו schemas)
```

### אופציה B: דרך Dashboard

1. היכנס ל-https://www.sanity.io/manage
2. לחץ על "Create new project"
3. שם: **TRAVI World**
4. התקן dataset: **production**
5. העתק את ה-**Project ID**

---

## 2. הגדרת Environment Variables

העתק את `.env.example` ל-`.env`:

```bash
cp .env.example .env
```

ערוך את `.env` והוסף את ה-Project ID שלך:

```env
# Sanity Configuration
PUBLIC_SANITY_PROJECT_ID=abc123xyz  # ← Replace with your actual project ID
PUBLIC_SANITY_DATASET=production

# Email (אופציונלי - לטופס יצירת קשר)
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

---

## 3. הפעלת Sanity Studio

### אופציה A: Embedded Studio (מומלץ)

Studio מוטמע ב-Astro בכתובת `/studio`:

```bash
# הפעל את Astro dev server
npm run dev

# פתח Studio בדפדפן
open http://localhost:4321/studio
```

### אופציה B: Standalone Studio

Studio נפרד (פורט 3333):

```bash
# הפעל Studio בלבד
npm run studio

# פתח בדפדפן
open http://localhost:3333
```

---

## 4. הוספת תוכן ראשוני

### 4.1 צור Destination ראשון

1. פתח את Studio: http://localhost:4321/studio
2. לחץ על **"Destination"** בתפריט השמאלי
3. לחץ על **"Create new"**
4. מלא:
   - **Name**: Dubai
   - **Slug**: dubai (auto-generate)
   - **Language**: en
   - **Country**: United Arab Emirates
   - **Continent**: Asia
   - **Tagline**: The City of Gold
   - **Description**: Dubai is a city of superlatives...
   - העלה **Hero Image**
   - הוסף **Coordinates**: 25.2048, 55.2708
5. לחץ **Publish**

### 4.2 צור Attraction ראשון

1. לחץ על **"Attraction"**
2. לחץ על **"Create new"**
3. מלא:
   - **Title**: Burj Khalifa
   - **Slug**: burj-khalifa
   - **Language**: en
   - **Description**: The world's tallest building...
   - **Category**: Landmarks
   - **Destination**: Dubai (בחר מהרשימה)
   - העלה **Images** (לפחות 1)
   - הוסף **Location**: 25.1972, 55.2744
   - **Opening Hours**:
     - Monday-Sunday: 08:30 AM - 11:00 PM
   - **Pricing**:
     - Currency: AED
     - Adult: 149
     - Child: 129
   - **Featured**: true
4. לחץ **Publish**

### 4.3 תרגום לשפות נוספות

Sanity תומך ב-**Document Internationalization**:

1. פתח את Burj Khalifa שיצרת
2. לחץ על **"Translate"** בפינה הימנית העליונה
3. בחר שפה (למשל: **Hebrew - עברית**)
4. מערכת תיצור מסמך חדש מקושר
5. ערוך את התוכן בעברית:
   - **Title**: בורג' חליפה
   - **Description**: הבניין הגבוה בעולם...
6. לחץ **Publish**

חזור על התהליך ל-30 שפות!

---

## 5. חיבור לAstro

### 5.1 וודא שה-Client עובד

בדוק שה-Sanity client מחובר:

```bash
# הפעל Astro
npm run dev

# בדוק את הקונסול - לא צריכות להיות שגיאות Sanity
```

### 5.2 שלוף Data בדף Astro

דוגמה לשימוש ב-`src/pages/[lang]/attractions/index.astro`:

```astro
---
import { getFeaturedAttractions } from '../../../sanity/lib/client';

const { lang } = Astro.params;
const attractions = await getFeaturedAttractions(lang, 12);
---

<div>
  {attractions.map((attraction) => (
    <a href={`/${lang}/attractions/${attraction.slug.current}`}>
      <img src={getImageUrl(attraction.images[0], 400, 300)} alt={attraction.title} />
      <h3>{attraction.title}</h3>
      <p>{attraction.description}</p>
    </a>
  ))}
</div>
```

---

## 6. Deployment

### 6.1 Deploy Sanity Studio

Deploy את Studio ל-Sanity Cloud (חינם):

```bash
npm run studio:deploy
```

זה יפרסם את Studio ל-URL כמו:
`https://travi-world.sanity.studio`

### 6.2 הגדר CORS

אפשר גישה מ-domain שלך:

1. היכנס ל-https://www.sanity.io/manage
2. בחר את הפרויקט שלך
3. Settings → API → CORS Origins
4. הוסף:
   - `http://localhost:4321` (development)
   - `https://travi.world` (production)
   - `https://travi-world.sanity.studio` (studio)
5. Allow credentials: **Yes**

### 6.3 Deploy Astro Site

```bash
# Build production
npm run build

# Deploy ל-Vercel/Netlify/Cloudflare
# הוסף environment variables:
# - PUBLIC_SANITY_PROJECT_ID
# - PUBLIC_SANITY_DATASET
```

---

## 📚 Schema Types

הסכמות הזמינות ב-Studio:

### 1. **Destination** (יעד)
- Name, slug, country, continent
- Hero image, gallery
- Description, highlights
- Coordinates, timezone, currency
- **17 destinations** planned

### 2. **Attraction** (אטרקציה)
- Title, slug, description
- Category (landmarks, museums, etc.)
- Destination reference
- Images (multiple)
- Location, coordinates
- Opening hours, pricing
- **3,000+ attractions** planned

### 3. **Hotel** (מלון)
- Name, slug, description
- Star rating (1-5)
- Destination reference
- Images, location
- Amenities, price range
- Booking URL

### 4. **Restaurant** (מסעדה)
- Name, slug, description
- Cuisine types (multiple)
- Destination reference
- Images, location
- Price range ($-$$$$)
- Opening hours, features

### 5. **Article** (כתבה/חדשות)
- Title, slug, excerpt
- Content (rich text with images)
- Featured image
- Category, tags
- Author info
- Related destinations/attractions
- Published date

---

## 🌍 Multilingual Content

Sanity תומך ב-30 שפות דרך Document Internationalization:

### שפות נתמכות:
```
ar (Arabic), bn (Bengali), cs (Czech), da (Danish),
de (German), el (Greek), en (English), es (Spanish),
fa (Farsi), fil (Filipino), fr (French), he (Hebrew),
hi (Hindi), id (Indonesian), it (Italian), ja (Japanese),
ko (Korean), ms (Malay), nl (Dutch), no (Norwegian),
pl (Polish), pt (Portuguese), ru (Russian), sv (Swedish),
th (Thai), tr (Turkish), uk (Ukrainian), ur (Urdu),
vi (Vietnamese), zh (Chinese)
```

### איך זה עובד:

1. יוצר document באנגלית (base language)
2. לוחץ "Translate" → בוחר שפה
3. Sanity יוצר document מקושר עם שדה `language`
4. Astro מושך data לפי `language == $lang`

---

## 🎯 Best Practices

### 1. Image Optimization
- העלה תמונות ב-resolution גבוה (1920x1080+)
- Sanity מטפל ב-resizing אוטומטית
- השתמש ב-`getImageUrl(source, width, height)`

### 2. Content Structure
- מלא תמיד **Meta Title** ו-**Meta Description** (SEO)
- השתמש ב-**Featured** כדי להציג תוכן בהומפייג'
- הוסף **Tags** לחיפוש טוב יותר

### 3. Multilingual
- תרגם את כל התוכן הקריטי (top attractions, destinations)
- השתמש ב-AI (Claude/GPT) לתרגום ראשוני
- עבור דרך editor אנושי לשפות חשובות (ar, he, etc.)

### 4. Performance
- `useCdn: true` ב-production (caching)
- שלוף רק שדות נדרשים ב-GROQ queries
- השתמש ב-`select` במקום `...` (all fields)

---

## 🚀 Quick Start Checklist

- [ ] יצרת Sanity project ב-https://sanity.io
- [ ] הוספת Project ID ל-`.env`
- [ ] הרצת `npm run studio` או `npm run dev`
- [ ] פתחת Studio ב-`/studio`
- [ ] יצרת Destination ראשון
- [ ] יצרת Attraction ראשון
- [ ] תרגמת ל-2-3 שפות
- [ ] בדקת שהתוכן מופיע באתר

---

## 📞 עזרה נוספת

- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Cheat Sheet**: https://www.sanity.io/docs/groq
- **Discord**: https://slack.sanity.io

**זהו! עכשיו יש לך CMS מקצועי עם visual editor לניהול כל התוכן של TRAVI World!** 🎉
