import React, { useState, useEffect } from "react";

export const Loader = ({ processing }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = 50;
        const step = 1;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (!processing && prev === 99) {
                    console.log('here')
                    return 100
                }

                return prev + step >= 99 ? 99 : prev + step
            });
        }, interval);

        if(!processing && progress === 100) {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div className="loader top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="text-white w-full flex items-center justify-center text-lg font-semibold z-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {Math.round(progress)}%
            </div>
        </>
    );
}