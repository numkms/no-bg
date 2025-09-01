'use client'

import { useTranslation } from 'react-i18next';
import React from "react";
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n.js';
import {Feedback} from "./Feedback.jsx";
import {CompleteActionButtons} from "./CompleteActionButtons.jsx";
import {UploadImage} from "./UploadImage.jsx";
import {useImageUpload} from "../hooks/useImageUpload.js";
import {Alert} from "./Alert.jsx";
import Tutorial from './Tutorial.jsx';
import LangSelect from './LangSelect.jsx';
import Image from "next/image";
import logo from "../assets/logo_small-1.webp";

function MainAppContent({lang}) {
  const { t, i18n: i18nInstance } = useTranslation();
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

  // Изменяем язык только если он передан и отличается от текущего
  if (lang && i18nInstance.language !== lang) {
    i18nInstance.changeLanguage(lang);
  }

  return (
    <>
      {/* Основной заголовок страницы */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-600 hidden">
          CutBG
        </h1>
        <Image src={logo} className="w-1/2 md:w-1/4 mx-auto" alt="logo image" width={200} height={100} />
        <p className="text-gray-600 mb-4 text-center mt-6">
          {t('title')}
        </p>
      </div>

      <section
        className="flex flex-col items-center mt-8 h-[calc(100vh-200px)] w-min m-auto"
        onDrop={(e) => {
          e.preventDefault();
          processFiles(e.dataTransfer.files);
        }}
        onAbort={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
      >
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
          <Tutorial t={t}>
          </Tutorial>
        <div className='mt-2 flex justify-end w-full'>
          <LangSelect></LangSelect>
        </div>
          
      </section>
  </>
  );
}

function MainApp({lang}) {
  return (
    <I18nextProvider i18n={i18n}>
      <MainAppContent lang={lang} />
    </I18nextProvider>
  );
}

export default MainApp;
