import React, { useState, useEffect } from 'react';
import SidebarFarmacia from '../components/SidebarFarmacia';
import HeaderFarmacia from '../components/HeaderFarmacia';
import { Search, Plus, Filter, BedDouble, Clock, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsMobile } from '@/hooks/use-mobile';
import { getMainContentClasses } from '@/lib/utils';

// Schema de validação do formulário
const internacaoSchema = z.object({
  pacienteNome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  pacienteId: z.string().min(3, 'ID do paciente inválido'),
  quarto: z.string().min(1, 'Quarto é obrigatório'),
  leito: z.string().min(1, 'Leito é obrigatório'),
  dataInternacao: z.string().min(1, 'Data de internação é obrigatória'),
  medicoResponsavel: z.string().min(3, 'Nome do médico deve ter no mínimo 3 caracteres'),
  crm: z.string().min(4, 'CRM inválido'),
  diagnostico: z.string().min(3, 'Diagnóstico é obrigatório'),
  prescricao: z.string().min(3, 'Prescrição é obrigatória'),
  observacoes: z.string().optional(),
});

type InternacaoFormData = z.infer<typeof internacaoSchema>;

const quartos = ['101', '102', '103', '201', '202', '203', '301', '302', '303'];
const leitos = ['A', 'B', 'C', 'D'];

