"use client"
import { Media, Product } from "@/payload-types";
import { User } from "payload";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext<any>(null);


type cartItems = {
    id: string;
    image: Media;
    price: number | null;
    salePrice: number | null;
    title: string;
    quantity: number;
}

const CartProvider = ({ children }: { children: React.ReactNode }) => {


    const user = false;
    const [sideCartOpen, setSideCartOpen] = useState(false);


    // useEffect(() => {
    //     const updateCart = async () => {
    //         const localCart: cartItems[] = JSON.parse(
    //             localStorage.getItem('cartItems') || '[]'
    //         )
    //         if (localCart.length > 0) {
    //             const response = await fetch('/api/cart/add', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     user: (user as unknown as User).id,
    //                     items: localCart,
    //                 }),
    //             })
    //         }
    //     }
    //     updateCart();
    // }, [user])



    const addToCart = async (product: Product) => {
        const id = product.id;
        const image = product.images?.[0]?.image as Media;
        const price = product.price;
        const salePrice = product.salePrice;
        const title = product.title;

        if (!user) {
            const localCart: cartItems[] = JSON.parse(
                localStorage.getItem('cartItems') || '[]'
            )
            const existingItem = localCart.find((item) => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                localCart.push({
                    id,
                    image,
                    price: price || null,
                    salePrice: salePrice || null,
                    title,
                    quantity: 1,
                })
            }

            localStorage.setItem('cartItems', JSON.stringify(localCart))
        } else {
            const localCart: cartItems[] = JSON.parse(
                localStorage.getItem('cartItems') || '[]'
            )
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: (user as unknown as User).id,
                    items: localCart,
                }),
            })
            console.log(response, 'response');

        }

        setSideCartOpen(true);
    }



    return (
        <CartContext.Provider value={{ addToCart, sideCartOpen, setSideCartOpen }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;