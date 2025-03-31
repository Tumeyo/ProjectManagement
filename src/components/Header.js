import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <div className="w-full bg-white h-20 shadow-black shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] text-left text-base text-black font-open-sans">
            {/* Flex container for logo and navigation */}
            <div className="flex items-center justify-between h-full px-8">
                {/* Logo Section */}
                <div className="flex items-center gap-3.5">
                    <Image className="w-auto h-auto" width={131} height={20} alt="Site Logo" src="/SiteLogo.png" />
                </div>

                {/* Main Navigation */}
                <nav className="flex gap-2">
                    <Link href="/about">
                        <button className="px-5 py-4 text-black rounded-lg hover:bg-gray-100">
                            Бидний тухай
                        </button>
                    </Link>
                    <Link href="/about">
                        <button className="px-5 py-4 text-black rounded-lg hover:bg-gray-100">
                            Онцлог
                        </button>
                    </Link>
                    <Link href="/about">
                        <button className="px-5 py-4 text-black rounded-lg hover:bg-gray-100">
                            Үнийн санал
                        </button>
                    </Link>
                    <Link href="/about">
                        <button className="px-5 py-4 text-black rounded-lg hover:bg-gray-100">
                            Холбоо барих
                        </button>
                    </Link>
                </nav>

                {/* Login / Register */}
                <div className="flex items-center gap-4">
                    <Link href="login">
                        <button className="flex items-center justify-center px-5 py-2 text-center text-black bg-white rounded-lg hover:bg-gray-100">
                            Нэвтрэх
                        </button>
                    </Link>
                    <Link href="register">
                        <button className="flex items-center justify-center px-5 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600">
                            Бидэнтэй нэгдэх
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
