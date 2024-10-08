import React from 'react'
import { Product } from '../../../types'
import AddToCartButton from '@/components/AddToCartButton'
import Loading from '../../loading'
async function getProductData(id: number): Promise<Product> {
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch product data')
    }
    return response.json()
}

export default async function ProductPage({ params }: { params: { id: number } }) {
    const product = await getProductData(params.id)
    if (!product) {
        return <Loading />
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="product-images">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="rounded-lg shadow-md h-[500px] w-[500px]"
                    />
                    <div className="mt-4 grid grid-cols-4 gap-2">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${product.title} - Image ${index + 1}`}
                                className="rounded-md shadow-sm w-24 h-24"
                            />
                        ))}
                    </div>
                </div>

                <div className="product-info">
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="mb-4">
                        <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
                        {product.discountPercentage && (
                            <span className="ml-2 text-red-500">
                                ({product.discountPercentage.toFixed(2)}% off)
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Rating:</span> {product.rating.toFixed(1)}/5
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Brand:</span> {product.title}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Category:</span> {product.category}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Stock:</span> {product.stock} units
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">SKU:</span> {product.sku}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Tags:</span> {product.tags.join(', ')}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Shipping:</span> {product.shippingInformation}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Return Policy:</span> {product.returnPolicy}
                    </div>
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    )
}