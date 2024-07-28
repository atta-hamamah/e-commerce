'use client'

import { FaAngleDoubleRight, FaList } from "react-icons/fa";
import { useState, useEffect } from "react"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

function Categories() {
    const [categories, setCategories] = useState<string[] | null>(null)
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

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

    const handleCategoryClick = (category: string) => {
        const current = new URLSearchParams(searchParams.toString())
        current.set('category', category)
        current.set('page', '1')
        const search = current.toString()
        const query = search ? `?${search}` : ""
        router.push(`${pathname}${query}`)
    }

    return (
        <main className="group relative bg-[#1d4671] overflow-hidden hover:overflow-y-auto duration-300 py-2 px-3 w-40 h-10 hover:w-64 hover:h-[480px]">
            <p className="flex items-center gap-1 sticky top-0 text-white font-semibold bg-[#1d4671]">
                <FaList />Categories <FaAngleDoubleRight className="text-lg mx-1 group-hover:rotate-90 duration-300" />
            </p>
            {categories ?
                (
                    <div className="pl-4">
                        {categories.map((category, index) => (
                            <div key={index} onClick={() => handleCategoryClick(category)}>
                                <p className="w-[90%] text-gray-300 mt-1 hover:-skew-x-12 hover:bg-blue-500 hover:text-white hover:font-semibold hover:scale-110 cursor-pointer">
                                    {category}
                                </p>
                            </div>
                        ))}
                    </div>
                )
                :
                (
                    <p className="text-center animate-pulse text-gray-400 font-semibold text-sm">Loading categories...</p>
                )
            }
        </main>
    );
}

export default Categories;