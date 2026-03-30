import { Category, Media, Product } from '@/payload-types';
import React from 'react'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'


export const ProductCategoryCard = ({ post }: { post: Category }) => {

    return (
        <div className='bg-white p-5 flex flex-col gap-6'>
            <h3 className='text-xl leading-[27px] font-semibold'>{post['Headline Text']}</h3>
            <div>
                {
                    post?.images?.length === 1 ? <>
                        <Image src={post.images[0].image as string} alt={(post.images[0].image as Media)?.alt || ''} width={300} height={300} className='w-full h-[300px] object-cover' />
                    </>
                        :
                        <>
                            <div className='grid grid-cols-2 gap-4'>
                                {
                                    post.images?.map((image, i) => {
                                        const { url, alt, caption } = image.image as any;
                                        return (
                                            <div key={i} className='flex flex-col gap-1'>
                                                <Image src={url as string} alt={alt as string || 'Image'} width={300} height={100} className='w-full h-[102px] object-cover' />
                                                <RichText className='text-[15px] leading-[20px]' data={caption} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                }
            </div>
            <div className='text-[13px] leading-[17px] font-medium text-blue-800'>
                <Link href={`${post.link?.external}`}>
                    {post.link?.label}
                </Link>
            </div>
        </div>
    )
}