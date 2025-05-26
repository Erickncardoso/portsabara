import React, { useState, useEffect } from 'react';
import { SidebarLimpeza } from '@/components/SidebarLimpeza';
import { HeaderLimpeza } from '@/components/HeaderLimpeza';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FloatingChat from '@/components/FloatingChat';

export default function SolicitacoesLimpeza() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentUser] = useState({
    id: 'limpeza-1',
    name: 'Maria Silva',
    role: 'Limpeza',
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
    <div className="min-h-screen bg-gray-100">
      <SidebarLimpeza 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderLimpeza 
          titulo="SOLICITAÇÕES"
          nome="MARIA SILVA"
          tipo="LIMPEZA"
          onMenuClick={handleMenuClick}
          className={cn(
            "sticky top-0 z-30"
          )}
        />
        
        <main className="flex-1 p-3 sm:p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solicitacoes.map((solicitacao) => (
              <Card key={solicitacao.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">Quarto {solicitacao.quarto}</h3>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      solicitacao.prioridade === 'Alta' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {solicitacao.prioridade}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600">Tipo: {solicitacao.tipo}</p>
                    <p className="text-gray-600">{solicitacao.descricao}</p>
                  </div>
                  <Button className="w-full">Aceitar Solicitação</Button>
                </CardContent>
              </Card>
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
}
