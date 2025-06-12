import React, { useEffect, useState } from "react";
import SidebarEnfermaria from "../components/SidebarEnfermaria";
import HeaderEnfermaria from "../components/HeaderEnfermaria";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "../hooks/use-mobile";
import { cn, getMainContentClasses } from "@/lib/utils";
import FloatingChat from "../components/FloatingChat";
import {
  Users,
  Bed,
  Pill,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Stethoscope,
} from "lucide-react";

const HomeEnfermaria: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("pacientesEnfermaria")) {
      const pacientesIniciais = [
        {
          id: "1",
          paciente: "João Silva",
          detalhes: "4 ciclistas",
          avatar: "JoaoSilva",
        },
        {
          id: "2",
          paciente: "Maria Santos",
          detalhes: "2 médicos",
          avatar: "MariaSantos",
        },
        {
          id: "3",
          paciente: "Pedro Oliveira",
          detalhes: "Urgência",
          avatar: "PedroOliveira",
        },
      ];
      localStorage.setItem(
        "pacientesEnfermaria",
        JSON.stringify(pacientesIniciais)
      );
    }

    if (!localStorage.getItem("medicamentosEnfermaria")) {
      const medicamentosIniciais = [
        {
          id: "1",
          medicamento: "Dipirona 500mg",
          paciente: "João Silva",
          horario: "08:00",
          status: "pendente",
        },
        {
          id: "2",
          medicamento: "Paracetamol 750mg",
          paciente: "Maria Santos",
          horario: "12:00",
          status: "administrado",
        },
        {
          id: "3",
          medicamento: "Ibuprofeno 600mg",
          paciente: "Pedro Oliveira",
          horario: "16:00",
          status: "pendente",
        },
      ];
      localStorage.setItem(
        "medicamentosEnfermaria",
        JSON.stringify(medicamentosIniciais)
      );
    }

    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleMenuClick = () => {
    if (isMobile) {
      setIsSheetOpen(true);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  // Dados do dashboard
  const estatisticas = {
    pacientesInternados: 12,
    leitosOcupados: 8,
    leitosDisponiveis: 4,
    medicacoesPendentes: 6,
    procedimentosHoje: 9,
    rondaStatus: "Em andamento",
  };

  const pacientesUrgentes = [
    {
      id: 1,
      nome: "João Silva",
      leito: "101",
      prioridade: "alta",
      tipo: "UTI",
      observacao: "Monitoramento contínuo",
    },
    {
      id: 2,
      nome: "Maria Santos",
      leito: "104",
      prioridade: "media",
      tipo: "Enfermaria",
      observacao: "Pós-operatório",
    },
    {
      id: 3,
      nome: "Pedro Costa",
      leito: "107",
      prioridade: "alta",
      tipo: "UTI",
      observacao: "Cuidados intensivos",
    },
  ];

  const proximasMedicacoes = [
    {
      id: 1,
      paciente: "João Silva",
      medicamento: "Dipirona 500mg",
      horario: "14:00",
      leito: "101",
    },
    {
      id: 2,
      paciente: "Ana Paula",
      medicamento: "Paracetamol 750mg",
      horario: "14:30",
      leito: "203",
    },
    {
      id: 3,
      paciente: "Roberto Lima",
      medicamento: "Antibiótico",
      horario: "15:00",
      leito: "105",
    },
  ];

  const proximosProcedimentos = [
    {
      id: 1,
      paciente: "Maria Santos",
      procedimento: "Curativo",
      horario: "15:30",
      responsavel: "Ana Silva",
    },
    {
      id: 2,
      paciente: "Pedro Costa",
      procedimento: "Fisioterapia",
      horario: "16:00",
      responsavel: "Carlos Oliveira",
    },
  ];

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "bg-red-100 text-red-700 border-red-200";
      case "media":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-green-100 text-green-700 border-green-200";
    }
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
          titulo="HOME"
          onMenuClick={handleMenuClick}
          className={cn("sticky top-0 z-30")}
        />

        <main className="flex-1 p-3 sm:p-6 space-y-6">
          {/* Cards de estatísticas principais */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Pacientes</p>
                    <p className="text-2xl font-bold">
                      {estatisticas.pacientesInternados}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-red-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Leitos Ocupados</p>
                    <p className="text-2xl font-bold">
                      {estatisticas.leitosOcupados}/
                      {estatisticas.leitosOcupados +
                        estatisticas.leitosDisponiveis}
                    </p>
                  </div>
                  <Bed className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">
                      Medicações Pendentes
                    </p>
                    <p className="text-2xl font-bold">
                      {estatisticas.medicacoesPendentes}
                    </p>
                  </div>
                  <Pill className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">
                      Procedimentos Hoje
                    </p>
                    <p className="text-2xl font-bold">
                      {estatisticas.procedimentosHoje}
                    </p>
                  </div>
                  <Stethoscope className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pacientes que necessitam atenção */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Pacientes Prioritários
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pacientesUrgentes.map((paciente) => (
                  <div
                    key={paciente.id}
                    className="border rounded-lg p-3 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-red-100 text-red-700 text-sm font-medium">
                            {getInitials(paciente.nome)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm">
                            {paciente.nome}
                          </h4>
                          <p className="text-xs text-gray-500">
                            Leito {paciente.leito} • {paciente.tipo}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={cn(
                          "text-xs",
                          getPrioridadeColor(paciente.prioridade)
                        )}
                      >
                        {paciente.prioridade === "alta"
                          ? "Alta"
                          : paciente.prioridade === "media"
                          ? "Média"
                          : "Baixa"}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">
                      {paciente.observacao}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Próximas medicações */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-blue-600" />
                  Próximas Medicações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {proximasMedicacoes.map((medicacao) => (
                  <div
                    key={medicacao.id}
                    className="border rounded-lg p-3 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">
                            {medicacao.paciente}
                          </h4>
                          <p className="text-xs text-gray-500">
                            Leito {medicacao.leito}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {medicacao.horario}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 ml-11">
                      {medicacao.medicamento}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Próximos procedimentos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  Próximos Procedimentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {proximosProcedimentos.map((procedimento) => (
                  <div
                    key={procedimento.id}
                    className="border rounded-lg p-3 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">
                            {procedimento.paciente}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {procedimento.procedimento}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {procedimento.horario}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 ml-11">
                      Responsável: {procedimento.responsavel}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Status geral */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Status do Turno
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">Ronda Matinal</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    Concluída
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">
                      Ronda Vespertina
                    </span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">
                    Em Andamento
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium">Próxima Reunião</span>
                  </div>
                  <Badge variant="outline">16:00</Badge>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Activity className="w-4 h-4 mr-2" />
                  Iniciar Ronda de Emergência
                </Button>
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

export default HomeEnfermaria;
