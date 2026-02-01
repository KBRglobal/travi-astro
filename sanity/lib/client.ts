import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Check if Sanity is configured
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || '';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';
export const isSanityConfigured = Boolean(projectId);

// Sanity client configuration
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true, // `false` for fresh data, `true` for faster cached data
    })
  : null;

// Image URL builder
const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    console.warn('Sanity not configured, cannot build image URL');
    return null;
  }
  return builder.image(source);
}

// Helper function to get image URL with transformations
export function getImageUrl(source: SanityImageSource, width?: number, height?: number) {
  if (!builder) {
    console.warn('Sanity not configured, cannot build image URL');
    return '/placeholder.jpg';
  }

  let imageUrl = builder.image(source).auto('format').fit('max');

  if (width) {
    imageUrl = imageUrl.width(width);
  }

  if (height) {
    imageUrl = imageUrl.height(height);
  }

  return imageUrl.url();
}

// GROQ query helpers for common queries
export const queries = {
  // Get all destinations
  allDestinations: (lang: string) => `
    *[_type == "destination" && language == $lang] | order(order asc) {
      _id,
      name,
      slug,
      country,
      continent,
      tagline,
      description,
      heroImage,
      coordinates,
      featured,
      order,
      metaTitle,
      metaDescription
    }
  `,

  // Get single destination by slug
  destinationBySlug: (lang: string) => `
    *[_type == "destination" && slug.current == $slug && language == $lang][0] {
      ...,
      "attractionsCount": count(*[_type == "attraction" && references(^._id)])
    }
  `,

  // Get all attractions for a destination
  attractionsByDestination: (lang: string) => `
    *[_type == "attraction" && language == $lang && destination._ref == $destinationId] | order(featured desc, title asc) {
      _id,
      title,
      slug,
      description,
      category,
      images,
      location,
      featured,
      rating,
      pricing
    }
  `,

  // Get featured attractions
  featuredAttractions: (lang: string, limit: number = 12) => `
    *[_type == "attraction" && language == $lang && featured == true] | order(_createdAt desc) [0...${limit}] {
      _id,
      title,
      slug,
      description,
      category,
      images,
      destination->{name, slug},
      rating
    }
  `,

  // Get all attractions
  allAttractions: (lang: string) => `
    *[_type == "attraction" && language == $lang] | order(title asc) {
      _id,
      title,
      slug,
      description,
      category,
      images,
      destination->{name, slug},
      rating,
      featured
    }
  `,

  // Get attraction by slug
  attractionBySlug: (lang: string) => `
    *[_type == "attraction" && slug.current == $slug && language == $lang][0] {
      ...,
      destination->{
        name,
        slug,
        country
      },
      "relatedAttractions": *[_type == "attraction" && language == $lang && category == ^.category && slug.current != $slug][0...3] {
        _id,
        title,
        slug,
        category,
        images,
        rating
      }
    }
  `,

  // Get all hotels
  allHotels: (lang: string) => `
    *[_type == "hotel" && language == $lang] | order(featured desc, starRating desc) {
      _id,
      name,
      slug,
      description,
      starRating,
      images,
      destination->{name, slug},
      priceRange,
      featured,
      rating
    }
  `,

  // Get hotels by destination
  hotelsByDestination: (lang: string) => `
    *[_type == "hotel" && language == $lang && destination._ref == $destinationId] | order(featured desc, starRating desc) {
      _id,
      name,
      slug,
      description,
      starRating,
      images,
      priceRange,
      amenities,
      featured,
      rating
    }
  `,

  // Get all restaurants
  allRestaurants: (lang: string) => `
    *[_type == "restaurant" && language == $lang] | order(featured desc, rating desc) {
      _id,
      name,
      slug,
      description,
      cuisine,
      images,
      destination->{name, slug},
      priceRange,
      featured,
      rating
    }
  `,

  // Get restaurants by destination
  restaurantsByDestination: (lang: string) => `
    *[_type == "restaurant" && language == $lang && destination._ref == $destinationId] | order(featured desc, rating desc) {
      _id,
      name,
      slug,
      description,
      cuisine,
      images,
      priceRange,
      diningStyle,
      featured,
      rating
    }
  `,

  // Get all articles
  allArticles: (lang: string) => `
    *[_type == "article" && language == $lang] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      category,
      tags,
      author,
      publishedAt,
      featured
    }
  `,

  // Get featured articles
  featuredArticles: (lang: string, limit: number = 6) => `
    *[_type == "article" && language == $lang && featured == true] | order(publishedAt desc) [0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      category,
      author,
      publishedAt
    }
  `,

  // Get article by slug
  articleBySlug: (lang: string) => `
    *[_type == "article" && slug.current == $slug && language == $lang][0] {
      ...,
      relatedDestinations[]->{
        name,
        slug
      },
      relatedAttractions[]->{
        title,
        slug,
        images
      }
    }
  `,

  // Get counts for stats
  counts: (lang: string) => `
    {
      "destinations": count(*[_type == "destination" && language == $lang]),
      "attractions": count(*[_type == "attraction" && language == $lang]),
      "hotels": count(*[_type == "hotel" && language == $lang]),
      "restaurants": count(*[_type == "restaurant" && language == $lang]),
      "articles": count(*[_type == "article" && language == $lang])
    }
  `,
};

// Typed fetch functions
export async function getDestinations(lang: string) {
  if (!client) return [];
  return client.fetch(queries.allDestinations(lang), { lang });
}

export async function getDestinationBySlug(slug: string, lang: string) {
  if (!client) return null;
  return client.fetch(queries.destinationBySlug(lang), { slug, lang });
}

export async function getAttractionsByDestination(destinationId: string, lang: string) {
  if (!client) return [];
  return client.fetch(queries.attractionsByDestination(lang), { destinationId, lang });
}

export async function getFeaturedAttractions(lang: string, limit = 12) {
  if (!client) return [];
  return client.fetch(queries.featuredAttractions(lang, limit), { lang });
}

export async function getAllAttractions(lang: string) {
  if (!client) return [];
  return client.fetch(queries.allAttractions(lang), { lang });
}

export async function getAttractionBySlug(slug: string, lang: string) {
  if (!client) return null;
  return client.fetch(queries.attractionBySlug(lang), { slug, lang });
}

export async function getAllHotels(lang: string) {
  if (!client) return [];
  return client.fetch(queries.allHotels(lang), { lang });
}

export async function getHotelsByDestination(destinationId: string, lang: string) {
  if (!client) return [];
  return client.fetch(queries.hotelsByDestination(lang), { destinationId, lang });
}

export async function getAllRestaurants(lang: string) {
  if (!client) return [];
  return client.fetch(queries.allRestaurants(lang), { lang });
}

export async function getRestaurantsByDestination(destinationId: string, lang: string) {
  if (!client) return [];
  return client.fetch(queries.restaurantsByDestination(lang), { destinationId, lang });
}

export async function getAllArticles(lang: string) {
  if (!client) return [];
  return client.fetch(queries.allArticles(lang), { lang });
}

export async function getFeaturedArticles(lang: string, limit = 6) {
  if (!client) return [];
  return client.fetch(queries.featuredArticles(lang, limit), { lang });
}

export async function getArticleBySlug(slug: string, lang: string) {
  if (!client) return null;
  return client.fetch(queries.articleBySlug(lang), { slug, lang });
}

export async function getCounts(lang: string) {
  if (!client) return { destinations: 0, attractions: 0, hotels: 0, restaurants: 0, articles: 0 };
  return client.fetch(queries.counts(lang), { lang });
}
