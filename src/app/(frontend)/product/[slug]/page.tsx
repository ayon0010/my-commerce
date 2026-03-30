import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@payload-config'
import Image from 'next/image'
import { Media, Product } from '@/payload-types'
import GlowingButton from '@/components/Button/GlowingButton'


function extractText(description: any): string {
    if (!description?.root?.children) return ''

    return description.root.children
        .map((node: any) =>
            node.children?.map((child: any) => child.text).join('')
        )
        .join(' ')
}

function truncate(text: string, limit: number) {
    if (text.length <= limit) return text
    return text.slice(0, limit) + '...'
}


export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const products = await payload.find({
        collection: 'products',
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: {
            slug: true,
        },
    })
    return products.docs?.map(({ slug }) => {
        return { slug }
    })
}

type Args = {
    params: Promise<{
        slug?: string
    }>
}

export default async function ProductPage({ params: paramsPromise }: Args) {
    const { slug = "" } = await paramsPromise;
    const payload = await getPayload({ config: configPromise })
    const singleProduct = await payload.find({
        collection: 'products',
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    })

    const { images, title, description, stock } = singleProduct.docs?.[0] || {};
    const customFields = singleProduct.docs?.[0]?.customFields || [];
    const author = customFields.find((field: { key: string }) => field.key.toLocaleLowerCase() === 'author')?.value || '';
    const totalImages = images?.length || 0;
    const mainImage = images?.[0]?.image as Media;
    const salePrice = singleProduct.docs?.[0]?.salePrice || 0;
    const price = singleProduct.docs?.[0]?.price || 1;
    const discountPercentage = Math.floor(((price - salePrice) / price) * 100);
    const text = truncate(extractText(description), 120)

    return (
        <div className='container py-10 bg-[#F1F2F4]'>
            <div className='flex items-start w-full shadow-sm rounded-sm gap-10 bg-white'>
                <div className='p-8 my-6 ml-6 border border-black/30 rounded-sm relative'>
                    {totalImages === 1 &&
                        <Image className='aspect-[240/320] w-[240px] h-[320px] object-cover' src={mainImage.url as string} alt={mainImage.alt as string} width={240} height={320} />
                    }
                    {
                        discountPercentage > 0 && (
                            <div className='absolute top-3 left-3 w-[50px] h-[50px] bg-[url(/api/media/file/discount.svg)] bg-cover bg-center text-[13px] font-semibold text-white'>
                                <span className='ml-[12px] mt-[10px] block w-fit'>{discountPercentage}</span>
                            </div>
                        )
                    }
                </div>
                <div className='flex my-6 flex-col gap-4 flex-[2_0_0]'>
                    <div className='flex flex-col gap-2 border-b pb-3 border-b-gray-300'>
                        <h1 className='text-xl leading-6 font-light'>{title}</h1>
                        {author && (
                            <p className='text-sm'>By <span>{author}</span></p>
                        )}
                    </div>
                    <div className='pb-3 border-b border-b-gray-300'>
                        <p className='text-base'>{text} <span className='text-blue-500'>See More</span></p>
                    </div>
                    <div className='flex gap-3 flex-col'>
                        {salePrice > 0 && (
                            <div className='flex gap-3 items-center'>
                                <span className='line-through text-base font-medium'>{price} {process.env.NEXT_CURRENCY}</span>
                                <span className='text-orange-700 font-bold text-xl'>{salePrice} {process.env.NEXT_CURRENCY}</span>
                            </div>
                        )}
                        {
                            stock && stock > 0 && (
                                <div className='flex items-center gap-2'>
                                    <Image src='/api/media/file/in-stock(mini).svg' alt='In Stock' width={20} height={20} />
                                    <span className='text-sm text-gray-500'>In Stock: {stock}</span>
                                </div>
                            )
                        }
                        {
                            stock && stock > 0 && (
                                <span className='text-lg text-black'>
                                    স্টক শেষ হওয়ার আগেই অর্ডার করুন।
                                </span>
                            )
                        }
                    </div>
                    <div className='flex items-center gap-6'>
                        <button title={'Add to Wishlists'} className="px-6 py-4 rounded-sm text-black uppercase border border-blue-400/30 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-95">
                            <span className="relative z-10">
                                Add to Wishlist
                            </span>
                        </button>
                        <GlowingButton text='Add to Cart' product={singleProduct.docs?.[0] as unknown as Product} />
                    </div>
                </div>
                <div className='flex-[1_0_0] bg-[#F6F6F6] h-full p-6'>
                    <h2 className='text-xl leading-6 font-medium text-black'>
                        এ জাতীয় আরো বই দেখুন।
                    </h2>
                </div>
            </div>
        </div>
    )
}


export async function generateMetadata({ params: paramsPromise }: Args) {
    const payload = await getPayload({ config: configPromise })
    const { slug = "" } = await paramsPromise;

    const singleProduct = await payload.find({
        collection: 'products',
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    })
    const product = singleProduct.docs[0]

    if (!product) {
        return {
            title: 'Product Not Found',
        }
    }

    return {
        title: product.seo?.metaTitle || product.title,
        description:
            product.seo?.metaDescription ||
            product.description?.root?.children?.[0]?.text ||
            '',
        openGraph: {
            title: product.title,
            description:
                product.seo?.metaDescription ||
                '',
            // images: product.images?.[0]?.image?.url
            //     ? [product.images[0].image.url]
            //     : [],
        },
    }
}