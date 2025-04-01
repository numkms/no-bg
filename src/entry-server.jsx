import { renderToString } from 'react-dom/server'
import App from './apps/App.jsx'
import {getLanguagesList} from './i18n/i18n.js';
import appComponent from './app-component.jsx';
/**
 * @param {string} _url
 */
export function render(_url, lang, app) {
  let languages = getLanguagesList();
  console.log(languages, _url)
  if (languages.includes(_url)) {
    lang = _url 
    console.log(lang)
  }
  const html = renderToString(appComponent(app, lang))
  
  return { html }
}