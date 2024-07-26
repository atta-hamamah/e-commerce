import React from 'react'
import { FaHeartCircleCheck } from 'react-icons/fa6'
import { MdOutlineShoppingCart } from 'react-icons/md'
interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage?: number;
    rating: number;
    stock: number;
    tags: string[];
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: any[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    images: string[];
    thumbnail: string;
}

function CardButtons({ product }: { product: Product }) {
    return (
        <main className=' mt-6 text-white text-lg flex items-center justify-between '>
            <button className=' hover:-skew-x-12 hover:bg-blue-400 duration-150 w-[120px] bg-blue-500  p-2 flex items-center justify-center gap-1'>
                <MdOutlineShoppingCart className=' text-2xl' /> cart
            </button>
            <button className='hover:-skew-x-12 hover:bg-blue-400 duration-150 w-[120px] bg-blue-500 p-2 flex items-center justify-center gap-1'>
                <FaHeartCircleCheck className=' text-2xl' /> favorite
            </button>
        </main>
    )
}

export default CardButtons