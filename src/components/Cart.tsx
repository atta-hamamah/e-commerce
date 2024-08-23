'use client'
import React, { useState, useEffect } from 'react'
import { useProductContext } from '../app/context/ProductContext'
import Image from 'next/image'
import { Product } from '@/types'

function Cart() {
    const { cart, removeFromCart } = useProductContext()
    const [cartWithQuantity, setCartWithQuantity] = useState<(Product & { quantity: number })[]>([])

    useEffect(() => {
        const updatedCart = cart.map(item => ({ ...item, quantity: 1 }))
        setCartWithQuantity(updatedCart)
    }, [cart])

    const totalPrice = cartWithQuantity.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity > 0) {
            setCartWithQuantity(prevCart =>
                prevCart.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            )
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
            {cartWithQuantity.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {cartWithQuantity.map((item) => (
                            <div key={item.id} className="flex items-center border-b pb-4">
                                <Image
                                    src={item.thumbnail}
                                    alt={item.title}
                                    width={100}
                                    height={100}
                                    className="object-cover mr-4"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold">{item.title}</h2>
                                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            className="bg-gray-200 px-2 py-1 rounded"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className="bg-gray-200 px-2 py-1 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
                        <button className="mt-4 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart