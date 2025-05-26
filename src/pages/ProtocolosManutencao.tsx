import React, { useState, useEffect } from 'react';
import SidebarManutencao from '../components/SidebarManutencao';
import { HeaderManutencao } from '../components/HeaderManutencao';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import FloatingChat from '../components/FloatingChat';
import { CartaoProtocolosManutencao } from '../components/CartaoProtocolosManutencao';

const ProtocolosManutencao = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentUser] = useState({
    id: 'manutencao-1',
    name: 'Robert Silva',
    role: 'Manutenção',
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

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarManutencao 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderManutencao 
          titulo="PROTOCOLOS"
          nome="ROBERT SILVA"
          tipo="MANUTENÇÃO"
          onMenuClick={handleMenuClick}
          className={cn(
            "sticky top-0 z-30"
          )}
        />
        <main className="flex-1 p-3 sm:p-6 bg-gray-50">
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
        </main>
      </div>
      <FloatingChat
        currentUser={{
          id: currentUser.id,
          name: currentUser.name,
          role: currentUser.role
        }}
      />
    </div>
  );
};

export default ProtocolosManutencao;
