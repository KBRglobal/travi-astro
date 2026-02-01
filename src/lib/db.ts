import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Create PostgreSQL pool
const pool = new pg.Pool({
  connectionString: import.meta.env.DATABASE_URL || process.env.DATABASE_URL,
});

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Create Prisma client
export const prisma = new PrismaClient({ adapter });

// Type exports
export type { contents, attractions, hotels, restaurants, articles } from '@prisma/client';

// Helper functions to match old Sanity API

/**
 * Get all attractions for a specific language
 */
export async function getAllAttractions(lang: string) {
  const attractions = await prisma.attractions.findMany({
    where: {
      contents: {
        status: 'published',
        deleted_at: null,
      },
    },
    include: {
      contents: {
        select: {
          id: true,
          title: true,
          slug: true,
          meta_description: true,
          hero_image: true,
          status: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  // Transform to match old Sanity format
  return attractions.map((attr) => ({
    id: attr.id,
    slug: { current: attr.contents.slug },
    title: attr.contents.title,
    description: attr.contents.meta_description || '',
    category: attr.category || 'general',
    images: attr.gallery as any[] || [],
    location: attr.location || '',
    rating: null,
    featured: false,
  }));
}

/**
 * Get attraction by slug
 */
export async function getAttractionBySlug(slug: string, lang: string) {
  const content = await prisma.contents.findUnique({
    where: { slug },
    include: {
      attractions: true,
    },
  });

  if (!content || !content.attractions.length) {
    return null;
  }

  const attraction = content.attractions[0];

  return {
    id: attraction.id,
    slug: { current: content.slug },
    title: content.title,
    description: content.meta_description || '',
    category: attraction.category || 'general',
    images: attraction.gallery as any[] || [],
    location: attraction.location || '',
    intro_text: attraction.intro_text || '',
    highlights: attraction.highlights as any[] || [],
    visitor_tips: attraction.visitor_tips as any[] || [],
    faq: attraction.faq as any[] || [],
  };
}

/**
 * Get all hotels
 */
export async function getAllHotels(lang: string) {
  const hotels = await prisma.hotels.findMany({
    where: {
      contents: {
        status: 'published',
        deleted_at: null,
      },
    },
    include: {
      contents: {
        select: {
          id: true,
          title: true,
          slug: true,
          meta_description: true,
          hero_image: true,
        },
      },
    },
  });

  return hotels.map((hotel) => ({
    id: hotel.id,
    slug: { current: hotel.contents.slug },
    name: hotel.contents.title,
    description: hotel.contents.meta_description || '',
    starRating: null,
    images: [],
    priceRange: null,
    featured: false,
  }));
}

/**
 * Get all restaurants
 */
export async function getAllRestaurants(lang: string) {
  const restaurants = await prisma.restaurants.findMany({
    where: {
      contents: {
        status: 'published',
        deleted_at: null,
      },
    },
    include: {
      contents: {
        select: {
          id: true,
          title: true,
          slug: true,
          meta_description: true,
          hero_image: true,
        },
      },
    },
  });

  return restaurants.map((restaurant) => ({
    id: restaurant.id,
    slug: { current: restaurant.contents.slug },
    name: restaurant.contents.title,
    description: restaurant.contents.meta_description || '',
    cuisine: restaurant.cuisine_type || null,
    images: [],
    priceRange: null,
    featured: false,
  }));
}

/**
 * Get all articles
 */
export async function getAllArticles(lang: string) {
  const articles = await prisma.articles.findMany({
    where: {
      contents: {
        status: 'published',
        deleted_at: null,
      },
    },
    include: {
      contents: {
        select: {
          id: true,
          title: true,
          slug: true,
          meta_description: true,
          hero_image: true,
          published_at: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  return articles.map((article) => ({
    id: article.id,
    slug: { current: article.contents.slug },
    title: article.contents.title,
    excerpt: article.contents.meta_description || '',
    featuredImage: article.contents.hero_image ? { url: article.contents.hero_image } : null,
    category: article.article_type || 'general',
    publishedAt: article.contents.published_at?.toISOString(),
    _createdAt: article.created_at?.toISOString(),
  }));
}

/**
 * Get all destinations (districts)
 */
export async function getDestinations(lang: string) {
  const districts = await prisma.districts.findMany({
    where: {
      contents: {
        status: 'published',
        deleted_at: null,
      },
    },
    include: {
      contents: {
        select: {
          id: true,
          title: true,
          slug: true,
          meta_description: true,
          hero_image: true,
        },
      },
    },
  });

  return districts.map((district) => ({
    _id: district.id,
    name: district.contents.title,
    slug: { current: district.contents.slug },
    description: district.contents.meta_description || '',
    heroImage: district.contents.hero_image ? { url: district.contents.hero_image } : null,
  }));
}

/**
 * Get destination by slug
 */
export async function getDestinationBySlug(slug: string, lang: string) {
  const content = await prisma.contents.findUnique({
    where: { slug },
    include: {
      districts: true,
    },
  });

  if (!content || !content.districts.length) {
    return null;
  }

  const district = content.districts[0];

  return {
    _id: district.id,
    name: content.title,
    slug: { current: content.slug },
    description: content.meta_description || '',
    heroImage: content.hero_image ? { url: content.hero_image } : null,
  };
}

/**
 * Get image URL helper (for compatibility)
 */
export function getImageUrl(image: any, width?: number, height?: number) {
  if (!image) return '/placeholder.jpg';
  if (typeof image === 'string') return image;
  if (image.url) return image.url;
  return '/placeholder.jpg';
}
