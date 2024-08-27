'use client'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import { FaList } from "react-icons/fa";
import { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";

function Nav() {
    const [showList, setShowList] = useState(false)
    const pathname = usePathname();
    const path = pathname.split('/')[1]
    return (
        <main className=' select-none sticky top-0 z-30 bg-white  h-24 px-8 mt-2 flex flex-wrap items-center justify-between border-b-2 border-[#1d4671]'>
            <div className=' grow'>
                <Image
                    src={'/logo.png'}
                    width={999}
                    height={999}
                    alt='logo'
                    className=' w-24 h-24'
                />
            </div>
            <aside className=' relative bg-white block md:hidden '>
                {showList ?
                    <IoCloseOutline
                        onClick={() => setShowList(false)}
                        className='text-[#1d4671] text-4xl cursor-pointer  ' />
                    :
                    <FaList
                        onClick={() => setShowList(true)}
                        className='text-[#1d4671] text-3xl cursor-pointer ' />
                }
                <div
                    onClick={() => setShowList(false)}
                    className={` ${showList ? 'h-48  w-32  ' : 'h-0 opacity-0 w-0'}  absolute  border-b-[#1d4671] border-t-[#017cc4] border-y-4 p-2 right-full top-0 bg-white overflow-hidden duration-150 `}>
                    <Link href={'/'} >
                        <p className={` ${path === '' ? 'text-[#017cc4]' : 'hover:text-blue-300 hover:-skew-x-12 '} duration-200 mb-2`}>
                            Home
                        </p>
                    </Link>
                    <Link href={'/products?page=1'} >
                        <p className={` ${path === 'products' ? 'text-[#017cc4]' : ' hover:text-blue-300 hover:-skew-x-12'}  duration-200 mb-2 `}>
                            Products
                        </p>
                    </Link>
                    <Link href={'/best'} >
                        <p className={` ${path === 'best' ? 'text-[#017cc4]' : 'hover:text-blue-300  hover:-skew-x-12'} duration-200 mb-2 `}>
                            Best Products
                        </p>
                    </Link>
                    <Link href={'/offers'} >
                        <p className={` ${path === 'offers' ? 'text-[#017cc4]' : ' hover:text-blue-300 hover:-skew-x-12'}  duration-200 mb-2 `}>
                            Best Offers
                        </p>
                    </Link>
                    <div className=' flex items-center gap-4 text-4xl text-gray-500 mb-2'>
                        <Link href={'favorites'}>
                            <FaHeartCircleCheck className={` ${path === 'favorites' ? ' text-[#017cc4]' : ' hover:text-blue-300'}  duration-200 `} />
                        </Link>
                        <Link href={'cart'}>
                            <MdOutlineShoppingCart className={` ${path === 'cart' ? ' text-[#017cc4]' : 'hover:text-blue-300'}  duration-200 `} />
                        </Link>
                    </div  >
                </div>
            </aside>
            {/* nav big screens.......................... */}
            <section className=' hidden md:flex  items-center justify-between grow'>
                <div className='flex flex-nowrap gap-x-8 font-semibold text-xl text-gray-300  '>
                    <Link href={'/'} >
                        <div className={` pb-2 border-b-4 ${path === '' ? 'border-[#017cc4]' : ' border-transparent'} `}>
                            <p className={` ${path === '' ? 'text-[#017cc4]' : 'hover:text-blue-300 '} duration-200 `}>
                                Home
                            </p>
                        </div>
                    </Link>
                    <Link href={'/products?page=1'} >
                        <div className={` pb-2 border-b-4 ${path === 'products' ? 'border-[#017cc4]' : 'border-transparent'} `}>
                            <p className={` ${path === 'products' ? 'text-[#017cc4]' : ' hover:text-blue-300'}  duration-200  `}>
                                Products
                            </p>
                        </div>
                    </Link>
                    <Link href={'/best'} >
                        <div className={` pb-2 border-b-4 ${path === 'best' ? 'border-[#017cc4]' : 'border-transparent'} `}>
                            <p className={` ${path === 'best' ? 'text-[#017cc4]' : 'hover:text-blue-300 '} duration-200  `}>
                                Best Products
                            </p>
                        </div>
                    </Link>
                    <Link href={'/offers'} >
                        <div className={` pb-2 border-b-4 ${path === 'offers' ? 'border-[#017cc4]' : 'border-transparent'} `}>
                            <p className={` ${path === 'offers' ? 'text-[#017cc4]' : ' hover:text-blue-300'}  duration-200  `}>
                                Best Offers
                            </p>
                        </div>
                    </Link>
                </div>
                <div className=' flex items-center gap-4 text-4xl text-gray-500'>
                    <Link href={'favorites'}>
                        <FaHeartCircleCheck className={` ${path === 'favorites' ? ' text-[#017cc4]' : ' hover:text-blue-300'}  duration-200 `} />
                    </Link>
                    <Link href={'cart'}>
                        <MdOutlineShoppingCart className={` ${path === 'cart' ? ' text-[#017cc4]' : 'hover:text-blue-300'}  duration-200 `} />
                    </Link>
                </div  >
            </section>
        </main>
    )
}

export default Nav