import React, { useState, useEffect } from "react";
import { SidebarLimpeza } from "@/components/SidebarLimpeza";
import { HeaderLimpeza } from "@/components/HeaderLimpeza";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle, Clock } from "lucide-react";
import FloatingChat from "@/components/FloatingChat";
import NotificacaoServico from "@/components/NotificacaoServico";

export default function QuartosLimpeza() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentUser] = useState({
    id: "limpeza-1",
    name: "Maria Silva",
    role: "Limpeza",
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

  const quartos = [
    { numero: "101", status: "Limpo", prioridade: "Baixa" },
    { numero: "102", status: "Aguardando", prioridade: "Alta" },
    { numero: "103", status: "Em Limpeza", prioridade: "Média" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Limpo":
        return <Check className="text-green-500" />;
      case "Aguardando":
        return <AlertTriangle className="text-yellow-500" />;
      case "Em Limpeza":
        return <Clock className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarLimpeza
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />

      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderLimpeza
          titulo="QUARTOS"
          nome="MARIA SILVA"
          tipo="LIMPEZA"
          onMenuClick={handleMenuClick}
          className={cn("sticky top-0 z-30")}
        />

        <main className="flex-1 p-3 sm:p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quartos.map((quarto) => (
              <Card
                key={quarto.numero}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">
                      Quarto {quarto.numero}
                    </h3>
                    {getStatusIcon(quarto.status)}
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600">Status: {quarto.status}</p>
                    <p className="text-gray-600">
                      Prioridade: {quarto.prioridade}
                    </p>
                  </div>
                  <Button className="w-full mt-4">Iniciar Limpeza</Button>
                </CardContent>
              </Card>
            ))}
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
      <NotificacaoServico userType="limpeza" />
    </div>
  );
}
