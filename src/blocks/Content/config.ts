import type { Block, Field } from 'payload'

import { Carousel } from '@/blocks/Carousel/Carousel'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { link } from '@/fields/link'
import { FormBlock } from '@/blocks/Form/config'


const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      { label: 'One Third', value: 'oneThird' },
      { label: 'Half', value: 'half' },
      { label: 'Two Thirds', value: 'twoThirds' },
      { label: 'Full', value: 'full' },
    ],
  },

  // 🔥 REPLACE richText WITH BLOCKS
  {
    name: 'content',
    type: 'blocks',
    blocks: [
      {
        slug: 'text',
        fields: [
          {
            name: 'richText',
            type: 'richText',
          },
        ],
      },

      MediaBlock,
      Carousel,
      CallToAction,
      FormBlock
    ],
  },

  {
    name: 'enableLink',
    type: 'checkbox',
  },

  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}