import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import fs from 'fs'
import App from './App'
import './i18n/i18n.js';
/**
 * @param {string} _url
 */
export function render(_url) {
  const html = renderToString(
      <App />
  )
  
  return { html }
}