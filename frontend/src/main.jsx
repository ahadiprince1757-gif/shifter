// Force clear service workers and caches on localhost once to prevent stale Vite build loads
if (
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
) {
  if (!sessionStorage.getItem('sw_cleared_v2')) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
    if ('caches' in window) {
      caches.keys().then((keys) => {
        Promise.all(keys.map(key => caches.delete(key))).then(() => {
          sessionStorage.setItem('sw_cleared_v2', 'true');
          window.location.reload();
        });
      });
    } else {
      sessionStorage.setItem('sw_cleared_v2', 'true');
    }
  }
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
