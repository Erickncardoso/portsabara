import React, { useState, useEffect } from "react";
import SidebarFarmaciaFixed from "../components/SidebarFarmaciaFixed";
import HeaderFarmaciaFixed from "../components/HeaderFarmaciaFixed";
import {
  Search,
  Plus,
  Filter,
  AlertTriangle,
  Package,
  Pill,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIsMobile } from "@/hooks/use-mobile";
import { getMainContentClasses } from "@/lib/utils";

// Schema de validação do formulário
const medicamentoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  categoria: z.string().min(1, "Selecione uma categoria"),
  estoque: z.number().min(0, "Estoque não pode ser negativo"),
  estoqueMinimo: z.number().min(0, "Estoque mínimo não pode ser negativo"),
  validade: z.string().min(7, "Data de validade inválida"),
  fornecedor: z.string().min(3, "Fornecedor deve ter no mínimo 3 caracteres"),
  lote: z.string().min(3, "Lote deve ter no mínimo 3 caracteres"),
  preco: z.number().min(0, "Preço não pode ser negativo"),
});

type MedicamentoFormData = z.infer<typeof medicamentoSchema>;

const categorias = [
  "Antibiótico",
  "Analgésico",
  "Anti-inflamatório",
  "Antialérgico",
  "Outros",
];

