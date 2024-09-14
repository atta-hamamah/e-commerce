import Image from "next/image"
import Link from "next/link";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


export default function Footer() {
    return (
        <main className=' h-48 px-8 py-8 bg-[#1d4671] flex items-center justify-center gap-4  '>
            <div className=' bg-slate-200 rounded-full h-32 w-32 flex items-center justify-center'>
                <Image
                    src={'/logo.png'}
                    width={999}
                    height={999}
                    alt='logo'
                    className=' w-24 h-24'
                />
            </div>
            <div className=" flex items-center gap-3 text-4xl">
                <Link href={''}>
                    <FaFacebook className=" hover:text-[#017cc4] " />
                </Link>
                <Link href={''}>
                    <FaInstagramSquare className=" hover:text-[#017cc4] " />
                </Link>
                <Link href={''}>
                    <FaLinkedin className=" hover:text-[#017cc4] " />
                </Link>
                <Link href={''}>
                    <FaXTwitter className=" hover:text-[#017cc4] " />
                </Link>
            </div>
        </main>
    )
}
