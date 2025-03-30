import { renderToString } from 'react-dom/server'
import App from './apps/App.jsx'
import {getLanguagesList} from './i18n/i18n.js';
/**
 * @param {string} _url
 */
export function render(_url, lang) {
  let languages = getLanguagesList();
  console.log(languages, _url)
  if (languages.includes(_url)) {
    lang = _url 
    console.log(lang)
  }
  const html = renderToString(
      <App lang={lang} />
  )
  
  return { html }
}