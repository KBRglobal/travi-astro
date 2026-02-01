import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hotel',
  title: 'Hotel',
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
      name: 'destination',
      title: 'Destination',
      type: 'reference',
      to: [{ type: 'destination' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'starRating',
      title: 'Star Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5).integer(),
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
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'WiFi', value: 'wifi' },
          { title: 'Pool', value: 'pool' },
          { title: 'Gym', value: 'gym' },
          { title: 'Spa', value: 'spa' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Bar', value: 'bar' },
          { title: 'Parking', value: 'parking' },
          { title: 'Pet Friendly', value: 'pet-friendly' },
          { title: 'Beach Access', value: 'beach-access' },
          { title: 'Airport Shuttle', value: 'airport-shuttle' },
          { title: '24/7 Reception', value: '24-7-reception' },
          { title: 'Room Service', value: 'room-service' },
        ],
      },
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'object',
      fields: [
        { name: 'currency', title: 'Currency', type: 'string' },
        { name: 'min', title: 'Min Price/Night', type: 'number' },
        { name: 'max', title: 'Max Price/Night', type: 'number' },
      ],
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
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      description: 'Direct booking or affiliate link',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'rating',
      title: 'User Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(10),
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