const MedicamentosFarmacia: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicamentos, setMedicamentos] = useState<Array<any>>([]);
  const [currentUser] = useState({
    id: "farmacia-1",
    name: "Dr. Maria Santos",
    role: "Farmacêutico(a)",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MedicamentoFormData>({
    resolver: zodResolver(medicamentoSchema),
  });

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  // Carregar medicamentos do localStorage ao montar o componente
  useEffect(() => {
    const storedMedicamentos = localStorage.getItem("medicamentos");
    if (storedMedicamentos) {
      setMedicamentos(JSON.parse(storedMedicamentos));
    }
  }, []);

  // Salvar medicamentos no localStorage sempre que houver alterações
  useEffect(() => {
    localStorage.setItem("medicamentos", JSON.stringify(medicamentos));
  }, [medicamentos]);

  // Estatísticas
  const totalMedicamentos = medicamentos.length;
  const medicamentosBaixoEstoque = medicamentos.filter(
    (m) => m.estoque < m.estoqueMinimo
  ).length;
  const medicamentosEmEstoque = medicamentos.filter(
    (m) => m.estoque > 0
  ).length;

  const handleAddMedicamento = () => {
    setIsModalOpen(true);
  };

  const onSubmit = (data: MedicamentoFormData) => {
    const novoMedicamento = {
      ...data,
      status:
        data.estoque === 0
          ? "Esgotado"
          : data.estoque < data.estoqueMinimo
          ? "Baixo estoque"
          : "Disponível",
    };

    setMedicamentos([...medicamentos, novoMedicamento]);
    setIsModalOpen(false);
    reset();
    toast.success("Medicamento adicionado com sucesso!");
  };

  const handleAction = (action: string, medicamento: string) => {
    if (action === "excluir") {
      const novaLista = medicamentos.filter((m) => m.nome !== medicamento);
      setMedicamentos(novaLista);
      toast.success(`Medicamento ${medicamento} excluído com sucesso!`);
    } else {
      toast.info(`Ação "${action}" para ${medicamento} em desenvolvimento`);
    }
  };

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

  const filteredMedicamentos = medicamentos.filter((med) => {
    const matchesSearch =
      med.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.fornecedor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria =
      selectedCategoria === "Todos" || med.categoria === selectedCategoria;
    return matchesSearch && matchesCategoria;
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
        <HeaderFarmaciaFixed
          titulo="MEDICAMENTOS"
          onMenuClick={handleMenuClick}
        />
        <main className="flex-1 p-6">
          <div className="px-3 sm:px-6 py-3 sm:py-4">
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total de Medicamentos</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalMedicamentos}
                  </p>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
              <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Baixo Estoque</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {medicamentosBaixoEstoque}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Em Estoque</p>
                  <p className="text-2xl font-bold text-green-600">
                    {medicamentosEmEstoque}
                  </p>
                </div>
                <Pill className="h-8 w-8 text-green-500" />
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
                      placeholder="Buscar medicamentos..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {/* Filtro de Categoria */}
                  <div className="relative w-full md:w-48">
                    <Filter
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <select
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                      value={selectedCategoria}
                      onChange={(e) => setSelectedCategoria(e.target.value)}
                    >
                      <option value="Todos">Todos</option>
                      {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Botão Adicionar */}
                <button
                  onClick={handleAddMedicamento}
                  className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  <span>Adicionar Medicamento</span>
                </button>
              </div>
            </div>

            {/* Tabela de Medicamentos */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Nome
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Categoria
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Estoque
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Validade
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Fornecedor
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Lote
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">
                        Preço
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-blue-700">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMedicamentos.map((m, idx) => (
                      <tr key={idx} className="border-b hover:bg-blue-50">
                        <td className="px-4 py-3">{m.nome}</td>
                        <td className="px-4 py-3">{m.categoria}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span>{m.estoque}</span>
                            {m.estoque < m.estoqueMinimo && m.estoque > 0 && (
                              <ArrowDown
                                className="text-yellow-500"
                                size={16}
                              />
                            )}
                            {m.estoque === 0 && (
                              <AlertTriangle
                                className="text-red-500"
                                size={16}
                              />
                            )}
                            {m.estoque > m.estoqueMinimo && (
                              <ArrowUp className="text-green-500" size={16} />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">{m.validade}</td>
                        <td
                          className={`px-4 py-3 font-semibold ${
                            m.status === "Esgotado"
                              ? "text-red-600"
                              : m.status === "Baixo estoque"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {m.status}
                        </td>
                        <td className="px-4 py-3">{m.fornecedor}</td>
                        <td className="px-4 py-3 font-mono text-xs">
                          {m.lote}
                        </td>
                        <td className="px-4 py-3">R$ {m.preco.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleAction("editar", m.nome)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleAction("excluir", m.nome)}
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

            {/* Modal de Adicionar Medicamento */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl p-6 w-full max-w-md">
                  <h2 className="text-xl font-bold mb-4">
                    Adicionar Medicamento
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Nome
                      </label>
                      <input
                        {...register("nome")}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Nome do medicamento"
                      />
                      {errors.nome && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.nome.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Categoria
                      </label>
                      <select
                        {...register("categoria")}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.categoria && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.categoria.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Estoque
                        </label>
                        <input
                          {...register("estoque", { valueAsNumber: true })}
                          type="number"
                          className="w-full p-2 border rounded-lg"
                          placeholder="Quantidade"
                        />
                        {errors.estoque && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.estoque.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Estoque Mínimo
                        </label>
                        <input
                          {...register("estoqueMinimo", {
                            valueAsNumber: true,
                          })}
                          type="number"
                          className="w-full p-2 border rounded-lg"
                          placeholder="Quantidade mínima"
                        />
                        {errors.estoqueMinimo && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.estoqueMinimo.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Validade
                      </label>
                      <input
                        {...register("validade")}
                        className="w-full p-2 border rounded-lg"
                        placeholder="MM/AAAA"
                      />
                      {errors.validade && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.validade.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Fornecedor
                      </label>
                      <input
                        {...register("fornecedor")}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Nome do fornecedor"
                      />
                      {errors.fornecedor && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.fornecedor.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Lote
                      </label>
                      <input
                        {...register("lote")}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Número do lote"
                      />
                      {errors.lote && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lote.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Preço
                      </label>
                      <input
                        {...register("preco", { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        className="w-full p-2 border rounded-lg"
                        placeholder="0.00"
                      />
                      {errors.preco && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.preco.message}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4 justify-end mt-6">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Salvar
                      </button>
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

export default MedicamentosFarmacia;
