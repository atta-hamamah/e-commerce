import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "e-commerce",
  description: "best online market landing page",
};

export default function Home() {

  return (
    <main className=' bg-white w-full h-[calc(100vh-296px)] flex flex-col md:flex-row items-center justify-center gap-2 lg:gap-8'>
      <Link
        className=" h-20 md:h-[75%] py-2 border-y-4 border-transparent  hover:z-10 hover:border-t-blue-500 hover:border-b-[#1d4671] hover:scale-125 -skew-x-12 duration-300 "
        href='/products?page=1'>
        <p className=" flex items-center justify-center w-52 h-full hover:shadow-md hover:shadow-gray-300 bg-gray-400 hover:bg-gray-300 font-semibold text-white text-2xl duration-300">
          All Products
        </p>
      </Link>
      <Link
        className=" h-20 md:h-[75%] py-2 border-y-4 border-transparent hover:z-10 hover:border-t-blue-500 hover:border-b-[#1d4671] hover:scale-125 -skew-x-12 duration-300 "
        href='best'>
        <p className=" flex items-center justify-center w-52 h-full hover:shadow-md hover:shadow-blue-500 bg-blue-500 hover:bg-blue-400 font-semibold text-white text-2xl duration-300">
          Best Products
        </p>
      </Link>
      <Link
        className=" h-20 md:h-[75%] py-2 border-y-4 border-transparent hover:z-10 hover:border-t-blue-500 hover:border-b-[#1d4671] hover:scale-125 -skew-x-12 duration-300 "
        href='offers'>
        <p className=" flex items-center justify-center w-52 h-full hover:shadow-md hover:shadow-blue-700 bg-blue-700 hover:bg-blue-600 font-semibold text-white text-2xl duration-300">
          Best Offers
        </p>
      </Link>
    </main >
  )

}
