import React, { useState, useEffect } from "react";

export const Loader = ({ processing }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval = 50;
        const step = 1;
        let timer;

        const updateProgress = () => {
            setProgress((prev) => {
                if (!processing && prev === 99) return 100;
                const randomValue = Math.random() * 10
                interval = prev * randomValue
                return prev + step >= 99 ? 99 : prev + step;
            });

            timer = setTimeout(updateProgress, interval);
        };

        updateProgress();

        return () => clearTimeout(timer);
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