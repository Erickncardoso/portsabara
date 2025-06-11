import React, { useState, useEffect } from "react";
import {
  X,
  Download,
  Smartphone,
  Share,
  Plus,
  ArrowDown,
  Sparkles,
  Zap,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePWA } from "@/hooks/usePWA";

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDontShowAgain: () => void;
  onPermanentDismiss?: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  onDontShowAgain,
  onPermanentDismiss,
}) => {
  const { installApp, isInstalled } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);
  const [showDetailedInstructions, setShowDetailedInstructions] =
    useState(false);

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
      console.error("Erro ao instalar PWA:", error);
      // Se falhou, mostrar instruções detalhadas
      setShowDetailedInstructions(true);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleIOSInstall = () => {
    setShowDetailedInstructions(true);
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

  // Modal compacto inicial
  if (!showDetailedInstructions) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md rounded-2xl border-none shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-0 overflow-hidden">
          {/* Header com gradiente */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Instalar HospitAll</h2>
                <p className="text-blue-100 text-sm">
                  Acesso rápido como app nativo
                </p>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 space-y-4">
            {/* Benefícios */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Acesso rápido</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>Como app nativo</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Download className="w-4 h-4 text-blue-600" />
                <span>Sem downloads</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Sempre atualizado</span>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="space-y-3">
              {isAndroid && (
                <Button
                  onClick={handleInstall}
                  disabled={isInstalling}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  {isInstalling ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Instalando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      <span>Instalar Agora</span>
                    </div>
                  )}
                </Button>
              )}

              {isIOS && (
                <Button
                  onClick={handleIOSInstall}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Share className="w-5 h-5" />
                    <span>Ver Instruções</span>
                  </div>
                </Button>
              )}

              {!isMobile && (
                <Button
                  onClick={handleInstall}
                  disabled={isInstalling}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  {isInstalling ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Instalando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      <span>Instalar Agora</span>
                    </div>
                  )}
                </Button>
              )}
            </div>

            {/* Botões secundários */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={onDontShowAgain}
                variant="ghost"
                className="flex-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 py-2 rounded-lg transition-colors"
              >
                Agora não
              </Button>
              <Button
                onClick={onPermanentDismiss}
                variant="ghost"
                className="flex-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 py-2 rounded-lg transition-colors text-sm"
              >
                Não mostrar mais
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Modal com instruções detalhadas para iOS
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl border-none shadow-2xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Como instalar no iOS
          </DialogTitle>
          <p className="text-gray-600 mt-2">
            Siga os passos abaixo para adicionar à tela inicial
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Passos simplificados */}
          <div className="space-y-3">
            <div className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-1">
                  Toque no ícone de compartilhamento
                </p>
                <div className="flex items-center gap-2">
                  <Share className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    Na barra inferior do Safari
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-1">
                  Adicionar à Tela de Início
                </p>
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">
                    Role para baixo no menu
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-1">
                  Confirme tocando em "Adicionar"
                </p>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">
                    No canto superior direito
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Nota importante */}
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 text-orange-600 mt-0.5">⚠️</div>
              <div className="text-sm">
                <p className="font-medium text-orange-800 mb-1">Use o Safari</p>
                <p className="text-orange-700">
                  Para melhor compatibilidade com PWAs no iOS
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-gray-300 hover:bg-gray-50"
          >
            Fechar
          </Button>
          <Button
            onClick={onDontShowAgain}
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
          >
            Agora não
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PWAInstallModal;
