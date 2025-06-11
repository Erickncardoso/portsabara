import React, { useState, useEffect } from "react";
import { X, Check, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export interface Notificacao {
  id: string;
  mensagem: string;
  lida: boolean;
  data: string;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipoUsuario: string; // 'medico', 'farmacia', 'limpeza', 'manutencao', 'enfermaria', 'admin', 'paciente'
  className?: string;
}

const notificacoesPorTipo: Record<string, Notificacao[]> = {
  medico: [
    {
      id: "1",
      mensagem: "Nova consulta agendada para hoje às 14:00",
      lida: false,
      data: new Date().toISOString(),
    },
    {
      id: "2",
      mensagem: "Resultado de exame do paciente Clara Brook disponível",
      lida: false,
      data: new Date().toISOString(),
    },
    {
      id: "3",
      mensagem: "Solicitação de interconsulta pendente",
      lida: true,
      data: new Date().toISOString(),
    },
  ],
  farmacia: [
    {
      id: "1",
      mensagem: "Estoque baixo: Paracetamol 500mg (5 unidades restantes)",
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
  ],
  limpeza: [
    {
      id: "1",
      mensagem: "Nova solicitação de limpeza no quarto 190",
      lida: false,
      data: new Date().toISOString(),
    },
    {
      id: "2",
      mensagem: "Protocolo de limpeza urgente agendado",
      lida: false,
      data: new Date().toISOString(),
    },
    {
      id: "3",
      mensagem: "Área de isolamento precisa de limpeza especial",
      lida: true,
      data: new Date().toISOString(),
    },
  ],
  manutencao: [
    {
      id: "1",
      mensagem: "Nova solicitação de manutenção no quarto 190",
      lida: false,
      data: new Date().toISOString(),
    },
    {
      id: "2",
      mensagem: "Protocolo de manutenção preventiva agendado",
      lida: false,
      data: new Date().toISOString(),
    },
    {
      id: "3",
      mensagem: "Equipamento do CTI necessita reparo urgente",
      lida: true,
      data: new Date().toISOString(),
    },
  ],
  enfermaria: [
    {
      id: "1",
      mensagem: "Paciente João Silva precisa de medicação às 14:00",
      lida: false,
      data: new Date().toISOString(),
    },
    {
      id: "2",
      mensagem: "Novo paciente internado no quarto 302",
      lida: false,
      data: new Date().toISOString(),
    },
    {
      id: "3",
      mensagem: "Solicitação de troca de plantão para amanhã",
      lida: true,
      data: new Date().toISOString(),
    },
  ],
  admin: [
    {
      id: "1",
      mensagem: "Relatório mensal de ocupação disponível",
      lida: false,
      data: new Date().toISOString(),
    },
    {
      id: "2",
      mensagem: "Nova solicitação de orçamento pendente",
      lida: false,
      data: new Date().toISOString(),
    },
    {
      id: "3",
      mensagem: "Reunião de diretoria agendada para amanhã",
      lida: false,
      data: new Date().toISOString(),
    },
  ],
  paciente: [
    {
      id: "1",
      mensagem: "Sua consulta foi agendada para hoje às 15:00",
      lida: false,
      data: new Date().toISOString(),
    },
    {
      id: "2",
      mensagem: "Resultado do seu exame está disponível",
      lida: false,
      data: new Date().toISOString(),
    },
    {
      id: "3",
      mensagem: "Lembrete: tomar medicação às 20:00",
      lida: true,
      data: new Date().toISOString(),
    },
  ],
};

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  tipoUsuario,
  className,
}) => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Carrega notificações do localStorage
      const storageKey = `notificacoes${
        tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1)
      }`;
      const notificacoesArmazenadas = localStorage.getItem(storageKey);

      if (notificacoesArmazenadas) {
        setNotificacoes(JSON.parse(notificacoesArmazenadas));
      } else {
        // Cria notificações de exemplo se não existirem
        const notificacoesIniciais = notificacoesPorTipo[tipoUsuario] || [];
        setNotificacoes(notificacoesIniciais);
        localStorage.setItem(storageKey, JSON.stringify(notificacoesIniciais));
      }
    }
  }, [isOpen, tipoUsuario]);

  const salvarNotificacoes = (novasNotificacoes: Notificacao[]) => {
    setNotificacoes(novasNotificacoes);
    const storageKey = `notificacoes${
      tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1)
    }`;
    localStorage.setItem(storageKey, JSON.stringify(novasNotificacoes));
  };

  const marcarComoLida = (id: string) => {
    const atualizadas = notificacoes.map((notif) =>
      notif.id === id ? { ...notif, lida: true } : notif
    );

    salvarNotificacoes(atualizadas);
    toast({
      description: "Notificação marcada como lida",
    });
  };

  const marcarTodasComoLidas = () => {
    const atualizadas = notificacoes.map((notif) => ({ ...notif, lida: true }));
    salvarNotificacoes(atualizadas);
    toast({
      description: "Todas as notificações foram marcadas como lidas",
    });
  };

  const removerNotificacao = (id: string) => {
    const atualizadas = notificacoes.filter((notif) => notif.id !== id);
    salvarNotificacoes(atualizadas);
    toast({
      description: "Notificação removida",
    });
  };

  const limparTodas = () => {
    setNotificacoes([]);
    const storageKey = `notificacoes${
      tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1)
    }`;
    localStorage.setItem(storageKey, JSON.stringify([]));
    toast({
      description: "Todas as notificações foram removidas",
    });
  };

  const notificacoesNaoLidas = notificacoes.filter((n) => !n.lida).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={cn(
          "bg-white rounded-xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Notificações
            </h2>
            {notificacoesNaoLidas > 0 && (
              <p className="text-sm text-gray-500">
                {notificacoesNaoLidas} não lida
                {notificacoesNaoLidas > 1 ? "s" : ""}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Actions */}
        {notificacoes.length > 0 && (
          <div className="flex gap-2 p-4 border-b">
            {notificacoesNaoLidas > 0 && (
              <button
                onClick={marcarTodasComoLidas}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
              >
                <Check size={14} />
                Marcar todas como lidas
              </button>
            )}
            <button
              onClick={limparTodas}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
            >
              <Trash2 size={14} />
              Limpar todas
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {notificacoes.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <X size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Nenhuma notificação</p>
              <p className="text-gray-400 text-sm mt-1">
                Suas notificações aparecerão aqui
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {notificacoes.map((notificacao) => (
                <div
                  key={notificacao.id}
                  className={cn(
                    "p-4 hover:bg-gray-50 transition-colors",
                    !notificacao.lida && "bg-blue-50/50"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm leading-relaxed",
                          notificacao.lida
                            ? "text-gray-600"
                            : "text-gray-900 font-medium"
                        )}
                      >
                        {notificacao.mensagem}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notificacao.data).toLocaleString("pt-BR")}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {!notificacao.lida && (
                        <button
                          onClick={() => marcarComoLida(notificacao.id)}
                          className="p-1 hover:bg-blue-100 rounded-full text-blue-600"
                          title="Marcar como lida"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => removerNotificacao(notificacao.id)}
                        className="p-1 hover:bg-red-100 rounded-full text-red-600"
                        title="Remover notificação"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
