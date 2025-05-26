import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePWA } from '@/hooks/usePWA';
import { Download, Bell, Wifi, WifiOff, Smartphone, RefreshCw } from 'lucide-react';

export const PWADebugPanel: React.FC = () => {
  const {
    isInstallable,
    isInstalled,
    isOnline,
    installApp,
    requestNotificationPermission,
    sendNotification
  } = usePWA();

  // Só mostrar em desenvolvimento
  if (import.meta.env.PROD) {
    return null;
  }

  const handleTestNotification = async () => {
    try {
      await requestNotificationPermission();
      sendNotification('Teste PWA', {
        body: 'Esta é uma notificação de teste do Hospital Sabará',
        icon: '/icons/icon-192x192.png'
      });
    } catch (error) {
      console.error('Erro ao testar notificação:', error);
    }
  };

  const handleInstallTest = async () => {
    try {
      await installApp();
    } catch (error) {
      console.error('Erro ao instalar PWA:', error);
      alert('Erro ao instalar PWA. Verifique o console para mais detalhes.');
    }
  };

  const handleRefreshSW = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          registration.update();
          console.log('Service Worker atualizado');
        }
      });
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <Card className="bg-gray-900 text-white border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            PWA Debug Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Status:</span>
              <div className="flex gap-1">
                <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
                  {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  {isOnline ? 'Online' : 'Offline'}
                </Badge>
                <Badge variant={isInstalled ? "default" : "secondary"} className="text-xs">
                  {isInstalled ? 'Instalado' : 'Não instalado'}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs">Instalável:</span>
              <Badge variant={isInstallable ? "default" : "secondary"} className="text-xs">
                {isInstallable ? 'Sim' : 'Não'}
              </Badge>
            </div>
          </div>

          {/* Ações */}
          <div className="space-y-2">
            <Button
              size="sm"
              onClick={handleInstallTest}
              disabled={!isInstallable || isInstalled}
              className="w-full h-8 text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Testar Instalação
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleTestNotification}
              className="w-full h-8 text-xs"
            >
              <Bell className="w-3 h-3 mr-1" />
              Testar Notificação
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefreshSW}
              className="w-full h-8 text-xs"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Atualizar SW
            </Button>
          </div>

          {/* Dicas */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>💡 Para testar instalação:</p>
            <p>1. Abra DevTools → Application</p>
            <p>2. Vá em Manifest</p>
            <p>3. Clique em "Install"</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWADebugPanel; 