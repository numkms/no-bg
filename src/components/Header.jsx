'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import logo from "../assets/logo_small-1.webp";

export const Header = () => {
    const pathname = usePathname();

    return (
        <>
            {/* Навигация */}
            <nav className="w-full bg-white shadow-md py-4 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    
                    {/* Логотип */}
                    <div className="flex items-center mb-4 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <Image 
                                src={logo} 
                                alt="CutBG Logo" 
                                width={120} 
                                height={60}
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>
                    
                    {/* Навигационные ссылки - по центру */}
                    <div className="flex space-x-6 order-3 md:order-2">
                        <Link 
                            href="/" 
                            className={`font-semibold transition-colors duration-200 pb-1 ${
                                pathname === "/" 
                                    ? "text-blue-600 border-b-2 border-blue-600" 
                                    : "text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-400"
                            }`}
                        >
                            Remove Background
                        </Link>
                        <Link 
                            href="/compress" 
                            className={`font-semibold transition-colors duration-200 pb-1 ${
                                pathname === "/compress" 
                                    ? "text-blue-600 border-b-2 border-blue-600" 
                                    : "text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-400"
                            }`}
                        >
                            Compress
                        </Link>
                        <Link 
                            href="/convert" 
                            className={`font-semibold transition-colors duration-200 pb-1 ${
                                pathname === "/convert" 
                                    ? "text-blue-600 border-b-2 border-blue-600" 
                                    : "text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-400"
                            }`}
                        >
                            Convert
                        </Link>
                    </div>
                    
                    {/* Пустой div для балансировки - справа */}
                    <div className="hidden md:block w-32 order-3"></div>
                </div>
            </nav>
        </>
    )
}