
import React, { useState } from 'react';
import SidebarManutencao from '../components/SidebarManutencao';
import { HeaderManutencao } from '../components/HeaderManutencao';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import FloatingChat from '../components/FloatingChat';
import { CartaoProtocolosManutencao } from '../components/CartaoProtocolosManutencao';

const ProtocolosManutencao = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      />
      
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isSidebarOpen ? "ml-64" : "ml-16"
      )}>
        <HeaderManutencao nome="ROBERT" tipo="MANUTENÇÃO" />
        
        <main className="p-6">
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
          id: "manutencao-1",
          name: "Robert",
          role: "Manutenção"
        }}
      />
    </div>
  );
};

export default ProtocolosManutencao;
