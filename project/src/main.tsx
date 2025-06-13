import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './utils/i18n';

// Apply CSS variables from theme
import { cssVariables } from './styles/theme';
const styleElement = document.createElement('style');
styleElement.innerHTML = cssVariables;
document.head.appendChild(styleElement);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);