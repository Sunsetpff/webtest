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
    publicDir: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: '/',
    },
  },
  schema: {
    collections: [
      {
        label: 'Hero Section',
        name: 'hero',
        path: 'content',
        format: 'json',
        documents: [
          {
            label: 'Hero Content',
            name: 'hero',
            path: 'hero',
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
                label: 'Organic %',
                name: 'organic_stat',
              },
              {
                type: 'string',
                label: 'Added Sugars',
                name: 'sugars_stat',
              },
              {
                type: 'string',
                label: 'Countries',
                name: 'countries_stat',
              },
            ],
          },
        ],
      },
      {
        label: 'Products Section',
        name: 'products',
        path: 'content',
        format: 'json',
        documents: [
          {
            label: 'Products',
            name: 'products',
            path: 'products',
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
        ],
      },
      {
        label: 'Our Story Section',
        name: 'story',
        path: 'content',
        format: 'json',
        documents: [
          {
            label: 'Story',
            name: 'story',
            path: 'story',
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
        ],
      },
      {
        label: 'Partnership Section',
        name: 'partnership',
        path: 'content',
        format: 'json',
        documents: [
          {
            label: 'Partnership',
            name: 'partnership',
            path: 'partnership',
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
        ],
      },
      {
        label: 'Where to Buy Section',
        name: 'whereToBuy',
        path: 'content',
        format: 'json',
        documents: [
          {
            label: 'Where to Buy',
            name: 'whereToBuy',
            path: 'where-to-buy',
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
