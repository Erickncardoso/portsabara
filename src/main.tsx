import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerServiceWorker, clearOldCaches } from './utils/pwa';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrar Service Worker (em desenvolvimento e produção para testes)
registerServiceWorker()
  .then((registration) => {
    if (registration) {
      console.log('PWA inicializada com sucesso');
      
      // Limpar caches antigos apenas em produção
      if (import.meta.env.PROD) {
        clearOldCaches();
      }
      
      // Verificar atualizações a cada 30 minutos apenas em produção
      if (import.meta.env.PROD) {
        setInterval(() => {
          registration.update();
        }, 30 * 60 * 1000);
      }
    }
  })
  .catch((error) => {
    console.error('Erro ao inicializar PWA:', error);
  });
