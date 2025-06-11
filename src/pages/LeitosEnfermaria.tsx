import React, { useState, useEffect } from "react";
import SidebarEnfermaria from "../components/SidebarEnfermaria";
import HeaderEnfermaria from "../components/HeaderEnfermaria";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Bed } from "lucide-react";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import FloatingChat from "../components/FloatingChat";

const LeitosEnfermaria = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const leitos = [
    { numero: "101", status: "Ocupado", paciente: "João Silva", tipo: "UTI" },
    { numero: "102", status: "Livre", paciente: "-", tipo: "Enfermaria" },
    { numero: "103", status: "Em Limpeza", paciente: "-", tipo: "UTI" },
    {
      numero: "104",
      status: "Ocupado",
      paciente: "Maria Santos",
      tipo: "Enfermaria",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarEnfermaria
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderEnfermaria
          titulo="GESTÃO DE LEITOS"
          className={cn("sticky top-0 z-30", isMobile && "pt-16")}
        />

        <main className="p-3 sm:p-6">
          <Card className="shadow-md">
            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600">
              <div className="flex items-center gap-2">
                <Bed className="h-6 w-6 text-white" />
                <CardTitle className="text-xl font-bold text-white">
                  Status de Ocupação
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Tipo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leitos.map((leito) => (
                    <TableRow key={leito.numero}>
                      <TableCell className="font-medium">
                        {leito.numero}
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs",
                            leito.status === "Ocupado"
                              ? "bg-red-100 text-red-800"
                              : leito.status === "Livre"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          )}
                        >
                          {leito.status}
                        </span>
                      </TableCell>
                      <TableCell>{leito.paciente}</TableCell>
                      <TableCell>{leito.tipo}</TableCell>
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
          id: "nurse-1",
          name: "Ana Silva",
          role: "Enfermeiro",
        }}
      />
    </div>
  );
};

export default LeitosEnfermaria;
