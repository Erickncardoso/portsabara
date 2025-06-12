import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarPaciente from "../components/SidebarPaciente";
import HeaderPaciente from "../components/HeaderPaciente";
import FloatingChat from "@/components/FloatingChat";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ReceitasPaciente: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const currentUser = {
    id: "1",
    name: "João Silva",
    role: "Paciente",
    avatar: "/images/avatar.png",
  };

  const receitas = [
    {
      id: 1,
      medico: "Dra. Maria Santos",
      especialidade: "Cardiologista",
      data: "28/04/2025",
      medicamentos: ["Losartana 50mg", "Atenolol 25mg"],
      status: "Ativa",
    },
    {
      id: 2,
      medico: "Dr. Carlos Silva",
      especialidade: "Ortopedista",
      data: "30/04/2025",
      medicamentos: ["Dipirona 500mg", "Ibuprofeno 600mg"],
      status: "Ativa",
    },
  ];

  const handleNotificacoesClick = () => {
    toast({
      title: "Notificações",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handlePerfilClick = () => {
    navigate("/perfil-paciente");
  };

  const receitasFiltradas = receitas.filter(
    (receita) =>
      receita.medico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receita.medicamentos.some((med) =>
        med.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarPaciente
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />

      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderPaciente
          titulo="RECEITAS"
          nome={currentUser.name}
          tipo={currentUser.role}
          notificacoes={2}
          onNotificacoesClick={handleNotificacoesClick}
          onPerfilClick={handlePerfilClick}
          onMenuClick={handleMenuClick}
        />

        <FloatingChat currentUser={currentUser} />

        <main className="flex-1 pt-8 px-4 pb-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      Minhas Receitas
                    </CardTitle>
                    <CardDescription>
                      Visualize e gerencie suas receitas médicas
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Buscar receitas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-4">
                  {receitasFiltradas.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Nenhuma receita encontrada
                    </div>
                  ) : (
                    receitasFiltradas.map((receita) => (
                      <div
                        key={receita.id}
                        className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{receita.medico}</h3>
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                {receita.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {receita.especialidade}
                            </p>
                            <p className="text-sm text-gray-500">
                              Emitida em: {receita.data}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {receita.medicamentos.map(
                                (medicamento, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {medicamento}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col md:items-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                toast({
                                  title: "Detalhes da Receita",
                                  description:
                                    "Funcionalidade em desenvolvimento",
                                })
                              }
                            >
                              Ver detalhes
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.print()}
                            >
                              Imprimir
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReceitasPaciente;
