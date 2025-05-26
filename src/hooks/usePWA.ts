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
    // Verificar se já está instalado
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppiOS = (window.navigator as any).standalone === true;
      const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches;
      
      setIsInstalled(isStandalone || isInWebAppiOS || isInWebAppChrome);
    };

    checkIfInstalled();

    // Listener para evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as any);
      setIsInstallable(true);
      
      console.log('PWA install prompt available');
      
      // Verificar se foi dispensado recentemente
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      const dismissedTime = dismissed ? parseInt(dismissed) : 0;
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      
      // Mostrar prompt apenas se não foi dispensado nos últimos 7 dias e não está instalado
      if (!isInstalled && dismissedTime < sevenDaysAgo) {
        // Em desenvolvimento, não mostrar automaticamente
        if (import.meta.env.DEV) {
          console.log('PWA install prompt ready (development mode - not showing automatically)');
        } else {
          // Em produção, mostrar após 5 segundos
          setTimeout(() => {
            if (!isInstalled) {
              setShowInstallPrompt(true);
            }
          }, 5000);
        }
      }
    };

    // Listener para mudanças de conectividade
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Listener para quando o app é instalado
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowInstallPrompt(false);
      console.log('PWA foi instalada');
    };

    // Registrar listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Em desenvolvimento, simular disponibilidade após um tempo se os critérios forem atendidos
    if (import.meta.env.DEV) {
      setTimeout(async () => {
        if (!deferredPrompt && !isInstalled) {
          const canInstall = await checkInstallCriteria();
          if (canInstall) {
            console.log('🔧 DEV MODE: Simulando disponibilidade de instalação PWA');
            setIsInstallable(true);
          }
        }
      }, 3000);
    } else {
      // Em produção, verificar critérios mesmo sem o evento beforeinstallprompt
      setTimeout(async () => {
        if (!deferredPrompt && !isInstalled) {
          const canInstall = await checkInstallCriteria();
          if (canInstall) {
            console.log('🌐 PROD MODE: PWA instalável detectada');
            setIsInstallable(true);
            
            // Mostrar prompt após mais tempo em produção se não houve evento nativo
            setTimeout(() => {
              if (!isInstalled && !deferredPrompt) {
                setShowInstallPrompt(true);
              }
            }, 10000);
          }
        }
      }, 5000);
    }

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('appinstalled', handleAppInstalled);
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