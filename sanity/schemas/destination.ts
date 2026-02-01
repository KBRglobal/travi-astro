import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'destination',
  title: 'Destination',
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
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'continent',
      title: 'Continent',
      type: 'string',
      options: {
        list: [
          { title: 'Africa', value: 'africa' },
          { title: 'Asia', value: 'asia' },
          { title: 'Europe', value: 'europe' },
          { title: 'North America', value: 'north-america' },
          { title: 'South America', value: 'south-america' },
          { title: 'Oceania', value: 'oceania' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short catchy phrase (e.g., "The City of Lights")',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(100).max(500),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
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
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
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
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      description: 'e.g., Asia/Dubai, Europe/Paris',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      description: 'e.g., AED, EUR, USD',
    }),
    defineField({
      name: 'language',
      title: 'Primary Language',
      type: 'string',
    }),
    defineField({
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'climate',
      title: 'Climate',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'icon', title: 'Icon', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display this destination in featured sections',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
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
      subtitle: 'country',
      media: 'heroImage',
    },
  },
});
