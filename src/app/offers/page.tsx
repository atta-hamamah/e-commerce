import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/Search";
import { Metadata } from "next";
import { Product } from "@/types";
import { MdAlignHorizontalLeft, MdAlignHorizontalRight } from "react-icons/md";

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
  const bestProducts = data?.products.filter(e => {
    return (
      e.discountPercentage && (e.discountPercentage > 18)
    )
  }
  ) ?? []

  return (
    <main className=' mt-8 p-8 bg-white h-full grid grid-cols-6 gap-x-4 gap-y-16'>
      <div className=" px-8 col-span-6 fixed top-28 left-0 flex w-full  justify-between">
        <Categories />
        <div className=" rounded-full bg-white p-1 h-fit w-fit flex gap-2 items-center justify-center text-xl font-semibold ">
          <MdAlignHorizontalRight className=" text-[#1d4671]" />
          <p className=" text-gray-600">Products with discount more than </p>
          <span className="text-green-400"> 18 %</span>
          <MdAlignHorizontalLeft className=" text-[#1d4671]" />
        </div>
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
