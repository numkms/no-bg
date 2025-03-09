import React from "react";

export const Alert = ({text}) => {
    return (
        <div className="w-full flex justify-center items-center gap-3 mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg ">
            <span className="text-sm">{text}</span>
        </div>
    )
}
