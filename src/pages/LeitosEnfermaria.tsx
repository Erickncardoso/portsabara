import React, { useState, useEffect } from "react";
import SidebarEnfermaria from "../components/SidebarEnfermaria";
import HeaderEnfermaria from "../components/HeaderEnfermaria";
import CardLeito from "../components/CardLeito";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, Plus, Filter, Search } from "lucide-react";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import FloatingChat from "../components/FloatingChat";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const LeitosEnfermaria = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<string>("Todos");
  const [filtroTipo, setFiltroTipo] = useState<string>("Todos");
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

  const [leitos, setLeitos] = useState([
    {
      numero: "101",
      status: "Ocupado" as const,
      paciente: "João Silva",
      tipo: "UTI" as const,
    },
    {
      numero: "102",
      status: "Livre" as const,
      paciente: "-",
      tipo: "Enfermaria" as const,
    },
    {
      numero: "103",
      status: "Em Limpeza" as const,
      paciente: "-",
      tipo: "UTI" as const,
    },
    {
      numero: "104",
      status: "Ocupado" as const,
      paciente: "Maria Santos",
      tipo: "Enfermaria" as const,
    },
    {
      numero: "105",
      status: "Manutenção" as const,
      paciente: "-",
      tipo: "Particular" as const,
    },
    {
      numero: "106",
      status: "Livre" as const,
      paciente: "-",
      tipo: "UTI" as const,
    },
    {
      numero: "107",
      status: "Ocupado" as const,
      paciente: "Pedro Costa",
      tipo: "Particular" as const,
    },
    {
      numero: "108",
      status: "Em Limpeza" as const,
      paciente: "-",
      tipo: "Enfermaria" as const,
    },
    {
      numero: "201",
      status: "Livre" as const,
      paciente: "-",
      tipo: "UTI" as const,
    },
    {
      numero: "202",
      status: "Ocupado" as const,
      paciente: "Ana Paula",
      tipo: "Enfermaria" as const,
    },
    {
      numero: "203",
      status: "Livre" as const,
      paciente: "-",
      tipo: "Particular" as const,
    },
    {
      numero: "204",
      status: "Ocupado" as const,
      paciente: "Roberto Lima",
      tipo: "UTI" as const,
    },
  ]);

  const handleAcaoRapida = (numero: string, acao: string) => {
    setLeitos((prev) =>
      prev.map((leito) =>
        leito.numero === numero
          ? {
              ...leito,
              status:
                acao === "limpo" || acao === "manutencao-ok"
                  ? ("Livre" as const)
                  : leito.status,
            }
          : leito
      )
    );

    const acaoTexto =
      {
        reservar: "Leito reservado com sucesso!",
        limpo: "Limpeza finalizada, leito disponível!",
        "manutencao-ok": "Manutenção concluída, leito disponível!",
      }[acao] || "Ação realizada!";

    toast.success(acaoTexto);
  };

  const leitosFiltrados = leitos.filter((leito) => {
    const matchStatus =
      filtroStatus === "Todos" || leito.status === filtroStatus;
    const matchTipo = filtroTipo === "Todos" || leito.tipo === filtroTipo;
    const matchSearch =
      leito.numero.includes(searchTerm) ||
      leito.paciente.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchTipo && matchSearch;
  });

  const countByStatus = (status: string) => {
    return leitos.filter((l) => l.status === status).length;
  };

  const countByTipo = (tipo: string) => {
    return leitos.filter((l) => l.tipo === tipo).length;
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
          titulo="GESTÃO DE LEITOS"
          onMenuClick={handleMenuClick}
          className={cn("sticky top-0 z-30")}
        />

        <main className="p-3 sm:p-6 space-y-6">
          {/* Header com estatísticas de status */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Ocupados</p>
                    <p className="text-2xl font-bold">
                      {countByStatus("Ocupado")}
                    </p>
                  </div>
                  <Bed className="w-8 h-8 text-red-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Livres</p>
                    <p className="text-2xl font-bold">
                      {countByStatus("Livre")}
                    </p>
                  </div>
                  <Bed className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Limpeza</p>
                    <p className="text-2xl font-bold">
                      {countByStatus("Em Limpeza")}
                    </p>
                  </div>
                  <Bed className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Manutenção</p>
                    <p className="text-2xl font-bold">
                      {countByStatus("Manutenção")}
                    </p>
                  </div>
                  <Bed className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas por tipo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">UTI</p>
                    <p className="text-2xl font-bold">{countByTipo("UTI")}</p>
                  </div>
                  <Bed className="w-8 h-8 text-red-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Enfermaria</p>
                    <p className="text-2xl font-bold">
                      {countByTipo("Enfermaria")}
                    </p>
                  </div>
                  <Bed className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Particular</p>
                    <p className="text-2xl font-bold">
                      {countByTipo("Particular")}
                    </p>
                  </div>
                  <Bed className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controles e filtros */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-red-600" />
                  <CardTitle className="text-lg">Status de Ocupação</CardTitle>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 self-start sm:self-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Gerenciar Internação
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por número do leito ou paciente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Todos",
                    "Ocupado",
                    "Livre",
                    "Em Limpeza",
                    "Manutenção",
                  ].map((status) => (
                    <Button
                      key={status}
                      variant={filtroStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFiltroStatus(status)}
                      className={cn(
                        "text-xs",
                        filtroStatus === status && "bg-red-600 hover:bg-red-700"
                      )}
                    >
                      <Filter className="w-3 h-3 mr-1" />
                      {status}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2">
                  {["Todos", "UTI", "Enfermaria", "Particular"].map((tipo) => (
                    <Button
                      key={tipo}
                      variant={filtroTipo === tipo ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFiltroTipo(tipo)}
                      className={cn(
                        "text-xs",
                        filtroTipo === tipo && "bg-blue-600 hover:bg-blue-700"
                      )}
                    >
                      {tipo}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de leitos em cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {leitosFiltrados.map((leito) => (
              <CardLeito
                key={leito.numero}
                {...leito}
                onAcaoRapida={handleAcaoRapida}
              />
            ))}
          </div>

          {leitosFiltrados.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Bed className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-500">
                  Nenhum leito encontrado
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

export default LeitosEnfermaria;
