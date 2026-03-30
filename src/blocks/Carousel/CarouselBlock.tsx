'use client'
import Image from 'next/image'
import React from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export const CarouselBlock = ({ slides, autoplay, delay }: { slides: any, autoplay: boolean, delay: number }) => {
    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            {...(autoplay && { autoplay: { delay: delay } })}
            {...(autoplay ? { loop: true } : { loop: false })}>
            {slides.map((slide: any) => (
                <SwiperSlide key={slide.id} className='relative h-[500px]!'>
                    <Image src={slide?.image?.url} alt={slide.image?.alt} fill className='object-cover' />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}