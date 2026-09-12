import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App.tsx';
import '@fontsource/plus-jakarta-sans/latin-400.css';
import '@fontsource/plus-jakarta-sans/latin-500.css';
import '@fontsource/plus-jakarta-sans/latin-600.css';
import '@fontsource/plus-jakarta-sans/latin-700.css';
import './index.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Missing #root');
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
);
