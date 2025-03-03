import { useEffect, useState } from 'react'

import './App.css'
import {removeBackground} from '@imgly/background-removal'
function App() {

const appName = "Background remover"
const [files, setFiles] = useState([])
const [imageSrc, setImageSrc] = useState(null)
const [url, setUrl] = useState(null)
const [processing, setProcessing] = useState(false);
const handleFileChange = (event) => {
        processFiles(event.target.files)
}


const requestNoBackground = async (data) => { 
        console.log("removing....")
        setProcessing(true)
        const response = await fetch('http://49.13.223.226:3000/remove-background', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: data }),
        });
        setProcessing(false)

        let json = await response.json()
        setImageSrc(json.image)
}

useEffect(() => {
        handleRemoveBackground()
}, [files])

const handleRemoveBackground = () => {
        if (files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(files[0]); 
                reader.onloadend = function() {
                        var base64data = reader.result;                
                        requestNoBackground(base64data)
                }
        }
}

const processFiles = (files) => {
        setImageSrc(URL.createObjectURL(files[0]));
        setFiles(files)
        handleRemoveBackground()
}

return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full" onDrop={(e) => {
                e.preventDefault();
                processFiles(e.dataTransfer.files)                
        }} onAbort={ (e) => e.preventDefault()} onDragOver={(e) => e.preventDefault()}>
                <h1 className="text-3xl font-bold mb-2 text-center text-gray-600">Background Remover</h1>
                <p className="text-gray-600 mb-6 text-center mt-10">
                        Erase image backgrounds for free.
                </p>
                <div className="chess-background relative flex flex-col items-center justify-center w-84 h-64 bg-white border border-gray-300 rounded-xl shadow-md">
                        {imageSrc ? (
                                <img 
                                src={imageSrc} 
                                alt="Uploaded" 
                                className={"w-full h-full object-cover rounded-xl" + " " + (processing ? "animate-pulse" : "")} 
                                />
                        ) : (
                                <label
                                        htmlFor="upload"
                                        className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                                >
                                        <div className="flex flex-col items-center">
                                                <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-8 w-8 text-gray-500 mb-2"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                >
                                                        <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M8 12l4-4m0 0l4 4m-4-4v12"
                                                        />
                                                </svg>
                                                <label className="bg-blue-600 text-white px-4 py-2 rounded-lg" htmlFor="upload">Start from a photo</label>
                                                <p className="text-gray-500 mt-2">Or drop an image here</p>
                                        </div>
                                        <input type="file" id="upload" className="hidden" onChange={handleFileChange} />
                                </label>
                        )}
                </div>
        </div>
);
}

export default App;