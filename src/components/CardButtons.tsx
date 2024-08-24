'use client'
import React from 'react'
import { FaHeartCircleCheck } from 'react-icons/fa6'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useProductContext } from '../app/context/ProductContext'
import { Product } from '../types'
function CardButtons({ product }: { product: Product }) {
    const { addToFavorites, addToCart, favorites, cart } = useProductContext();

    const isInFavorites = favorites.some(item => item.id === product.id);
    const isInCart = cart.some(item => item.id === product.id);

    const handleAddToFavorites = () => {
        if (!isInFavorites) {
            addToFavorites(product);
        }
    };

    const handleAddToCart = () => {
        if (!isInCart) {
            addToCart(product);
        }
    };

    return (
        <main className='mt-6 text-white text-sm flex items-center justify-between'>
            <button
                onClick={handleAddToCart}
                className={`hover:-skew-x-12  duration-150 w-[120px] ${isInCart ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-400'} p-2 flex items-center justify-center gap-0.5`}
            >
                <MdOutlineShoppingCart className='text-2xl' />
                {isInCart ? 'In Cart' : 'Add to Cart'}
            </button>
            <button
                onClick={handleAddToFavorites}
                className={`hover:-skew-x-12 duration-150 w-[120px] ${isInFavorites ? 'bg-red-500' : 'bg-blue-500  hover:bg-blue-400'} p-2 flex items-center justify-center gap-0.5`}
            >
                <FaHeartCircleCheck className='text-2xl' />
                {isInFavorites ? 'Favorited' : 'Favorite'}
            </button>
        </main>
    )
}

export default CardButtons