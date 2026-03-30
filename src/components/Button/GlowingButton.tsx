"use client"
import { useCart } from '@/app/(frontend)/Hooks/useCart';
import { Product } from '@/payload-types';
import React from 'react'

const GlowingButton = ({ text, product }: { text: string, product: Product }) => {
    const { addToCart } = useCart();

    return (
        <button
            type="button"
            onClick={() => addToCart(product)}
            title={text}
            className="
        relative group overflow-hidden 
        px-10 py-4 rounded-sm 
        font-normal text-white uppercase
        bg-blue-600 border border-blue-400/30
        transition-all duration-300
        cursor-pointer
        /* THE GLOW: using arbitrary shadow values */
        shadow-[0_0_15px_rgba(37,99,235,0.5)]
        hover:scale-105 active:scale-95
      ">
            {/* THE SHINE: A sweeping diagonal gradient */}
            <span className="
          absolute top-0 h-full w-24 -skew-x-[25deg]
          bg-gradient-to-r from-transparent via-white/40 to-transparent 
          animate-shine-sweep
        " />

            {/* INNER GLOW OVERLAY */}
            <span className="absolute inset-0 bg-gradient-to-t from-blue-700/50 to-transparent pointer-events-none" />

            <span className="relative z-10">
                {text}
            </span>
        </button>
    )
}

export default GlowingButton;