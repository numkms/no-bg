import {logEvent} from "firebase/analytics";
import {analytics, AnalyticsEvents} from "../analytics/firebase.js";
import React, {useEffect, useRef, useState} from "react";
import {UploadIcon} from "./Icons/UploadIcon.jsx";
import {Loader} from "./Loader/Loader.jsx";

export const UploadImage = ({imageWithBgSrc, imageNoBgSrc, t, handleFileChange, processing, processFiles}) => {
    const [wipeProgress, setWipeProgress] = useState(0);

    useEffect(() => {
        if (imageNoBgSrc && !processing) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                setWipeProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, 10);
            return () => clearInterval(interval);
        } else {
            setWipeProgress(0);
        }
    }, [imageNoBgSrc, processing]);

    return (
        <>
            {imageNoBgSrc ? (
                <div className="relative w-full h-full overflow-hidden">
                    {imageNoBgSrc &&
                        <img src={imageNoBgSrc} alt="No Background" className="absolute w-full h-full object-cover"/>}

                    {imageWithBgSrc && (
                        <div className="absolute top-0 left-0 w-full h-full"
                             style={{clipPath: `inset(0 ${wipeProgress}% 0 0)`}}>
                            <img src={imageWithBgSrc} alt="With Background" className="w-full h-full object-cover"/>
                        </div>
                    )}

                    {processing &&
                        <>
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <Loader/>
                        </>
                    }
                </div>
            ) : (
                <label
                    htmlFor="upload"
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                aria-label={t('actionButton')}
                onClick={() => logEvent(analytics, AnalyticsEvents.ButtonRemoveBgClick)}
            >
                <span className="flex flex-col items-center cursor-pointer">
                    <span className="flex bg-accent text-reversed text-white px-4 py-2 rounded-lg cursor-pointer">
                        <UploadIcon />
                        <p>{t('actionButton')}</p>
                    </span>
                    <p className="text-gray-500 mt-2">{t('subtitle')}</p>
                </span>
                <input
                    type="file"
                    id="upload"
                    className="hidden"
                    accept="image/*"
                    aria-describedby="file-upload-instructions"
                    onChange={handleFileChange}
                />
            </label>
        )}
        </>
    )
}