import React, { useState, useEffect } from "react";
import { SidebarLimpeza } from "@/components/SidebarLimpeza";
import { HeaderLimpeza } from "@/components/HeaderLimpeza";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import FloatingChat from "@/components/FloatingChat";
import { StatusIcon } from "@/components/ui/status-icon";
import { AlertaQuarto } from "@/components/AlertaQuarto";
import NotificacaoServico from "@/components/NotificacaoServico";

export default function HomeLimpeza() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentUser] = useState({
    id: "limpeza-1",
    name: "Maria Silva",
    role: "Limpeza",
  });

  // Informações do usuário para header e sidebar
  const usuarioInfo = {
    nome: "MARIA SILVA",
    tipo: "LIMPEZA",
  };

  const historicoLimpezas = [
    {
      id: "1",
      nome: "Maria Silva",
      iniciais: "MS",
      avatarColor: "bg-orange-500",
      quarto: "501",
      especialidade: "UTI",
      data: "27/12",
      resultado: "Sucesso",
    },
    {
      id: "2",
      nome: "João Santos",
      iniciais: "JS",
      avatarColor: "bg-blue-500",
      quarto: "303",
      especialidade: "Pediatria",
      data: "26/12",
      resultado: "Sucesso",
    },
    {
      id: "3",
      nome: "Ana Costa",
      iniciais: "AC",
      avatarColor: "bg-purple-500",
      quarto: "205",
      especialidade: "Cardiologia",
      data: "25/12",
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
      <SidebarLimpeza
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
        nome={usuarioInfo.nome}
        tipo={usuarioInfo.tipo}
      />

      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderLimpeza
          titulo="INÍCIO"
          nome={usuarioInfo.nome}
          tipo={usuarioInfo.tipo}
          onMenuClick={handleMenuClick}
          className={cn("sticky top-0 z-30")}
        />

        <main className="flex-1 p-3 sm:p-6 bg-gray-50">
          {/* Alertas de Quartos */}
          <div className="mb-8 space-y-4">
            <AlertaQuarto
              numeroQuarto="190"
              especialidade="Dermatologista"
              nomeMedico="Dr. João Silva"
              status="Em Andamento"
            />
            <AlertaQuarto
              numeroQuarto="205"
              especialidade="Cardiologista"
              nomeMedico="Dra. Maria Santos"
              status="Aguardando"
            />
            <AlertaQuarto
              numeroQuarto="178"
              especialidade="Pediatra"
              nomeMedico="Dr. Carlos Lima"
              status="Finalizado"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Solicitações */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="bg-blue-100 rounded-full p-3 mb-4">
                    <Calendar size={48} className="text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold mb-2">31</div>
                  <h3 className="text-xl font-semibold mb-4">
                    Ver Solicitações
                  </h3>
                  <Button variant="link" className="text-blue-600">
                    Ver detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Protocolos de Limpeza */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="bg-blue-100 rounded-full p-3 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-500"
                    >
                      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                      <path d="M18 14h-8"></path>
                      <path d="M15 18h-5"></path>
                      <path d="M10 6h8v4h-8V6Z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    Protocolos de Limpeza
                  </h3>
                  <Button variant="link" className="text-blue-600">
                    Ver detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Histórico de Limpezas */}
          <Card className="mt-8 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Histórico de Limpezas
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2">Funcionário</th>
                      <th className="pb-2">Quarto</th>
                      <th className="pb-2">Data</th>
                      <th className="pb-2 text-center">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicoLimpezas.map((item) => (
                      <tr key={item.id} className="border-b last:border-0">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs ${item.avatarColor}`}
                            >
                              {item.iniciais}
                            </div>
                            <div>
                              <p className="font-medium">{item.nome}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div>
                            <p className="font-medium">Quarto {item.quarto}</p>
                            <p className="text-sm text-gray-500">
                              {item.especialidade}
                            </p>
                          </div>
                        </td>
                        <td className="py-3">{item.data}</td>
                        <td className="py-3 text-center">
                          <div className="flex justify-center">
                            <StatusIcon status={item.resultado} size="md" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="link" className="text-blue-600">
                  Ver mais...
                </Button>
              </div>
            </CardContent>
          </Card>
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
      <NotificacaoServico userType="limpeza" />
    </div>
  );
}
