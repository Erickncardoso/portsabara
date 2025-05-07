import React, { useEffect, useState } from 'react';
import SidebarEnfermaria from '../components/SidebarEnfermaria';
import HeaderEnfermaria from '../components/HeaderEnfermaria';
import TabelaPacientesInternadosSimples from '../components/TabelaPacientesInternadosSimples';
import GraficoOcupacao from '../components/GraficoOcupacao';
import TabelaValidacaoMedicamentosSimples from '../components/TabelaValidacaoMedicamentosSimples';
import { useIsMobile } from '../hooks/use-mobile';
import { cn, getMainContentClasses } from '@/lib/utils';
import FloatingChat from '../components/FloatingChat';

const HomeEnfermaria: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    if (!localStorage.getItem('pacientesEnfermaria')) {
      const pacientesIniciais = [
        {
          id: '1',
          paciente: "João Silva",
          detalhes: "4 ciclistas",
          avatar: "JoaoSilva"
        },
        {
          id: '2',
          paciente: "Maria Santos",
          detalhes: "2 médicos",
          avatar: "MariaSantos"
        },
        {
          id: '3',
          paciente: "Pedro Oliveira",
          detalhes: "Urgência",
          avatar: "PedroOliveira"
        }
      ];
      localStorage.setItem('pacientesEnfermaria', JSON.stringify(pacientesIniciais));
    }

    if (!localStorage.getItem('medicamentosValidacaoEnfermaria')) {
      const medicamentosIniciais = [
        {
          id: '1',
          paciente: "João Silva",
          doenca: "Doença Cardíaca",
          data: "27/12",
          aprovada: true,
          avatar: "JoaoSilva"
        },
        {
          id: '2',
          paciente: "Maria Santos",
          doenca: "Pneumonia",
          data: "28/12",
          aprovada: true,
          avatar: "MariaSantos"
        },
        {
          id: '3',
          paciente: "Pedro Oliveira",
          doenca: "Diabetes",
          data: "29/12",
          aprovada: true, 
          avatar: "PedroOliveira"
        }
      ];
      localStorage.setItem('medicamentosValidacaoEnfermaria', JSON.stringify(medicamentosIniciais));
    }
  }, []);

  // Atualiza o estado da sidebar quando o tamanho da tela muda
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarEnfermaria 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderEnfermaria
          titulo="HOME"
          className={cn(
            "sticky top-0 z-30",
            isMobile && "pt-16"
          )}
        />
        
        <main className="flex-1 p-3 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div>
              <TabelaPacientesInternadosSimples />
            </div>
            
            <div>
              <GraficoOcupacao />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <TabelaValidacaoMedicamentosSimples />
            </div>
            
            <div className="hidden lg:block">
              {/* Conteúdo futuro aqui */}
            </div>
          </div>
        </main>
      </div>

      <FloatingChat
        currentUser={{
          id: "nurse-1",
          name: "Ana Silva",
          role: "Enfermeiro"
        }}
      />
    </div>
  );
};

export default HomeEnfermaria;
