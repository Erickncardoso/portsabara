const CACHE_NAME = 'portall-v1.0.0';
const STATIC_CACHE_NAME = 'portall-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'portall-dynamic-v1.0.0';

// Arquivos essenciais para cache estático (apenas os que existem)
const STATIC_ASSETS = [
  '/',
  '/manifest.json'
];

// Estratégias de cache
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// URLs que devem usar cache first (assets estáticos)
const CACHE_FIRST_URLS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  /\.(?:css|js)$/,
  /\/images\//,
  /\/icons\//
];

// URLs que devem usar network first (dados dinâmicos)
const NETWORK_FIRST_URLS = [
  /\/api\//,
  /\/login/,
  /\/cadastro/
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        // Cache apenas assets que existem, ignorando erros
        return Promise.allSettled(
          STATIC_ASSETS.map(asset => 
            cache.add(asset).catch(err => {
              console.warn(`[SW] Failed to cache ${asset}:`, err);
            })
          )
        );
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Error caching static assets:', error);
      })
  );
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName.startsWith('portall-')) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requisições não HTTP/HTTPS
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Ignorar requisições de extensões do browser
  if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') {
    return;
  }

  // Ignorar hot reload do Vite em desenvolvimento
  if (url.pathname.includes('/@vite/') || url.pathname.includes('/@fs/') || url.pathname.includes('/__vite_ping')) {
    return;
  }
  
  event.respondWith(
    handleRequest(request)
  );
});

// Função principal para lidar com requisições
async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Estratégia Cache First para assets estáticos
    if (shouldUseCacheFirst(url)) {
      return await cacheFirst(request);
    }
    
    // Estratégia Network First para dados dinâmicos
    if (shouldUseNetworkFirst(url)) {
      return await networkFirst(request);
    }
    
    // Estratégia Stale While Revalidate para páginas
    return await staleWhileRevalidate(request);
    
  } catch (error) {
    console.error('[SW] Error handling request:', error);
    return await handleOffline(request);
  }
}

// Cache First Strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    throw error;
  }
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch((error) => {
    console.log('[SW] Network failed in stale-while-revalidate:', error);
  });
  
  return cachedResponse || await fetchPromise;
}

// Verificar se deve usar Cache First
function shouldUseCacheFirst(url) {
  return CACHE_FIRST_URLS.some(pattern => pattern.test(url.pathname + url.search));
}

// Verificar se deve usar Network First
function shouldUseNetworkFirst(url) {
  return NETWORK_FIRST_URLS.some(pattern => pattern.test(url.pathname + url.search));
}

// Lidar com requisições offline
async function handleOffline(request) {
  const url = new URL(request.url);
  
  // Tentar buscar no cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Se for uma navegação, retornar página offline
  if (request.mode === 'navigate') {
    const offlinePage = await caches.match('/');
    if (offlinePage) {
      return offlinePage;
    }
  }
  
  // Retornar resposta de erro
  return new Response(
    JSON.stringify({
      error: 'Offline',
      message: 'Você está offline. Verifique sua conexão com a internet.'
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

// Lidar com notificações push
self.addEventListener('push', (event) => {
  console.log('[SW] Push received');
  
  const options = {
    body: 'Você tem uma nova notificação do PortAll',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver detalhes',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/icon-72x72.png'
      }
    ]
  };
  
  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.title = data.title || 'PortAll';
  }
  
  event.waitUntil(
    self.registration.showNotification('PortAll', options)
  );
});

// Lidar com cliques em notificações
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Apenas fechar a notificação
  } else {
    // Clique na notificação (não em uma ação)
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sincronização em background
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Função de sincronização em background
async function doBackgroundSync() {
  console.log('[SW] Performing background sync');
  
  try {
    // Aqui você pode implementar lógica para sincronizar dados
    // quando a conexão for restaurada
    
    // Exemplo: enviar dados pendentes
    const pendingData = await getPendingData();
    if (pendingData.length > 0) {
      await syncPendingData(pendingData);
    }
    
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// Funções auxiliares para sincronização
async function getPendingData() {
  // Implementar lógica para buscar dados pendentes
  return [];
}

async function syncPendingData(data) {
  // Implementar lógica para sincronizar dados
  console.log('[SW] Syncing pending data:', data);
} 