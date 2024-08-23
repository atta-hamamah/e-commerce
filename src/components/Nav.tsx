'use client'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { usePathname } from 'next/navigation';

function Nav() {
    const pathname = usePathname();
    const path = pathname.split('/')[1]
    return (
        <main className=' sticky top-0 z-30 bg-white  h-24 px-8 mt-2 flex items-center justify-between border-b-2 border-[#1d4671]'>
            <Image
                src={'/logo.png'}
                width={999}
                height={999}
                alt='logo'
                className=' w-24 h-24'
            />
            <div className='flex flex-nowrap gap-x-8 font-semibold text-xl text-gray-300  '>
                <Link href={'/'} >
                    <div className={` pb-2 border-b-4 ${path === '' ? 'border-[#017cc4]' : ' border-transparent'} `}>
                        <p className={` ${path === '' ? 'text-[#017cc4]' : ''} hover:text-blue-300 duration-200 `}>
                            Home
                        </p>
                    </div>
                </Link>
                <Link href={'/products?page=1'} >
                    <div className={` pb-2 border-b-4 ${path === 'products' ? 'border-[#017cc4]' : 'border-transparent'} `}>
                        <p className={` ${path === 'products' ? 'text-[#017cc4]' : ''} hover:text-blue-300 duration-200  `}>
                            Products
                        </p>
                    </div>
                </Link>
                <Link href={'/best'} >
                    <div className={` pb-2 border-b-4 ${path === 'best' ? 'border-[#017cc4]' : 'border-transparent'} `}>
                        <p className={` ${path === 'best' ? 'text-[#017cc4]' : ''} hover:text-blue-300 duration-200  `}>
                            Best Products
                        </p>
                    </div>
                </Link>
                <Link href={'/offers'} >
                    <div className={` pb-2 border-b-4 ${path === 'offers' ? 'border-[#017cc4]' : 'border-transparent'} `}>
                        <p className={` ${path === 'offers' ? 'text-[#017cc4]' : ''} hover:text-blue-300 duration-200  `}>
                            Best Offers
                        </p>
                    </div>
                </Link>
            </div>
            <div className=' flex items-center gap-4 text-4xl text-gray-500'>
                <Link href={'favorites'}>
                    <FaHeartCircleCheck className={` ${path === 'favorites' ? ' text-[#017cc4]' : ''} hover:text-blue-300 duration-200 `} />
                </Link>
                <Link href={'cart'}>
                    <MdOutlineShoppingCart className={` ${path === 'cart' ? ' text-[#017cc4]' : ''} hover:text-blue-300 duration-200 `} />
                </Link>
            </div  >
        </main>
    )
}

export default Nav