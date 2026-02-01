import { defineCollection, z } from 'astro:content';

const attractionsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string(),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
      address: z.string().optional(),
    }),
    images: z.array(z.string()).optional(),
    rating: z.number().min(0).max(5).optional(),
    priceRange: z.string().optional(),
    openingHours: z.string().optional(),
    website: z.string().url().optional(),
    phone: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    publishedAt: z.date().optional(),
  }),
});

const destinationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    category: z.string(),
    featured: z.boolean().default(false),
    publishedAt: z.date(),
    author: z.string().optional(),
  }),
});

export const collections = {
  attractions: attractionsCollection,
  destinations: destinationsCollection,
};
