import { getPayload } from 'payload';
import configPromise from '@payload-config'
import Image from 'next/image';
import type { Media } from '@/payload-types';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';

const RenderProducts = async () => {
    const payload = await getPayload({ config: configPromise });
    const products = await payload.find({
        collection: 'products',
        draft: false,
        limit: 20,
        pagination: true,
    });

    // const products = await fetch('https://fakestoreapi.com/products');
    // const productsData = await products.json();

    // console.log(productsData);



    return (
        <div className='container py-10'>
            <div className='flex items-stretch gap-10 h-full w-full'>
                <div className='w-[25%] bg-green-400'>
                    Ayon
                </div>
                <div className='w-[75%] grid grid-cols-3 divide-x divide-gray-200'>
                    {
                        products.docs.map((product) => {
                            const image = product.images?.[0]?.image as Media;
                            const { url } = image;
                            const firstField = product.customFields?.[0]?.value;
                            return (
                                <section key={product.id} className='border-b border-t border-t-gray-200 border-b-gray-200 py-4'>
                                    <Link href={`/product/${product.slug}`}>
                                        <div className='flex flex-col gap-5 px-3'>
                                            <Image className='w-[270px] h-[379px] object-cover object-center rounded-2xl block' src={url as string} alt={product.title} width={270} height={379} />
                                            <div className='flex flex-col gap-2'>
                                                <h2 className='text-xl leading-6 font-semibold hover:text-primary transition-colors duration-300 cursor-pointer w-fit'>
                                                    <Link href={`/product/${product.slug}`}>
                                                        {product.title}
                                                    </Link>
                                                </h2>
                                                {product.Rating && <div className='flex items-center gap-2'>
                                                    <span className='text-sm'>5.0</span>
                                                    <StarIcon size={14} className='' />
                                                </div>}
                                                {
                                                    firstField && <span className='block w-fit'>
                                                        {firstField}
                                                    </span>
                                                }
                                                <div className='flex gap-3 items-center'>
                                                    <span className='line-through text-base font-medium'>{product.price} {process.env.NEXT_CURRENCY}</span>
                                                    <span className='text-orange-700 font-bold text-xl'>{product.salePrice} {process.env.NEXT_CURRENCY}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </section>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default RenderProducts;