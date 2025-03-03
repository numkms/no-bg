import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";

import { analytics, AnalyticsEvents } from "./analytics/firebase";
import { logEvent } from "firebase/analytics";

function App() {
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);

  const [processing, setProcessing] = useState(false);
  const handleFileChange = (event) => {
    processFiles(event.target.files);
  };
  const [completed, setCompleted] = useState(false);

  const requestNoBackground = async (data) => {
    try {
      console.log("removing....");
      setProcessing(true);
      const response = await fetch(
        "https://49.13.223.226:3000/remove-background",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: data }),
        },
      );
      setProcessing(false);

      let json = await response.json();
      setImageSrc(json.image);
      setCompleted(true);
      logEvent(analytics, AnalyticsEvents.BackgroundRemovedSuccess);
    } catch (error) {
      reset();
      console.log(error);
    }
  };

  useEffect(() => {
    handleRemoveBackground();
  }, [files]);

  const handleRemoveBackground = () => {
    if (files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = function () {
        var base64data = reader.result;
        requestNoBackground(base64data);
      };
    }
  };

  const processFiles = (files) => {
    setImageSrc(URL.createObjectURL(files[0]));
    setFiles(files);
    handleRemoveBackground();
  };

  const reset = () => {
    setProcessing(false);
    setImageSrc(null);
    setCompleted(false);
    logEvent(analytics, AnalyticsEvents.ButtonResetClick);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full"
      onDrop={(e) => {
        e.preventDefault();
        processFiles(e.dataTransfer.files);
      }}
      onAbort={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
    >
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-600 hidden ">
        CutBG
      </h1>
      <img src={logo} className="w-1/2 md:w-1/4"></img>
      <p className="text-gray-600 mb-6 text-center mt-10">
        Erase image backgrounds for free
      </p>
      <div className="chess-background relative flex flex-col items-center justify-center w-84 min-h-64 bg-white border border-gray-300 rounded-xl shadow-md">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Uploaded"
            className={
              "w-full h-full object-cover rounded-t-xl" +
              " " +
              (processing ? "animate-pulse" : "")
            }
          />
        ) : (
          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
            onClick={logEvent(analytics, AnalyticsEvents.ButtonRemoveBgClick)}
          >
            <div className="flex flex-col items-center">
              <label
                className="flex bg-accent text-reversed text-white px-4 py-2 rounded-lg"
                htmlFor="upload"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6  mr-2"
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
                <div className="cursor-pointer">Start from a photo</div>
              </label>
              <p className="text-gray-500 mt-2">Or drop an image here</p>
            </div>
            <input
              type="file"
              id="upload"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
        {completed ? (
          <>
            <a
              onClick={logEvent(analytics, AnalyticsEvents.ButtonDownloadClick)}
              href={imageSrc}
              download="CutBG.png"
            >
              <button className="absolute bg-accent text-reversed right-4 top-4 p-1 rounded cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 rotate-180"
                  fill="none"
                  viewBox="0 2 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M8 12l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
              </button>
            </a>
            <button
              onClick={reset}
              className="absolute bg-accent text-reversed left-4 top-4 p-1 rounded cursor-pointer"
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                className="h-8 w-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M37 16C34.19 13 30.36 11 26 11C18.27 11 12 17.27 12 25C12 32.73 18.27 39 26 39C31.32 39 35.86 36.17 38 32"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M37 10V16H31"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </>
        ) : null}
        {completed ? (
          <div className="bg-secondary w-full p-4 rounded-b-lg text-center text-gray-600 text-xs">
            How is your experience?
            <div className="flex flex-row space-x-1 items-center justify-center mt-2">
              <button
                onClick={logEvent(analytics, AnalyticsEvents.ButtonLikeClick)}
                className="p-2 rounded bg-accent text-reversed w-40 cursor-pointer"
              >
                I like it!
              </button>
              <button
                onClick={logEvent(
                  analytics,
                  AnalyticsEvents.ButtonDislikeClick,
                )}
                className="bg-accent p-2 rounded text-reversed w-40 cursor-pointer"
              >
                I don't like it
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
