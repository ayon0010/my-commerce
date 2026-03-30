'use client'

import { useField, useFormFields } from '@payloadcms/ui'
import slugify from 'slugify'
import { useEffect } from 'react'

export default function SlugField(props: any) {
    const { path } = props

    const { value, setValue } = useField<string>({ path })

    // get title field live
    const title = useFormFields(([fields]) => fields.title?.value)

    const editSlug = useFormFields(([fields]) => fields.editSlug?.value)

    useEffect(() => {
        // only auto-update if NOT manually editing
        if (!editSlug && title) {
            const newSlug = slugify(title, {
                lower: true,
                strict: true,
            })

            setValue(newSlug)
        }
    }, [title, editSlug, setValue])

    return (
        <div className='' style={{ marginBottom: '10px', marginTop: '10px' }}>
            <label className='block' style={{ marginBottom: '5px' }}>Slug</label>
            <input
                type='text'
                placeholder='Slug'
                title='Slug'
                aria-label='Slug'
                value={value || ''}
                onChange={(e) => setValue(e.target.value)}
                className='block w-full'
                style={{
                    width: '100%',
                    padding: '10px',
                    opacity: editSlug ? 1 : 0.6,
                    marginTop: '5px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '5px',
                }}
            />
        </div>
    )
}