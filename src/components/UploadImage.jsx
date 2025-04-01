import {logEvent} from "firebase/analytics";
import {analytics, AnalyticsEvents} from "../analytics/firebase.js";
import React, {useEffect,  useState} from "react";
import UploadInput from "./UploadInput.jsx";
import {Loader} from "./Loader/Loader.jsx";

export const UploadImage = ({imageWithBgSrc, imageNoBgSrc, t, handleFileChange, processing}) => {
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
                            <Loader processing={processing} />
                        </>
                    }
                </div>
            ) : (
                <UploadInput title={t('actionButton')} handleFileChange={handleFileChange} subtitle={t('subtitle')}></UploadInput>
        )}
        </>
    )
}