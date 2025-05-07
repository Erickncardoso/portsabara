import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Calendar, FileText, Info, Bell } from 'lucide-react';
import SidebarPaciente from '../components/SidebarPaciente';
import FloatingChat from '@/components/FloatingChat';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const DicasSaudePaciente: React.FC = () => {
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

  const dicas = [
    {
      titulo: 'Alimentação Saudável',
      descricao: 'Mantenha uma dieta equilibrada com frutas, vegetais e proteínas magras.',
      icon: Heart,
      categoria: 'Nutrição',
    },
    {
      titulo: 'Exercícios Regulares',
      descricao: 'Pratique pelo menos 30 minutos de atividade física por dia.',
      icon: Calendar,
      categoria: 'Atividade Física',
    },
    {
      titulo: 'Sono de Qualidade',
      descricao: 'Durma entre 7-9 horas por noite para uma boa recuperação.',
      icon: FileText,
      categoria: 'Bem-estar',
    },
    {
      titulo: 'Hidratação',
      descricao: 'Beba pelo menos 2 litros de água por dia.',
      icon: Info,
      categoria: 'Saúde Geral',
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
          <h1 className={cn('font-bold', isMobile ? 'text-xl' : 'text-2xl')}>DICAS DE SAÚDE</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dicas.map((dica, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <dica.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                        {dica.categoria}
                      </span>
                      <h3 className="mt-2 font-semibold text-lg">{dica.titulo}</h3>
                      <p className="mt-2 text-gray-600 text-sm">{dica.descricao}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      <FloatingChat currentUser={currentUser} />
    </div>
  );
};

export default DicasSaudePaciente;
