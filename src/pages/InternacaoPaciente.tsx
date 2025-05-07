import React, { useState, useEffect } from 'react';
import SidebarPaciente from '../components/SidebarPaciente';
import { cn, getMainContentClasses } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Hospital, Calendar, User, Clock, Bell } from 'lucide-react';
import FloatingChat from '@/components/FloatingChat';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const InternacaoPaciente: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const currentUser = {
    id: '1',
    name: 'João Silva',
    role: 'Paciente',
    avatar: '/images/avatar.png',
  };

  const internacoes = [
    {
      id: 1,
      medico: 'Dr. Carlos Santos',
      dataEntrada: '20/04/2025',
      dataPrevistaSaida: '27/04/2025',
      quarto: '303',
      motivo: 'Cirurgia de apendicite',
      status: 'Em andamento',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <SidebarPaciente isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <div
          className={cn(
            'flex justify-between items-center',
            'sticky top-0 z-30 bg-white border-b border-gray-100 py-3 px-2 sm:px-6 mb-8'
          )}
        >
          <h1 className={cn('font-bold', isMobile ? 'text-xl' : 'text-2xl')}>INTERNAÇÃO</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative" aria-label="Notificações" tabIndex={0}>
              <Bell size={isMobile ? 18 : 20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-gray-200">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=JoaoSilva" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">JOÃO SILVA</p>
                <p className="text-xs sm:text-sm text-blue-600">PACIENTE</p>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {internacoes.map((internacao) => (
              <Card key={internacao.id} className="p-6">
                <div className="flex flex-col space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Hospital className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Internação - Quarto {internacao.quarto}</h3>
                        <p className="text-sm text-gray-500">{internacao.motivo}</p>
                      </div>
                    </div>
                    <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full w-fit">
                      {internacao.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Médico Responsável</p>
                        <p className="font-medium">{internacao.medico}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Data de Entrada</p>
                        <p className="font-medium">{internacao.dataEntrada}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Previsão de Saída</p>
                        <p className="font-medium">{internacao.dataPrevistaSaida}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
      <FloatingChat currentUser={currentUser} />
    </div>
  );
};

export default InternacaoPaciente;
