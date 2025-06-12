import React, { useState, useEffect } from "react";
import { Bell, User, X, Menu } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface Notificacao {
  id: string;
  mensagem: string;
  lida: boolean;
  data: string;
}

interface HeaderFarmaciaProps {
  titulo?: string;
  className?: string;
  onMenuClick?: () => void;
}

const HeaderFarmaciaFixed: React.FC<HeaderFarmaciaProps> = ({
  titulo = "HOME",
  className,
  onMenuClick,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificacoesNaoLidas, setNotificacoesNaoLidas] = useState(0);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Carrega notificações do localStorage ou cria padrão
    const notificacoesArmazenadas = localStorage.getItem(
      "notificacoesFarmacia"
    );
    if (notificacoesArmazenadas) {
      const notifs = JSON.parse(notificacoesArmazenadas);
      setNotificacoes(notifs);
      const naoLidas = notifs.filter((n: Notificacao) => !n.lida).length;
      setNotificacoesNaoLidas(naoLidas);
    } else {
      const notificacoesIniciais: Notificacao[] = [
        {
          id: "1",
          mensagem:
            "Estoque baixo: Paracetamol Infantil 100mg/ml (5 unidades restantes)",
          lida: false,
          data: new Date().toISOString(),
        },
        {
          id: "2",
          mensagem: "Nova receita médica aguardando dispensação",
          lida: false,
          data: new Date().toISOString(),
        },
        {
          id: "3",
          mensagem: "Medicamento vencendo: Ibuprofeno 600mg (vence em 3 dias)",
          lida: false,
          data: new Date().toISOString(),
        },
      ];
      setNotificacoes(notificacoesIniciais);
      setNotificacoesNaoLidas(3);
      localStorage.setItem(
        "notificacoesFarmacia",
        JSON.stringify(notificacoesIniciais)
      );
    }
  }, []);

  const marcarComoLida = (id: string) => {
    const novasNotificacoes = notificacoes.map((notif) =>
      notif.id === id ? { ...notif, lida: true } : notif
    );
    setNotificacoes(novasNotificacoes);
    localStorage.setItem(
      "notificacoesFarmacia",
      JSON.stringify(novasNotificacoes)
    );

    const naoLidas = novasNotificacoes.filter((n) => !n.lida).length;
    setNotificacoesNaoLidas(naoLidas);
  };

  const marcarTodasComoLidas = () => {
    const novasNotificacoes = notificacoes.map((notif) => ({
      ...notif,
      lida: true,
    }));
    setNotificacoes(novasNotificacoes);
    localStorage.setItem(
      "notificacoesFarmacia",
      JSON.stringify(novasNotificacoes)
    );
    setNotificacoesNaoLidas(0);
    toast({ title: "Todas as notificações foram marcadas como lidas" });
  };

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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Notificações Simplificado */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Notificações</h2>
              <div className="flex items-center gap-2">
                {notificacoesNaoLidas > 0 && (
                  <button
                    onClick={marcarTodasComoLidas}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Marcar todas como lidas
                  </button>
                )}
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-96">
              {notificacoes.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Nenhuma notificação</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notificacoes.map((notificacao) => (
                    <div
                      key={notificacao.id}
                      className={cn(
                        "p-4 hover:bg-gray-50 cursor-pointer",
                        !notificacao.lida && "bg-blue-50"
                      )}
                      onClick={() => marcarComoLida(notificacao.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                            notificacao.lida ? "bg-gray-300" : "bg-blue-500"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            {notificacao.mensagem}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notificacao.data).toLocaleDateString(
                              "pt-BR"
                            )}{" "}
                            às{" "}
                            {new Date(notificacao.data).toLocaleTimeString(
                              "pt-BR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderFarmaciaFixed;
