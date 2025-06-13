import React, { useState, useEffect } from "react";
import { Bell, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import NotificationsModal from "./NotificationsModal";

interface HeaderAdminProps {
  onMenuClick?: () => void;
}

export const HeaderAdmin: React.FC<HeaderAdminProps> = ({ onMenuClick }) => {
  const isMobile = useIsMobile();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificacoesNaoLidas, setNotificacoesNaoLidas] = useState(0);

  useEffect(() => {
    // Atualiza contador de notificações não lidas
    const updateNotificationCount = () => {
      const notificacoesArmazenadas = localStorage.getItem("notificacoesAdmin");
      if (notificacoesArmazenadas) {
        const notificacoes = JSON.parse(notificacoesArmazenadas);
        const naoLidas = notificacoes.filter((n: any) => !n.lida).length;
        setNotificacoesNaoLidas(naoLidas);
      } else {
        // Se não existir no localStorage, define 3 como padrão
        setNotificacoesNaoLidas(3);
      }
    };

    updateNotificationCount();

    // Atualiza o contador quando o localStorage muda
    const handleStorageChange = () => {
      updateNotificationCount();
    };

    window.addEventListener("storage", handleStorageChange);

    // Intervalo para verificar mudanças locais
    const interval = setInterval(updateNotificationCount, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className={cn("flex items-center justify-between px-4 h-16")}>
          <div className="flex items-center gap-3">
            {isMobile && onMenuClick && (
              <button
                onClick={onMenuClick}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Menu size={20} className="text-gray-700" />
              </button>
            )}
            <h1 className="text-xl font-bold">INÍCIO</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setShowNotifications(true)}
            >
              <Bell size={20} className="text-gray-500" />
              {notificacoesNaoLidas > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notificacoesNaoLidas}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        tipoUsuario="admin"
      />
    </>
  );
};

export default HeaderAdmin;
