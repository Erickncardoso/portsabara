import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePWA } from '@/hooks/usePWA';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDontShowAgain: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  onDontShowAgain
}) => {
  const { installApp, isInstalled } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);

  // Detectar tipo de dispositivo
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isMobile = isIOS || isAndroid;

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      await installApp();
      onClose();
    } catch (error) {
      console.error('Erro ao instalar PWA:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleIOSInstall = () => {
    const instructions = `Para instalar o PortAll no iOS:

1. Toque no ícone de compartilhamento (□↗) na barra inferior do Safari
2. Role para baixo e toque em "Adicionar à Tela de Início"
3. Toque em "Adicionar" no canto superior direito
4. O PortAll aparecerá na sua tela inicial

Nota: Use o Safari para melhor compatibilidade.`;
    
    alert(instructions);
  };

  const handleAndroidInstall = () => {
    // Tentar instalação nativa primeiro
    handleInstall();
  };

  // Fechar modal se o app foi instalado
  useEffect(() => {
    if (isInstalled && isOpen) {
      onClose();
    }
  }, [isInstalled, isOpen, onClose]);

  if (isInstalled) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl border-none shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-blue-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Instalar PortAll
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Instale nosso app para acesso rápido e funcionalidades offline
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Botão Android */}
          <Button
            onClick={handleAndroidInstall}
            disabled={isInstalling}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1518-.5972.416.416 0 00-.5972.1518l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1333 1.0989L4.8442 5.4467a.4161.4161 0 00-.5972-.1518.416.416 0 00-.1518.5972L6.0952 9.321C3.7155 10.7605 2.25 13.1043 2.25 15.75h19.5c0-2.6457-1.4655-5.9895-3.8455-7.4295z"/>
            </svg>
            <span className="font-medium">
              {isInstalling ? 'Instalando...' : 'Instalar no Android'}
            </span>
          </Button>

          {/* Botão iOS */}
          <Button
            onClick={handleIOSInstall}
            variant="outline"
            className="w-full h-12 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span className="font-medium">Instalar no iPhone/iPad</span>
          </Button>

          {/* Informações adicionais */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <Download className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800">
                <p className="font-medium mb-1">Benefícios do app:</p>
                <ul className="space-y-1">
                  <li>• Acesso rápido sem abrir o navegador</li>
                  <li>• Funciona offline</li>
                  <li>• Notificações em tempo real</li>
                  <li>• Interface otimizada</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 text-gray-600 hover:text-gray-800"
          >
            Agora não
          </Button>
          <Button
            variant="ghost"
            onClick={onDontShowAgain}
            className="flex-1 text-gray-500 hover:text-gray-700 text-xs"
          >
            Não mostrar mais
          </Button>
        </div>

        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default PWAInstallModal; 