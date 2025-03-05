import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import './i18n/i18n.js';

hydrateRoot(

  document.getElementById('root'),
  <App />
  ,
)