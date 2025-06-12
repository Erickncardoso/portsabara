import React, { useState, useEffect } from "react";
import SidebarFarmacia from "../components/SidebarFarmacia";
import HeaderFarmacia from "../components/HeaderFarmacia";
import {
  Search,
  Plus,
  Filter,
  Users,
  UserCheck,
  UserMinus,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIsMobile } from "@/hooks/use-mobile";
import { getMainContentClasses } from "@/lib/utils";

// Schema de validação do formulário
const pacienteSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  idade: z
    .number()
    .min(0, "Idade não pode ser negativa")
    .max(17, "Paciente deve ter até 17 anos (hospital pediátrico)"),
  sexo: z.string().min(1, "Selecione o sexo"),
  tipoSanguineo: z.string().min(1, "Selecione o tipo sanguíneo"),
  cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
  telefone: z
    .string()
    .min(10, "Telefone inválido")
    .max(15, "Telefone inválido"),
  endereco: z.string().min(5, "Endereço deve ter no mínimo 5 caracteres"),
  alergias: z.string().optional(),
  observacoes: z.string().optional(),
});

type PacienteFormData = z.infer<typeof pacienteSchema>;

const tiposSanguineos = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const PacientesFarmacia: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipoSanguineo, setSelectedTipoSanguineo] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pacientes, setPacientes] = useState<Array<any>>([]);
  const [currentUser] = useState({
    id: "1",
    name: "Dr. Maria Santos",
    role: "Farmacêutico(a)",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PacienteFormData>({
    resolver: zodResolver(pacienteSchema),
  });

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  // Carregar pacientes do localStorage ao montar o componente
  useEffect(() => {
    const storedPacientes = localStorage.getItem("pacientes");
    if (storedPacientes) {
      setPacientes(JSON.parse(storedPacientes));
    }
  }, []);

  // Salvar pacientes no localStorage sempre que houver alterações
  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  // Estatísticas
  const totalPacientes = pacientes.length;
  const pacientesAtivos = pacientes.filter((p) => p.status === "Ativo").length;
  const pacientesInativos = pacientes.filter(
    (p) => p.status === "Inativo"
  ).length;

  const handleAddPaciente = () => {
    setIsModalOpen(true);
  };

  const onSubmit = (data: PacienteFormData) => {
    const novoPaciente = {
      ...data,
      id: `PAC${String(pacientes.length + 1).padStart(3, "0")}`,
      status: "Ativo",
      dataCadastro: new Date().toLocaleDateString(),
    };

    setPacientes([...pacientes, novoPaciente]);
    setIsModalOpen(false);
    reset();
    toast.success("Paciente adicionado com sucesso!");
  };

  const handleAction = (action: string, pacienteId: string) => {
    if (action === "excluir") {
      const novaLista = pacientes.filter((p) => p.id !== pacienteId);
      setPacientes(novaLista);
      toast.success(`Paciente ${pacienteId} excluído com sucesso!`);
    } else if (action === "inativar") {
      const novaLista = pacientes.map((p) => {
        if (p.id === pacienteId) {
          return { ...p, status: "Inativo" };
        }
        return p;
      });
      setPacientes(novaLista);
      toast.success(`Paciente ${pacienteId} inativado com sucesso!`);
    } else {
      toast.info(`Ação "${action}" para ${pacienteId} em desenvolvimento`);
    }
  };

  const filteredPacientes = pacientes.filter((pac) => {
    const matchesSearch =
      pac.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pac.cpf.includes(searchTerm);
    const matchesTipoSanguineo =
      selectedTipoSanguineo === "Todos" ||
      pac.tipoSanguineo === selectedTipoSanguineo;
    return matchesSearch && matchesTipoSanguineo;
  });

  const handleNotificacoesClick = () => {
    toast.info("Funcionalidade de notificações em desenvolvimento");
  };

  const handlePerfilClick = () => {
    toast.info("Funcionalidade de perfil em desenvolvimento");
  };

  const handleMenuClick = () => {
    if (isMobile) {
      setIsSheetOpen(true);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
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
        <HeaderFarmacia titulo="PACIENTES" onMenuClick={handleMenuClick} />
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
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pacientes Ativos</p>
                  <p className="text-2xl font-bold text-green-600">
                    {pacientesAtivos}
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-green-500" />
              </div>
              <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pacientes Inativos</p>
                  <p className="text-2xl font-bold text-red-600">
                    {pacientesInativos}
                  </p>
                </div>
                <UserMinus className="h-8 w-8 text-red-500" />
              </div>
            </div>

            {/* Barra de Ações */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-4 w-full md:w-auto">
                  {/* Campo de Busca */}
                  <div className="relative flex-1 md:w-80">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Buscar pacientes..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {/* Filtro de Tipo Sanguíneo */}
                  <div className="relative w-full md:w-48">
                    <Filter
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <select
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                      value={selectedTipoSanguineo}
                      onChange={(e) => setSelectedTipoSanguineo(e.target.value)}
                    >
                      <option value="Todos">Todos</option>
                      {tiposSanguineos.map((tipo) => (
                        <option key={tipo} value={tipo}>
                          {tipo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Botão Adicionar */}
                <button
                  onClick={handleAddPaciente}
                  className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  <span>Adicionar Paciente</span>
                </button>
              </div>
            </div>

            {/* Tabela de Pacientes */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Nome
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Idade
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Tipo Sanguíneo
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        CPF
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Telefone
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-blue-700">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPacientes.map((p) => (
                      <tr key={p.id} className="border-b hover:bg-blue-50">
                        <td className="px-4 py-3 font-mono">{p.id}</td>
                        <td className="px-4 py-3">{p.nome}</td>
                        <td className="px-4 py-3">{p.idade} anos</td>
                        <td className="px-4 py-3">{p.tipoSanguineo}</td>
                        <td className="px-4 py-3">{p.cpf}</td>
                        <td className="px-4 py-3">{p.telefone}</td>
                        <td
                          className={`px-4 py-3 font-semibold ${
                            p.status === "Ativo"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {p.status}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleAction("editar", p.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Editar
                            </button>
                            {p.status === "Ativo" && (
                              <button
                                onClick={() => handleAction("inativar", p.id)}
                                className="text-yellow-600 hover:text-yellow-800"
                              >
                                Inativar
                              </button>
                            )}
                            <button
                              onClick={() => handleAction("excluir", p.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal de Adicionar Paciente */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-xl p-6 w-full max-w-4xl my-8">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-sabara-blue">
                      Ficha de Cadastro do Paciente
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Seção: Informações Pessoais */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        1. Informações Pessoais
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Nome Completo *
                          </label>
                          <input
                            {...register("nome")}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="Nome completo do paciente"
                          />
                          {errors.nome && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.nome.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            CPF *
                          </label>
                          <input
                            {...register("cpf")}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="000.000.000-00"
                          />
                          {errors.cpf && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.cpf.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Idade *
                          </label>
                          <input
                            {...register("idade", { valueAsNumber: true })}
                            type="number"
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="Idade"
                          />
                          {errors.idade && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.idade.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Sexo *
                          </label>
                          <select
                            {...register("sexo")}
                            className="w-full p-2 border rounded-lg bg-white"
                          >
                            <option value="">Selecione o sexo</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                          </select>
                          {errors.sexo && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.sexo.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Seção: Informações de Contato */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        2. Informações de Contato
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Telefone *
                          </label>
                          <input
                            {...register("telefone")}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="(00) 00000-0000"
                          />
                          {errors.telefone && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.telefone.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Endereço *
                          </label>
                          <input
                            {...register("endereco")}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="Endereço completo"
                          />
                          {errors.endereco && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.endereco.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Seção: Informações Médicas */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        3. Informações Médicas
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Tipo Sanguíneo *
                          </label>
                          <select
                            {...register("tipoSanguineo")}
                            className="w-full p-2 border rounded-lg bg-white"
                          >
                            <option value="">Selecione o tipo sanguíneo</option>
                            {tiposSanguineos.map((tipo) => (
                              <option key={tipo} value={tipo}>
                                {tipo}
                              </option>
                            ))}
                          </select>
                          {errors.tipoSanguineo && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.tipoSanguineo.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Alergias
                          </label>
                          <textarea
                            {...register("alergias")}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="Liste as alergias (se houver)"
                            rows={2}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">
                            Observações Médicas
                          </label>
                          <textarea
                            {...register("observacoes")}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="Observações médicas relevantes"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        * Campos obrigatórios
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Salvar Ficha
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PacientesFarmacia;
