import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePWA } from '@/hooks/usePWA';
import { Download, Bell, Wifi, WifiOff, Smartphone, RefreshCw, Info, ExternalLink, CheckCircle, XCircle, Zap } from 'lucide-react';

export const PWADebugPanel: React.FC = () => {
  const {
    isInstallable,
    isInstalled,
    isOnline,
    installApp,
    requestNotificationPermission,
    sendNotification,
    forceInstallPrompt
  } = usePWA();

  const [installCriteria, setInstallCriteria] = useState({
    hasManifest: false,
    hasServiceWorker: false,
    isHTTPS: false,
    hasIcons: false,
    hasStartUrl: false
  });

  // Só mostrar em desenvolvimento
  if (import.meta.env.PROD) {
    return null;
  }

  useEffect(() => {
    checkInstallCriteria();
  }, []);

  const checkInstallCriteria = async () => {
    const criteria = {
      hasManifest: false,
      hasServiceWorker: false,
      isHTTPS: location.protocol === 'https:' || location.hostname === 'localhost',
      hasIcons: false,
      hasStartUrl: false
    };

    // Verificar manifest
    try {
      const response = await fetch('/manifest.json');
      if (response.ok) {
        const manifest = await response.json();
        criteria.hasManifest = true;
        criteria.hasIcons = manifest.icons && manifest.icons.length > 0;
        criteria.hasStartUrl = !!manifest.start_url;
      }
    } catch (error) {
      console.error('Erro ao verificar manifest:', error);
    }

    // Verificar Service Worker
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        criteria.hasServiceWorker = !!registration;
      } catch (error) {
        console.error('Erro ao verificar Service Worker:', error);
      }
    }

    setInstallCriteria(criteria);
  };

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

  const handleForcePrompt = () => {
    forceInstallPrompt();
  };

  const openDevToolsInstall = () => {
    const instructions = `Para instalar via DevTools:

1. Abra DevTools (F12)
2. Vá para Application
3. Clique em Manifest
4. Clique em "Install" ou "Add to homescreen"

Ou procure pelo ícone de instalação (+) na barra de endereços do navegador.`;
    
    alert(instructions);
  };

  const allCriteriaMet = Object.values(installCriteria).every(Boolean);

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

          {/* Critérios de Instalação */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Info className="w-3 h-3" />
              <span className="text-xs font-medium">Critérios PWA:</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span>HTTPS/Localhost:</span>
                {installCriteria.isHTTPS ? 
                  <CheckCircle className="w-3 h-3 text-green-500" /> : 
                  <XCircle className="w-3 h-3 text-red-500" />
                }
              </div>
              <div className="flex items-center justify-between">
                <span>Manifest:</span>
                {installCriteria.hasManifest ? 
                  <CheckCircle className="w-3 h-3 text-green-500" /> : 
                  <XCircle className="w-3 h-3 text-red-500" />
                }
              </div>
              <div className="flex items-center justify-between">
                <span>Service Worker:</span>
                {installCriteria.hasServiceWorker ? 
                  <CheckCircle className="w-3 h-3 text-green-500" /> : 
                  <XCircle className="w-3 h-3 text-red-500" />
                }
              </div>
              <div className="flex items-center justify-between">
                <span>Ícones:</span>
                {installCriteria.hasIcons ? 
                  <CheckCircle className="w-3 h-3 text-green-500" /> : 
                  <XCircle className="w-3 h-3 text-red-500" />
                }
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="space-y-2">
            <Button
              size="sm"
              onClick={handleInstallTest}
              className="w-full h-8 text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Testar Instalação
            </Button>
            
            {allCriteriaMet && (
              <Button
                size="sm"
                variant="outline"
                onClick={openDevToolsInstall}
                className="w-full h-8 text-xs"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Instalar via DevTools
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={handleForcePrompt}
              className="w-full h-8 text-xs"
            >
              <Zap className="w-3 h-3 mr-1" />
              Forçar Prompt
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
            {!allCriteriaMet ? (
              <>
                <p>⚠️ Alguns critérios não atendidos</p>
                <p>• Verifique os itens marcados com ❌</p>
              </>
            ) : (
              <>
                <p>✅ PWA pronta para instalação</p>
                <p>• Use "Testar Instalação" para instruções</p>
                <p>• Ou "Instalar via DevTools" para método direto</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWADebugPanel; 