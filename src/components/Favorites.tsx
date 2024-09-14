'use client'
import React from 'react'
import { useProductContext } from '../app/context/ProductContext'
import Link from 'next/link'

function Favorites() {
    const { cart, favorites, removeFromFavorites, addToCart } = useProductContext()
    return (
        <main className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorites added</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {favorites.map((product) => {
                        const isInCart = cart.some(item => item.id === product.id);
                        return (
                            <div key={product.id} className="border text-sm p-4 rounded w-64 h-[370px] flex flex-col justify-between">
                                <Link href={`/products/${product.id}`} className="flex flex-col items-center">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="w-52 h-52 object-cover mb-4"
                                    />
                                    <p className="text-base font-semibold text-center">{product.title}</p>
                                    <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                                </Link>
                                <div className="flex justify-between w-full">
                                    <button
                                        onClick={() => addToCart(product)}
                                        className={`hover:-skew-x-12 duration-150 text-white px-4 py-2 ${isInCart ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                                    >
                                        {isInCart ? 'Added to Cart' : 'Add to Cart'}
                                    </button>
                                    <button
                                        onClick={() => removeFromFavorites(product.id)}
                                        className="bg-red-500 hover:-skew-x-12 duration-150 text-white px-4 py-2 hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </main>
    )
}

export default Favorites