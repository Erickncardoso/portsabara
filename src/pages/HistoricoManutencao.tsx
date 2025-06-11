import React, { useState, useEffect } from "react";
import SidebarManutencao from "../components/SidebarManutencao";
import { HeaderManutencao } from "../components/HeaderManutencao";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusIcon } from "@/components/ui/status-icon";
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
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Manutenções</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Equipamento</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Técnico</TableHead>
                    <TableHead>Resultado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historico.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {new Date(item.data).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{item.equipamento}</TableCell>
                      <TableCell>{item.tipo}</TableCell>
                      <TableCell>{item.tecnico}</TableCell>
                      <TableCell>
                        <StatusIcon status={item.resultado} size="sm" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
    </div>
  );
};

export default HistoricoManutencao;
