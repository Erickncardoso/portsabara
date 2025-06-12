import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  FileText,
  Clock,
  CheckCircle,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SidebarFarmaciaFixed from "../components/SidebarFarmaciaFixed";
import HeaderFarmaciaFixed from "../components/HeaderFarmaciaFixed";
import { useIsMobile } from "@/hooks/use-mobile";
import { getMainContentClasses } from "@/lib/utils";

// Schema de validação do formulário
const receitaSchema = z.object({
  pacienteNome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  pacienteId: z.string().min(3, "ID do paciente inválido"),
  medicamento: z.string().min(3, "Nome do medicamento é obrigatório"),
  dosagem: z.string().min(1, "Dosagem é obrigatória"),
  frequencia: z.string().min(1, "Frequência é obrigatória"),
  dataReceita: z.string().min(1, "Data da receita é obrigatória"),
  medicoNome: z
    .string()
    .min(3, "Nome do médico deve ter no mínimo 3 caracteres"),
  crm: z.string().min(4, "CRM inválido"),
  observacoes: z.string().optional(),
});

type ReceitaFormData = z.infer<typeof receitaSchema>;

interface Receita extends ReceitaFormData {
  id: string;
  status: "Pendente" | "Dispensado";
  dataCadastro: string;
  dataDispensacao?: string;
}

