import { defineConfig } from 'tinacms';

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,
  clientId: process.env.VITE_TINA_CLIENT_ID || '',
  token: process.env.VITE_TINA_TOKEN || '',
  build: {
    outputDirectory: 'admin',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        label: 'Website Content',
        name: 'website',
        path: 'content',
        format: 'json',
        documents: [
          {
            label: 'Hero Section',
            name: 'hero',
            path: 'hero',
            ui: {
              previewSrc: '/src/components/Hero.tsx',
            },
            fields: [
              {
                type: 'string',
                label: 'Main Heading',
                name: 'heading',
              },
              {
                type: 'string',
                label: 'Subheading',
                name: 'subheading',
                ui: {
                  component: 'textarea',
                },
              },
              {
                type: 'string',
                label: 'CTA Button Text',
                name: 'ctaText',
              },
              {
                type: 'object',
                label: 'Stats',
                name: 'stats',
                fields: [
                  {
                    type: 'string',
                    label: 'Organic Percentage',
                    name: 'organic',
                  },
                  {
                    type: 'string',
                    label: 'Added Sugars',
                    name: 'sugars',
                  },
                  {
                    type: 'string',
                    label: 'Countries',
                    name: 'countries',
                  },
                ],
              },
            ],
          },
          {
            label: 'Products Section',
            name: 'products',
            path: 'products',
            ui: {
              previewSrc: '/src/components/Products.tsx',
            },
            fields: [
              {
                type: 'string',
                label: 'Section Title',
                name: 'title',
              },
              {
                type: 'string',
                label: 'Section Description',
                name: 'description',
                ui: {
                  component: 'textarea',
                },
              },
              {
                type: 'object',
                list: true,
                label: 'Products',
                name: 'items',
                fields: [
                  {
                    type: 'string',
                    label: 'Product Name',
                    name: 'name',
                  },
                  {
                    type: 'string',
                    label: 'Description',
                    name: 'description',
                    ui: {
                      component: 'textarea',
                    },
                  },
                  {
                    type: 'string',
                    label: 'Image URL',
                    name: 'image',
                  },
                ],
              },
            ],
          },
          {
            label: 'Our Story Section',
            name: 'story',
            path: 'story',
            ui: {
              previewSrc: '/src/components/OurStory.tsx',
            },
            fields: [
              {
                type: 'string',
                label: 'Section Title',
                name: 'title',
              },
              {
                type: 'string',
                label: 'Story Content',
                name: 'content',
                ui: {
                  component: 'textarea',
                },
              },
              {
                type: 'string',
                label: 'Image URL',
                name: 'image',
              },
            ],
          },
          {
            label: 'Partnership Section',
            name: 'partnership',
            path: 'partnership',
            ui: {
              previewSrc: '/src/components/Partnership.tsx',
            },
            fields: [
              {
                type: 'string',
                label: 'Section Title',
                name: 'title',
              },
              {
                type: 'string',
                label: 'Section Description',
                name: 'description',
                ui: {
                  component: 'textarea',
                },
              },
            ],
          },
          {
            label: 'Where to Buy Section',
            name: 'whereToBuy',
            path: 'where-to-buy',
            ui: {
              previewSrc: '/src/components/WhereToBuy.tsx',
            },
            fields: [
              {
                type: 'string',
                label: 'Section Title',
                name: 'title',
              },
              {
                type: 'object',
                list: true,
                label: 'Retailers',
                name: 'retailers',
                fields: [
                  {
                    type: 'string',
                    label: 'Retailer Name',
                    name: 'name',
                  },
                  {
                    type: 'string',
                    label: 'Website URL',
                    name: 'url',
                  },
                  {
                    type: 'string',
                    label: 'Logo Image URL',
                    name: 'logo',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
