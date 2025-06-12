import React, { useState, useEffect } from "react";
import SidebarEnfermaria from "../components/SidebarEnfermaria";
import HeaderEnfermaria from "../components/HeaderEnfermaria";
import CardProcedimento from "../components/CardProcedimento";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Plus, Filter, Search } from "lucide-react";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import FloatingChat from "../components/FloatingChat";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const ProcedimentosEnfermaria = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<string>("Todos");
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

  const [procedimentos, setProcedimentos] = useState([
    {
      id: 1,
      paciente: "João Silva",
      procedimento: "Verificação de Sinais Vitais",
      horario: "08:00",
      status: "Pendente" as const,
      responsavel: "Ana Silva",
    },
    {
      id: 2,
      paciente: "Maria Santos",
      procedimento: "Administração de Medicamento",
      horario: "09:30",
      status: "Concluído" as const,
      responsavel: "Ana Silva",
    },
    {
      id: 3,
      paciente: "Pedro Costa",
      procedimento: "Curativo Cirúrgico",
      horario: "10:15",
      status: "Em Andamento" as const,
      responsavel: "Carlos Oliveira",
    },
    {
      id: 4,
      paciente: "Ana Paula",
      procedimento: "Coleta de Sangue",
      horario: "11:00",
      status: "Pendente" as const,
      responsavel: "Ana Silva",
    },
    {
      id: 5,
      paciente: "Roberto Lima",
      procedimento: "Fisioterapia Respiratória",
      horario: "14:30",
      status: "Pendente" as const,
      responsavel: "Fernanda Souza",
    },
    {
      id: 6,
      paciente: "Clara Mendes",
      procedimento: "Aferição de Pressão",
      horario: "15:45",
      status: "Concluído" as const,
      responsavel: "Ana Silva",
    },
  ]);

  const handleMarcarConcluido = (id: number) => {
    setProcedimentos((prev) =>
      prev.map((proc) =>
        proc.id === id ? { ...proc, status: "Concluído" as const } : proc
      )
    );
    toast.success("Procedimento marcado como concluído!");
  };

  const procedimentosFiltrados = procedimentos.filter((proc) => {
    const matchStatus =
      filtroStatus === "Todos" || proc.status === filtroStatus;
    const matchSearch =
      proc.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proc.procedimento.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const countByStatus = (status: string) => {
    return procedimentos.filter((p) => p.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarEnfermaria
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />

      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderEnfermaria
          titulo="PROCEDIMENTOS"
          onMenuClick={handleMenuClick}
          className={cn("sticky top-0 z-30")}
        />

        <main className="p-3 sm:p-6 space-y-6">
          {/* Header com estatísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Total</p>
                    <p className="text-2xl font-bold">{procedimentos.length}</p>
                  </div>
                  <Stethoscope className="w-8 h-8 text-red-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Pendentes</p>
                    <p className="text-2xl font-bold">
                      {countByStatus("Pendente")}
                    </p>
                  </div>
                  <Stethoscope className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Em Andamento</p>
                    <p className="text-2xl font-bold">
                      {countByStatus("Em Andamento")}
                    </p>
                  </div>
                  <Stethoscope className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Concluídos</p>
                    <p className="text-2xl font-bold">
                      {countByStatus("Concluído")}
                    </p>
                  </div>
                  <Stethoscope className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controles e filtros */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-red-600" />
                  <CardTitle className="text-lg">
                    Controle de Atividades
                  </CardTitle>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 self-start sm:self-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Procedimento
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por paciente ou procedimento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {["Todos", "Pendente", "Em Andamento", "Concluído"].map(
                    (status) => (
                      <Button
                        key={status}
                        variant={
                          filtroStatus === status ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setFiltroStatus(status)}
                        className={cn(
                          "text-xs",
                          filtroStatus === status &&
                            "bg-red-600 hover:bg-red-700"
                        )}
                      >
                        <Filter className="w-3 h-3 mr-1" />
                        {status}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de procedimentos em cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {procedimentosFiltrados.map((procedimento) => (
              <CardProcedimento
                key={procedimento.id}
                {...procedimento}
                onMarcarConcluido={handleMarcarConcluido}
              />
            ))}
          </div>

          {procedimentosFiltrados.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Stethoscope className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-500">
                  Nenhum procedimento encontrado
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Tente ajustar os filtros ou busca
                </p>
              </CardContent>
            </Card>
          )}
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

export default ProcedimentosEnfermaria;
