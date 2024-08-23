import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/Search";
import { Metadata } from "next";
import { Product } from '../../types'


type Data = {
  products: Product[]
}

export const metadata: Metadata = {
  title: "best products",
  description: "rated more than 4.8",
}

type SearchParams = {
  category: string
  search: string
  page: string
}
export default async function page({ searchParams: { category, search, page } }:
  { searchParams: SearchParams }) {
  const url = `https://dummyjson.com/products/?delay=2000&limit=0`
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
  const bestProducts = data?.products.filter(e => e.rating > 4.8) ?? []

  return (
    <main className=' mt-8 p-8 bg-white h-full grid grid-cols-6 gap-x-4 gap-y-16'>
      <div className=" px-8 col-span-6 fixed top-28 left-0 flex w-full  justify-between">
        <Categories />
        <Search />
      </div>
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
