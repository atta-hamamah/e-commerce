'use client'

import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        const currentSearchTerm = searchParams.get('search');
        if (currentSearchTerm) {
            setSearchTerm(currentSearchTerm);
        }
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const current = new URLSearchParams(searchParams.toString())
        if (searchTerm) {
            current.set('search', searchTerm);
        } else {
            current.delete('search');
        }
        current.set('page', '1');
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`);
    }

    return (
        <form
            onSubmit={handleSearch}
            style={{ direction: 'rtl' }}
            className=" relative bg-[#1d4671] overflow-hidden py-2 px-3 w-40 h-fit hover:w-64 duration-300">
            <div
                style={{ direction: 'ltr' }}
                className="flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="bg-transparent text-white placeholder-gray-300 focus:outline-none w-full"
                />
                <button type="submit" className="text-white">
                    <FaSearch />
                </button>
            </div>
        </form>
    );
}

export default Search;