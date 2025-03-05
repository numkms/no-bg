import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import { I18nextProvider } from 'react-i18next';
import './i18n/i18n.js';

hydrateRoot(
  document.getElementById('root'),
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
)