import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'

export const Cart: CollectionConfig = {
    slug: 'cart',
    access: {
        read: authenticated,
        create: authenticated,
        update: authenticated,
        delete: authenticated,
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
        {
            name: 'items',
            type: 'array',
            fields: [
                {
                    name: 'product',
                    type: 'relationship',
                    relationTo: 'products',
                },
                {
                    name: 'quantity',
                    type: 'number',
                    required: true,
                },
                {
                    name: 'price',
                    type: 'number',
                    required: true,
                },
                {
                    name: 'salePrice',
                    type: 'number',
                    required: false,
                },
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'image',
                    type: 'text',
                    required: false,
                }
            ],
        },
    ],
}