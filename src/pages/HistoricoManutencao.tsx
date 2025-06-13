import React, { useState, useEffect } from "react";
import SidebarManutencao from "../components/SidebarManutencao";
import { HeaderManutencao } from "../components/HeaderManutencao";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusIcon } from "@/components/ui/status-icon";
import {
  Calendar,
  User,
  Wrench,
  CheckCircle,
  XCircle,
  Settings,
} from "lucide-react";
import FloatingChat from "../components/FloatingChat";
import NotificacaoServico from "@/components/NotificacaoServico";

const HistoricoManutencao = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentUser] = useState({
    id: "manutencao-1",
    name: "Robert Silva",
    role: "Manutenção",
  });

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

  const historico = [
    {
      id: 1,
      paciente: "Shyam Khanna",
      equipamento: "Heart Disease",
      data: "27/12",
      resultado: "Sucesso",
      avatar: "SK",
      avatarColor: "bg-blue-500",
    },
    {
      id: 2,
      paciente: "Jean Lee Un",
      equipamento: "Heart Disease",
      data: "27/12",
      resultado: "Sucesso",
      avatar: "JL",
      avatarColor: "bg-green-500",
    },
    {
      id: 3,
      paciente: "Clara Brook",
      equipamento: "Heart Disease",
      data: "27/12",
      resultado: "Falha",
      avatar: "CB",
      avatarColor: "bg-purple-500",
    },
    {
      id: 4,
      paciente: "Maria Santos",
      equipamento: "Tomógrafo",
      data: "26/12",
      resultado: "Sucesso",
      avatar: "MS",
      avatarColor: "bg-pink-500",
    },
    {
      id: 5,
      paciente: "João Silva",
      equipamento: "Raio-X",
      data: "25/12",
      resultado: "Sucesso",
      avatar: "JS",
      avatarColor: "bg-orange-500",
    },
  ];

  const getResultadoIcon = (resultado: string) => {
    switch (resultado) {
      case "Sucesso":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "Falha":
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarManutencao
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderManutencao
          titulo="HISTÓRICO"
          nome="ROBERT SILVA"
          tipo="MANUTENÇÃO"
          onMenuClick={handleMenuClick}
          className={cn("sticky top-0 z-30")}
        />
        <main className="flex-1 p-3 sm:p-6 bg-gray-50">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Histórico de Manutenções
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Settings className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {historico.length} registros
                </span>
              </div>
            </div>

            {/* Cards em formato de tabela moderna */}
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Header da tabela */}
              <div className="grid grid-cols-4 gap-4 p-4 border-b bg-gray-50 font-semibold text-gray-700 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Quarto
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Exame
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Data
                </div>
                <div className="text-center">Resultado</div>
              </div>

              {/* Rows dos cards */}
              {historico.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0",
                    "group cursor-pointer"
                  )}
                >
                  {/* Coluna Paciente */}
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm",
                        item.avatarColor
                      )}
                    >
                      {item.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {item.paciente}
                      </p>
                    </div>
                  </div>

                  {/* Coluna Equipamento */}
                  <div className="flex items-center">
                    <p className="text-gray-700 font-medium">
                      {item.equipamento}
                    </p>
                  </div>

                  {/* Coluna Data */}
                  <div className="flex items-center">
                    <p className="text-gray-600 font-medium">{item.data}</p>
                  </div>

                  {/* Coluna Resultado */}
                  <div className="flex items-center justify-center">
                    {getResultadoIcon(item.resultado)}
                  </div>
                </div>
              ))}
            </div>

            {historico.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <Wrench className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Nenhuma manutenção registrada
                  </h3>
                  <p className="text-gray-500">
                    Os registros de manutenção aparecerão aqui quando
                    disponíveis.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Card de estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Sucessos</p>
                      <p className="text-2xl font-bold text-green-600">
                        {
                          historico.filter((h) => h.resultado === "Sucesso")
                            .length
                        }
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Falhas</p>
                      <p className="text-2xl font-bold text-red-600">
                        {
                          historico.filter((h) => h.resultado === "Falha")
                            .length
                        }
                      </p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {historico.length}
                      </p>
                    </div>
                    <Settings className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
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

export default HistoricoManutencao;
