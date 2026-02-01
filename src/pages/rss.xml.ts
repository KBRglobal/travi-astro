import RSS from 'rss';
import type { APIRoute } from 'astro';
import { getAllArticles } from '../../sanity/lib/client';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.toString() || 'https://travi.world';

  const feed = new RSS({
    title: 'TRAVI World - Travel Guides & Articles',
    description: 'Latest travel articles, destination guides, and travel tips from TRAVI World',
    feed_url: `${baseUrl}/rss.xml`,
    site_url: baseUrl,
    image_url: `${baseUrl}/logo.png`,
    language: 'en',
    pubDate: new Date(),
    ttl: 60, // Cache for 1 hour
  });

  try {
    // Fetch articles from Sanity (English only for main feed)
    const articles = await getAllArticles('en');

    if (articles && articles.length > 0) {
      articles.slice(0, 50).forEach((article: any) => {
        if (article.slug?.current && article.title) {
          feed.item({
            title: article.title,
            description: article.excerpt || article.description || '',
            url: `${baseUrl}/en/articles/${article.slug.current}`,
            date: article.publishedAt || article._createdAt || new Date(),
            author: article.author?.name || 'TRAVI Team',
            categories: article.categories || [article.category],
          });
        }
      });
    }
  } catch (error) {
    console.error('Error generating RSS feed:', error);
  }

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
};
