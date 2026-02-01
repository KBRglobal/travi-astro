import type { APIRoute } from 'astro';
import { XMLParser } from 'fast-xml-parser';

// List of travel RSS feeds to aggregate
const TRAVEL_RSS_FEEDS = [
  // Travel news
  'https://www.travelandleisure.com/rss',
  'https://www.lonelyplanet.com/rss',
  'https://www.cntraveler.com/feed/rss',
  'https://feeds.feedburner.com/NatGeoTravel',
  'https://feeds.skift.com/skift',

  // Destination-specific
  'https://www.timeout.com/feed',
  'https://thepointsguy.com/feed/',

  // Adventure/Budget travel
  'https://www.nomadicmatt.com/feed/',
  'https://www.adventurouskate.com/feed/',
];

interface CacheEntry {
  data: any[];
  timestamp: number;
}

// In-memory cache (expires after 1 hour)
const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

async function fetchRSSFeed(url: string): Promise<any[]> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TRAVI-World-Aggregator/1.0',
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`);
      return [];
    }

    const xmlData = await response.text();

    // Parse XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '_',
    });

    const result = parser.parse(xmlData);

    // Handle different RSS formats (RSS 2.0, Atom)
    let items: any[] = [];

    if (result.rss && result.rss.channel && result.rss.channel.item) {
      items = Array.isArray(result.rss.channel.item)
        ? result.rss.channel.item
        : [result.rss.channel.item];
    } else if (result.feed && result.feed.entry) {
      items = Array.isArray(result.feed.entry)
        ? result.feed.entry
        : [result.feed.entry];
    }

    // Normalize items
    return items.slice(0, 10).map((item: any) => ({
      title: item.title || item.title?._ || '',
      link: item.link || item.link?._href || item.link?._ || '',
      description:
        item.description ||
        item.summary ||
        item.content ||
        item['content:encoded'] ||
        '',
      pubDate: item.pubDate || item.published || item.updated || new Date().toISOString(),
      source: new URL(url).hostname,
      category: item.category || 'Travel',
    }));
  } catch (error) {
    console.error(`Error fetching RSS feed ${url}:`, error);
    return [];
  }
}

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('source');

  // Check cache first
  const cacheKey = query || 'all';
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return new Response(JSON.stringify(cached.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  try {
    let feedsToFetch = TRAVEL_RSS_FEEDS;

    // If specific source requested, fetch only that
    if (query) {
      feedsToFetch = TRAVEL_RSS_FEEDS.filter(feed => feed.includes(query));
    }

    // Fetch all feeds in parallel
    const results = await Promise.allSettled(
      feedsToFetch.map(feed => fetchRSSFeed(feed))
    );

    // Combine and flatten results
    const allItems: any[] = results
      .filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled')
      .flatMap(r => r.value)
      .filter(item => item.title && item.link);

    // Sort by pubDate (newest first)
    allItems.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });

    // Limit to 100 items
    const limitedItems = allItems.slice(0, 100);

    // Cache result
    cache.set(cacheKey, {
      data: limitedItems,
      timestamp: Date.now(),
    });

    return new Response(JSON.stringify(limitedItems), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        'X-Cache-Status': 'MISS',
        'X-Items-Count': limitedItems.length.toString(),
      },
    });
  } catch (error) {
    console.error('RSS aggregation error:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to aggregate RSS feeds',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
