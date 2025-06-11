import React, { useState, useEffect } from "react";
import { Bell, User, X, Menu } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import NotificationsModal from "./NotificationsModal";

interface Notificacao {
  id: string;
  mensagem: string;
  lida: boolean;
  data: string;
}

interface HeaderMedicoProps {
  nome?: string;
  tipo?: string;
  titulo?: string;
  className?: string;
  onMenuClick?: () => void;
}

// Função para extrair as iniciais do nome
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const HeaderMedico: React.FC<HeaderMedicoProps> = ({
  nome = "ROBERT",
  tipo = "MÉDICO",
  titulo = "HOME",
  className,
  onMenuClick,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificacoesNaoLidas, setNotificacoesNaoLidas] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Atualiza contador de notificações não lidas
    const updateNotificationCount = () => {
      const notificacoesArmazenadas =
        localStorage.getItem("notificacoesMedico");
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
      <div className={cn("bg-white w-full", className)}>
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
                  className={cn("font-bold", isMobile ? "text-xl" : "text-3xl")}
                >
                  {titulo}
                </h1>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="relative">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full relative"
                    onClick={() => setShowNotifications(true)}
                  >
                    <Bell size={isMobile ? 18 : 20} />
                    {notificacoesNaoLidas > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                        {notificacoesNaoLidas}
                      </span>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm border border-gray-200">
                    {getInitials(nome)}
                  </div>

                  <div className="text-right">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      {nome}
                    </p>
                    <p className="text-xs sm:text-sm text-red-500">{tipo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        tipoUsuario="medico"
      />
    </>
  );
};

export default HeaderMedico;
