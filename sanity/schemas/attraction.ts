import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'attraction',
  title: 'Attraction',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
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
      validation: (Rule) => Rule.required().min(50).max(300),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Landmarks', value: 'landmarks' },
          { title: 'Museums', value: 'museums' },
          { title: 'Entertainment', value: 'entertainment' },
          { title: 'Nature', value: 'nature' },
          { title: 'Shopping', value: 'shopping' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Religious', value: 'religious' },
          { title: 'Adventure', value: 'adventure' },
        ],
      },
      validation: (Rule) => Rule.required(),
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
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
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
        {
          name: 'address',
          title: 'Address',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'coordinates',
          title: 'Coordinates',
          type: 'geopoint',
        },
      ],
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
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: ['USD', 'EUR', 'GBP', 'AED', 'JPY', 'CNY'],
          },
        },
        {
          name: 'adult',
          title: 'Adult Price',
          type: 'number',
        },
        {
          name: 'child',
          title: 'Child Price',
          type: 'number',
        },
        {
          name: 'notes',
          title: 'Pricing Notes',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display this attraction in featured sections',
      initialValue: false,
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
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
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO title (60 chars max)',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'SEO description (160 chars max)',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      subtitle: 'destination.name',
    },
  },
});
