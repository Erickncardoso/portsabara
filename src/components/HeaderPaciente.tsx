import React, { useState, useEffect } from "react";
import { Bell, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationsModal from "./NotificationsModal";

interface HeaderPacienteProps {
  titulo?: string;
  className?: string;
  onPerfilClick?: () => void;
  onMenuClick?: () => void;
  nome?: string;
  tipo?: string;
}

const HeaderPaciente: React.FC<HeaderPacienteProps> = ({
  titulo = "HOME",
  className,
  onPerfilClick,
  onMenuClick,
  nome = "JOÃO SILVA",
  tipo = "PACIENTE",
}) => {
  const isMobile = useIsMobile();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificacoesNaoLidas, setNotificacoesNaoLidas] = useState(0);

  useEffect(() => {
    // Atualiza contador de notificações não lidas
    const updateNotificationCount = () => {
      const notificacoesArmazenadas = localStorage.getItem(
        "notificacoesPaciente"
      );
      if (notificacoesArmazenadas) {
        const notificacoes = JSON.parse(notificacoesArmazenadas);
        const naoLidas = notificacoes.filter((n: any) => !n.lida).length;
        setNotificacoesNaoLidas(naoLidas);
      } else {
        // Se não existir no localStorage, define 2 como padrão
        setNotificacoesNaoLidas(2);
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
      <div
        className={cn(
          "bg-white w-full sticky top-0 z-30 border-b border-gray-100",
          className
        )}
      >
        <div className={cn("px-2 sm:px-6 py-2")}>
          <div className="bg-white rounded-2xl shadow-sm border p-3 sm:p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {isMobile && onMenuClick && (
                  <button
                    onClick={onMenuClick}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Menu size={20} className="text-gray-700" />
                  </button>
                )}
                <h1
                  className={cn(
                    "font-bold text-gray-900",
                    isMobile ? "text-xl" : "text-3xl"
                  )}
                >
                  {titulo}
                </h1>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setShowNotifications(true)}
                >
                  <Bell size={isMobile ? 18 : 20} className="text-gray-600" />
                  {notificacoesNaoLidas > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {notificacoesNaoLidas}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        tipoUsuario="paciente"
      />
    </>
  );
};

export default HeaderPaciente;
