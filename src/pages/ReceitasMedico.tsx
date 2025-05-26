import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMedico from '@/components/SidebarMedico';
import HeaderMedico from '@/components/HeaderMedico';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Printer, FileText, Search, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import FloatingChat from '@/components/FloatingChat';

export default function ReceitasMedico() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const currentUser = {
    id: '2',
    name: 'Dr. João Silva',
    role: 'Médico',
    avatar: '/images/avatar-doctor.png'
  };

  const prescricoes = [
    {
      id: "PRES10331",
      nome: "Maria Silva",
      idade: "34",
      sexo: "Feminino",
      medicamento: "Amoxicilina 500mg",
      dosagem: "8/8 horas",
      duracao: "7 dias",
      data: "27 Abr 2025"
    },
    {
      id: "PRES10332",
      nome: "João Santos",
      idade: "45",
      sexo: "Masculino",
      medicamento: "Dipirona 500mg",
      dosagem: "6/6 horas",
      duracao: "5 dias",
      data: "27 Abr 2025"
    },
    {
      id: "PRES10333",
      nome: "Ana Oliveira",
      idade: "28",
      sexo: "Feminino",
      medicamento: "Ibuprofeno 600mg",
      dosagem: "12/12 horas",
      duracao: "3 dias",
      data: "27 Abr 2025"
    },
    {
      id: "PRES10334",
      nome: "Pedro Costa",
      idade: "52",
      sexo: "Masculino",
      medicamento: "Omeprazol 20mg",
      dosagem: "1x ao dia",
      duracao: "30 dias",
      data: "27 Abr 2025"
    }
  ];

  const filteredPrescricoes = prescricoes.filter(prescricao =>
    prescricao.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescricao.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescricao.medicamento.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNovaReceita = () => {
    toast({
      title: "Nova Receita",
      description: "Funcionalidade de nova receita será implementada em breve.",
    });
  };

  const handleNotificacoesClick = () => {
    toast({
      title: "Notificações",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handlePerfilClick = () => {
    navigate('/perfil-medico');
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
      <SidebarMedico 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderMedico 
          titulo="RECEITAS"
          nome={currentUser.name}
          tipo={currentUser.role}
          notificacoes={2}
          onNotificacoesClick={handleNotificacoesClick}
          onPerfilClick={handlePerfilClick}
          onMenuClick={handleMenuClick}
        />

        <div className="p-3 sm:p-8">
          <header className="mb-6 bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Receitas</h1>
                <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {filteredPrescricoes.length} receitas
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Buscar receitas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full"
                  />
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Printer className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </header>
          <div className={cn(
            "grid gap-4 transition-all duration-300",
            "grid-cols-1 sm:grid-cols-2",
            isSidebarOpen 
              ? "lg:grid-cols-3 xl:grid-cols-4" 
              : "lg:grid-cols-4 xl:grid-cols-5",
            "auto-rows-fr"
          )}>
            <Card 
              onClick={handleNovaReceita}
              className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-blue-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 transition-all cursor-pointer group p-4 min-h-[280px]"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-blue-600 mb-1">Nova Receita</h3>
                <p className="text-sm text-gray-500">Adicionar nova prescrição</p>
              </div>
            </Card>

            {filteredPrescricoes.map((prescricao, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-all p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-lg shrink-0">
                    {prescricao.nome.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 mb-1 truncate">{prescricao.nome}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 truncate">
                        {prescricao.idade} anos • {prescricao.sexo}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 truncate">{prescricao.medicamento}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      {prescricao.dosagem} • {prescricao.duracao}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Data da prescrição</span>
                    <span className="font-medium">{prescricao.data}</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Visualizar Receita</span>
                </button>
              </Card>
            ))}
          </div>
        </div>
        <FloatingChat currentUser={currentUser} />
      </div>
    </div>
  );
}
