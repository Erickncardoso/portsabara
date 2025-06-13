import React, { useState, useEffect } from "react";
import SidebarManutencao from "../components/SidebarManutencao";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import FloatingChat from "@/components/FloatingChat";
import { HeaderManutencao } from "../components/HeaderManutencao";
import { StatusIcon } from "@/components/ui/status-icon";
import { AlertaQuartoManutencao } from "../components/AlertaQuartoManutencao";
import NotificacaoServico from "@/components/NotificacaoServico";

const HomeManutencao: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentUser] = useState({
    id: "manutencao-1",
    name: "Robert Silva",
    role: "Manutenção",
  });

  // Informações do usuário para header e sidebar
  const usuarioInfo = {
    nome: "ROBERT SILVA",
    tipo: "MANUTENÇÃO",
  };

  const historicoManutencoes = [
    {
      id: "1",
      nome: "Shyam Khanna",
      iniciais: "SK",
      cor: "bg-blue-500",
      exame: "Heart Disease",
      data: "27/12",
      resultado: "Sucesso",
    },
    {
      id: "2",
      nome: "Jean Lee Un",
      iniciais: "JL",
      cor: "bg-green-500",
      exame: "Heart Disease",
      data: "27/12",
      resultado: "Sucesso",
    },
    {
      id: "3",
      nome: "Clara Brook",
      iniciais: "CB",
      cor: "bg-purple-500",
      exame: "Heart Disease",
      data: "27/12",
      resultado: "Falha",
    },
  ];

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleMenuClick = () => {
    if (isMobile) {
      setIsSheetOpen(true);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarManutencao
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
        nome={usuarioInfo.nome}
        tipo={usuarioInfo.tipo}
      />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderManutencao
          titulo="INÍCIO"
          nome={usuarioInfo.nome}
          tipo={usuarioInfo.tipo}
          onMenuClick={handleMenuClick}
          className={cn("sticky top-0 z-30")}
        />
        <main className="flex-1 p-3 sm:p-6 mt-0 bg-gray-50">
          {/* Alertas de Quartos */}
          <div className="mb-6 space-y-4">
            <AlertaQuartoManutencao
              numeroQuarto="190"
              especialidade="Dermatologista"
              nomeMedico="Dr. João Silva"
              status="Em Andamento"
            />
            <AlertaQuartoManutencao
              numeroQuarto="205"
              especialidade="Cardiologista"
              nomeMedico="Dra. Maria Santos"
              status="Aguardando"
            />
            <AlertaQuartoManutencao
              numeroQuarto="178"
              especialidade="Pneumologista"
              nomeMedico="Dr. Carlos Lima"
              status="Finalizado"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 10H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Ver Solicitações</h3>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8V12L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Protocolos de Manutenção
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">
              Histórico de Manutenções
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4"></th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Quarto
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Exame
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Data
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Resultado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historicoManutencoes.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div
                          className={`w-8 h-8 rounded-full ${item.cor} flex items-center justify-center text-white font-bold text-sm`}
                        >
                          {item.iniciais}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{item.nome}</td>
                      <td className="py-3 px-4 text-sm">{item.exame}</td>
                      <td className="py-3 px-4 text-sm">{item.data}</td>
                      <td className="py-3 px-4">
                        <StatusIcon status={item.resultado} size="md" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-right">
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Ver mais...
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <FloatingChat
        currentUser={{
          id: currentUser.id,
          name: currentUser.name,
          role: currentUser.role,
        }}
      />
      {/* Componente de Notificação de Serviços */}
      <NotificacaoServico userType="manutencao" />
    </div>
  );
};

export default HomeManutencao;
