import React from "react";
import logo from "../assets/logo_small-1.webp";

export const Header = ({t}) => {
    return (
        <>
            <h1 className="text-3xl font-bold mb-2 text-center text-gray-600 hidden ">
                CutBG
            </h1>
            <img src={logo} className="w-1/2 md:w-1/4"  alt="logo image"/>
            <p className="text-gray-600 mb-4 text-center mt-6">
                {t('title')}
            </p>
        </>
    )
}