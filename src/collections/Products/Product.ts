import { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'price', 'stock', 'inStock', 'productType'],
    },
    access: {
        read: () => true,
    },
    versions: {
        drafts: true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            unique: true,
            required: true,
            index: true,
            admin: {
                components: {
                    Field: '@/components/SlugField/Slug',
                },
            },

            hooks: {
                beforeValidate: [
                    async ({ data, value, req, operation }) => {
                        // If user manually edits slug → allow it
                        if (value) {
                            return slugify(value, { lower: true, strict: true })
                        }

                        // Auto-generate from title
                        if (data?.title) {
                            const baseSlug = slugify(data.title, {
                                lower: true,
                                strict: true,
                            })

                            let slug = baseSlug
                            let counter = 1

                            // 🚨 Check duplicates
                            while (true) {
                                const existing = await req.payload.find({
                                    collection: 'products',
                                    where: {
                                        slug: {
                                            equals: slug,
                                        },
                                    },
                                })

                                const isDuplicate = existing.docs.some(doc => {
                                    // ignore current doc when updating
                                    if (operation === 'update') {
                                        return doc.id !== data.id
                                    }
                                    return true
                                })

                                if (!isDuplicate) break

                                slug = `${baseSlug}-${counter++}`
                            }

                            return slug
                        }

                        return value
                    },
                ],
            },
        },
        {
            name: 'description',
            type: 'richText',
        },
        {
            name: 'Product Type',
            type: "select",
            options: [
                {
                    label: 'Variable',
                    value: 'variable',
                },
                {
                    label: 'Simple',
                    value: 'simple',
                },
            ]
        },
        // 🟢 Pricing
        {
            name: 'price',
            type: 'number',
            required: true,
            admin: {
                condition: (data) => data['Product Type'] === 'simple',
            }
        },
        {
            name: 'salePrice',
            type: 'number',
            admin: {
                condition: (data) => data['Product Type'] === 'simple',
            }
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
        },
        {
            name: 'Rating',
            type: "checkbox",
            label: "Enable Rating",
            defaultValue: false,
        },
        {
            name: 'Weight',
            type: 'number',
            admin: {
                condition: (data) => data['Product Type'] === 'simple',
            }
        },
        // 🟢 Images (like WooCommerce gallery)
        {
            name: 'images',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media', // your media collection
                    required: true,
                },
            ],
        },
        // 🔗 Link to variations
        {
            name: 'variations',
            type: 'relationship',
            relationTo: 'variations',
            hasMany: true,
        },
        // 🟢 Stock
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
        {
            name: 'sku',
            type: 'text',
            unique: true,
        },
        {
            name: 'customFields',
            type: 'array',
            label: 'Custom Fields',

            fields: [
                {
                    name: 'key',
                    type: 'text',
                    required: true,
                    label: 'Field Name',
                },
                {
                    name: 'value',
                    type: 'text', // or richText / number / select
                    required: true,
                    label: 'Field Value',
                },
            ],
            admin: {
                isSortable: true
            }
        },
        {
            name: 'seo',
            type: 'group',
            fields: [
                { name: 'metaTitle', type: 'text' },
                { name: 'metaDescription', type: 'textarea' },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                },
            ],
        },
    ],
}