const ReceitasFarmacia: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReceita, setSelectedReceita] = useState<Receita | null>(null);
  const [receitas, setReceitas] = useState<Receita[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReceitaFormData>({
    resolver: zodResolver(receitaSchema),
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

  // Carregar receitas do localStorage ao montar o componente
  useEffect(() => {
    const storedReceitas = localStorage.getItem("receitas");
    if (storedReceitas) {
      setReceitas(JSON.parse(storedReceitas));
    }
  }, []);

  // Salvar receitas no localStorage sempre que houver alterações
  useEffect(() => {
    localStorage.setItem("receitas", JSON.stringify(receitas));
  }, [receitas]);

  // Estatísticas
  const totalReceitas = receitas.length;
  const receitasPendentes = receitas.filter(
    (r) => r.status === "Pendente"
  ).length;
  const receitasDispensadas = receitas.filter(
    (r) => r.status === "Dispensado"
  ).length;

  const handleAddReceita = () => {
    setIsModalOpen(true);
  };

  const onSubmit = (data: ReceitaFormData) => {
    const novaReceita: Receita = {
      ...data,
      id: `RX${String(receitas.length + 1).padStart(3, "0")}`,
      status: "Pendente",
      dataCadastro: new Date().toISOString(),
    };

    setReceitas([...receitas, novaReceita]);
    setIsModalOpen(false);
    reset();
    toast.success("Receita registrada com sucesso!");
  };

  const handleViewReceita = (receita: Receita) => {
    setSelectedReceita(receita);
    setIsViewModalOpen(true);
  };

  const handleDispensarReceita = (receitaId: string) => {
    const novaLista = receitas.map((r) => {
      if (r.id === receitaId) {
        return {
          ...r,
          status: "Dispensado",
          dataDispensacao: new Date().toISOString(),
        };
      }
      return r;
    });
    setReceitas(novaLista);
    toast.success(`Medicamento dispensado para receita ${receitaId}`);
    setIsViewModalOpen(false);
  };

  const handleExcluirReceita = (receitaId: string) => {
    const novaLista = receitas.filter((r) => r.id !== receitaId);
    setReceitas(novaLista);
    toast.success(`Receita ${receitaId} excluída com sucesso!`);
    setIsViewModalOpen(false);
  };

  const filteredReceitas = receitas.filter((rec) => {
    const matchesSearch =
      rec.pacienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.medicamento.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "Todos" || rec.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarFarmaciaFixed
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
        nome="MARIA SANTOS"
        tipo="FARMACÊUTICO"
      />

      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderFarmaciaFixed titulo="RECEITAS" onMenuClick={handleMenuClick} />
        <main className="flex-1 p-6">
          <div className="px-3 sm:px-6 py-3 sm:py-4">
            <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-sabara-blue">
                  Controle de Medicamentos
                </h1>
                <button
                  onClick={handleAddReceita}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  <span>Nova Receita</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total de Receitas</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {totalReceitas}
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>
                <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Receitas Pendentes</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {receitasPendentes}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Medicamentos Dispensados
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {receitasDispensadas}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Buscar receitas..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative w-full md:w-48">
                  <Filter
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <select
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="Todos">Todos os Status</option>
                    <option value="Pendente">Pendentes</option>
                    <option value="Dispensado">Dispensados</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Paciente
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Medicamento
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Data Receita
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Médico
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
                    {filteredReceitas.map((r) => (
                      <tr key={r.id} className="border-b hover:bg-blue-50">
                        <td className="px-4 py-3 font-mono">{r.id}</td>
                        <td className="px-4 py-3">{r.pacienteNome}</td>
                        <td className="px-4 py-3">{r.medicamento}</td>
                        <td className="px-4 py-3">
                          {new Date(r.dataReceita).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">Dr(a). {r.medicoNome}</td>
                        <td
                          className={`px-4 py-3 font-semibold ${
                            r.status === "Pendente"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {r.status}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleViewReceita(r)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Ver Mais
                            </button>
                            {r.status === "Pendente" && (
                              <button
                                onClick={() => handleDispensarReceita(r.id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                Dispensar
                              </button>
                            )}
                            <button
                              onClick={() => handleExcluirReceita(r.id)}
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
          </div>
        </main>
      </div>

      {/* Modal de Nova Receita */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-sabara-blue">
                Nova Receita
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Seção 1: Informações do Paciente */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  1. Informações do Paciente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nome do Paciente *
                    </label>
                    <input
                      {...register("pacienteNome")}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Nome completo do paciente"
                    />
                    {errors.pacienteNome && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pacienteNome.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      ID do Paciente *
                    </label>
                    <input
                      {...register("pacienteId")}
                      className="w-full p-2 border rounded-lg"
                      placeholder="ID do paciente"
                    />
                    {errors.pacienteId && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pacienteId.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Seção 2: Informações da Medicação */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  2. Informações da Medicação
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Medicamento *
                    </label>
                    <input
                      {...register("medicamento")}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Nome do medicamento"
                    />
                    {errors.medicamento && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.medicamento.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Dosagem *
                    </label>
                    <input
                      {...register("dosagem")}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Ex: 500mg"
                    />
                    {errors.dosagem && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.dosagem.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Frequência *
                    </label>
                    <input
                      {...register("frequencia")}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Ex: 8 em 8 horas"
                    />
                    {errors.frequencia && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.frequencia.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Seção 3: Informações da Prescrição */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  3. Informações da Prescrição
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Data da Receita *
                    </label>
                    <input
                      type="date"
                      {...register("dataReceita")}
                      className="w-full p-2 border rounded-lg"
                    />
                    {errors.dataReceita && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.dataReceita.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Médico *
                    </label>
                    <input
                      {...register("medicoNome")}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Nome do médico"
                    />
                    {errors.medicoNome && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.medicoNome.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      CRM *
                    </label>
                    <input
                      {...register("crm")}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Número do CRM"
                    />
                    {errors.crm && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.crm.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Observações
                  </label>
                  <textarea
                    {...register("observacoes")}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Observações adicionais"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">* Campos obrigatórios</p>
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
                    Registrar Receita
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Visualização de Receita */}
      {isViewModalOpen && selectedReceita && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-sabara-blue">
                Detalhes da Receita
              </h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Informações da Receita
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ID da Receita</p>
                    <p className="font-medium">{selectedReceita.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p
                      className={`font-medium ${
                        selectedReceita.status === "Pendente"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {selectedReceita.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Data da Receita</p>
                    <p className="font-medium">
                      {new Date(
                        selectedReceita.dataReceita
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Data de Cadastro</p>
                    <p className="font-medium">
                      {new Date(
                        selectedReceita.dataCadastro
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Informações do Paciente
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Nome do Paciente</p>
                    <p className="font-medium">
                      {selectedReceita.pacienteNome}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ID do Paciente</p>
                    <p className="font-medium">{selectedReceita.pacienteId}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Informações da Medicação
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Medicamento</p>
                    <p className="font-medium">{selectedReceita.medicamento}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Dosagem</p>
                      <p className="font-medium">{selectedReceita.dosagem}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Frequência</p>
                      <p className="font-medium">
                        {selectedReceita.frequencia}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Informações do Médico
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Médico</p>
                    <p className="font-medium">
                      Dr(a). {selectedReceita.medicoNome}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">CRM</p>
                    <p className="font-medium">{selectedReceita.crm}</p>
                  </div>
                </div>
              </div>

              {selectedReceita.observacoes && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Observações
                  </h3>
                  <p className="text-gray-700">{selectedReceita.observacoes}</p>
                </div>
              )}

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Fechar
                </button>
                {selectedReceita.status === "Pendente" && (
                  <button
                    onClick={() => handleDispensarReceita(selectedReceita.id)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Dispensar Medicamento
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceitasFarmacia;
