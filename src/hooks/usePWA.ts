import { useState, useEffect } from 'react';

interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface UsePWAReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  installApp: () => Promise<void>;
  showInstallPrompt: boolean;
  dismissInstallPrompt: () => void;
  requestNotificationPermission: () => Promise<NotificationPermission>;
  sendNotification: (title: string, options?: NotificationOptions) => void;
  registerForPushNotifications: () => Promise<PushSubscription | null>;
  forceInstallPrompt: () => void;
}

export const usePWA = (): UsePWAReturn => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<PWAInstallPrompt | null>(null);

  useEffect(() => {
    // Verificar se já está instalado - MELHORADA para iOS
    const checkIfInstalled = () => {
      // Método 1: display-mode standalone (funciona na maioria dos casos)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      
      // Método 2: iOS Safari específico
      const isInWebAppiOS = (window.navigator as any).standalone === true;
      
      // Método 3: Verificar se foi adicionado à tela inicial (iOS)
      const isIOSHomeScreen = window.matchMedia('(display-mode: standalone)').matches && 
                             /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      // Método 4: Verificar URL parameters que indicam instalação
      const urlParams = new URLSearchParams(window.location.search);
      const isFromHomeScreen = urlParams.has('homescreen') || urlParams.has('standalone');
      
      // Método 5: Verificar se está em fullscreen (pode indicar PWA instalada)
      const isFullscreen = window.innerHeight === screen.height;
      
      // Método 6: Verificar localStorage para instalação manual
      const wasManuallyInstalled = localStorage.getItem('pwa-manually-installed') === 'true';
      
      // Método 7: Verificar se não tem barra de endereços (iOS PWA)
      const hasNoAddressBar = window.navigator.userAgent.includes('iPhone') && 
                             window.innerHeight > window.outerHeight * 0.9;
      
      const isInstalled = isStandalone || 
                         isInWebAppiOS || 
                         isIOSHomeScreen || 
                         isFromHomeScreen || 
                         wasManuallyInstalled ||
                         hasNoAddressBar;
      
      console.log('🔍 Verificação de instalação PWA:');
      console.log('  📱 Standalone mode:', isStandalone);
      console.log('  🍎 iOS standalone:', isInWebAppiOS);
      console.log('  🏠 iOS home screen:', isIOSHomeScreen);
      console.log('  🔗 From home screen URL:', isFromHomeScreen);
      console.log('  📱 Fullscreen:', isFullscreen);
      console.log('  💾 Manually installed:', wasManuallyInstalled);
      console.log('  📏 No address bar (iOS):', hasNoAddressBar);
      console.log('  ✅ RESULTADO FINAL - Instalado:', isInstalled);
      
      setIsInstalled(isInstalled);
      
      // Se detectou instalação, limpar flags do modal
      if (isInstalled) {
        localStorage.removeItem('pwa-install-dont-show');
        console.log('✅ PWA detectada como instalada - Modal de instalação desabilitado');
      }
    };

    checkIfInstalled();

    // Verificar novamente após um delay (para casos onde a detecção inicial falha)
    const recheckTimer = setTimeout(() => {
      console.log('🔄 Reverificando instalação PWA após delay...');
      checkIfInstalled();
    }, 2000);

    // GARANTIR que o Service Worker seja registrado imediatamente
    const ensureServiceWorkerRegistered = async () => {
      try {
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });
          console.log('✅ Service Worker registrado para garantir PWA:', registration);
          
          // Aguardar o SW estar pronto
          await navigator.serviceWorker.ready;
          console.log('✅ Service Worker pronto - critérios PWA atendidos');
          
          // Forçar verificação dos critérios PWA
          setTimeout(() => {
            triggerInstallPrompt();
          }, 1000);
        }
      } catch (error) {
        console.error('❌ Erro ao registrar Service Worker:', error);
      }
    };

    // Registrar SW imediatamente
    ensureServiceWorkerRegistered();

    // Listener para evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // NÃO PREVENIR o evento para garantir que o ícone apareça na barra de endereços
      // e.preventDefault(); // REMOVIDO para permitir o ícone nativo
      
      setDeferredPrompt(e as any);
      setIsInstallable(true);
      
      console.log('✅ PWA install prompt available - ícone deve aparecer na barra de endereços');
      
      // Limpar qualquer flag que possa estar impedindo
      localStorage.removeItem('pwa-install-dismissed');
      
      // Garantir que o ícone apareça sempre
      triggerInstallPrompt();
    };

    // Listener para mudanças de conectividade
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Listener para quando o app é instalado
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowInstallPrompt(false);
      localStorage.setItem('pwa-manually-installed', 'true');
      console.log('✅ PWA foi instalada via evento appinstalled');
    };

    // Listener para detectar mudanças no display mode (iOS)
    const handleDisplayModeChange = () => {
      console.log('🔄 Display mode mudou - reverificando instalação...');
      setTimeout(() => {
        checkIfInstalled();
      }, 500);
    };

    // Listener para mudanças de orientação (pode indicar instalação no iOS)
    const handleOrientationChange = () => {
      console.log('🔄 Orientação mudou - reverificando instalação...');
      setTimeout(() => {
        checkIfInstalled();
      }, 1000);
    };

    // Listener para mudanças de visibilidade (quando volta do processo de instalação)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('🔄 Página ficou visível - reverificando instalação...');
        setTimeout(() => {
          checkIfInstalled();
        }, 1000);
      }
    };

    // Listener para mudanças de foco (quando volta do processo de instalação)
    const handleFocus = () => {
      console.log('🔄 Página recebeu foco - reverificando instalação...');
      setTimeout(() => {
        checkIfInstalled();
      }, 500);
    };

    // Registrar listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Listener específico para iOS - detectar mudanças no standalone
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addListener(handleDisplayModeChange);

    // Verificação periódica para casos onde os eventos não funcionam
    const periodicCheck = setInterval(() => {
      if (!isInstalled) {
        console.log('🔄 Verificação periódica de instalação...');
        checkIfInstalled();
      }
    }, 10000); // A cada 10 segundos

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      mediaQuery.removeListener(handleDisplayModeChange);
      clearInterval(periodicCheck);
    };
  }, [isInstalled]);

  // Função para verificar critérios de instalação
  const checkInstallCriteria = async (): Promise<boolean> => {
    try {
      // Verificar HTTPS ou localhost
      const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
      if (!isSecure) return false;

      // Verificar manifest
      const manifestResponse = await fetch('/manifest.json');
      if (!manifestResponse.ok) return false;
      
      const manifest = await manifestResponse.json();
      if (!manifest.start_url || !manifest.icons || manifest.icons.length === 0) return false;

      // Verificar Service Worker
      if (!('serviceWorker' in navigator)) return false;
      
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) return false;

      return true;
    } catch (error) {
      console.error('Erro ao verificar critérios de instalação:', error);
      return false;
    }
  };

  // Função para instalar o app
  const installApp = async (): Promise<void> => {
    // Se temos o prompt nativo, usar ele
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          setIsInstalled(true);
        } else {
          console.log('User dismissed the install prompt');
        }
        
        setDeferredPrompt(null);
        setIsInstallable(false);
        setShowInstallPrompt(false);
        return;
      } catch (error) {
        console.error('Error during app installation:', error);
        throw error;
      }
    }

    // Em desenvolvimento ou quando não há prompt nativo, dar instruções
    if (import.meta.env.DEV || !deferredPrompt) {
      const instructions = `
🔧 MODO DEBUG - Como instalar a PWA:

MÉTODO 1 - DevTools:
1. Abra DevTools (F12)
2. Vá para Application
3. Clique em Manifest
4. Clique em "Install" ou "Add to homescreen"

MÉTODO 2 - Menu do navegador:
• Chrome: Menu ⋮ → "Instalar PortAll..."
• Firefox: Menu ☰ → "Instalar esta página"
• Edge: Menu ⋯ → "Aplicativos" → "Instalar este site"

MÉTODO 3 - Barra de endereços:
• Procure pelo ícone de instalação (+) na barra de endereços
      `;
      
      console.log(instructions);
      alert(instructions);
      return;
    }

    throw new Error('Install prompt not available');
  };

  // Função para forçar prompt de instalação (debug)
  const forceInstallPrompt = (): void => {
    if (import.meta.env.DEV) {
      console.log('🔧 DEV MODE: Forçando prompt de instalação');
      setShowInstallPrompt(true);
    }
  };

  // Função para dispensar o prompt de instalação
  const dismissInstallPrompt = (): void => {
    setShowInstallPrompt(false);
    // Não mostrar novamente por 7 dias
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Função para solicitar permissão de notificação
  const requestNotificationPermission = async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications');
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    const permission = await Notification.requestPermission();
    return permission;
  };

  // Função para enviar notificação
  const sendNotification = (title: string, options?: NotificationOptions): void => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return;
    }

    if (Notification.permission === 'granted') {
      const defaultOptions: NotificationOptions = {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [200, 100, 200],
        ...options
      };

      new Notification(title, defaultOptions);
    } else {
      console.warn('Notification permission not granted');
    }
  };

  // Função para registrar push notifications
  const registerForPushNotifications = async (): Promise<PushSubscription | null> => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      throw new Error('Push notifications are not supported');
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          // Substitua pela sua chave pública VAPID
          'BEl62iUYgUivxIkv69yViEuiBIa40HI80NM9LUhbKbVPLfzYKCrAh9u7DZQDdjZFPz3ZONiWQqNhHcZGRrfaFfU'
        )
      });

      console.log('Push subscription successful:', subscription);
      return subscription;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      return null;
    }
  };

  return {
    isInstallable,
    isInstalled,
    isOnline,
    installApp,
    showInstallPrompt,
    dismissInstallPrompt,
    requestNotificationPermission,
    sendNotification,
    registerForPushNotifications,
    forceInstallPrompt
  };
};

