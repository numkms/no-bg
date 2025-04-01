import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './apps/App'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n.js';
import appComponent from './app-component.jsx';
let root = document.getElementById('root')
let app = root.dataset.appID
hydrateRoot(
  root,
  <I18nextProvider i18n={i18n}>
    {appComponent(app, i18n.language)}
  </I18nextProvider>
)