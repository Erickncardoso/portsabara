import React, { useState } from 'react';
import { SidebarLimpeza } from '@/components/SidebarLimpeza';
import { HeaderLimpeza } from '@/components/HeaderLimpeza';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FloatingChat from '@/components/FloatingChat';

export default function SolicitacoesLimpeza() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentUser = {
    id: '5',
    name: 'Maria Silva',
    role: 'Limpeza',
    avatar: '/images/avatar-limpeza.png'
  };

  const solicitacoes = [
    {
      id: 1,
      quarto: '101',
      tipo: 'Limpeza de Emergência',
      prioridade: 'Alta',
      descricao: 'Necessário limpeza urgente após procedimento'
    },
    {
      id: 2,
      quarto: '203',
      tipo: 'Limpeza Regular',
      prioridade: 'Normal',
      descricao: 'Limpeza programada'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarLimpeza isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <FloatingChat currentUser={currentUser} />
      <main className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        <HeaderLimpeza />
        <div className="p-8">
          <div className="grid gap-6">
            {solicitacoes.map((solicitacao) => (
              <Card key={solicitacao.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Quarto {solicitacao.quarto}</h3>
                      <p className="text-gray-600 mb-1">{solicitacao.tipo}</p>
                      <p className="text-gray-600 mb-4">{solicitacao.descricao}</p>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        solicitacao.prioridade === 'Alta' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {solicitacao.prioridade}
                      </span>
                    </div>
                    <Button>Atender</Button>
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
