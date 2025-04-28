import React, { useState } from 'react';
import SidebarPaciente from '../components/SidebarPaciente';
import { cn } from '@/lib/utils';
import HeaderPaciente from '../components/HeaderPaciente';
import { Card } from '@/components/ui/card';
import { Hospital, Calendar, User, Clock } from 'lucide-react';
import FloatingChat from '@/components/FloatingChat';

const InternacaoPaciente: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const currentUser = {
    id: '1',
    name: 'João Silva',
    role: 'Paciente',
    avatar: '/images/avatar.png'
  };

  const internacoes = [
    {
      id: 1,
      medico: "Dr. Carlos Santos",
      dataEntrada: "20/04/2025",
      dataPrevistaSaida: "27/04/2025",
      quarto: "303",
      motivo: "Cirurgia de apendicite",
      status: "Em andamento"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarPaciente 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <HeaderPaciente nome={currentUser.name} tipo={currentUser.role} marginLeft={isSidebarOpen ? '16rem' : '4rem'} titulo="Internação" />

      <FloatingChat currentUser={currentUser} />

      <main 
        className="transition-all duration-300 ease-in-out pt-20 px-4"
        style={{ 
          marginLeft: isSidebarOpen ? '16rem' : '4rem',
        }}
      >
        <div className="max-w-7xl mx-auto">
          {internacoes.map((internacao) => (
            <Card key={internacao.id} className="p-6">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Hospital className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Internação - Quarto {internacao.quarto}</h3>
                      <p className="text-sm text-gray-500">{internacao.motivo}</p>
                    </div>
                  </div>
                  <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full w-fit">
                    {internacao.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Médico Responsável</p>
                      <p className="font-medium">{internacao.medico}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Data de Entrada</p>
                      <p className="font-medium">{internacao.dataEntrada}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Previsão de Saída</p>
                      <p className="font-medium">{internacao.dataPrevistaSaida}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InternacaoPaciente;