const InternacaoFarmacia: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuarto, setSelectedQuarto] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [internacoes, setInternacoes] = useState<Array<any>>([]);
  const [currentUser] = useState({
    id: 'farmacia-1',
    name: 'Dr. Maria Santos',
    role: 'Farmacêutico(a)',
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<InternacaoFormData>({
    resolver: zodResolver(internacaoSchema)
  });

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  // Carregar internações do localStorage ao montar o componente
  useEffect(() => {
    const storedInternacoes = localStorage.getItem('internacoes');
    if (storedInternacoes) {
      setInternacoes(JSON.parse(storedInternacoes));
    }
  }, []);

  // Salvar internações no localStorage sempre que houver alterações
  useEffect(() => {
    localStorage.setItem('internacoes', JSON.stringify(internacoes));
  }, [internacoes]);

  // Estatísticas
  const totalInternacoes = internacoes.length;
  const internacoesAtivas = internacoes.filter(i => i.status === 'Ativo').length;
  const internacoesLongas = internacoes.filter(i => {
    const dias = Math.floor((new Date().getTime() - new Date(i.dataInternacao).getTime()) / (1000 * 60 * 60 * 24));
    return dias > 7 && i.status === 'Ativo';
  }).length;

  const handleAddInternacao = () => {
    setIsModalOpen(true);
  };

  const onSubmit = (data: InternacaoFormData) => {
    const novaInternacao = {
      ...data,
      id: `INT${String(internacoes.length + 1).padStart(3, '0')}`,
      status: 'Ativo',
      dataCadastro: new Date().toISOString(),
    };

    setInternacoes([...internacoes, novaInternacao]);
    setIsModalOpen(false);
    reset();
    toast.success('Internação registrada com sucesso!');
  };

  const handleAction = (action: string, internacaoId: string) => {
    if (action === 'alta') {
      const novaLista = internacoes.map(i => {
        if (i.id === internacaoId) {
          return { ...i, status: 'Alta', dataAlta: new Date().toISOString() };
        }
        return i;
      });
      setInternacoes(novaLista);
      toast.success(`Alta registrada para internação ${internacaoId}`);
    } else if (action === 'excluir') {
      const novaLista = internacoes.filter(i => i.id !== internacaoId);
      setInternacoes(novaLista);
      toast.success(`Internação ${internacaoId} excluída com sucesso!`);
    } else {
      toast.info(`Ação "${action}" para ${internacaoId} em desenvolvimento`);
    }
  };

  const filteredInternacoes = internacoes.filter(int => {
    const matchesSearch = int.pacienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         int.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesQuarto = selectedQuarto === 'Todos' || int.quarto === selectedQuarto;
    return matchesSearch && matchesQuarto;
  });

  const handleNotificacoesClick = () => {
    toast.info('Funcionalidade de notificações em desenvolvimento');
  };

  const handlePerfilClick = () => {
    toast.info('Funcionalidade de perfil em desenvolvimento');
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
      />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderFarmacia 
          titulo="INTERNAÇÕES"
          nome="MARIA SANTOS"
          tipo="FARMACÊUTICO"
          onMenuClick={handleMenuClick}
        />
        <main className="flex-1 p-6">
          <div className="px-3 sm:px-6 py-3 sm:py-4">
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total de Internações</p>
                  <p className="text-2xl font-bold text-gray-800">{totalInternacoes}</p>
                </div>
                <BedDouble className="h-8 w-8 text-blue-500" />
              </div>
              <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Internações Ativas</p>
                  <p className="text-2xl font-bold text-green-600">{internacoesAtivas}</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
              <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Internações {'>'}7 dias</p>
                  <p className="text-2xl font-bold text-yellow-600">{internacoesLongas}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </div>

            {/* Barra de Ações */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-4 w-full md:w-auto">
                  {/* Campo de Busca */}
                  <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Buscar internações..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {/* Filtro de Quarto */}
                  <div className="relative w-full md:w-48">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                      value={selectedQuarto}
                      onChange={(e) => setSelectedQuarto(e.target.value)}
                    >
                      <option value="Todos">Todos os Quartos</option>
                      {quartos.map((quarto) => (
                        <option key={quarto} value={quarto}>{quarto}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Botão Adicionar */}
                <button
                  onClick={handleAddInternacao}
                  className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  <span>Nova Internação</span>
                </button>
              </div>
            </div>

            {/* Tabela de Internações */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">ID</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">Paciente</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">Quarto/Leito</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">Data Internação</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">Médico</th>
                      <th className="px-4 py-3 text-left font-semibold text-blue-700">Status</th>
                      <th className="px-4 py-3 text-center font-semibold text-blue-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInternacoes.map((i) => (
                      <tr key={i.id} className="border-b hover:bg-blue-50">
                        <td className="px-4 py-3 font-mono">{i.id}</td>
                        <td className="px-4 py-3">{i.pacienteNome}</td>
                        <td className="px-4 py-3">{i.quarto}/{i.leito}</td>
                        <td className="px-4 py-3">{new Date(i.dataInternacao).toLocaleDateString()}</td>
                        <td className="px-4 py-3">Dr(a). {i.medicoResponsavel}</td>
                        <td className={`px-4 py-3 font-semibold ${
                          i.status === 'Ativo' ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {i.status}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleAction('editar', i.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Editar
                            </button>
                            {i.status === 'Ativo' && (
                              <button
                                onClick={() => handleAction('alta', i.id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                Alta
                              </button>
                            )}
                            <button
                              onClick={() => handleAction('excluir', i.id)}
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

            {/* Modal de Nova Internação */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-xl p-6 w-full max-w-4xl my-8">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-sabara-blue">Ficha de Internação</h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Seção: Informações do Paciente */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">1. Informações do Paciente</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Nome do Paciente *</label>
                          <input
                            {...register('pacienteNome')}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="Nome completo do paciente"
                          />
                          {errors.pacienteNome && <p className="text-red-500 text-xs mt-1">{errors.pacienteNome.message}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">ID do Paciente *</label>
                          <input
                            {...register('pacienteId')}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="ID do paciente"
                          />
                          {errors.pacienteId && <p className="text-red-500 text-xs mt-1">{errors.pacienteId.message}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Seção: Informações da Internação */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">2. Informações da Internação</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Quarto *</label>
                          <select
                            {...register('quarto')}
                            className="w-full p-2 border rounded-lg bg-white"
                          >
                            <option value="">Selecione o quarto</option>
                            {quartos.map((quarto) => (
                              <option key={quarto} value={quarto}>{quarto}</option>
                            ))}
                          </select>
                          {errors.quarto && <p className="text-red-500 text-xs mt-1">{errors.quarto.message}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Leito *</label>
                          <select
                            {...register('leito')}
                            className="w-full p-2 border rounded-lg bg-white"
                          >
                            <option value="">Selecione o leito</option>
                            {leitos.map((leito) => (
                              <option key={leito} value={leito}>{leito}</option>
                            ))}
                          </select>
                          {errors.leito && <p className="text-red-500 text-xs mt-1">{errors.leito.message}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Data de Internação *</label>
                          <input
                            type="date"
                            {...register('dataInternacao')}
                            className="w-full p-2 border rounded-lg bg-white"
                          />
                          {errors.dataInternacao && <p className="text-red-500 text-xs mt-1">{errors.dataInternacao.message}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Seção: Informações Médicas */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">3. Informações Médicas</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Médico Responsável *</label>
                          <input
                            {...register('medicoResponsavel')}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="Nome do médico"
                          />
                          {errors.medicoResponsavel && <p className="text-red-500 text-xs mt-1">{errors.medicoResponsavel.message}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">CRM *</label>
                          <input
                            {...register('crm')}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="Número do CRM"
                          />
                          {errors.crm && <p className="text-red-500 text-xs mt-1">{errors.crm.message}</p>}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Diagnóstico *</label>
                          <textarea
                            {...register('diagnostico')}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="Diagnóstico detalhado"
                            rows={2}
                          />
                          {errors.diagnostico && <p className="text-red-500 text-xs mt-1">{errors.diagnostico.message}</p>}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Prescrição *</label>
                          <textarea
                            {...register('prescricao')}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="Prescrição médica"
                            rows={3}
                          />
                          {errors.prescricao && <p className="text-red-500 text-xs mt-1">{errors.prescricao.message}</p>}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Observações</label>
                          <textarea
                            {...register('observacoes')}
                            className="w-full p-2 border rounded-lg bg-white"
                            placeholder="Observações adicionais"
                            rows={2}
                          />
                        </div>
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
                          Registrar Internação
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

export default InternacaoFarmacia; 