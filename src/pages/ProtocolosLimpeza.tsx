import React, { useState } from 'react';
import { SidebarLimpeza } from '@/components/SidebarLimpeza';
import { HeaderLimpeza } from '@/components/HeaderLimpeza';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import FloatingChat from '@/components/FloatingChat';

export default function ProtocolosLimpeza() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentUser = {
    id: '5',
    name: 'Maria Silva',
    role: 'Limpeza',
    avatar: '/images/avatar-limpeza.png'
  };

  const protocolos = [
    {
      titulo: 'Protocolo de Limpeza Terminal',
      descricao: 'Procedimentos para limpeza completa após alta do paciente',
      categoria: 'Terminal'
    },
    {
      titulo: 'Protocolo de Limpeza Concorrente',
      descricao: 'Procedimentos para limpeza diária de quartos ocupados',
      categoria: 'Concorrente'
    },
    {
      titulo: 'Protocolo de Desinfecção',
      descricao: 'Procedimentos específicos para áreas de isolamento',
      categoria: 'Especial'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <SidebarLimpeza isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <FloatingChat currentUser={currentUser} />
      <main 
        className={"transition-all duration-300 ease-in-out"}
        style={{ 
          marginLeft: isSidebarOpen ? '16rem' : '4rem',
        }}
      >
        <HeaderLimpeza />
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protocolos.map((protocolo, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 rounded-full p-4 mb-4">
                      <FileText size={32} className="text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{protocolo.titulo}</h3>
                    <p className="text-gray-600 mb-4">{protocolo.descricao}</p>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {protocolo.categoria}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
