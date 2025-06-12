import React, { useState, useEffect } from "react";
import SidebarManutencao from "../components/SidebarManutencao";
import { HeaderManutencao } from "../components/HeaderManutencao";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusIcon } from "@/components/ui/status-icon";
import { Calendar, User, Wrench, CheckCircle, XCircle } from "lucide-react";
import FloatingChat from "../components/FloatingChat";

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
      data: "2025-04-25",
      equipamento: "Tomógrafo",
      tipo: "Manutenção Preventiva",
      tecnico: "Robert Silva",
      resultado: "Sucesso",
    },
    {
      id: 2,
      data: "2025-04-24",
      equipamento: "Raio-X",
      tipo: "Manutenção Corretiva",
      tecnico: "Robert Silva",
      resultado: "Falha",
    },
  ];

  const getResultadoIcon = (resultado: string) => {
    switch (resultado) {
      case "Sucesso":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Falha":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getTipoIcon = (tipo: string) => {
    return <Wrench className="h-4 w-4 text-blue-500" />;
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
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Histórico de Manutenções
            </h2>

            {historico.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getResultadoIcon(item.resultado)}
                      <span
                        className={cn(
                          "font-medium",
                          item.resultado === "Sucesso" && "text-green-700",
                          item.resultado === "Falha" && "text-red-700"
                        )}
                      >
                        {item.resultado}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date(item.data).toLocaleDateString("pt-BR")}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {item.equipamento}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      {getTipoIcon(item.tipo)}
                      <span className="text-gray-700">{item.tipo}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600">
                    <User className="h-4 w-4" />
                    <span className="text-sm">
                      <span className="font-medium">Técnico:</span>{" "}
                      {item.tecnico}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {historico.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-2">
                    <Wrench className="h-12 w-12 mx-auto" />
                  </div>
                  <p className="text-gray-500">
                    Nenhuma manutenção registrada ainda.
                  </p>
                </CardContent>
              </Card>
            )}
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
    </div>
  );
};

export default HistoricoManutencao;
