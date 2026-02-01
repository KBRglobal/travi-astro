import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'cuisine',
      title: 'Cuisine Type',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Italian', value: 'italian' },
          { title: 'French', value: 'french' },
          { title: 'Japanese', value: 'japanese' },
          { title: 'Chinese', value: 'chinese' },
          { title: 'Indian', value: 'indian' },
          { title: 'Middle Eastern', value: 'middle-eastern' },
          { title: 'Mediterranean', value: 'mediterranean' },
          { title: 'American', value: 'american' },
          { title: 'Thai', value: 'thai' },
          { title: 'Mexican', value: 'mexican' },
          { title: 'International', value: 'international' },
          { title: 'Seafood', value: 'seafood' },
          { title: 'Steakhouse', value: 'steakhouse' },
          { title: 'Vegetarian', value: 'vegetarian' },
          { title: 'Vegan', value: 'vegan' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'reference',
      to: [{ type: 'destination' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            { name: 'alt', type: 'string', title: 'Alternative text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'coordinates', title: 'Coordinates', type: 'geopoint' },
      ],
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      options: {
        list: [
          { title: '$ - Budget', value: '$' },
          { title: '$$ - Mid-range', value: '$$' },
          { title: '$$$ - Upscale', value: '$$$' },
          { title: '$$$$ - Fine Dining', value: '$$$$' },
        ],
      },
    }),
    defineField({
      name: 'diningStyle',
      title: 'Dining Style',
      type: 'string',
      options: {
        list: [
          { title: 'Fine Dining', value: 'fine-dining' },
          { title: 'Casual Dining', value: 'casual' },
          { title: 'Fast Casual', value: 'fast-casual' },
          { title: 'Cafe', value: 'cafe' },
          { title: 'Bar & Lounge', value: 'bar' },
          { title: 'Buffet', value: 'buffet' },
          { title: 'Food Court', value: 'food-court' },
        ],
      },
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', title: 'Day', type: 'string' },
            { name: 'hours', title: 'Hours', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'reservationRequired',
      title: 'Reservation Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'dressCode',
      title: 'Dress Code',
      type: 'string',
      options: {
        list: [
          { title: 'Casual', value: 'casual' },
          { title: 'Smart Casual', value: 'smart-casual' },
          { title: 'Business Casual', value: 'business-casual' },
          { title: 'Formal', value: 'formal' },
        ],
      },
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Outdoor Seating', value: 'outdoor-seating' },
          { title: 'Private Rooms', value: 'private-rooms' },
          { title: 'Bar', value: 'bar' },
          { title: 'Live Music', value: 'live-music' },
          { title: 'WiFi', value: 'wifi' },
          { title: 'Wheelchair Accessible', value: 'wheelchair-accessible' },
          { title: 'Kids Menu', value: 'kids-menu' },
          { title: 'Parking', value: 'parking' },
          { title: 'Delivery', value: 'delivery' },
          { title: 'Takeout', value: 'takeout' },
        ],
      },
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'reservationUrl',
      title: 'Reservation URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'destination.name',
      media: 'images.0',
    },
  },
});
