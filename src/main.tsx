import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Manejo global de errores
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
});

// Configuración de servicios mock para desarrollo
if (import.meta.env.MODE === 'development') {
  import('./features/products/services/sqlProductService').then(({ sqlProductService }) => {
    console.log('SQL Product Service initialized for development');
  });

  import('./features/products/services/nosqlProductService').then(({ nosqlProductService }) => {
    console.log('NoSQL Product Service initialized for development');
  });
}