import React, { useState, useEffect } from 'react';
import SidebarManutencao from '../components/SidebarManutencao';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import FloatingChat from '../components/FloatingChat';
import { CartaoProtocolosManutencao } from '../components/CartaoProtocolosManutencao';

const ProtocolosManutencao = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const protocolos = [
    {
      titulo: "Manutenção Preventiva",
      descricao: "Procedimentos para manutenção preventiva de equipamentos hospitalares",
      categoria: "Preventiva"
    },
    {
      titulo: "Manutenção Corretiva",
      descricao: "Protocolos para correção de falhas em equipamentos",
      categoria: "Corretiva"
    },
    {
      titulo: "Calibração",
      descricao: "Diretrizes para calibração de instrumentos de medição",
      categoria: "Calibração"
    },
    {
      titulo: "Segurança",
      descricao: "Normas de segurança para manutenção de equipamentos",
      categoria: "Segurança"
    }
  ];

  const currentUser = {
    id: 'manutencao-1',
    name: 'Robert Silva',
    role: 'Manutenção',
    avatar: '/images/avatar-manutencao.png'
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <SidebarManutencao isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <div className={cn(
          'flex justify-between items-center',
          'sticky top-0 z-30 bg-white border-b border-gray-100 py-3 px-2 sm:px-6 mb-8'
        )}>
          <h1 className={cn(
            'font-bold',
            isMobile ? 'text-xl' : 'text-2xl'
          )}>PROTOCOLOS</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell size={isMobile ? 18 : 20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-gray-200">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=RobertSilva" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">ROBERT SILVA</p>
                <p className="text-xs sm:text-sm text-red-600">MANUTENÇÃO</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protocolos.map((protocolo, index) => (
              <CartaoProtocolosManutencao
                key={index}
                titulo={protocolo.titulo}
                descricao={protocolo.descricao}
                categoria={protocolo.categoria}
              />
            ))}
          </div>
        </div>
      </div>
      <FloatingChat currentUser={currentUser} />
    </div>
  );
};

export default ProtocolosManutencao;
