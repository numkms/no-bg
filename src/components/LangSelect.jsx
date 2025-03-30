import {getLanguagesList} from '../i18n/i18n.js'
import { useTranslation } from "react-i18next";

const LangSelect = () => {
    let translation = useTranslation()
    let languages = getLanguagesList()
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

    return (
        <div className="flex items-center">
                <select onChange={
                   () => {
                        translation.i18n.changeLanguage(event.target.value)
                        window.history.pushState(null, "", `/${event.target.value}`);
                    }
                } className="appearance-none  rounded p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md">
                    {languages.map((lang) => (
                        <option key={lang} value={lang} selected={lang.toUpperCase() == translation.i18n.language.toUpperCase()}>
                            {flags[lang]} {lang.toUpperCase()}
                        </option>
                    ))}
                </select>
        </div>
    );
}

export default LangSelect;