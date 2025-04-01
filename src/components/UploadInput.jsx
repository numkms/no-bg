import {logEvent} from "firebase/analytics";
import {UploadIcon} from "./Icons/UploadIcon.jsx";
const UploadInput = ({title, subtitle, handleFileChange}) => {
    return (<label
        htmlFor="upload"
        className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
        aria-label={title}
        onClick={() => logEvent(analytics, AnalyticsEvents.ButtonRemoveBgClick)}
    >
        <span className="flex flex-col items-center cursor-pointer">
            <span className="flex bg-accent text-reversed text-white px-4 py-2 rounded-lg cursor-pointer">
                <UploadIcon />
                <p>{title}</p>
            </span>
            <p className="text-gray-500 mt-2">{subtitle}</p>
        </span>
        <input
            type="file"
            id="upload"
            className="hidden"
            accept="image/*"
            aria-describedby="file-upload-instructions"
            onChange={() => {
                console.log(2222)
            }}
        />
        </label>)
}


export default UploadInput;