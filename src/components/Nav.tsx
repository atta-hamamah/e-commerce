import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaHeartCircleCheck } from "react-icons/fa6";

function Nav() {
    const headers = [
        'Home',
        'Products',
        'Best Products',
        'Best Offers',
        'Best Seller',
    ]
    return (
        <main className=' h-24 px-8 mt-2 flex items-center justify-between border-b-2 border-[#1d4671]'>
            <Image
                src={'/logo.png'}
                width={999}
                height={999}
                alt='logo'
                className=' w-24 h-24'
            />
            <div className='flex flex-nowrap gap-x-8 font-semibold text-xl text-gray-500  '>
                {
                    headers.map(header => {
                        const headArr = header.split(' ')
                        const linkRef = headArr.length > 1
                            ?
                            headArr[1].toLocaleLowerCase()
                            :
                            '/'
                        return (
                            <Link href={linkRef} key={header}>
                                <div className={` pb-2 border-b-4 ${true ? 'border-[#017cc4]' : ''} `}>
                                    <p className={` ${true ? 'text-[#017cc4]' : ''} `}>
                                        {header}
                                    </p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div className=' flex items-center gap-4 text-4xl text-gray-500'>
                <Link href={'favorite'}>
                    <FaHeartCircleCheck className={` ${true ? ' text-[#017cc4]' : ''}`} />
                </Link>
                <Link href={'cart'}>
                    <MdOutlineShoppingCart className={` ${true ? ' text-[#017cc4]' : ''}`} />
                </Link>
            </div  >
        </main>
    )
}

export default Nav