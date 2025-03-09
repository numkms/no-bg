import { renderToString } from 'react-dom/server'
import App from './App'
import './i18n/i18n.js';
/**
 * @param {string} _url
 */
export function render(_url, lang) {
  const html = renderToString(
      <App lang={lang} />
  )
  
  return { html }
}