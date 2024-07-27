'use client'
import Link from "next/link";
import { FaAngleDoubleRight, FaList } from "react-icons/fa";
import { useState, useEffect } from "react"
import { usePathname } from 'next/navigation';

function Categories() {
    const [categories, setCategories] = useState<string[] | null>(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products/category-list");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData()
    }, [])
    const pathname = usePathname()
    console.log(pathname)
    return (
        <main className="group relative bg-[#1d4671] overflow-hidden hover:overflow-y-auto duration-300 py-2 px-3 w-40 h-10 hover:w-64 hover:h-[480px]">
            <p className="flex items-center gap-1 sticky top-0 text-white font-semibold bg-[#1d4671]">
                <FaList />Categories <FaAngleDoubleRight className="text-lg mx-1 group-hover:rotate-90 duration-300" />
            </p>
            {categories ?
                (
                    <div className="pl-4">
                        {categories.map((category, index) => (
                            <Link key={index} href={`&category=${category}`}>
                                <p className="w-[90%] text-gray-300 mt-1 hover:-skew-x-12 hover:bg-blue-500 hover:text-white hover:font-semibold hover:scale-110">
                                    {category}
                                </p>
                            </Link>
                        ))}
                    </div>
                )
                :
                (
                    <p className=" text-center animate-pulse text-gray-400 font-semibold text-sm">Loading categories...</p>
                )

            }

        </main>
    );
}

export default Categories;
