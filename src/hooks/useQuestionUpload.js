import { useTranslation } from "react-i18next";
import { useImageUpload } from "./useImageUpload"
import { useState } from "react";
export const useQuestionUpload = () => {
    const [files, setFiles] = useState([]);
    const [resultText, resultTxt] = useState("Здесь будет ответ");
    const [error, setError] = useState(null);
    const [imageWithBgSrc, setImageWithBgSrc] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isFeedbackSent, setIsFeedbackSent] = useState(false);
    const trnslation = useTranslation()

    const processFiles = (files) => {
        console.log(files)
        setImageNoBgSrc(URL.createObjectURL(files[0]));
        setFiles(files);
        request();
    };

    const request = async () => {
        if (files[0]) {
            let response = await fetch("http://localhost:3000/remove-background", {
                method: "POST",
                headers: { 
                    "Content-Type": "multipart/form-data",
                    "Langs": trnslation.i18n.language, 
                },
                body: {
                    file: files[0]
                },
            })
        }
    }

    const reset = () => {

    }

    
    const handleFileChange = async (event) => {
        processFiles(event.target.files);
    };

    return {
        resultText, 
        files,
        processing,
        isCompleted,
        isFeedbackSent,
        setIsFeedbackSent,
        error,
        handleFileChange,
        reset,
        processFiles
    }
}