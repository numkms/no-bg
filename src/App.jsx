import { useTranslation } from 'react-i18next';
import Metatags from './components/metatags.jsx';
import React from "react";
import {Feedback} from "./components/Feedback.jsx";
import {Header} from "./components/Header.jsx";
import {CompleteActionButtons} from "./components/CompleteActionButtons.jsx";
import {UploadImage} from "./components/UploadImage.jsx";
import {useImageUpload} from "./hooks/useImageUpload.js";
import {Alert} from "./components/Alert.jsx";

function App() {
  const { t, i18n } = useTranslation();
  const {
    imageNoBgSrc,
    imageWithBgSrc,
    processing,
    isCompleted,
    isFeedbackSent,
    setIsFeedbackSent,
      error,
    handleFileChange,
    reset,
    processFiles
  } = useImageUpload();

  return (
    <>
      <Metatags t={t} lang={i18n.language} />
      <section
        className="flex flex-col items-center mt-28 h-[calc(100vh-80px)] w-min m-auto"
        onDrop={(e) => {
          e.preventDefault();
          processFiles(e.dataTransfer.files);
        }}
        onAbort={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
      >
        <Header t={t} />

        <div className="mt-6 chess-background relative flex flex-col items-center justify-center w-84 min-h-64 sm:w-[500px] sm:h-[350px] bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden">
          <UploadImage
              t={t}
              imageWithBgSrc={imageWithBgSrc}
              imageNoBgSrc={imageNoBgSrc}
              processing={processing}
              handleFileChange={handleFileChange}
              processFiles={processFiles}
          />
          <CompleteActionButtons isCompleted={isCompleted} t={t} imageSrc={imageNoBgSrc} reset={reset} />
        </div>

          {error && <Alert text={t('somethingWentWrong')} />}


          <Feedback
            setIsFeedbackSent={setIsFeedbackSent}
            isFeedbackSent={isFeedbackSent}
            isCompleted={isCompleted}
            t={t}
        />
      </section>
  </>
  );
}

export default App;
