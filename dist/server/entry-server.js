import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { useLocation, Link, Routes, Route, Router } from "react-router";
import { initReactI18next, useTranslation, I18nextProvider } from "react-i18next";
import i18n from "i18next";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
const title$h = "Remove Background Instantly";
const actionButton$h = "Click to upload a photo";
const subtitle$h = "or drop image here";
const buttonLike$h = "I like it!";
const buttonDislike$h = "I don't like it!";
const howIsYourExpirience$h = "How is your experience?";
const metaTitle$h = "Cutbg - AI Background Remover | Remove Image Background Online for Free";
const metaDescription$h = "Instantly remove backgrounds from images online with AI. Free, fast, and easy-to-use background remover—perfect for transparent PNGs and professional edits!";
const metaKeywords$h = "remove background, background remover, AI background remover, free background remover, erase background, transparent background, cut out background, online background remover, remove background from image";
const ariaRestButton$h = "Reset button";
const ariaDownloadButton$g = "Download button";
const thanksForFeedback$h = "Thank you for your feedback";
const somethingWentWrong$h = "Something went wrong. Please try again!";
const tutorial$h = `Upload an image – just select a file from your device.
Wait a bit – we'll process your picture in seconds.
Download the result – click the "Download" button in the top-right corner of the image block.

Done! 🎉 Now your image is saved on your device. 🚀`;
const how_to_use$h = "How to use?";
const en = {
  title: title$h,
  actionButton: actionButton$h,
  subtitle: subtitle$h,
  buttonLike: buttonLike$h,
  buttonDislike: buttonDislike$h,
  howIsYourExpirience: howIsYourExpirience$h,
  metaTitle: metaTitle$h,
  metaDescription: metaDescription$h,
  metaKeywords: metaKeywords$h,
  ariaRestButton: ariaRestButton$h,
  ariaDownloadButton: ariaDownloadButton$g,
  thanksForFeedback: thanksForFeedback$h,
  somethingWentWrong: somethingWentWrong$h,
  tutorial: tutorial$h,
  how_to_use: how_to_use$h
};
const title$g = "立即去除背景";
const actionButton$g = "从照片开始";
const subtitle$g = "或将图片拖放到此处";
const buttonLike$g = "我喜欢！";
const buttonDislike$g = "我不喜欢！";
const howIsYourExpirience$g = "您的体验如何？";
const metaTitle$g = "Cutbg - AI背景去除器 | 免费在线去除图片背景";
const metaDescription$g = "使用AI在线快速去除图片背景。免费、快速、易用，适用于透明PNG和专业编辑。";
const metaKeywords$g = "去除背景, 背景去除器, AI背景去除, 免费背景去除, 清除背景, 透明背景, 剪切背景, 在线背景去除, 去除图片背景";
const ariaRestButton$g = "重置按钮";
const ariaDownloadButton$f = "下载按钮";
const thanksForFeedback$g = "感谢您的反馈";
const somethingWentWrong$g = "出了点问题，请再试一次！";
const tutorial$g = "上传图片 - 只需从设备中选择文件。\n稍等片刻 - 我们将在几秒钟内处理您的图片。\n下载结果 - 点击图片块右上角的“下载”按钮。\n\n完成！🎉 现在您的图片已保存在设备上。🚀";
const how_to_use$g = "如何使用？";
const cn = {
  title: title$g,
  actionButton: actionButton$g,
  subtitle: subtitle$g,
  buttonLike: buttonLike$g,
  buttonDislike: buttonDislike$g,
  howIsYourExpirience: howIsYourExpirience$g,
  metaTitle: metaTitle$g,
  metaDescription: metaDescription$g,
  metaKeywords: metaKeywords$g,
  ariaRestButton: ariaRestButton$g,
  ariaDownloadButton: ariaDownloadButton$f,
  thanksForFeedback: thanksForFeedback$g,
  somethingWentWrong: somethingWentWrong$g,
  tutorial: tutorial$g,
  how_to_use: how_to_use$g
};
const title$f = "Hintergrund sofort entfernen";
const actionButton$f = "Mit einem Foto starten";
const subtitle$f = "oder Bild hier ablegen";
const buttonLike$f = "Gefällt mir!";
const buttonDislike$f = "Gefällt mir nicht!";
const howIsYourExpirience$f = "Wie war Ihre Erfahrung?";
const metaTitle$f = "Cutbg - KI-Hintergrundentferner | Kostenlos Hintergrund aus Bildern entfernen";
const metaDescription$f = "Entfernen Sie Hintergründe von Bildern sofort mit KI. Kostenlos, schnell und einfach zu bedienen – perfekt für transparente PNGs und professionelle Bearbeitung!";
const metaKeywords$f = "hintergrund entfernen, hintergrundentferner, KI hintergrundentferner, kostenlos hintergrund entfernen, hintergrund löschen, transparenter hintergrund, hintergrund ausschneiden, online hintergrundentferner, hintergrund aus bild entfernen";
const ariaRestButton$f = "Zurücksetzen-Taste";
const ariaDownloadButton$e = "Herunterladen-Taste";
const thanksForFeedback$f = "Danke für dein Feedback";
const somethingWentWrong$f = "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut!";
const tutorial$f = "Bild hochladen – wählen Sie einfach eine Datei von Ihrem Gerät aus.\nWarten Sie kurz – wir verarbeiten Ihr Bild in Sekundenschnelle.\nErgebnis herunterladen – klicken Sie auf die Schaltfläche „Herunterladen“ in der rechten Ecke des Bildblocks.\n\nFertig! 🎉 Jetzt ist Ihr Bild auf Ihrem Gerät gespeichert. 🚀";
const how_to_use$f = "Wie benutzt man?";
const de = {
  title: title$f,
  actionButton: actionButton$f,
  subtitle: subtitle$f,
  buttonLike: buttonLike$f,
  buttonDislike: buttonDislike$f,
  howIsYourExpirience: howIsYourExpirience$f,
  metaTitle: metaTitle$f,
  metaDescription: metaDescription$f,
  metaKeywords: metaKeywords$f,
  ariaRestButton: ariaRestButton$f,
  ariaDownloadButton: ariaDownloadButton$e,
  thanksForFeedback: thanksForFeedback$f,
  somethingWentWrong: somethingWentWrong$f,
  tutorial: tutorial$f,
  how_to_use: how_to_use$f
};
const title$e = "Elimina el fondo al instante";
const actionButton$e = "comienza con una foto";
const subtitle$e = "o arrastra la imagen aquí";
const buttonLike$e = "¡Me gusta!";
const buttonDislike$e = "No me gusta";
const howIsYourExpirience$e = "¿Cómo fue tu experiencia?";
const metaTitle$e = "Cutbg - Eliminador de Fondos con IA | Quita el Fondo de Imágenes Gratis";
const metaDescription$e = "Elimina fondos de imágenes al instante con IA. Gratis, rápido y fácil de usar. Ideal para PNGs transparentes y ediciones profesionales.";
const metaKeywords$e = "quitar fondo, eliminador de fondos, IA eliminador de fondos, eliminador de fondo gratis, borrar fondo, fondo transparente, recortar fondo, eliminador de fondo en línea, eliminar fondo de imagen";
const ariaRestButton$e = "Botón de reinicio";
const ariaDownloadButton$d = "Botón de descarga";
const thanksForFeedback$e = "Gracias por tus comentarios";
const somethingWentWrong$e = "Algo salió mal. ¡Por favor, inténtalo de nuevo!";
const tutorial$e = 'Sube una imagen – simplemente selecciona un archivo de tu dispositivo.\nEspera un poco – procesaremos tu imagen en segundos.\nDescarga el resultado – haz clic en el botón "Descargar" en la esquina superior derecha del bloque de la imagen.\n\n¡Listo! 🎉 Ahora tu imagen está guardada en tu dispositivo. 🚀';
const how_to_use$e = "¿Cómo usar?";
const es = {
  title: title$e,
  actionButton: actionButton$e,
  subtitle: subtitle$e,
  buttonLike: buttonLike$e,
  buttonDislike: buttonDislike$e,
  howIsYourExpirience: howIsYourExpirience$e,
  metaTitle: metaTitle$e,
  metaDescription: metaDescription$e,
  metaKeywords: metaKeywords$e,
  ariaRestButton: ariaRestButton$e,
  ariaDownloadButton: ariaDownloadButton$d,
  thanksForFeedback: thanksForFeedback$e,
  somethingWentWrong: somethingWentWrong$e,
  tutorial: tutorial$e,
  how_to_use: how_to_use$e
};
const title$d = "Supprimer l'arrière-plan instantanément";
const actionButton$d = "commencer avec une photo";
const subtitle$d = "ou déposez l'image ici";
const buttonLike$d = "J'aime !";
const buttonDislike$d = "Je n'aime pas !";
const howIsYourExpirience$d = "Comment est votre expérience ?";
const metaTitle$d = "Cutbg - Supprimeur de Fond IA | Retirer l’Arrière-Plan d’une Image Gratuitement";
const metaDescription$d = "Supprimez instantanément les arrière-plans des images en ligne grâce à l'IA. Gratuit, rapide et facile à utiliser, idéal pour PNGs transparents et retouches pro.";
const metaKeywords$d = "supprimer arrière-plan, outil suppression arrière-plan, IA suppression arrière-plan, enlever arrière-plan, effacer arrière-plan, fond transparent, découper arrière-plan, suppression arrière-plan en ligne, enlever arrière-plan image";
const ariaRestButton$d = "Bouton de réinitialisation";
const thanksForFeedback$d = "Merci pour vos commentaires";
const somethingWentWrong$d = "Quelque chose a mal tourné. Veuillez réessayer !";
const tutorial$d = `Téléchargez une image – sélectionnez simplement un fichier depuis votre appareil.
Attendez un peu – nous traiterons votre image en quelques secondes.
Téléchargez le résultat – cliquez sur le bouton "Télécharger" dans le coin supérieur droit du bloc d'image.

Terminé ! 🎉 Votre image est maintenant enregistrée sur votre appareil. 🚀`;
const how_to_use$d = "Comment utiliser?";
const fr = {
  title: title$d,
  actionButton: actionButton$d,
  subtitle: subtitle$d,
  buttonLike: buttonLike$d,
  buttonDislike: buttonDislike$d,
  howIsYourExpirience: howIsYourExpirience$d,
  metaTitle: metaTitle$d,
  metaDescription: metaDescription$d,
  metaKeywords: metaKeywords$d,
  ariaRestButton: ariaRestButton$d,
  thanksForFeedback: thanksForFeedback$d,
  somethingWentWrong: somethingWentWrong$d,
  tutorial: tutorial$d,
  how_to_use: how_to_use$d
};
const title$c = "फोटो से तुरंत बैकग्राउंड हटाएं";
const actionButton$c = "एक फोटो से शुरू करें";
const subtitle$c = "या छवि यहाँ ड्रॉप करें";
const buttonLike$c = "मुझे यह पसंद है!";
const buttonDislike$c = "मुझे यह पसंद नहीं है!";
const howIsYourExpirience$c = "आपका अनुभव कैसा रहा?";
const metaTitle$c = "Cutbg - AI बैकग्राउंड रिमूवर | मुफ्त में ऑनलाइन इमेज बैकग्राउंड हटाएं";
const metaDescription$c = "AI की मदद से तुरंत इमेज का बैकग्राउंड हटाएं। मुफ्त, तेज़ और उपयोग में आसान - पारदर्शी PNGs और प्रोफेशनल एडिट्स के लिए आदर्श।";
const metaKeywords$c = "बैकग्राउंड हटाएं, बैकग्राउंड रिमूवर, AI बैकग्राउंड रिमूवर, मुफ्त बैकग्राउंड रिमूवर, बैकग्राउंड मिटाएं, पारदर्शी बैकग्राउंड, बैकग्राउंड काटें, ऑनलाइन बैकग्राउंड रिमूवर, इमेज बैकग्राउंड हटाएं";
const ariaRestButton$c = "रीसेट बटन";
const ariaDownloadButton$c = "डाउनलोड बटन";
const thanksForFeedback$c = "आपकी प्रतिक्रिया के लिए धन्यवाद";
const somethingWentWrong$c = "कुछ गलत हो गया। कृपया फिर से कोशिश करें!";
const tutorial$c = 'एक छवि अपलोड करें – बस अपने डिवाइस से एक फ़ाइल चुनें।\nथोड़ा प्रतीक्षा करें – हम आपकी तस्वीर को कुछ सेकंड में संसाधित कर देंगे।\nपरिणाम डाउनलोड करें – छवि ब्लॉक के शीर्ष-दाएं कोने में "डाउनलोड" बटन पर क्लिक करें।\n\nहो गया! 🎉 अब आपकी छवि आपके डिवाइस पर सहेजी गई है। 🚀';
const how_to_use$c = "कैसे उपयोग करें?";
const hi = {
  title: title$c,
  actionButton: actionButton$c,
  subtitle: subtitle$c,
  buttonLike: buttonLike$c,
  buttonDislike: buttonDislike$c,
  howIsYourExpirience: howIsYourExpirience$c,
  metaTitle: metaTitle$c,
  metaDescription: metaDescription$c,
  metaKeywords: metaKeywords$c,
  ariaRestButton: ariaRestButton$c,
  ariaDownloadButton: ariaDownloadButton$c,
  thanksForFeedback: thanksForFeedback$c,
  somethingWentWrong: somethingWentWrong$c,
  tutorial: tutorial$c,
  how_to_use: how_to_use$c
};
const title$b = "Rimuovi lo sfondo istantaneamente";
const actionButton$b = "inizia con una foto";
const subtitle$b = "o trascina l'immagine qui";
const buttonLike$b = "Mi piace!";
const buttonDislike$b = "Non mi piace!";
const howIsYourExpirience$b = "Com'è stata la tua esperienza?";
const metaTitle$b = "Cutbg - Rimuovi Sfondo con AI | Rimuovere lo Sfondo dalle Immagini Gratis";
const metaDescription$b = "Rimuovi istantaneamente lo sfondo dalle immagini online con l’AI. Gratuito, veloce e facile da usare. Perfetto per PNG trasparenti ed editing professionale!";
const metaKeywords$b = "rimuovere sfondo, rimozione sfondo, AI rimozione sfondo, rimuovi sfondo gratis, cancella sfondo, sfondo trasparente, taglia sfondo, rimozione sfondo online, rimuovere sfondo immagine";
const ariaRestButton$b = "Pulsante di ripristino";
const ariaDownloadButton$b = "Pulsante di download";
const thanksForFeedback$b = "Grazie per il tuo feedback";
const somethingWentWrong$b = "Qualcosa è andato storto. Per favore, riprova!";
const tutorial$b = `Carica un'immagine – seleziona semplicemente un file dal tuo dispositivo.
Attendi un po' – elaboreremo la tua immagine in pochi secondi.
Scarica il risultato – clicca sul pulsante "Scarica" nell'angolo in alto a destra del blocco immagine.

Fatto! 🎉 Ora la tua immagine è salvata sul tuo dispositivo. 🚀`;
const how_to_use$b = "Come usare?";
const it = {
  title: title$b,
  actionButton: actionButton$b,
  subtitle: subtitle$b,
  buttonLike: buttonLike$b,
  buttonDislike: buttonDislike$b,
  howIsYourExpirience: howIsYourExpirience$b,
  metaTitle: metaTitle$b,
  metaDescription: metaDescription$b,
  metaKeywords: metaKeywords$b,
  ariaRestButton: ariaRestButton$b,
  ariaDownloadButton: ariaDownloadButton$b,
  thanksForFeedback: thanksForFeedback$b,
  somethingWentWrong: somethingWentWrong$b,
  tutorial: tutorial$b,
  how_to_use: how_to_use$b
};
const title$a = "即座に背景を削除";
const actionButton$a = "写真から始める";
const subtitle$a = "または画像をここにドラッグ";
const buttonLike$a = "気に入った！";
const buttonDislike$a = "気に入らない！";
const howIsYourExpirience$a = "あなたの体験はどうでしたか？";
const metaTitle$a = "Cutbg - AI背景リムーバー | 無料で画像の背景を削除";
const metaDescription$a = "AIを使用して画像の背景をオンラインで瞬時に削除。無料、高速、簡単に使える。透明PNGやプロ向け編集に最適！";
const metaKeywords$a = "背景削除, 背景リムーバー, AI背景削除, 無料背景削除, 背景消去, 透明背景, 背景切り抜き, オンライン背景削除, 画像の背景を削除";
const ariaRestButton$a = "リセットボタン";
const ariaDownloadButton$a = "ダウンロードボタン";
const thanksForFeedback$a = "フィードバックありがとうございます";
const somethingWentWrong$a = "何か問題が発生しました。もう一度お試しください！";
const tutorial$a = "画像をアップロード – デバイスからファイルを選択するだけです。\n少し待つ – 数秒で画像を処理します。\n結果をダウンロード – 画像ブロックの右上にある「ダウンロード」ボタンをクリックします。\n\n完了！🎉 これで画像がデバイスに保存されました。🚀";
const how_to_use$a = "使い方？";
const ja = {
  title: title$a,
  actionButton: actionButton$a,
  subtitle: subtitle$a,
  buttonLike: buttonLike$a,
  buttonDislike: buttonDislike$a,
  howIsYourExpirience: howIsYourExpirience$a,
  metaTitle: metaTitle$a,
  metaDescription: metaDescription$a,
  metaKeywords: metaKeywords$a,
  ariaRestButton: ariaRestButton$a,
  ariaDownloadButton: ariaDownloadButton$a,
  thanksForFeedback: thanksForFeedback$a,
  somethingWentWrong: somethingWentWrong$a,
  tutorial: tutorial$a,
  how_to_use: how_to_use$a
};
const title$9 = "Remover o fundo instantaneamente";
const actionButton$9 = "começar com uma foto";
const subtitle$9 = "ou solte a imagem aqui";
const buttonLike$9 = "Eu gostei!";
const buttonDislike$9 = "Não gostei!";
const howIsYourExpirience$9 = "Como foi a sua experiência?";
const metaTitle$9 = "Cutbg - Removedor de Fundo com IA | Remova o Fundo de Imagens Grátis Online";
const metaDescription$9 = "Remova instantaneamente o fundo de imagens com IA. Rápido, gratuito e fácil de usar. Ideal para PNGs transparentes e edições profissionais!";
const metaKeywords$9 = "remover fundo, removedor de fundo, IA removedor de fundo, removedor de fundo grátis, apagar fundo, fundo transparente, cortar fundo, removedor de fundo online, remover fundo de imagem";
const ariaRestButton$9 = "Botão de redefinição";
const ariaDownloadButton$9 = "Botão de download";
const thanksForFeedback$9 = "Obrigado pelo seu feedback";
const somethingWentWrong$9 = "Algo deu errado. Por favor, tente novamente!";
const tutorial$9 = 'Carregue uma imagem – basta selecionar um arquivo do seu dispositivo.\nEspere um pouco – processaremos sua imagem em segundos.\nBaixe o resultado – clique no botão "Baixar" no canto superior direito do bloco de imagem.\n\nPronto! 🎉 Agora sua imagem está salva no seu dispositivo. 🚀';
const how_to_use$9 = "Como usar?";
const pt = {
  title: title$9,
  actionButton: actionButton$9,
  subtitle: subtitle$9,
  buttonLike: buttonLike$9,
  buttonDislike: buttonDislike$9,
  howIsYourExpirience: howIsYourExpirience$9,
  metaTitle: metaTitle$9,
  metaDescription: metaDescription$9,
  metaKeywords: metaKeywords$9,
  ariaRestButton: ariaRestButton$9,
  ariaDownloadButton: ariaDownloadButton$9,
  thanksForFeedback: thanksForFeedback$9,
  somethingWentWrong: somethingWentWrong$9,
  tutorial: tutorial$9,
  how_to_use: how_to_use$9
};
const title$8 = "Удалить фон у изображения";
const actionButton$8 = "Загрузите фото";
const subtitle$8 = "или перетащите изображение сюда";
const buttonLike$8 = "Мне нравится!";
const buttonDislike$8 = "Не нравится!";
const howIsYourExpirience$8 = "Как ваше впечатление?";
const metaTitle$8 = "Cutbg - AI Удаление Фона | Бесплатно Удалить Фон с Изображений Онлайн";
const metaDescription$8 = "Мгновенно удаляйте фон с изображений онлайн с помощью ИИ. Бесплатно, быстро и легко в использовании. Идеально для прозрачных PNG и профессионального редактирования!";
const metaKeywords$8 = "удалить фон, удаление фона, AI удаление фона, бесплатное удаление фона, очистить фон, прозрачный фон, вырезать фон, онлайн удаление фона, удалить фон с изображения";
const ariaRestButton$8 = "Кнопка сброса";
const ariaDownloadButton$8 = "Кнопка загрузки";
const thanksForFeedback$8 = "Спасибо за ваш отзыв";
const somethingWentWrong$8 = "Что-то пошло не так. Пожалуйста, попробуйте еще раз!";
const tutorial$8 = "Загрузите изображение – просто выберите файл с вашего устройства.\nПодождите немного – мы обработаем вашу картинку в считанные секунды.\nСкачайте результат – нажмите кнопку «Скачать» в правом углу блока с изображением.\n\nГотово! 🎉 Теперь ваше изображение у вас на устройстве. 🚀";
const how_to_use$8 = "Как использовать?";
const ru = {
  title: title$8,
  actionButton: actionButton$8,
  subtitle: subtitle$8,
  buttonLike: buttonLike$8,
  buttonDislike: buttonDislike$8,
  howIsYourExpirience: howIsYourExpirience$8,
  metaTitle: metaTitle$8,
  metaDescription: metaDescription$8,
  metaKeywords: metaKeywords$8,
  ariaRestButton: ariaRestButton$8,
  ariaDownloadButton: ariaDownloadButton$8,
  thanksForFeedback: thanksForFeedback$8,
  somethingWentWrong: somethingWentWrong$8,
  tutorial: tutorial$8,
  how_to_use: how_to_use$8
};
const title$7 = "배경 즉시 제거";
const actionButton$7 = "사진에서 시작하기";
const subtitle$7 = "또는 여기에 이미지를 놓으세요";
const buttonLike$7 = "마음에 들어요!";
const buttonDislike$7 = "마음에 들지 않아요!";
const howIsYourExpirience$7 = "사용 경험이 어떠셨나요?";
const metaTitle$7 = "Cutbg - AI 배경 제거기 | 무료 온라인 이미지 배경 제거";
const metaDescription$7 = "AI를 사용하여 이미지를 빠르게 배경 제거하세요. 무료, 빠르고 사용이 간편하며, 투명 PNG 및 전문가 편집에 최적화!";
const metaKeywords$7 = "배경 제거, 배경 지우기, AI 배경 제거, 무료 배경 제거, 배경 삭제, 투명 배경, 배경 잘라내기, 온라인 배경 제거, 이미지 배경 제거";
const ariaRestButton$7 = "초기화 버튼";
const ariaDownloadButton$7 = "다운로드 버튼";
const thanksForFeedback$7 = "피드백 감사합니다";
const somethingWentWrong$7 = "문제가 발생했습니다. 다시 시도해주세요!";
const tutorial$7 = '이미지 업로드 – 장치에서 파일을 선택하세요.\n잠시 기다리세요 – 몇 초 안에 이미지를 처리합니다.\n결과 다운로드 – 이미지 블록의 오른쪽 상단에 있는 "다운로드" 버튼을 클릭하세요.\n\n완료! 🎉 이제 이미지가 장치에 저장되었습니다. 🚀';
const how_to_use$7 = "사용 방법?";
const ko = {
  title: title$7,
  actionButton: actionButton$7,
  subtitle: subtitle$7,
  buttonLike: buttonLike$7,
  buttonDislike: buttonDislike$7,
  howIsYourExpirience: howIsYourExpirience$7,
  metaTitle: metaTitle$7,
  metaDescription: metaDescription$7,
  metaKeywords: metaKeywords$7,
  ariaRestButton: ariaRestButton$7,
  ariaDownloadButton: ariaDownloadButton$7,
  thanksForFeedback: thanksForFeedback$7,
  somethingWentWrong: somethingWentWrong$7,
  tutorial: tutorial$7,
  how_to_use: how_to_use$7
};
const title$6 = "Keluarkan Latar Belakang Segera";
const actionButton$6 = "Klik untuk memuat naik gambar";
const subtitle$6 = "atau seret gambar di sini";
const buttonLike$6 = "Saya suka!";
const buttonDislike$6 = "Saya tidak suka!";
const howIsYourExpirience$6 = "Bagaimana pengalaman anda?";
const metaTitle$6 = "Cutbg - Pembuang Latar Belakang AI | Keluarkan Latar Belakang Gambar Secara Dalam Talian Percuma";
const metaDescription$6 = "Keluarkan latar belakang gambar secara segera menggunakan AI. Alat pembuang latar belakang yang percuma, pantas, dan mudah digunakan—sesuai untuk PNG telus dan penyuntingan profesional!";
const metaKeywords$6 = "keluarkan latar belakang, pembuang latar belakang, pembuang latar belakang AI, pembuang latar belakang percuma, hapus latar belakang, latar belakang telus, potong latar belakang, pembuang latar belakang dalam talian, keluarkan latar belakang dari gambar";
const ariaRestButton$6 = "Butang Tetapkan Semula";
const ariaDownloadButton$6 = "Butang Muat Turun";
const thanksForFeedback$6 = "Terima kasih atas maklum balas anda";
const somethingWentWrong$6 = "Ada masalah. Sila cuba lagi!";
const tutorial$6 = 'Muat naik imej – pilih fail dari peranti anda.\nTunggu sebentar – kami akan memproses gambar anda dalam beberapa saat.\nMuat turun hasilnya – klik butang "Muat Turun" di sudut kanan atas blok imej.\n\nSelesai! 🎉 Sekarang imej anda disimpan dalam peranti anda. 🚀';
const how_to_use$6 = "Bagaimana cara menggunakan?";
const ms = {
  title: title$6,
  actionButton: actionButton$6,
  subtitle: subtitle$6,
  buttonLike: buttonLike$6,
  buttonDislike: buttonDislike$6,
  howIsYourExpirience: howIsYourExpirience$6,
  metaTitle: metaTitle$6,
  metaDescription: metaDescription$6,
  metaKeywords: metaKeywords$6,
  ariaRestButton: ariaRestButton$6,
  ariaDownloadButton: ariaDownloadButton$6,
  thanksForFeedback: thanksForFeedback$6,
  somethingWentWrong: somethingWentWrong$6,
  tutorial: tutorial$6,
  how_to_use: how_to_use$6
};
const title$5 = "ลบพื้นหลังทันที";
const actionButton$5 = "คลิกเพื่ออัปโหลดรูปภาพ";
const subtitle$5 = "หรือวางภาพที่นี่";
const buttonLike$5 = "ชอบ!";
const buttonDislike$5 = "ไม่ชอบ!";
const howIsYourExpirience$5 = "ประสบการณ์ของคุณเป็นอย่างไร?";
const metaTitle$5 = "Cutbg - ตัวลบพื้นหลัง AI | ลบพื้นหลังภาพออนไลน์ฟรี";
const metaDescription$5 = "ลบพื้นหลังจากภาพทันทีด้วย AI. เครื่องมือสำหรับลบพื้นหลังที่ฟรี รวดเร็ว และใช้งานง่าย—เหมาะสำหรับ PNG โปร่งใสและการแก้ไขแบบมืออาชีพ!";
const metaKeywords$5 = "ลบพื้นหลัง, ตัวลบพื้นหลัง, ตัวลบพื้นหลัง AI, ตัวลบพื้นหลังฟรี, ลบพื้นหลัง, พื้นหลังโปร่งใส, ตัดพื้นหลัง, ตัวลบพื้นหลังออนไลน์, ลบพื้นหลังจากภาพ";
const ariaRestButton$5 = "ปุ่มรีเซ็ต";
const ariaDownloadButton$5 = "ปุ่มดาวน์โหลด";
const thanksForFeedback$5 = "ขอบคุณสำหรับข้อเสนอแนะของคุณ";
const somethingWentWrong$5 = "เกิดข้อผิดพลาด. โปรดลองใหม่อีกครั้ง!";
const tutorial$5 = 'อัปโหลดภาพ – เพียงเลือกไฟล์จากอุปกรณ์ของคุณ\nรอสักครู่ – เราจะประมวลผลภาพของคุณในไม่กี่วินาที\nดาวน์โหลดผลลัพธ์ – คลิกปุ่ม "ดาวน์โหลด" ที่มุมขวาบนของบล็อกภาพ\n\nเสร็จแล้ว! 🎉 ตอนนี้ภาพของคุณถูกบันทึกลงในอุปกรณ์แล้ว 🚀';
const how_to_use$5 = "วิธีใช้?";
const th = {
  title: title$5,
  actionButton: actionButton$5,
  subtitle: subtitle$5,
  buttonLike: buttonLike$5,
  buttonDislike: buttonDislike$5,
  howIsYourExpirience: howIsYourExpirience$5,
  metaTitle: metaTitle$5,
  metaDescription: metaDescription$5,
  metaKeywords: metaKeywords$5,
  ariaRestButton: ariaRestButton$5,
  ariaDownloadButton: ariaDownloadButton$5,
  thanksForFeedback: thanksForFeedback$5,
  somethingWentWrong: somethingWentWrong$5,
  tutorial: tutorial$5,
  how_to_use: how_to_use$5
};
const title$4 = "Hapus Latar Belakang Secara Instan";
const actionButton$4 = "Klik untuk mengunggah foto";
const subtitle$4 = "atau seret gambar ke sini";
const buttonLike$4 = "Saya suka!";
const buttonDislike$4 = "Saya tidak suka!";
const howIsYourExpirience$4 = "Bagaimana pengalaman Anda?";
const metaTitle$4 = "Cutbg - Penghapus Latar Belakang AI | Hapus Latar Belakang Gambar Secara Online Gratis";
const metaDescription$4 = "Hapus latar belakang gambar secara instan dengan AI. Alat penghapus latar belakang yang cepat, gratis, dan mudah digunakan—sempurna untuk PNG transparan dan pengeditan profesional!";
const metaKeywords$4 = "hapus latar belakang, penghapus latar belakang, penghapus latar belakang AI, penghapus latar belakang gratis, hapus latar belakang, latar belakang transparan, potong latar belakang, penghapus latar belakang online, hapus latar belakang dari gambar";
const ariaRestButton$4 = "Tombol Reset";
const ariaDownloadButton$4 = "Tombol Unduh";
const thanksForFeedback$4 = "Terima kasih atas masukan Anda";
const somethingWentWrong$4 = "Terjadi kesalahan. Silakan coba lagi!";
const tutorial$4 = 'Unggah gambar – cukup pilih file dari perangkat Anda.\nTunggu sebentar – kami akan memproses gambar Anda dalam hitungan detik.\nUnduh hasilnya – klik tombol "Unduh" di sudut kanan atas blok gambar.\n\nSelesai! 🎉 Sekarang gambar Anda tersimpan di perangkat Anda. 🚀';
const how_to_use$4 = "Bagaimana cara menggunakan?";
const id = {
  title: title$4,
  actionButton: actionButton$4,
  subtitle: subtitle$4,
  buttonLike: buttonLike$4,
  buttonDislike: buttonDislike$4,
  howIsYourExpirience: howIsYourExpirience$4,
  metaTitle: metaTitle$4,
  metaDescription: metaDescription$4,
  metaKeywords: metaKeywords$4,
  ariaRestButton: ariaRestButton$4,
  ariaDownloadButton: ariaDownloadButton$4,
  thanksForFeedback: thanksForFeedback$4,
  somethingWentWrong: somethingWentWrong$4,
  tutorial: tutorial$4,
  how_to_use: how_to_use$4
};
const title$3 = "Xóa Nền Ngay Lập Tức";
const actionButton$3 = "Nhấp để tải ảnh lên";
const subtitle$3 = "hoặc thả ảnh vào đây";
const buttonLike$3 = "Tôi thích!";
const buttonDislike$3 = "Tôi không thích!";
const howIsYourExpirience$3 = "Trải nghiệm của bạn như thế nào?";
const metaTitle$3 = "Cutbg - Công Cụ Xóa Nền AI | Xóa Nền Ảnh Online Miễn Phí";
const metaDescription$3 = "Xóa nền ảnh ngay lập tức với AI. Công cụ xóa nền miễn phí, nhanh chóng và dễ sử dụng—hoàn hảo cho PNG trong suốt và chỉnh sửa chuyên nghiệp!";
const metaKeywords$3 = "xóa nền, công cụ xóa nền, công cụ xóa nền AI, xóa nền miễn phí, xóa nền, nền trong suốt, cắt nền, công cụ xóa nền online, xóa nền từ ảnh";
const ariaRestButton$3 = "Nút Đặt Lại";
const ariaDownloadButton$3 = "Nút Tải Xuống";
const thanksForFeedback$3 = "Cảm ơn phản hồi của bạn";
const somethingWentWrong$3 = "Đã có lỗi xảy ra. Vui lòng thử lại!";
const tutorial$3 = 'Tải lên hình ảnh – chỉ cần chọn tệp từ thiết bị của bạn.\nChờ một chút – chúng tôi sẽ xử lý hình ảnh của bạn trong vài giây.\nTải kết quả – nhấp vào nút "Tải xuống" ở góc trên bên phải của khối hình ảnh.\n\nHoàn tất! 🎉 Bây giờ hình ảnh của bạn đã được lưu trên thiết bị. 🚀';
const how_to_use$3 = "Cách sử dụng?";
const vi = {
  title: title$3,
  actionButton: actionButton$3,
  subtitle: subtitle$3,
  buttonLike: buttonLike$3,
  buttonDislike: buttonDislike$3,
  howIsYourExpirience: howIsYourExpirience$3,
  metaTitle: metaTitle$3,
  metaDescription: metaDescription$3,
  metaKeywords: metaKeywords$3,
  ariaRestButton: ariaRestButton$3,
  ariaDownloadButton: ariaDownloadButton$3,
  thanksForFeedback: thanksForFeedback$3,
  somethingWentWrong: somethingWentWrong$3,
  tutorial: tutorial$3,
  how_to_use: how_to_use$3
};
const title$2 = "Фонды бірден алып тастау";
const actionButton$2 = "Суретті жүктеу үшін басыңыз";
const subtitle$2 = "немесе суретті мұнда тастаңыз";
const buttonLike$2 = "Ұнады!";
const buttonDislike$2 = "Ұнамады!";
const howIsYourExpirience$2 = "Тәжірибеңіз қалай болды?";
const metaTitle$2 = "Cutbg - Жасанды интеллектпен фонды алып тастау | Суреттің фондына арналған тегін онлайн қызмет";
const metaDescription$2 = "Жасанды интеллект арқылы суреттерден фонды бірден алып тастаңыз. Тегін, жылдам және оңай қолданылатын фонды алып тастау құралы—PNG мөлдір және кәсіби өңдеулер үшін мінсіз!";
const metaKeywords$2 = "фонды алып тастау, фонды алып тастау құралы, жасанды интеллект фонды алып тастау, тегін фонды алып тастау құралы, фонды өшіру, мөлдір фон, фонды кесу, онлайн фонды алып тастау құралы, суреттен фонды алып тастау";
const ariaRestButton$2 = "Қалпына келтіру батырмасы";
const ariaDownloadButton$2 = "Жүктеу батырмасы";
const thanksForFeedback$2 = "Кері байланысыңыз үшін рахмет";
const somethingWentWrong$2 = "Қате кетті. Қайта байқап көріңіз!";
const tutorial$2 = 'Сурет жүктеңіз – құрылғыңыздан файлды таңдаңыз.\nБіраз күтіңіз – біз суретті бірнеше секундта өңдейміз.\nНәтижені жүктеңіз – сурет блогының оң жақ жағындағы "Жүктеу" түймесін басыңыз.\n\nДайын! 🎉 Енді суретіңіз құрылғыңызда сақталды. 🚀';
const how_to_use$2 = "Қалай қолдануға болады?";
const kk = {
  title: title$2,
  actionButton: actionButton$2,
  subtitle: subtitle$2,
  buttonLike: buttonLike$2,
  buttonDislike: buttonDislike$2,
  howIsYourExpirience: howIsYourExpirience$2,
  metaTitle: metaTitle$2,
  metaDescription: metaDescription$2,
  metaKeywords: metaKeywords$2,
  ariaRestButton: ariaRestButton$2,
  ariaDownloadButton: ariaDownloadButton$2,
  thanksForFeedback: thanksForFeedback$2,
  somethingWentWrong: somethingWentWrong$2,
  tutorial: tutorial$2,
  how_to_use: how_to_use$2
};
const title$1 = "Фонду дароо алып салуу";
const actionButton$1 = "Сүрөттү жүктөө үчүн басыңыз";
const subtitle$1 = "же сүрөттү бул жерге таштаңыз";
const buttonLike$1 = "Маған жагат!";
const buttonDislike$1 = "Маған жакпайт!";
const howIsYourExpirience$1 = "Тажрыйбаңыз кандай болду?";
const metaTitle$1 = "Cutbg - Жасалма интеллект менен фонду алып салуу | Сүрөттүн фонун онлайн түрдө бекер алып салуу";
const metaDescription$1 = "Жасалма интеллект аркылуу сүрөттөрдөн фонду дароо алып салыңыз. Бекер, тез жана оңой колдонулуучу фонду алып салуу куралы—мөлтүрлүү PNG'лер жана кесипкөй өңдөөлөр үчүн эң сонун!";
const metaKeywords$1 = "фонду алып салуу, фонду алып салуу куралы, жасалма интеллект фонду алып салуу, бекер фонду алып салуу куралы, фонду өчүрүү, мөлтүр фон, фонду кесүү, онлайн фонду алып салуу куралы, сүрөттөн фонду алып салуу";
const ariaRestButton$1 = "Калпына келтирүү баскычы";
const ariaDownloadButton$1 = "Жүктөө баскычы";
const thanksForFeedback$1 = "Кері байланышыңыз үчүн рахмат";
const somethingWentWrong$1 = "Кате кетти. Кайрадан аракет кылып көрүңүз!";
const tutorial$1 = 'Сүрөт жүктөө – түзмөктөн файлды тандаңыз.\nБир аз күтө туруңуз – биз сүрөтүңүздү бир нече секундада иштеп чыгабыз.\nНатыйжаны жүктөө – сүрөт блогунун оң жак бурчунан "Жүктөө" баскычын басыңыз.\n\nАякталды! 🎉 Эми сүрөтүңүз түзмөктө сакталды. 🚀';
const how_to_use$1 = "Кантип колдонуу керек?";
const ky = {
  title: title$1,
  actionButton: actionButton$1,
  subtitle: subtitle$1,
  buttonLike: buttonLike$1,
  buttonDislike: buttonDislike$1,
  howIsYourExpirience: howIsYourExpirience$1,
  metaTitle: metaTitle$1,
  metaDescription: metaDescription$1,
  metaKeywords: metaKeywords$1,
  ariaRestButton: ariaRestButton$1,
  ariaDownloadButton: ariaDownloadButton$1,
  thanksForFeedback: thanksForFeedback$1,
  somethingWentWrong: somethingWentWrong$1,
  tutorial: tutorial$1,
  how_to_use: how_to_use$1
};
const title = "Fonni darhol olib tashlash";
const actionButton = "Rasmni yuklash uchun bosing";
const subtitle = "yoki rasmlarni shu yerga tashlang";
const buttonLike = "Yoqtim!";
const buttonDislike = "Yoqtirmadim!";
const howIsYourExpirience = "Tajribangiz qanday o'tdi?";
const metaTitle = "Cutbg - Sun'iy intellekt yordamida fonni olib tashlash | Rasmdan fonni bepul onlayn olib tashlash";
const metaDescription = "Sun'iy intellekt yordamida rasmlardan fonni darhol olib tashlang. Bepul, tez va foydalanish uchun oson fonni olib tashlash vositasi—shaffof PNG va professional tahrirlar uchun mukammal!";
const metaKeywords = "fonni olib tashlash, fonni olib tashlash vositasi, sun'iy intellekt fonni olib tashlash, bepul fonni olib tashlash vositasi, fonni o'chirish, shaffof fon, fonni kesish, onlayn fonni olib tashlash vositasi, rasmdan fonni olib tashlash";
const ariaRestButton = "Qayta tiklash tugmasi";
const ariaDownloadButton = "Yuklab olish tugmasi";
const thanksForFeedback = "Fikr-mulohazangiz uchun rahmat";
const somethingWentWrong = "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring!";
const tutorial = 'Rasm yuklang – qurilmangizdan faylni tanlang.\nBiroz kuting – biz rasmni bir necha soniyada ishlab chiqamiz.\nNatijani yuklab oling – rasm blokining o‘ng burchagidagi "Yuklab olish" tugmasini bosing.\n\nTayyor! 🎉 Endi rasm qurilmangizda saqlangan. 🚀';
const how_to_use = "Qanday foydalaniladi?";
const uz = {
  title,
  actionButton,
  subtitle,
  buttonLike,
  buttonDislike,
  howIsYourExpirience,
  metaTitle,
  metaDescription,
  metaKeywords,
  ariaRestButton,
  ariaDownloadButton,
  thanksForFeedback,
  somethingWentWrong,
  tutorial,
  how_to_use
};
const languages = {
  en: { translation: en },
  cn: { translation: cn },
  de: { translation: de },
  es: { translation: es },
  fr: { translation: fr },
  hi: { translation: hi },
  it: { translation: it },
  ja: { translation: ja },
  pt: { translation: pt },
  ru: { translation: ru },
  ko: { translation: ko },
  ms: { translation: ms },
  th: { translation: th },
  id: { translation: id },
  vi: { translation: vi },
  kk: { translation: kk },
  ky: { translation: ky },
  uz: { translation: uz }
};
const getLanguagesList = () => {
  return Object.keys(languages);
};
const userLanguage = typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage);
const isNavigatorLanguageAvailable = () => {
  return Object.keys(languages).includes(userLanguage);
};
const userLanguageByURL = () => {
  if (typeof window !== "undefined") {
    const url = window.location.href;
    const urlParts = url.split("/");
    const langPart = urlParts.find((part) => Object.keys(languages).includes(part));
    if (langPart) {
      return langPart;
    }
  }
  return null;
};
const defaultLanguage = () => {
  let userLanguageByURL2 = userLanguageByURL();
  if (userLanguageByURL2) {
    return userLanguageByURL2;
  }
  if (isNavigatorLanguageAvailable()) {
    return userLanguage;
  }
  return "en";
};
let defaultLanguage2 = defaultLanguage();
i18n.use(initReactI18next).init({
  resources: languages,
  lng: defaultLanguage2,
  // Язык по умолчанию
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});
const logo = "/assets/logo_small-1-Moc0A2RG.webp";
const LangSelect = () => {
  let translation = useTranslation();
  let languages2 = getLanguagesList();
  const flags = {
    en: "🇺🇸",
    es: "🇪🇸",
    fr: "🇫🇷",
    cn: "🇨🇳",
    de: "🇩🇪",
    hi: "🇮🇳",
    id: "🇮🇩",
    it: "🇮🇹",
    ja: "🇯🇵",
    kk: "🇰🇿",
    ko: "🇰🇷",
    ky: "🇰🇬",
    ms: "🇲🇾",
    pt: "🇵🇹",
    ru: "🇷🇺",
    th: "🇹🇭",
    tr: "🇹🇷",
    uz: "🇺🇿",
    vi: "🇻🇳"
  };
  return /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("select", { onChange: () => {
    translation.i18n.changeLanguage(event.target.value);
    window.history.pushState(null, "", `/${event.target.value}`);
  }, className: "appearance-none  rounded p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md", children: languages2.map((lang) => /* @__PURE__ */ jsxs("option", { value: lang, selected: lang.toUpperCase() == translation.i18n.language.toUpperCase(), children: [
    flags[lang],
    " ",
    lang.toUpperCase()
  ] }, lang)) }) });
};
const Layout = ({ children }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { path: "/", label: "Remove background" },
    { path: "/compress", label: "Compress" },
    { path: "/convert", label: "Convert" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-white shadow-sm border-b", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-16", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center", children: /* @__PURE__ */ jsx("img", { src: logo, className: "h-8 w-auto", alt: "logo" }) }) }),
        /* @__PURE__ */ jsx("nav", { className: "hidden md:flex space-x-8", children: navItems.map((item) => /* @__PURE__ */ jsx(
          Link,
          {
            to: item.path,
            className: `px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.path ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`,
            children: item.label
          },
          item.path
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx(LangSelect, {}),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open main menu" }),
                isMobileMenuOpen ? /* @__PURE__ */ jsx("svg", { className: "block h-6 w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) : /* @__PURE__ */ jsx("svg", { className: "block h-6 w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
              ]
            }
          )
        ] })
      ] }),
      isMobileMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx("div", { className: "px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t", children: navItems.map((item) => /* @__PURE__ */ jsx(
        Link,
        {
          to: item.path,
          className: `block px-3 py-2 rounded-md text-base font-medium transition-colors ${location.pathname === item.path ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`,
          onClick: () => setIsMobileMenuOpen(false),
          children: item.label
        },
        item.path
      )) }) })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children })
  ] });
};
class Metatags extends React.Component {
  render() {
    const { t, lang } = this.props;
    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "CutBG",
      "image": "https://cutbg.org/ogimage.webp",
      "description": t("metaDescription"),
      "provider": {
        "@type": "Organization",
        "name": t("metaTitle")
      },
      "url": "https://cutbg.org",
      "inLanguage": lang
    };
    return /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("html", { lang }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: t("metaTitle") }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: t("metaDescription") }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: t("metaDescription") }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: t("metaKeywords") }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: t("metaTitle") }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: t("metaDescription") }),
      /* @__PURE__ */ jsx("title", { children: t("metaTitle") }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLdData) })
    ] });
  }
}
const firebaseConfig = {
  apiKey: "AIzaSyAIS7YrK-7DBsys5oGRBRPmuG37hR8MsvU",
  authDomain: "cutbg-cf1df.firebaseapp.com",
  projectId: "cutbg-cf1df",
  storageBucket: "cutbg-cf1df.firebasestorage.app",
  messagingSenderId: "824401133467",
  appId: "1:824401133467:web:5baeedd1c65c728bc66b3e",
  measurementId: "G-FHBNC2Y6GF"
};
const AnalyticsEvents = {
  ButtonRemoveBgClick: "button_remove_bg_click",
  ButtonDislikeClick: "button_dislike_click",
  ButtonDownloadClick: "button_download_click",
  ButtonLikeClick: "button_like_click",
  ButtonResetClick: "button_reset_click",
  BackgroundRemovedSuccess: "background_removed_success"
};
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const Feedback = ({ isCompleted, isFeedbackSent, setIsFeedbackSent, t }) => {
  const onLikeClick = () => {
    setIsFeedbackSent(true);
    logEvent(analytics, AnalyticsEvents.ButtonLikeClick);
  };
  const onDislikeClick = () => {
    setIsFeedbackSent(true);
    logEvent(analytics, AnalyticsEvents.ButtonDislikeClick);
  };
  return isCompleted ? /* @__PURE__ */ jsx("div", { className: "bg-secondary w-full mt-4 p-4 rounded-lg text-center text-gray-600 text-xs", children: !isFeedbackSent ? /* @__PURE__ */ jsxs("div", { children: [
    t("howIsYourExpirience"),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row space-x-1 items-center justify-center mt-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onLikeClick(),
          className: "p-2 rounded bg-accent text-reversed w-38 cursor-pointer",
          "aria-label": t("buttonLike"),
          children: t("buttonLike")
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onDislikeClick(),
          className: "bg-accent p-2 rounded text-reversed w-38 cursor-pointer",
          "aria-label": t("buttonDislike"),
          children: t("buttonDislike")
        }
      )
    ] })
  ] }) : /* @__PURE__ */ jsx("div", { children: t("thanksForFeedback") }) }) : null;
};
const RefreshIcon = () => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-8 w-8 rotate-180",
      fill: "none",
      viewBox: "0 2 24 24",
      stroke: "currentColor",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          d: "M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M8 12l4-4m0 0l4 4m-4-4v12"
        }
      )
    }
  );
};
const DownloadIcon = () => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "50",
      height: "50",
      viewBox: "0 0 50 50",
      className: "h-8 w-8",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M37 16C34.19 13 30.36 11 26 11C18.27 11 12 17.27 12 25C12 32.73 18.27 39 26 39C31.32 39 35.86 36.17 38 32",
            stroke: "white",
            strokeWidth: "4",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M37 10V16H31",
            stroke: "white",
            strokeWidth: "4",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
};
const CompleteActionButtons = ({ isCompleted, imageSrc, reset, t }) => {
  return isCompleted ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        onClick: () => logEvent(analytics, AnalyticsEvents.ButtonDownloadClick),
        href: imageSrc,
        download: "CutBG.png",
        "aria-label": t("ariaDownloadButton"),
        children: /* @__PURE__ */ jsx("button", { className: "absolute bg-accent text-reversed right-4 top-4 p-1 rounded cursor-pointer", children: /* @__PURE__ */ jsx(RefreshIcon, {}) })
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: reset,
        className: "absolute bg-accent text-reversed left-4 top-4 p-1 rounded cursor-pointer",
        "aria-label": t("ariaRestButton"),
        children: /* @__PURE__ */ jsx(DownloadIcon, {})
      }
    )
  ] }) : null;
};
const UploadIcon = () => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "h-6 w-6  mr-2",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          d: "M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M8 12l4-4m0 0l4 4m-4-4v12"
        }
      )
    }
  );
};
const Loader = ({ processing }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let interval = 50;
    const step = 1;
    let timer;
    const updateProgress = () => {
      setProgress((prev) => {
        if (!processing && prev === 99) return 100;
        const randomValue = Math.random() * 10;
        interval = prev * randomValue;
        return prev + step >= 99 ? 99 : prev + step;
      });
      timer = setTimeout(updateProgress, interval);
    };
    updateProgress();
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "loader top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" }),
    /* @__PURE__ */ jsxs("div", { className: "text-white w-full flex items-center justify-center text-lg font-semibold z-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2", children: [
      Math.round(progress),
      "%"
    ] })
  ] });
};
const UploadImage = ({ imageWithBgSrc, imageNoBgSrc, t, handleFileChange, processing }) => {
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
  return /* @__PURE__ */ jsx(Fragment, { children: imageNoBgSrc ? /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full overflow-hidden", children: [
    imageNoBgSrc && /* @__PURE__ */ jsx("img", { src: imageNoBgSrc, alt: "No Background", className: "absolute w-full h-full object-cover" }),
    imageWithBgSrc && /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute top-0 left-0 w-full h-full",
        style: { clipPath: `inset(0 ${wipeProgress}% 0 0)` },
        children: /* @__PURE__ */ jsx("img", { src: imageWithBgSrc, alt: "With Background", className: "w-full h-full object-cover" })
      }
    ),
    processing && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black opacity-50" }),
      /* @__PURE__ */ jsx(Loader, { processing })
    ] })
  ] }) : /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: "upload",
      className: "flex flex-col items-center justify-center w-full h-full cursor-pointer",
      "aria-label": t("actionButton"),
      onClick: () => logEvent(analytics, AnalyticsEvents.ButtonRemoveBgClick),
      children: [
        /* @__PURE__ */ jsxs("span", { className: "flex flex-col items-center cursor-pointer", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex bg-accent text-reversed text-white px-4 py-2 rounded-lg cursor-pointer", children: [
            /* @__PURE__ */ jsx(UploadIcon, {}),
            /* @__PURE__ */ jsx("p", { children: t("actionButton") })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-2", children: t("subtitle") })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            id: "upload",
            className: "hidden",
            accept: "image/*",
            "aria-describedby": "file-upload-instructions",
            onChange: handleFileChange
          }
        )
      ]
    }
  ) });
};
const useImageUpload = () => {
  const [files, setFiles] = useState([]);
  const [imageNoBgSrc, setImageNoBgSrc] = useState(null);
  const [error, setError] = useState(null);
  const [imageWithBgSrc, setImageWithBgSrc] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFeedbackSent, setIsFeedbackSent] = useState(false);
  const handleFileChange = (event2) => {
    processFiles(event2.target.files);
  };
  const reset = () => {
    setFiles([]);
    setProcessing(false);
    setImageNoBgSrc(null);
    setIsCompleted(false);
    setIsFeedbackSent(false);
    logEvent(analytics, AnalyticsEvents.ButtonResetClick);
  };
  const requestNoBackground = async (data) => {
    try {
      setError(null);
      console.log("removing....");
      setProcessing(true);
      const response = await fetch(
        "https://api.cutbg.org/remove-background",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: data })
        }
      );
      setProcessing(false);
      let json = await response.json();
      setImageNoBgSrc(json.image);
      setIsCompleted(true);
      logEvent(analytics, AnalyticsEvents.BackgroundRemovedSuccess);
    } catch (error2) {
      reset();
      setError(error2);
      console.log(error2);
    }
  };
  const handleRemoveBackground = () => {
    if (files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = async function() {
        const base64data = reader.result;
        setImageWithBgSrc(base64data);
        await requestNoBackground(base64data);
      };
    }
  };
  const processFiles = (files2) => {
    setImageNoBgSrc(URL.createObjectURL(files2[0]));
    setFiles(files2);
    handleRemoveBackground();
  };
  useEffect(() => {
    document.addEventListener("paste", (event2) => {
      var _a;
      if ((_a = event2.clipboardData) == null ? void 0 : _a.files.length) {
        processFiles(event2.clipboardData.files);
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
    error,
    handleFileChange,
    reset,
    processFiles
  };
};
const Alert = ({ text }) => {
  return /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center items-center gap-3 mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg ", children: /* @__PURE__ */ jsx("span", { className: "text-sm", children: text }) });
};
const Tutorial = ({ t }) => {
  return /* @__PURE__ */ jsxs("div", { className: "mt-6 text-center", children: [
    /* @__PURE__ */ jsx("h2", { children: t("how_to_use") }),
    t("tutorial").split("\n").filter((e) => e.length > 0).map((line, index) => /* @__PURE__ */ jsx("div", { className: "tutorial-element flex justify-center  items-center w-84  sm:w-[500px] pl-1 pr-1 pt-1 pb-1 bg-white rounded-md min-h-10 shadow-md overflow-hidden mt-1 text-xs text-neutral-600", children: line }, index))
  ] });
};
function RemoveBackground({ lang }) {
  const { t, i18n: i18n2 } = useTranslation();
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
  i18n2.changeLanguage(lang);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Metatags, { t, lang, i18n: i18n2 }),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "flex flex-col items-center mt-8 h-[calc(100vh-120px)] w-min m-auto",
        onDrop: (e) => {
          e.preventDefault();
          processFiles(e.dataTransfer.files);
        },
        onAbort: (e) => e.preventDefault(),
        onDragOver: (e) => e.preventDefault(),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-2", children: t("title") }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Remove background from your images instantly" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "chess-background relative flex flex-col items-center justify-center w-84 min-h-64 sm:w-[500px] sm:h-[350px] bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              UploadImage,
              {
                t,
                imageWithBgSrc,
                imageNoBgSrc,
                processing,
                handleFileChange,
                processFiles
              }
            ),
            /* @__PURE__ */ jsx(CompleteActionButtons, { isCompleted, t, imageSrc: imageNoBgSrc, reset })
          ] }),
          error && /* @__PURE__ */ jsx(Alert, { text: t("somethingWentWrong") }),
          /* @__PURE__ */ jsx(
            Feedback,
            {
              setIsFeedbackSent,
              isFeedbackSent,
              isCompleted,
              t
            }
          ),
          /* @__PURE__ */ jsx(Tutorial, { t })
        ]
      }
    )
  ] });
}
function Compress({ lang }) {
  const { t, i18n: i18n2 } = useTranslation();
  i18n2.changeLanguage(lang);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Metatags, { t, lang, i18n: i18n2 }),
    /* @__PURE__ */ jsxs("section", { className: "flex flex-col items-center mt-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-2", children: "Compress Images" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Reduce image file size while maintaining quality" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-300 rounded-xl shadow-md p-8 w-full max-w-2xl", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("svg", { className: "mx-auto h-12 w-12 text-gray-400", stroke: "currentColor", fill: "none", viewBox: "0 0 48 48", children: /* @__PURE__ */ jsx("path", { d: "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Coming Soon" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Image compression functionality will be available soon." })
      ] }) })
    ] })
  ] });
}
function Convert({ lang }) {
  const { t, i18n: i18n2 } = useTranslation();
  i18n2.changeLanguage(lang);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Metatags, { t, lang, i18n: i18n2 }),
    /* @__PURE__ */ jsxs("section", { className: "flex flex-col items-center mt-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-2", children: "Convert Images" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Convert images between different formats (JPG, PNG, WebP, etc.)" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-300 rounded-xl shadow-md p-8 w-full max-w-2xl", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("svg", { className: "mx-auto h-12 w-12 text-gray-400", stroke: "currentColor", fill: "none", viewBox: "0 0 48 48", children: /* @__PURE__ */ jsx("path", { d: "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Coming Soon" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Image conversion functionality will be available soon." })
      ] }) })
    ] })
  ] });
}
function App({ lang }) {
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(RemoveBackground, { lang }) }),
    /* @__PURE__ */ jsx(Route, { path: "/compress", element: /* @__PURE__ */ jsx(Compress, { lang }) }),
    /* @__PURE__ */ jsx(Route, { path: "/convert", element: /* @__PURE__ */ jsx(Convert, { lang }) })
  ] }) });
}
function render(_url, lang) {
  let languages2 = getLanguagesList();
  console.log(languages2, _url);
  if (languages2.includes(_url)) {
    lang = _url;
    console.log(lang);
  }
  const html = renderToString(
    /* @__PURE__ */ jsx(I18nextProvider, { i18n, children: /* @__PURE__ */ jsx(Router, { children: /* @__PURE__ */ jsx(App, { lang }) }) })
  );
  return { html };
}
export {
  render
};
