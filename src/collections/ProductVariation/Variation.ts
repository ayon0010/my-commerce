// src/collections/Variations.ts
import { CollectionConfig } from 'payload'

export const Variations: CollectionConfig = {
    slug: 'variations',
    admin: {
        useAsTitle: 'sku',
    },
    fields: [
        // 🔗 Parent Product
        {
            name: 'product',
            type: 'relationship',
            relationTo: 'products',
            required: true,
        },

        // 🏷️ SKU
        {
            name: 'sku',
            type: 'text',
            unique: true,
            required: true,
        },

        // 💰 Price
        {
            name: 'price',
            type: 'number',
            required: true,
        },

        {
            name: 'salePrice',
            type: 'number',
        },

        // 📦 Stock
        {
            name: 'stock',
            type: 'number',
            defaultValue: 0,
        },

        {
            name: 'inStock',
            type: 'checkbox',
            defaultValue: true,
        },

        // 🎨 Attributes (Size, Color, etc.)
        {
            name: 'attributes',
            type: 'array',
            fields: [
                {
                    name: 'name', // e.g. Color, Size
                    type: 'text',
                    required: true,
                },
                {
                    name: 'value', // e.g. Red, XL
                    type: 'text',
                    required: true,
                },
            ],
        },

        // 🖼️ Optional image per variation
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
    ],
}