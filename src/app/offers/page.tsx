import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import Search from "@/components/Search";
import { Metadata } from "next";
import { Product } from "@/types";
import { MdAlignHorizontalLeft, MdAlignHorizontalRight } from "react-icons/md";
import Pagination from "@/components/Pagination";

type Data = {
  products: Product[];
  total: number;
}

export const metadata: Metadata = {
  title: "best offers",
  description: "products with discount more than 18%",
}

type SearchParams = {
  category: string;
  search: string;
  page: string;
}

export default async function page({ searchParams: { category, search, page = '1' } }:
  { searchParams: SearchParams }) {
  const pageSize = 12;
  const currentPage = parseInt(page);

  const url = `https://dummyjson.com/products/?delay=1000&limit=0`;
  let data: Data | null = null;

  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  let filteredProducts: Product[] = [];

  if (data?.products) {
    filteredProducts = data.products.filter(e => e.discountPercentage && e.discountPercentage > 18);

    if (category) {
      filteredProducts = filteredProducts.filter(e => e.category === category);
    }

    if (search) {
      filteredProducts = filteredProducts.filter(e => (
        e.title.toLowerCase().includes(search.toLowerCase())
      ));
    }
  }

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <main className='mt-8 relative p-8 bg-white h-full grid grid-cols-6 gap-6'>
      <div className="px-8 col-span-6 fixed top-28 left-0 flex w-full justify-between">
        <Categories />
        <div className="rounded-full bg-white p-1 h-fit w-fit flex gap-2 items-center justify-center text-xl font-semibold">
          <MdAlignHorizontalRight className="text-[#1d4671]" />
          <p className="text-gray-600">More than</p>
          <span className="text-green-400">18%</span>
          <span className="text-green-400">discounts</span>
          <MdAlignHorizontalLeft className="text-[#1d4671]" />
        </div>
        <Search />
      </div>
      {paginatedProducts.length > 0 ? (
        <>
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
          <div className="col-span-6 mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              category={category}
              search={search}
            />
          </div>
        </>
      ) : (
        <p className="col-span-6 self-center text-gray-400 text-3xl font-semibold">No best offers found</p>
      )}
    </main>
  )
}