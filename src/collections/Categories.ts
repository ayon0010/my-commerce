import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'Headline Text',
      type: 'text',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    {
      name: 'link',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Internal', value: 'internal' },
            { label: 'External', value: 'external' },
          ],
          defaultValue: 'internal',
        },
        {
          name: 'internal',
          type: 'relationship',
          relationTo: ['pages', 'products'],
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'internal',
          },
        },
        {
          name: 'external',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'external',
          },
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
    slugField({
      position: undefined,
      required: true,
    }),
  ],
}
