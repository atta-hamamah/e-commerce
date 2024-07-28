import ProductCard from "@/components/ProductCard";
import { Metadata } from "next";
import Categories from "@/components/Categories";
import Search from "@/components/Search";
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
  title: "all products",
  description: "best online market",
}
type SearchParams = {
  category: string
  search: string
  page: string
}
export default async function page({ searchParams: { category, search, page } }:
  { searchParams: SearchParams }) {

  const url = `https://dummyjson.com/products/?limit=0&delay=2000`
  let data: Data | null = null
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  if (category && data?.products) {
    data.products = data.products.filter(e => e.category === category)
  }
  if (search && data?.products) {
    data.products = data.products.filter(e => (
      e.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    ))
  }
  if (page && data?.products) {
    const pageNum = parseInt(page);
    const pageSize = 30
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = pageNum * pageSize;
    data.products = data?.products.slice(startIndex, endIndex);
  }
  return (
    <main className=' mt-8 relative p-8 bg-white h-full grid grid-cols-6 gap-6'>
      <div className=" px-8 col-span-6 fixed top-28 left-0 flex w-full  justify-between">
        <Categories />
        <Search />
      </div>
      {data ?
        data.products.map((product) => {
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