// Função auxiliar para converter chave VAPID
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

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
      (name.startsWith('hospital-sabara-') || name.startsWith('portall-')) && 
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

// Função para verificar se o app está rodando como PWA - MELHORADA
export const isPWAInstalled = (): boolean => {
  // Método 1: display-mode standalone (funciona na maioria dos casos)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  
  // Método 2: iOS Safari específico
  const isInWebAppiOS = (window.navigator as any).standalone === true;
  
  // Método 3: Verificar se foi adicionado à tela inicial (iOS)
  const isIOSHomeScreen = window.matchMedia('(display-mode: standalone)').matches && 
                         /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  // Método 4: Verificar URL parameters que indicam instalação
  const urlParams = new URLSearchParams(window.location.search);
  const isFromHomeScreen = urlParams.has('homescreen') || urlParams.has('standalone');
  
  // Método 5: Verificar localStorage para instalação manual
  const wasManuallyInstalled = localStorage.getItem('pwa-manually-installed') === 'true';
  
  // Método 6: Verificar se não tem barra de endereços (iOS PWA)
  const hasNoAddressBar = window.navigator.userAgent.includes('iPhone') && 
                         window.innerHeight > window.outerHeight * 0.9;
  
  const isInstalled = isStandalone || 
                     isInWebAppiOS || 
                     isIOSHomeScreen || 
                     isFromHomeScreen || 
                     wasManuallyInstalled ||
                     hasNoAddressBar;
  
  console.log('🔍 isPWAInstalled() - Verificação detalhada:');
  console.log('  📱 Standalone mode:', isStandalone);
  console.log('  🍎 iOS standalone:', isInWebAppiOS);
  console.log('  🏠 iOS home screen:', isIOSHomeScreen);
  console.log('  🔗 From home screen URL:', isFromHomeScreen);
  console.log('  💾 Manually installed:', wasManuallyInstalled);
  console.log('  📏 No address bar (iOS):', hasNoAddressBar);
  console.log('  ✅ RESULTADO:', isInstalled);
  
  return isInstalled;
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

// Função para forçar o evento beforeinstallprompt
export const triggerInstallPrompt = (): void => {
  // Não prevenir o evento beforeinstallprompt para garantir que o ícone apareça
  console.log('🔧 Garantindo que o prompt de instalação esteja disponível');
  
  // Limpar qualquer flag que possa estar impedindo o prompt
  localStorage.removeItem('pwa-install-dismissed');
  
  // Verificar se os critérios PWA estão sendo atendidos
  const checkPWACriteria = async () => {
    try {
      // Verificar HTTPS
      const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
      console.log('🔒 HTTPS/localhost:', isSecure);
      
      // Verificar manifest
      const manifestResponse = await fetch('/manifest.json');
      const manifestValid = manifestResponse.ok;
      console.log('📋 Manifest válido:', manifestValid);
      
      // Verificar Service Worker
      const swRegistered = await navigator.serviceWorker.getRegistration();
      console.log('⚙️ Service Worker registrado:', !!swRegistered);
      
      // Verificar se não está instalado
      const isInstalled = isPWAInstalled();
      console.log('📱 PWA já instalada:', isInstalled);
      
      if (isSecure && manifestValid && swRegistered && !isInstalled) {
        console.log('✅ Todos os critérios PWA atendidos - ícone deve aparecer');
      } else {
        console.log('❌ Alguns critérios PWA não atendidos');
      }
    } catch (error) {
      console.error('Erro ao verificar critérios PWA:', error);
    }
  };
  
  checkPWACriteria();
}; 