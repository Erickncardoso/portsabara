import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, X, Clock, XCircle } from "lucide-react";

interface NotificacaoServicoProps {
  userType: "manutencao" | "limpeza";
}

interface Servico {
  id: string;
  titulo: string;
  local: string;
  tipo: string;
  prioridade: "Alta" | "Média" | "Baixa";
}

const NotificacaoServico: React.FC<NotificacaoServicoProps> = ({
  userType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicoAtual, setServicoAtual] = useState<Servico | null>(null);
  const [proximaNotificacao, setProximaNotificacao] = useState<number>(5); // Contador para próxima notificação

  // Dados de exemplo para diferentes tipos de serviço
  const servicosManutencao: Servico[] = [
    {
      id: "1",
      titulo: "Ar condicionado com defeito",
      local: "Quarto 501",
      tipo: "Manutenção",
      prioridade: "Alta",
    },
    {
      id: "2",
      titulo: "Lâmpada queimada",
      local: "Corredor 2º andar",
      tipo: "Manutenção",
      prioridade: "Baixa",
    },
    {
      id: "3",
      titulo: "Vazamento na torneira",
      local: "Banheiro Quarto 305",
      tipo: "Manutenção",
      prioridade: "Média",
    },
    {
      id: "4",
      titulo: "Elevador fora de serviço",
      local: "Elevador B - 3º andar",
      tipo: "Manutenção",
      prioridade: "Alta",
    },
  ];

  const servicosLimpeza: Servico[] = [
    {
      id: "1",
      titulo: "Limpeza urgente necessária",
      local: "Quarto 501",
      tipo: "Limpeza",
      prioridade: "Alta",
    },
    {
      id: "2",
      titulo: "Troca de roupa de cama",
      local: "Quarto 203",
      tipo: "Limpeza",
      prioridade: "Média",
    },
    {
      id: "3",
      titulo: "Limpeza pós-cirurgia",
      local: "Centro Cirúrgico 2",
      tipo: "Limpeza",
      prioridade: "Alta",
    },
    {
      id: "4",
      titulo: "Desinfecção de sala",
      local: "Sala de Emergência",
      tipo: "Limpeza",
      prioridade: "Alta",
    },
  ];

  const servicos =
    userType === "manutencao" ? servicosManutencao : servicosLimpeza;

  // Função para mostrar notificação aleatória
  const mostrarNotificacao = () => {
    const servicoAleatorio =
      servicos[Math.floor(Math.random() * servicos.length)];
    setServicoAtual(servicoAleatorio);
    setIsOpen(true);
    setProximaNotificacao(60); // Reset para 60 segundos
  };

  // Timer para mostrar notificação a cada 1 minuto
  useEffect(() => {
    const timer = setInterval(() => {
      mostrarNotificacao();
    }, 60000); // 60000ms = 1 minuto

    // Mostrar primeira notificação após 5 segundos (para teste)
    const initialTimer = setTimeout(() => {
      mostrarNotificacao();
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(initialTimer);
    };
  }, [userType]);

  // Contador regressivo para próxima notificação
  useEffect(() => {
    if (!isOpen && proximaNotificacao > 0) {
      const countdown = setInterval(() => {
        setProximaNotificacao((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isOpen, proximaNotificacao]);

  const handleAceitar = () => {
    console.log(
      `✅ Serviço ACEITO: ${servicoAtual?.titulo} - ${servicoAtual?.local}`
    );
    setIsOpen(false);
    // Aqui você pode adicionar lógica para aceitar o serviço
  };

  const handleRejeitar = () => {
    console.log(
      `❌ Serviço REJEITADO: ${servicoAtual?.titulo} - ${servicoAtual?.local}`
    );
    setIsOpen(false);
    // Aqui você pode adicionar lógica para rejeitar o serviço
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Alta":
        return "text-red-600 bg-red-50 border-red-200";
      case "Média":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Baixa":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getIconeServico = () => {
    return userType === "manutencao" ? "🔧" : "🧹";
  };

  if (!servicoAtual) return null;

  return (
    <>
      {/* Indicador de próxima notificação (apenas quando modal não está aberto) */}
      {!isOpen && proximaNotificacao > 0 && (
        <div className="fixed bottom-4 right-4 z-40">
          <div className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Próxima notificação em: {proximaNotificacao}s
          </div>
        </div>
      )}

      {/* Modal de notificação */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md border-2 border-orange-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-orange-700">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Novo Serviço Disponível
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Título do serviço */}
            <div className="text-center bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {getIconeServico()} {servicoAtual.titulo}
              </h3>
              <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
                📍 {servicoAtual.local}
              </p>
            </div>

            {/* Prioridade */}
            <div className="flex justify-center">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium border ${getPrioridadeColor(
                  servicoAtual.prioridade
                )}`}
              >
                Prioridade: {servicoAtual.prioridade}
              </span>
            </div>

            {/* Pergunta */}
            <div className="text-center py-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-semibold text-lg">
                Você está disponível para este serviço?
              </p>
              <p className="text-blue-600 text-sm mt-1">
                Responda rapidamente para não perder a oportunidade
              </p>
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleAceitar}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Aceitar
              </Button>
              <Button
                onClick={handleRejeitar}
                variant="destructive"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all"
              >
                <XCircle className="h-5 w-5 mr-2" />
                Rejeitar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificacaoServico;
