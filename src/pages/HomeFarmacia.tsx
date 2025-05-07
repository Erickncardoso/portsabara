import React, { useEffect, useState } from 'react';
import SidebarFarmacia from '../components/SidebarFarmacia';
import HeaderFarmacia from '../components/HeaderFarmacia';
import TabelaValidacaoMedicamentos from '../components/TabelaValidacaoMedicamentos';
import PainelMedicamentos from '../components/PainelMedicamentos';
import TabelaPacientesInternados from '../components/TabelaPacientesInternados';
import CardReceita from '../components/CardReceita';
import { useIsMobile } from '../hooks/use-mobile';
import FloatingChat from '../components/FloatingChat';
import { cn, getMainContentClasses } from '../lib/utils';

const HomeFarmacia: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  // Efeito para inicializar localStorage se necessário
  useEffect(() => {
    // Inicializa dados de exemplo para medicamentos se não existirem
    if (!localStorage.getItem('medicamentosValidacao')) {
      const medicamentosIniciais = [
        {
          id: '1',
          paciente: "Shyam Khanna",
          doenca: "Heart Disease",
          data: "27/12",
          aprovada: null
        },
        {
          id: '2',
          paciente: "Jean Lee Un",
          doenca: "Heart Disease",
          data: "27/12",
          aprovada: null
        },
        {
          id: '3',
          paciente: "Clara Brook",
          doenca: "Heart Disease",
          data: "27/12",
          aprovada: null
        }
      ];
      localStorage.setItem('medicamentosValidacao', JSON.stringify(medicamentosIniciais));
    }

    // Inicializa dados de exemplo para pacientes internados se não existirem
    if (!localStorage.getItem('pacientesFarmacia')) {
      const pacientesIniciais = [
        {
          id: '4',
          paciente: "Shyam Khanna",
          doenca: "Heart Disease",
          data: "27/12",
          alta: null
        },
        {
          id: '5',
          paciente: "Jean Lee Un",
          doenca: "Heart Disease",
          data: "27/12",
          alta: null
        },
        {
          id: '6',
          paciente: "Clara Brook",
          doenca: "Heart Disease",
          data: "27/12",
          alta: null
        }
      ];
      localStorage.setItem('pacientesFarmacia', JSON.stringify(pacientesIniciais));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarFarmacia 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderFarmacia 
          titulo="INÍCIO"
          className={cn(
            "sticky top-0 z-30",
            isMobile && "pt-16"
          )}
        />
        <main className="flex-1 p-3 sm:p-6">
          <div className="px-0 sm:px-6 py-3 sm:py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div>
                <TabelaValidacaoMedicamentos />
              </div>
              <div>
                <PainelMedicamentos />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <TabelaPacientesInternados />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-white rounded-lg border shadow-md hover:shadow-lg transition-all p-3 sm:p-4">
                  <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Ver Receitas</h2>
                  <CardReceita 
                    nome="John Doe"
                    idade="34"
                    sexo="Masculino"
                    grupoSanguineo="B +ve"
                    contato="9999 999 999"
                    medico="Williams"
                    dataConsulta="12 Fev 2022"
                  />
                  <div className="mt-3 sm:mt-4 text-center">
                    <button className="text-blue-600 text-xs sm:text-sm">
                      Ver mais...
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <FloatingChat
        currentUser={{
          id: "farmacia-1",
          name: "Farmacêutico(a)",
          role: "Farmácia"
        }}
      />
    </div>
  );
};

export default HomeFarmacia;
