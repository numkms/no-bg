// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAIS7YrK-7DBsys5oGRBRPmuG37hR8MsvU",
  authDomain: "cutbg-cf1df.firebaseapp.com",
  projectId: "cutbg-cf1df",
  storageBucket: "cutbg-cf1df.firebasestorage.app",
  messagingSenderId: "824401133467",
  appId: "1:824401133467:web:5baeedd1c65c728bc66b3e",
  measurementId: "G-FHBNC2Y6GF",
};

const AnalyticsEvents = {
  ButtonRemoveBgClick: "button_remove_bg_click",
  ButtonDislikeClick: "button_dislike_click",
  ButtonDownloadClick: "button_download_click",
  ButtonLikeClick: "button_like_click",
  ButtonResetClick: "button_reset_click",
  BackgroundRemovedSuccess: "background_removed_success",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация Analytics (работает только в браузере)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics, AnalyticsEvents };
