import ProductCard from "@/components/ProductCard";
import { Metadata } from "next";
import Categories from "@/components/Categories";
import Search from "@/components/Search";
import { Product } from '../../types';
import Pagination from "@/components/Pagination";

type Data = {
  products: Product[];
  total: number;
}

export const metadata: Metadata = {
  title: "all products",
  description: "best online market",
}

type SearchParams = {
  category: string;
  search: string;
  page: string;
}

export default async function page({ searchParams: { category, search, page = "1" } }:
  { searchParams: SearchParams }) {
  const pageSize = 12;
  const currentPage = parseInt(page);

  const url = `https://dummyjson.com/products?delay=1000&limit=0`;
  let data: Data | null = null;

  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  let filteredProducts: Product[] = [];

  if (data?.products) {
    filteredProducts = data.products;

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
    <main className='mt-8 relative p-8 bg-white h-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'>
      <div className="px-8 col-span-full fixed top-28 left-0 flex w-full justify-between ">
        <Categories />
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
          <div className=" col-span-full mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              category={category}
              search={search}
            />
          </div>
        </>
      ) : (
        <p className="col-span-6 self-center text-gray-400 text-3xl font-semibold">No products found</p>
      )}
    </main>
  )
}