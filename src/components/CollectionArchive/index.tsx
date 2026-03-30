import { cn } from '@/utilities/ui'
import React from 'react'

import { Category, Product, Post, Media } from '@/payload-types'
import { ProductCategoryCard } from '../Card/ProductCategoryCard'

export const CollectionArchive = ({ posts }: { posts: Category[] }) => {

  return (
    <div className={cn('container')}>
      <div className='w-full h-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5'>
        {
          posts?.map((post, i) => {
            return (
              <ProductCategoryCard key={i} post={post} />
            )
          })
        }
      </div>
    </div>
  )
}
