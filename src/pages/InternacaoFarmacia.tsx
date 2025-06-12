import React, { useState, useEffect } from "react";
import SidebarFarmacia from "../components/SidebarFarmacia";
import HeaderFarmacia from "../components/HeaderFarmacia";
import {
  Search,
  Filter,
  User,
  Pill,
  AlertTriangle,
  Calendar,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { getMainContentClasses } from "@/lib/utils";

const InternacaoFarmacia: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuarto, setSelectedQuarto] = useState("Todos");
  const [pacientes, setPacientes] = useState<Array<any>>([]);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  // Carregar pacientes internados
  useEffect(() => {
    const pacientesIniciais = [
      {
        id: "INT001",
        nome: "Maria Silva Santos",
        idade: 8,
        quarto: "201A",
        leito: "1",
        dataInternacao: "2024-12-20",
        medicoResponsavel: "Dr. João Carvalho",
        especialidade: "Pediatria Geral",
        alergias: ["Penicilina", "Dipirona"],
        medicamentos: [
          {
            nome: "Paracetamol",
            dosagem: "10ml",
            frequencia: "3x ao dia",
            horarios: ["08:00", "14:00", "20:00"],
            status: "Administrado",
          },
          {
            nome: "Soro Fisiológico",
            dosagem: "250ml",
            frequencia: "Contínuo",
            horarios: ["Contínuo"],
            status: "Pendente",
          },
        ],
        condicao: "Estável",
      },
      {
        id: "INT002",
        nome: "João Pedro Oliveira",
        idade: 5,
        quarto: "203B",
        leito: "2",
        dataInternacao: "2024-12-22",
        medicoResponsavel: "Dra. Ana Santos",
        especialidade: "Pneumologia Pediátrica",
        alergias: [],
        medicamentos: [
          {
            nome: "Amoxicilina",
            dosagem: "5ml",
            frequencia: "3x ao dia",
            horarios: ["08:00", "16:00", "00:00"],
            status: "Atrasado",
          },
          {
            nome: "Inalação com Salbutamol",
            dosagem: "2,5mg",
            frequencia: "4x ao dia",
            horarios: ["06:00", "12:00", "18:00", "00:00"],
            status: "Administrado",
          },
        ],
        condicao: "Observação",
      },
      {
        id: "INT003",
        nome: "Ana Costa Lima",
        idade: 12,
        quarto: "205A",
        leito: "1",
        dataInternacao: "2024-12-18",
        medicoResponsavel: "Dr. Carlos Mendes",
        especialidade: "Cardiologia Pediátrica",
        alergias: ["Aspirina"],
        medicamentos: [
          {
            nome: "Captopril",
            dosagem: "2,5mg",
            frequencia: "2x ao dia",
            horarios: ["08:00", "20:00"],
            status: "Pendente",
          },
          {
            nome: "Furosemida",
            dosagem: "1mg/kg",
            frequencia: "2x ao dia",
            horarios: ["08:00", "20:00"],
            status: "Administrado",
          },
        ],
        condicao: "Crítico",
      },
    ];
    setPacientes(pacientesIniciais);
  }, []);

  const handleMenuClick = () => {
    if (isMobile) {
      setIsSheetOpen(true);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  // Estatísticas
  const totalPacientes = pacientes.length;
  const pacientesCriticos = pacientes.filter(
    (p) => p.condicao === "Crítico"
  ).length;
  const medicamentosAtrasados = pacientes.filter((p) =>
    p.medicamentos.some((m) => m.status === "Atrasado")
  ).length;

  const quartosDisponiveis = [
    "Todos",
    ...Array.from(new Set(pacientes.map((p) => p.quarto))),
  ];

  const filteredPacientes = pacientes.filter((pac) => {
    const matchesSearch =
      pac.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pac.quarto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pac.medicoResponsavel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesQuarto =
      selectedQuarto === "Todos" || pac.quarto === selectedQuarto;
    return matchesSearch && matchesQuarto;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Administrado":
        return "bg-green-100 text-green-800";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Atrasado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCondicaoColor = (condicao: string) => {
    switch (condicao) {
      case "Estável":
        return "bg-green-100 text-green-800";
      case "Observação":
        return "bg-yellow-100 text-yellow-800";
      case "Crítico":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarFarmacia
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
        nome="MARIA SANTOS"
        tipo="FARMACÊUTICO"
      />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderFarmacia titulo="INTERNAÇÕES" onMenuClick={handleMenuClick} />
        <main className="flex-1 p-6">
          <div className="px-3 sm:px-6 py-3 sm:py-4">
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total de Pacientes</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalPacientes}
                  </p>
                </div>
                <User className="h-8 w-8 text-blue-500" />
              </div>
              <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pacientes Críticos</p>
                  <p className="text-2xl font-bold text-red-600">
                    {pacientesCriticos}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Medicamentos Atrasados
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {medicamentosAtrasados}
                  </p>
                </div>
                <Pill className="h-8 w-8 text-yellow-500" />
              </div>
            </div>

            {/* Barra de Filtros */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Campo de Busca */}
                <div className="relative flex-1 md:w-80">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Buscar paciente, quarto ou médico..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* Filtro de Quarto */}
                <div className="relative w-full md:w-48">
                  <Filter
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <select
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                    value={selectedQuarto}
                    onChange={(e) => setSelectedQuarto(e.target.value)}
                  >
                    {quartosDisponiveis.map((quarto) => (
                      <option key={quarto} value={quarto}>
                        {quarto}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Lista de Pacientes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPacientes.map((paciente) => (
                <div
                  key={paciente.id}
                  className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow"
                >
                  {/* Header do Card */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {paciente.nome}
                      </h3>
                      <p className="text-gray-600">
                        {paciente.idade} anos • Quarto {paciente.quarto} - Leito{" "}
                        {paciente.leito}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCondicaoColor(
                        paciente.condicao
                      )}`}
                    >
                      {paciente.condicao}
                    </span>
                  </div>

                  {/* Informações Básicas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>
                        Internado em:{" "}
                        {new Date(paciente.dataInternacao).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stethoscope size={16} className="text-gray-400" />
                      <span>{paciente.medicoResponsavel}</span>
                    </div>
                  </div>

                  {/* Alergias */}
                  {paciente.alergias && paciente.alergias.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} className="text-red-500" />
                        <span className="font-medium text-red-700">
                          Alergias:
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {paciente.alergias.map((alergia, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                          >
                            {alergia}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Medicamentos */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Pill size={16} className="text-blue-500" />
                      <span className="font-medium">Medicamentos</span>
                    </div>
                    <div className="space-y-2">
                      {paciente.medicamentos.map((medicamento, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <p className="font-medium">
                                {medicamento.nome} {medicamento.dosagem}
                              </p>
                              <p className="text-sm text-gray-600">
                                {medicamento.frequencia}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                medicamento.status
                              )}`}
                            >
                              {medicamento.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {medicamento.horarios.map((horario, horarioIdx) => (
                              <span
                                key={horarioIdx}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded border"
                              >
                                {horario}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPacientes.length === 0 && (
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <User size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum paciente encontrado
                </h3>
                <p className="text-gray-600">
                  {searchTerm || selectedQuarto !== "Todos"
                    ? "Tente ajustar os filtros de busca."
                    : "Não há pacientes internados no momento."}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InternacaoFarmacia;
