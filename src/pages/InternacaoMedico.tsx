import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Plus, Bed } from 'lucide-react';
import SidebarMedico from '@/components/SidebarMedico';
import HeaderMedico from '@/components/HeaderMedico';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/use-toast';
import FloatingChat from '@/components/FloatingChat';

export default function InternacaoMedico() {
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

  const internacoes = [
    {
      id: 1,
      paciente: "João Silva",
      idade: "7",
      doenca: "Pneumonia",
      dataInternacao: "2025-01-20",
      medicoResponsavel: "Dr. Carlos Silva",
      status: "estavel"
    },
    {
      id: 2,
      paciente: "Maria Santos",
      idade: "12",
      doenca: "Apendicite",
      dataInternacao: "2025-01-22",
      medicoResponsavel: "Dra. Ana Costa",
      status: "critico"
    },
    {
      id: 3,
      paciente: "Pedro Oliveira",
      idade: "5",
      doenca: "Asma Aguda",
      dataInternacao: "2025-01-25",
      medicoResponsavel: "Dr. João Costa",
      status: "estavel"
    }
  ];

  const handleMenuClick = () => {
    if (isMobile) {
      setIsSheetOpen(true);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleNovaInternacao = () => {
    toast({
      title: "Nova Internação",
      description: "Funcionalidade de nova internação será implementada em breve.",
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
          titulo="INTERNAÇÕES"
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
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Internações</h1>
                <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {internacoes.length} pacientes
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Buscar internações..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full"
                  />
                </div>
              </div>
            </div>
          </header>
          <div className={cn(
            "grid gap-4 transition-all duration-300",
            "grid-cols-1 sm:grid-cols-2",
            isSidebarOpen 
              ? "lg:grid-cols-3 xl:grid-cols-4" 
              : "lg:grid-cols-4 xl:grid-cols-5"
          )}>
            <Card 
              onClick={handleNovaInternacao}
              className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-blue-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 transition-all cursor-pointer group p-4 min-h-[280px]"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-blue-600 mb-1">Nova Internação</h3>
                <p className="text-sm text-gray-500">Adicionar nova internação</p>
              </div>
            </Card>

            {internacoes.map((internacao) => (
              <Card key={internacao.id} className="bg-white hover:shadow-lg transition-all p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-lg shrink-0">
                    {internacao.paciente.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 mb-1 truncate">{internacao.paciente}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {internacao.idade} anos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 truncate">{internacao.doenca}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-blue-600">
                        Medico Responsavel: {internacao.medicoResponsavel}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Data de internação</span>
                    <span className="font-medium">{internacao.dataInternacao}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      internacao.status === 'estavel' ? "bg-green-100 text-green-700" :
                      "bg-blue-100 text-blue-700"
                    )}>
                      {internacao.status}
                    </span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors">
                  <Bed className="w-4 h-4" />
                  <span className="text-sm font-medium">Ver Detalhes</span>
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <FloatingChat currentUser={currentUser} />
    </div>
  );
}
