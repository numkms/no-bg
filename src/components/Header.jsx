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
            <nav className="w-full bg-white shadow-md py-4 px-6 mb-8">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    
                    {/* Навигационные ссылки */}
                    <div className="flex space-x-6">
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
                </div>
            </nav>
        </>
    )
}