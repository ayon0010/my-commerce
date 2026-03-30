import type { Post, ArchiveBlock as ArchiveBlockProps, Category, Product } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
    title: string
  }
> = async (props) => {
  const { id, introContent, limit: limitFromProps, populateBy, relationTo, selectedDocs, title, class: ClassName } = props;

  const limit = limitFromProps || 3;

  // let data: Category[] | Product[] | Post[] = [];
  let data: Category[] = [];

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise });
    if (relationTo === 'categories') {
      const categories = await payload.find({
        collection: 'categories',
        limit,
      });
      data = categories.docs as unknown as Category[];
    } else if (relationTo === 'products') {
      const products = await payload.find({
        collection: 'products',
        limit,
      }) as any;
      data = products.docs as Product[];
      data = products.docs as unknown as Product[];
    } else if (relationTo === 'posts') {
      const posts = await payload.find({
        collection: 'posts',
        limit,
      });
      data = posts.docs as unknown as Post[];
    }
  }
  // let posts: Post[] = []

  // if (populateBy === 'collection') {
  //   const payload = await getPayload({ config: configPromise })

  //   const flattenedCategories = categories?.map((category) => {
  //     if (typeof category === 'object') return category.id
  //     else return category
  //   })

  //   const fetchedPosts = await payload.find({
  //     collection: 'posts',
  //     depth: 1,
  //     limit,
  //     ...(flattenedCategories && flattenedCategories.length > 0
  //       ? {
  //         where: {
  //           categories: {
  //             in: flattenedCategories,
  //           },
  //         },
  //       }
  //       : {}),
  //   })

  //   posts = fetchedPosts.docs
  // } else {
  //   if (selectedDocs?.length) {
  //     const filteredSelectedPosts = selectedDocs.map((post) => {
  //       if (typeof post.value === 'object') return post.value
  //     }) as Post[]
  //     posts = filteredSelectedPosts
  //   }
  // }

  return (
    <div className={`${ClassName?.toLowerCase()}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={data} />
    </div>
  )
}
