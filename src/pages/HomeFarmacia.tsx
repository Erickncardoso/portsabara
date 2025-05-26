import React, { useState, useEffect } from 'react';
import SidebarFarmacia from '../components/SidebarFarmacia';
import HeaderFarmacia from '../components/HeaderFarmacia';
import { 
  Pill, 
  Users, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Package,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { getMainContentClasses } from '@/lib/utils';

interface Medicamento {
  id: string;
  nome: string;
  estoque: number;
  estoqueMinimo: number;
  validade: string;
}

interface Receita {
  id: string;
  paciente: string;
  medicamento: string;
  status: 'Pendente' | 'Dispensado';
  data: string;
}

const HomeFarmacia: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [receitas, setReceitas] = useState<Receita[]>([]);

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

  // Carregar dados do localStorage
  useEffect(() => {
    // Medicamentos
    const storedMedicamentos = localStorage.getItem('medicamentos');
    if (storedMedicamentos) {
      setMedicamentos(JSON.parse(storedMedicamentos));
    } else {
      const medicamentosIniciais: Medicamento[] = [
        {
          id: '1',
          nome: 'Paracetamol 500mg',
          estoque: 150,
          estoqueMinimo: 50,
          validade: '2025-06-15'
        },
        {
          id: '2',
          nome: 'Ibuprofeno 600mg',
          estoque: 25,
          estoqueMinimo: 30,
          validade: '2024-12-30'
        },
        {
          id: '3',
          nome: 'Amoxicilina 500mg',
          estoque: 80,
          estoqueMinimo: 40,
          validade: '2025-03-20'
        },
        {
          id: '4',
          nome: 'Dipirona 500mg',
          estoque: 5,
          estoqueMinimo: 20,
          validade: '2025-01-10'
        }
      ];
      setMedicamentos(medicamentosIniciais);
      localStorage.setItem('medicamentos', JSON.stringify(medicamentosIniciais));
    }

    // Receitas
    const storedReceitas = localStorage.getItem('receitas');
    if (storedReceitas) {
      setReceitas(JSON.parse(storedReceitas));
    } else {
      const receitasIniciais: Receita[] = [
        {
          id: 'RX001',
          paciente: 'Maria Silva',
          medicamento: 'Paracetamol 500mg',
          status: 'Pendente',
          data: '2024-12-27'
        },
        {
          id: 'RX002',
          paciente: 'João Santos',
          medicamento: 'Ibuprofeno 600mg',
          status: 'Pendente',
          data: '2024-12-27'
        },
        {
          id: 'RX003',
          paciente: 'Ana Costa',
          medicamento: 'Amoxicilina 500mg',
          status: 'Dispensado',
          data: '2024-12-26'
        }
      ];
      setReceitas(receitasIniciais);
      localStorage.setItem('receitas', JSON.stringify(receitasIniciais));
    }
  }, []);

  // Estatísticas
  const totalMedicamentos = medicamentos.length;
  const medicamentosBaixoEstoque = medicamentos.filter(m => m.estoque <= m.estoqueMinimo).length;
  const medicamentosVencendo = medicamentos.filter(m => {
    const hoje = new Date();
    const validade = new Date(m.validade);
    const diasParaVencer = Math.ceil((validade.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
    return diasParaVencer <= 30 && diasParaVencer > 0;
  }).length;

  const totalReceitas = receitas.length;
  const receitasPendentes = receitas.filter(r => r.status === 'Pendente').length;
  const receitasDispensadas = receitas.filter(r => r.status === 'Dispensado').length;

  const estatisticas = [
    {
      titulo: 'Total de Medicamentos',
      valor: totalMedicamentos,
      icon: Pill,
      cor: 'blue',
      descricao: 'Medicamentos cadastrados'
    },
    {
      titulo: 'Estoque Baixo',
      valor: medicamentosBaixoEstoque,
      icon: AlertTriangle,
      cor: 'red',
      descricao: 'Medicamentos com estoque baixo'
    },
    {
      titulo: 'Receitas Pendentes',
      valor: receitasPendentes,
      icon: Clock,
      cor: 'yellow',
      descricao: 'Aguardando dispensação'
    },
    {
      titulo: 'Receitas Dispensadas',
      valor: receitasDispensadas,
      icon: CheckCircle,
      cor: 'green',
      descricao: 'Dispensadas hoje'
    }
  ];

  const getCorClasse = (cor: string) => {
    switch (cor) {
      case 'blue': return 'text-blue-600 bg-blue-100';
      case 'red': return 'text-red-600 bg-red-100';
      case 'yellow': return 'text-yellow-600 bg-yellow-100';
      case 'green': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
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
          titulo="HOME"
          nome="MARIA SANTOS"
          tipo="FARMACÊUTICO"
          onMenuClick={handleMenuClick}
        />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Boas-vindas */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Bem-vindo à Farmácia!</h1>
              <p className="text-blue-100">
                Gerencie medicamentos, receitas e atenda pacientes com eficiência.
              </p>
              <div className="mt-4 text-sm text-blue-100">
                <p>📅 Hoje: {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {estatisticas.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.titulo}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.valor}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.descricao}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${getCorClasse(stat.cor)}`}>
                        <Icon size={24} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Alertas e Ações Rápidas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Medicamentos com Estoque Baixo */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Estoque Baixo</h3>
                  <AlertTriangle className="text-red-500" size={20} />
                </div>
                <div className="space-y-3">
                  {medicamentos
                    .filter(m => m.estoque <= m.estoqueMinimo)
                    .slice(0, 5)
                    .map((medicamento) => (
                      <div key={medicamento.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{medicamento.nome}</p>
                          <p className="text-sm text-gray-600">
                            Estoque: {medicamento.estoque} | Mínimo: {medicamento.estoqueMinimo}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                          Crítico
                        </span>
                      </div>
                    ))}
                  {medicamentos.filter(m => m.estoque <= m.estoqueMinimo).length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      ✅ Todos os medicamentos estão com estoque adequado
                    </p>
                  )}
                </div>
              </div>

              {/* Receitas Pendentes */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Receitas Pendentes</h3>
                  <Clock className="text-yellow-500" size={20} />
                </div>
                <div className="space-y-3">
                  {receitas
                    .filter(r => r.status === 'Pendente')
                    .slice(0, 5)
                    .map((receita) => (
                      <div key={receita.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{receita.id}</p>
                          <p className="text-sm text-gray-600">
                            {receita.paciente} - {receita.medicamento}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          Pendente
                        </span>
                      </div>
                    ))}
                  {receitas.filter(r => r.status === 'Pendente').length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      ✅ Todas as receitas foram dispensadas
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => window.location.href = '/receitas-farmacia'}
                  className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <FileText className="text-blue-600" size={20} />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Nova Receita</p>
                    <p className="text-sm text-gray-600">Registrar receita médica</p>
                  </div>
                </button>
                
                <button
                  onClick={() => window.location.href = '/medicamentos-farmacia'}
                  className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <Package className="text-green-600" size={20} />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Gerenciar Estoque</p>
                    <p className="text-sm text-gray-600">Controlar medicamentos</p>
                  </div>
                </button>
                
                <button
                  onClick={() => window.location.href = '/pacientes-farmacia'}
                  className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Users className="text-purple-600" size={20} />
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Consultar Pacientes</p>
                    <p className="text-sm text-gray-600">Histórico de dispensações</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeFarmacia;
