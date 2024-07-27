import ProductCard from "@/components/ProductCard";
import { Metadata } from "next";
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
type Data = {
  products: Product[]
}

export const metadata: Metadata = {
  title: "best products",
  description: "rated more than 4.8",
}

export default async function page() {
  const url = `https://dummyjson.com/products/?delay=2000&limit=0`
  let data: Data | null = null
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  const bestProducts = data?.products.filter(e => e.rating > 4.8) ?? []
  return (
    <main className=' p-8 bg-white h-full grid grid-cols-6 gap-x-4 gap-y-16'>
      {data ?
        bestProducts.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
            />
          )
        })
        :
        <p className=" self-center text-gray-400 text-3xl font-semibold">Cant get Data Try again later</p>
      }
    </main >
  )

}
