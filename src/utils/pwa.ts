// Função para registrar o Service Worker
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker não é suportado neste navegador');
    return null;
  }

  try {
    console.log('Registrando Service Worker...');
    
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });

    console.log('Service Worker registrado com sucesso:', registration);

    // Verificar atualizações
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        console.log('Nova versão do Service Worker encontrada');
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('Nova versão disponível. Recarregue a página para atualizar.');
            
            // Mostrar notificação de atualização disponível
            showUpdateNotification();
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.error('Erro ao registrar Service Worker:', error);
    return null;
  }
};

// Função para desregistrar o Service Worker
export const unregisterServiceWorker = async (): Promise<boolean> => {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const result = await registration.unregister();
      console.log('Service Worker desregistrado:', result);
      return result;
    }
    return false;
  } catch (error) {
    console.error('Erro ao desregistrar Service Worker:', error);
    return false;
  }
};

// Função para verificar se há atualizações
export const checkForUpdates = async (): Promise<void> => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.update();
      console.log('Verificação de atualização concluída');
    }
  } catch (error) {
    console.error('Erro ao verificar atualizações:', error);
  }
};

// Função para mostrar notificação de atualização
const showUpdateNotification = (): void => {
  // Criar elemento de notificação
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="flex-1">
        <h4 class="font-semibold text-sm">Atualização Disponível</h4>
        <p class="text-xs opacity-90">Uma nova versão do app está disponível.</p>
      </div>
      <button id="update-btn" class="bg-white text-blue-500 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100">
        Atualizar
      </button>
      <button id="dismiss-btn" class="text-white opacity-70 hover:opacity-100">
        ✕
      </button>
    </div>
  `;

  document.body.appendChild(notification);

  // Adicionar event listeners
  const updateBtn = notification.querySelector('#update-btn');
  const dismissBtn = notification.querySelector('#dismiss-btn');

  updateBtn?.addEventListener('click', () => {
    window.location.reload();
  });

  dismissBtn?.addEventListener('click', () => {
    notification.remove();
  });

  // Remover automaticamente após 10 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 10000);
};

// Função para limpar cache antigo
export const clearOldCaches = async (): Promise<void> => {
  if (!('caches' in window)) {
    return;
  }

  try {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
      name.startsWith('hospital-sabara-') && 
      !name.includes('v1.0.0')
    );

    await Promise.all(
      oldCaches.map(cacheName => {
        console.log('Removendo cache antigo:', cacheName);
        return caches.delete(cacheName);
      })
    );

    console.log('Caches antigos removidos');
  } catch (error) {
    console.error('Erro ao limpar caches antigos:', error);
  }
};

// Função para verificar se o app está rodando como PWA
export const isPWAInstalled = (): boolean => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isInWebAppiOS = (window.navigator as any).standalone === true;
  const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches;
  
  return isStandalone || isInWebAppiOS || isInWebAppChrome;
};

// Função para obter informações do cache
export const getCacheInfo = async (): Promise<{
  caches: string[];
  totalSize: number;
}> => {
  if (!('caches' in window)) {
    return { caches: [], totalSize: 0 };
  }

  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
    }

    return {
      caches: cacheNames,
      totalSize
    };
  } catch (error) {
    console.error('Erro ao obter informações do cache:', error);
    return { caches: [], totalSize: 0 };
  }
};

// Função para registrar sincronização em background
export const registerBackgroundSync = async (tag: string): Promise<void> => {
  if (!('serviceWorker' in navigator) || !('sync' in window.ServiceWorkerRegistration.prototype)) {
    console.warn('Background Sync não é suportado');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register(tag);
    console.log('Background sync registrado:', tag);
  } catch (error) {
    console.error('Erro ao registrar background sync:', error);
  }
}; 