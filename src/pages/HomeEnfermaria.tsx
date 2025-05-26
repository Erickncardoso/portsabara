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
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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

    if (!localStorage.getItem('medicamentosEnfermaria')) {
      const medicamentosIniciais = [
        {
          id: '1',
          medicamento: "Dipirona 500mg",
          paciente: "João Silva",
          horario: "08:00",
          status: "pendente"
        },
        {
          id: '2',
          medicamento: "Paracetamol 750mg",
          paciente: "Maria Santos",
          horario: "12:00",
          status: "administrado"
        },
        {
          id: '3',
          medicamento: "Ibuprofeno 600mg",
          paciente: "Pedro Oliveira",
          horario: "16:00",
          status: "pendente"
        }
      ];
      localStorage.setItem('medicamentosEnfermaria', JSON.stringify(medicamentosIniciais));
    }

    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleMenuClick = () => {
    if (isMobile) {
      setIsSheetOpen(true);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarEnfermaria 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderEnfermaria
          titulo="HOME"
          onMenuClick={handleMenuClick}
          className={cn(
            "sticky top-0 z-30"
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
