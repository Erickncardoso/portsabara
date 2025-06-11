import React from "react";
import { X, Download, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePWA } from "@/hooks/usePWA";

interface PWAInstallPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({
  onInstall,
  onDismiss,
}) => {
  const { installApp, dismissInstallPrompt, showInstallPrompt } = usePWA();

  const handleInstall = async () => {
    try {
      await installApp();
      onInstall?.();
    } catch (error) {
      console.error("Erro ao instalar PWA:", error);
    }
  };

  const handleDismiss = () => {
    dismissInstallPrompt();
    onDismiss?.();
  };

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="shadow-lg border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Instalar HospitAll
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Instale nosso app para acesso rápido e funcionalidades offline
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleInstall}
                  className="flex-1 h-8 text-xs"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Instalar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-8 text-xs"
                >
                  Agora não
                </Button>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAInstallPrompt;
