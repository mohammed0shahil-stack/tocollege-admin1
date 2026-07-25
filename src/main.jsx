import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ToastProvider } from './contexts/ToastContext.jsx';
import Toast from './components/ui/Toast.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/tocollege-admin1/">
      <ToastProvider>
        <App />
        <Toast />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);
