import RSS from 'rss';
import type { APIRoute } from 'astro';
import { getAllArticles } from '../../../sanity/lib/client';
import { languages, type Language } from '../../lib/i18n';

export async function getStaticPaths() {
  return Object.keys(languages).map((lang) => ({
    params: { lang },
  }));
}

export const GET: APIRoute = async ({ params, site }) => {
  const lang = params.lang as Language;
  const baseUrl = site?.toString() || 'https://travi.world';

  const languageNames: Record<string, string> = {
    en: 'English',
    ar: 'العربية',
    he: 'עברית',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    zh: '中文',
    ja: '日本語',
    ko: '한국어',
    it: 'Italiano',
    pt: 'Português',
    ru: 'Русский',
    hi: 'हिन्दी',
    bn: 'বাংলা',
    // Add more as needed
  };

  const feed = new RSS({
    title: `TRAVI World - ${languageNames[lang] || lang.toUpperCase()}`,
    description: `Travel articles and guides in ${languageNames[lang] || lang}`,
    feed_url: `${baseUrl}/${lang}/feed.xml`,
    site_url: `${baseUrl}/${lang}`,
    image_url: `${baseUrl}/logo.png`,
    language: lang,
    pubDate: new Date(),
    ttl: 60,
  });

  try {
    // Fetch articles for this language
    const articles = await getAllArticles(lang);

    if (articles && articles.length > 0) {
      articles.slice(0, 50).forEach((article: any) => {
        if (article.slug?.current && article.title) {
          feed.item({
            title: article.title,
            description: article.excerpt || article.description || '',
            url: `${baseUrl}/${lang}/articles/${article.slug.current}`,
            date: article.publishedAt || article._createdAt || new Date(),
            author: article.author?.name || 'TRAVI Team',
            categories: article.categories || [article.category],
            enclosure: article.featuredImage
              ? {
                  url: article.featuredImage.url || '',
                  type: 'image/jpeg',
                }
              : undefined,
          });
        }
      });
    }
  } catch (error) {
    console.error(`Error generating ${lang} RSS feed:`, error);
  }

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
