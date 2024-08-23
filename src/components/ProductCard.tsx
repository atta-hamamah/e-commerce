import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import CardButtons from './CardButtons';
import Link from 'next/link';
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

function ProductCard({ product }: {
    product: Product
}) {

    return (
        <main className=" w-64 mx-auto  ">
            <Link href={`/products/${product.id}`}>
                <div className=' border shadow-md py-4'>
                    <Image
                        src={product.images[0]}
                        width={9999}
                        height={9999}
                        alt='product'
                        className='w-full h-56'
                    />
                    <p className=' h-12 line-clamp-2 font-semibold text-center text-gray-600'>
                        {product.title}
                    </p>
                    <div className=' mx-3 flex items-center justify-between'>
                        <div className=' text-sm flex gap-1'>
                            {product.discountPercentage &&
                                <p className=' text-red-600 line-through font-semibold '>
                                    {(((product.discountPercentage * product.price) / 100)
                                        +
                                        product.price).toFixed(2)} $
                                </p>}
                            <p className=' text-green-600 font-semibold '>
                                {product.price} $
                            </p>
                        </div>
                        <div className=' flex items-center gap-1 '>
                            <p className='leading-3 text-lg text-gray-500'>{product.rating}</p>
                            <IoIosStar className=' -mt-0.5 text-xl text-[#FFD700]' />
                        </div>
                    </div>
                </div>
            </Link>
            <CardButtons product={product} />
        </main>
    )
}

export default ProductCard