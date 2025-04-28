import React from 'react';
import { SidebarLimpeza } from '@/components/SidebarLimpeza';
import { HeaderLimpeza } from '@/components/HeaderLimpeza';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Check, AlertTriangle, Clock } from 'lucide-react';
import FloatingChat from '@/components/FloatingChat';

export default function QuartosLimpeza() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentUser = {
    id: '5',
    name: 'Maria Silva',
    role: 'Limpeza',
    avatar: '/images/avatar-limpeza.png'
  };

  const quartos = [
    { numero: '101', status: 'Limpo', prioridade: 'Baixa' },
    { numero: '102', status: 'Aguardando', prioridade: 'Alta' },
    { numero: '103', status: 'Em Limpeza', prioridade: 'Média' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Limpo':
        return <Check className="text-green-500" />;
      case 'Aguardando':
        return <AlertTriangle className="text-yellow-500" />;
      case 'Em Limpeza':
        return <Clock className="text-blue-500" />;
      default:
        return null;
    }
  };

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
            {quartos.map((quarto) => (
              <Card key={quarto.numero} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Quarto {quarto.numero}</h3>
                    {getStatusIcon(quarto.status)}
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600">Status: {quarto.status}</p>
                    <p className="text-gray-600">Prioridade: {quarto.prioridade}</p>
                  </div>
                  <Button className="w-full mt-4">Iniciar Limpeza</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
