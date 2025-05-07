import React, { useState, useEffect } from 'react';
import { SidebarLimpeza } from '@/components/SidebarLimpeza';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import FloatingChat from '@/components/FloatingChat';

export default function SolicitacoesLimpeza() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

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
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <SidebarLimpeza isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <div className={cn(
          "flex justify-between items-center",
          "sticky top-0 z-30 bg-white border-b border-gray-100 py-3 px-2 sm:px-6 mb-8"
        )}>
          <h1 className={cn(
            "font-bold",
            isMobile ? "text-xl" : "text-2xl"
          )}>SOLICITAÇÕES</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell size={isMobile ? 18 : 20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-gray-200">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=MariaSilva" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">MARIA SILVA</p>
                <p className="text-xs sm:text-sm text-red-600">LIMPEZA</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-8">
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
      </div>
      <FloatingChat currentUser={currentUser} />
    </div>
  );
}
