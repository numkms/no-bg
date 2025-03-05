import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./../../locales/en.json";
import cn from "./../../locales/cn.json";
import de from "./../../locales/de.json";
import es from "./../../locales/es.json";
import fr from "./../../locales/fr.json";
import hi from "./../../locales/hi.json";
import it from "./../../locales/it.json";
import ja from "./../../locales/ja.json";
import pt from "./../../locales/pt.json";
import ru from "./../../locales/ru.json";

console.log(en)
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
}

const userLanguage = navigator.language || navigator.userLanguage
const selectedLanguage = Object.keys(languages).includes(userLanguage) ? userLanguage : 'en'
console.log(selectedLanguage)
i18n.use(initReactI18next).init({
    resources: languages,
    lng: selectedLanguage, // Язык по умолчанию
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export default i18n;
