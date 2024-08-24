'use client'
import React, { useState, useEffect } from 'react'
import { useProductContext } from '../app/context/ProductContext'
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

    //model logic.........................
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
    const [cardInfo, setCardInfo] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    })

    const handleCheckout = () => {
        window.scrollTo(0, 0);
        setIsCheckoutModalOpen(true);
        toggleScrollLock(true);
    }

    const handleCloseModal = () => {
        setIsCheckoutModalOpen(false);
        toggleScrollLock(false);
    }

    const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCardInfo(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmitPayment = (e: React.FormEvent) => {
        e.preventDefault()
        if (cardInfo.number.length === 14) {
            alert('Payment processed successfully!')
            setIsCheckoutModalOpen(false)
        } else {
            alert('Please enter a valid 14-digit card number.')
        }
    }
    const toggleScrollLock = (isLocked: boolean) => {
        if (isLocked) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    };
    useEffect(() => {
        toggleScrollLock(isCheckoutModalOpen);
        return () => toggleScrollLock(false);
    }, [isCheckoutModalOpen]);
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
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="object-cover mr-4 h-24 w-24 "
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
                                    className="bg-red-500 text-white px-4 py-2 hover:bg-red-600 hover:-skew-x-12 duration-150 "
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
                        <button
                            onClick={handleCheckout}
                            className="mt-4 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
            {isCheckoutModalOpen && (
                <div className=" absolute z-30 h-full overflow-hidden inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                        <form onSubmit={handleSubmitPayment}>
                            <div className="mb-4">
                                <label className="block mb-2">Card Number (14 digits)</label>
                                <input
                                    type="number"
                                    name="number"
                                    value={cardInfo.number}
                                    onChange={handleCardInfoChange}
                                    className="w-full border p-2 rounded"
                                    maxLength={14}
                                    minLength={14}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Cardholder Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={cardInfo.name}
                                    onChange={handleCardInfoChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="flex mb-4">
                                <div className="w-1/2 mr-2">
                                    <label className="block mb-2">Expiry Date</label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={cardInfo.expiry}
                                        onChange={handleCardInfoChange}
                                        placeholder="MM/YY"
                                        className="w-full border p-2 rounded"
                                        required
                                    />
                                </div>
                                <div className="w-1/2 ml-2">
                                    <label className="block mb-2">CVV</label>
                                    <input
                                        type="number"
                                        name="cvv"
                                        value={cardInfo.cvv}
                                        onChange={handleCardInfoChange}
                                        className="w-full border p-2 rounded"
                                        maxLength={3}
                                        minLength={3}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Pay ${totalPrice.toFixed(2)}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart