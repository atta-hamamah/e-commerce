'use client'
import React from 'react'
import { useProductContext } from '../app/context/ProductContext'
import Image from 'next/image'

function Favorites() {
    const { favorites, removeFromFavorites, addToCart } = useProductContext()

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorites added</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.map((product) => (
                        <div key={product.id} className="border p-4 rounded">
                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                width={200}
                                height={200}
                                className="object-cover mb-4"
                            />
                            <h2 className="text-xl font-semibold">{product.title}</h2>
                            <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => removeFromFavorites(product.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favorites