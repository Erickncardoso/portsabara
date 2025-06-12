import React, { useState, useEffect } from "react";
import SidebarEnfermaria from "../components/SidebarEnfermaria";
import HeaderEnfermaria from "../components/HeaderEnfermaria";
import CardPrescricao from "../components/CardPrescricao";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Plus, Filter, Search } from "lucide-react";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import FloatingChat from "../components/FloatingChat";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const PrescricoesEnfermaria = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  // Atualiza o estado da sidebar quando o tamanho da tela muda
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

  const [prescricoes, setPrescricoes] = useState([
    {
      id: 1,
      paciente: "João Silva",
      medicamento: "Dipirona 500mg",
      dosagem: "1 comprimido",
      frequencia: "8/8h",
      inicio: "2025-01-27",
      status: "Pendente" as const,
    },
    {
      id: 2,
      paciente: "Maria Santos",
      medicamento: "Paracetamol 750mg",
      dosagem: "2 comprimidos",
      frequencia: "6/6h",
      inicio: "2025-01-27",
      status: "Administrado" as const,
    },
    {
      id: 3,
      paciente: "Pedro Costa",
      medicamento: "Ibuprofeno 600mg",
      dosagem: "1 comprimido",
      frequencia: "12/12h",
      inicio: "2025-01-26",
      status: "Pendente" as const,
    },
    {
      id: 4,
      paciente: "Ana Paula",
      medicamento: "Antibiótico Amoxicilina",
      dosagem: "1 cápsula",
      frequencia: "8/8h",
      inicio: "2025-01-25",
      status: "Vencido" as const,
    },
    {
      id: 5,
      paciente: "Roberto Lima",
      medicamento: "Omeprazol 20mg",
      dosagem: "1 comprimido",
      frequencia: "24/24h",
      inicio: "2025-01-27",
      status: "Administrado" as const,
    },
    {
      id: 6,
      paciente: "Clara Mendes",
      medicamento: "Vitamina D3",
      dosagem: "1 cápsula",
      frequencia: "24/24h",
      inicio: "2025-01-27",
      status: "Pendente" as const,
    },
  ]);

  const handleAdministrar = (id: number) => {
    setPrescricoes((prev) =>
      prev.map((presc) =>
        presc.id === id ? { ...presc, status: "Administrado" as const } : presc
      )
    );
    toast.success("Medicamento marcado como administrado!");
  };

  const prescricoesFiltradas = prescricoes.filter((presc) => {
    const matchStatus =
      filtroStatus === "Todos" || presc.status === filtroStatus;
    const matchSearch =
      presc.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      presc.medicamento.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const countByStatus = (status: string) => {
    return prescricoes.filter((p) => p.status === status).length;
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
          titulo="PRESCRIÇÕES"
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
                    <p className="text-2xl font-bold">{prescricoes.length}</p>
                  </div>
                  <ClipboardList className="w-8 h-8 text-red-200" />
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
                  <ClipboardList className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Administrados</p>
                    <p className="text-2xl font-bold">
                      {countByStatus("Administrado")}
                    </p>
                  </div>
                  <ClipboardList className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-700 to-red-800 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Vencidos</p>
                    <p className="text-2xl font-bold">
                      {countByStatus("Vencido")}
                    </p>
                  </div>
                  <ClipboardList className="w-8 h-8 text-red-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controles e filtros */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-red-600" />
                  <CardTitle className="text-lg">
                    Gerenciamento de Medicamentos
                  </CardTitle>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 self-start sm:self-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Prescrição
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por paciente ou medicamento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {["Todos", "Pendente", "Administrado", "Vencido"].map(
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

          {/* Lista de prescrições em cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prescricoesFiltradas.map((prescricao) => (
              <CardPrescricao
                key={prescricao.id}
                {...prescricao}
                onAdministrar={handleAdministrar}
              />
            ))}
          </div>

          {prescricoesFiltradas.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <ClipboardList className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-500">
                  Nenhuma prescrição encontrada
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

export default PrescricoesEnfermaria;
