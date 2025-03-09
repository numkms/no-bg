import {useEffect, useState} from "react";
import {logEvent} from "firebase/analytics";
import {analytics, AnalyticsEvents} from "../analytics/firebase.js";

export const useImageUpload = () => {
    const [files, setFiles] = useState([]);
    const [imageNoBgSrc, setImageNoBgSrc] = useState(null);
    const [imageWithBgSrc, setImageWithBgSrc] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isFeedbackSent, setIsFeedbackSent] = useState(false);

    const handleFileChange = (event) => {
        processFiles(event.target.files);
    };

    const reset = () => {
        setFiles([])
        setProcessing(false);
        setImageNoBgSrc(null);
        setIsCompleted(false);
        setIsFeedbackSent(false);
        logEvent(analytics, AnalyticsEvents.ButtonResetClick);
    };

    const requestNoBackground = async (data) => {
        try {
            console.log("removing....");
            setProcessing(true);
            const response = await fetch(
                "https://api.cutbg.org/remove-background",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image: data }),
                },
            );
            setProcessing(false);

            let json = await response.json();
            setImageNoBgSrc(json.image);
            setIsCompleted(true);
            logEvent(analytics, AnalyticsEvents.BackgroundRemovedSuccess);
        } catch (error) {
            reset();
            console.log(error);
        }
    };

    const handleRemoveBackground = () => {
        if (files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = async function () {
                const base64data = reader.result;
                setImageWithBgSrc(base64data);
                await requestNoBackground(base64data);
            };
        }
    };

    const processFiles = (files) => {
        setImageNoBgSrc(URL.createObjectURL(files[0]));
        setFiles(files);
        handleRemoveBackground();
    };

    // обрабатываем paste event для вставки ctrl + v
    useEffect(() => {
        document.addEventListener("paste", (event) => {
            if (event.clipboardData?.files.length) {
                processFiles(event.clipboardData.files)
            }
        });
    }, []);

    useEffect(() => {
        handleRemoveBackground();
    }, [files]);

    return {
        imageNoBgSrc,
        imageWithBgSrc,
        processing,
        isCompleted,
        isFeedbackSent,
        setIsFeedbackSent,
        handleFileChange,
        reset,
        processFiles
    }
}