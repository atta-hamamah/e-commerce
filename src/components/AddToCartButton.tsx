'use client'
import React from 'react'
import { useProductContext } from '../app/context/ProductContext'
import { Product } from '../types'

export default function AddToCartButton({ product }: { product: Product }) {
    const { addToCart, cart } = useProductContext()
    const isInCart = cart.some(item => item.id === product.id);

    const handleAddToCart = () => {
        addToCart(product)
    }

    return (
        <button
            disabled={isInCart}
            onClick={handleAddToCart}
            className={`mt-4 ${isInCart ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-700'} hover:-skew-x-12  text-white font-bold py-2 px-4 `}
        >
            {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
    )
}