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
import ko from "./../../locales/ko.json";
import ms from "./../../locales/ms.json";
import th from "./../../locales/th.json";
import id from "./../../locales/id.json";
import vi from "./../../locales/vi.json";
import kk from "./../../locales/kk.json";
import ky from "./../../locales/ky.json";
import uz from "./../../locales/uz.json";

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
    uz: { translation: uz },
}

const userLanguage = typeof navigator !== 'undefined' && (navigator.language || navigator.userLanguage)
const selectedLanguage = Object.keys(languages).includes(userLanguage) ? userLanguage : 'en'

i18n.use(initReactI18next).init({
    resources: languages,
    lng: selectedLanguage, // Язык по умолчанию
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export default i18n;
