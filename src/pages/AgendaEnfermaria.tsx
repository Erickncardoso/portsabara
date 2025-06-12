import React, { useState, useEffect } from "react";
import SidebarEnfermaria from "../components/SidebarEnfermaria";
import HeaderEnfermaria from "../components/HeaderEnfermaria";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import FloatingChat from "../components/FloatingChat";
import { toast } from "sonner";

const AgendaEnfermaria = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  // Eventos simulados
  const eventos = [
    {
      id: 1,
      titulo: "Medicação - João Silva",
      horario: "08:00",
      tipo: "medicacao",
      data: "2025-01-27",
      paciente: "João Silva",
      local: "Leito 101",
    },
    {
      id: 2,
      titulo: "Curativo - Maria Santos",
      horario: "09:30",
      tipo: "procedimento",
      data: "2025-01-27",
      paciente: "Maria Santos",
      local: "Leito 104",
    },
    {
      id: 3,
      titulo: "Reunião da Equipe",
      horario: "14:00",
      tipo: "reuniao",
      data: "2025-01-27",
      paciente: "-",
      local: "Sala de Reuniões",
    },
    {
      id: 4,
      titulo: "Ronda dos Leitos",
      horario: "16:00",
      tipo: "ronda",
      data: "2025-01-27",
      paciente: "-",
      local: "Todos os Leitos",
    },
    {
      id: 5,
      titulo: "Medicação - Pedro Costa",
      horario: "10:00",
      tipo: "medicacao",
      data: "2025-01-28",
      paciente: "Pedro Costa",
      local: "Leito 107",
    },
  ];

  const formatarData = (data: Date) => {
    return data.toISOString().split("T")[0];
  };

  const eventosDoDay = eventos.filter(
    (evento) => evento.data === formatarData(selectedDate)
  );

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "medicacao":
        return "💊";
      case "procedimento":
        return "🩹";
      case "reuniao":
        return "👥";
      case "ronda":
        return "🏥";
      default:
        return "📅";
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "medicacao":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "procedimento":
        return "bg-green-100 text-green-700 border-green-200";
      case "reuniao":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "ronda":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const gerarCalendario = () => {
    const ano = currentDate.getFullYear();
    const mes = currentDate.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaDaSemanaPrimeiro = primeiroDia.getDay();

    const dias = [];

    // Dias vazios no início
    for (let i = 0; i < diaDaSemanaPrimeiro; i++) {
      dias.push(null);
    }

    // Dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataAtual = new Date(ano, mes, dia);
      const temEventos = eventos.some(
        (evento) => evento.data === formatarData(dataAtual)
      );

      dias.push({
        dia,
        data: dataAtual,
        temEventos,
        isSelected: formatarData(dataAtual) === formatarData(selectedDate),
        isToday: formatarData(dataAtual) === formatarData(new Date()),
      });
    }

    return dias;
  };

  const proximoMes = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const mesAnterior = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nomesMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

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
          titulo="AGENDA"
          onMenuClick={handleMenuClick}
          className={cn("sticky top-0 z-30")}
        />

        <main className="p-3 sm:p-6 space-y-6">
          {/* Header com estatísticas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Total Eventos</p>
                    <p className="text-2xl font-bold">{eventos.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-red-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Medicações</p>
                    <p className="text-2xl font-bold">
                      {eventos.filter((e) => e.tipo === "medicacao").length}
                    </p>
                  </div>
                  <span className="text-2xl">💊</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Procedimentos</p>
                    <p className="text-2xl font-bold">
                      {eventos.filter((e) => e.tipo === "procedimento").length}
                    </p>
                  </div>
                  <span className="text-2xl">🩹</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Reuniões</p>
                    <p className="text-2xl font-bold">
                      {eventos.filter((e) => e.tipo === "reuniao").length}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendário */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-red-600" />
                    {nomesMeses[currentDate.getMonth()]}{" "}
                    {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={mesAnterior}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={proximoMes}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700"
                      size="sm"
                      onClick={() =>
                        toast.success("Funcionalidade em desenvolvimento")
                      }
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Novo
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {diasSemana.map((dia) => (
                    <div
                      key={dia}
                      className="p-2 text-center text-sm font-medium text-gray-500"
                    >
                      {dia}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {gerarCalendario().map((dia, index) => (
                    <div
                      key={index}
                      className={cn(
                        "aspect-square p-1 text-center cursor-pointer rounded-lg transition-colors",
                        dia ? "hover:bg-gray-100" : "",
                        dia?.isSelected
                          ? "bg-red-100 border-2 border-red-600"
                          : "",
                        dia?.isToday
                          ? "bg-blue-50 font-bold text-blue-600"
                          : "",
                        !dia ? "pointer-events-none" : ""
                      )}
                      onClick={() => dia && setSelectedDate(dia.data)}
                    >
                      {dia && (
                        <div className="relative">
                          <span
                            className={cn(
                              "text-sm",
                              dia.isSelected ? "text-red-600 font-bold" : "",
                              dia.isToday && !dia.isSelected
                                ? "text-blue-600"
                                : ""
                            )}
                          >
                            {dia.dia}
                          </span>
                          {dia.temEventos && (
                            <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Eventos do dia selecionado */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-600" />
                  Eventos de {selectedDate.toLocaleDateString("pt-BR")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventosDoDay.length > 0 ? (
                  eventosDoDay.map((evento) => (
                    <div
                      key={evento.id}
                      className="border rounded-lg p-3 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {getTipoIcon(evento.tipo)}
                          </span>
                          <div>
                            <h4 className="font-medium text-sm">
                              {evento.titulo}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {evento.horario}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={cn("text-xs", getTipoColor(evento.tipo))}
                        >
                          {evento.tipo}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        {evento.paciente !== "-" && (
                          <p>
                            <strong>Paciente:</strong> {evento.paciente}
                          </p>
                        )}
                        <p>
                          <strong>Local:</strong> {evento.local}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500 font-medium">Nenhum evento</p>
                    <p className="text-xs text-gray-400">
                      Dia livre de compromissos
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
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

export default AgendaEnfermaria;
