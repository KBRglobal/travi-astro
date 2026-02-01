# GitHub Actions Workflows 🚀

תיעוד מלא של CI/CD workflows עבור TRAVI World.

---

## 📋 Workflows זמינים

### 1. **CI/CD Pipeline** (`ci.yml`)

Workflow ראשי שרץ על כל push ו-pull request.

**Jobs:**
- ✅ **Build & Test** - בונה את האתר ובודק תקינות
- 🔍 **Lighthouse CI** - בודק ביצועים (PR only)
- 🚀 **Deploy Preview** - מעלה preview ל-Vercel (PR only)
- 📦 **Deploy Production** - מעלה לייצור (main branch only)

**Triggers:**
```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

---

### 2. **Deploy to GitHub Pages** (`deploy-pages.yml`)

מעלה את האתר ל-GitHub Pages אוטומטית.

**Setup required:**
1. Settings → Pages → Source: GitHub Actions
2. הפעל את הWorkflow מהכרטיסייה Actions

**URL:** `https://[username].github.io/travi-astro`

---

### 3. **Security & Dependency Check** (`security.yml`)

בדיקות אבטחה שבועיות + CodeQL analysis.

**Includes:**
- 🔒 npm audit (moderate+)
- 📦 Dependency review (PR only)
- 🛡️ CodeQL security scanning
- 📊 Outdated packages check

**Schedule:** כל יום שני ב-9:00 AM UTC

---

## 🔑 Secrets נדרשים

הוסף ב-Settings → Secrets and variables → Actions:

### Vercel Deployment:
```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

### Sanity CMS:
```
SANITY_PROJECT_ID=abc123
```

### Email (אופציונלי):
```
RESEND_API_KEY=re_xxxxx
```

---

## 🚀 הפעלה ידנית

כל הworkflows תומכים ב-`workflow_dispatch` - ניתן להפעיל ידנית מהכרטיסייה Actions.

---

## 📊 Status Badges

הוסף ל-README.md:

```markdown
![CI/CD](https://github.com/[username]/travi-astro/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/[username]/travi-astro/actions/workflows/deploy-pages.yml/badge.svg)
![Security](https://github.com/[username]/travi-astro/actions/workflows/security.yml/badge.svg)
```

---

## 🛠️ Local Testing

לפני push, בדוק מקומית:

```bash
# Build test
npm run build

# Preview
npm run preview
```

---

## 📝 הערות

- Build artifacts נשמרים ל-7 ימים
- Lighthouse CI רץ רק על PRs
- Production deployment רק מ-main branch
- Security scans כל שבוע
