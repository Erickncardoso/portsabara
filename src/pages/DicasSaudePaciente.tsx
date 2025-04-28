import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Calendar, FileText, Info } from 'lucide-react';
import SidebarPaciente from '../components/SidebarPaciente';
import HeaderPaciente from '../components/HeaderPaciente';
import FloatingChat from '@/components/FloatingChat';

const DicasSaudePaciente: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const currentUser = {
    id: '1',
    name: 'João Silva',
    role: 'Paciente',
    avatar: '/images/avatar.png'
  };

  const dicas = [
    {
      titulo: "Alimentação Saudável",
      descricao: "Mantenha uma dieta equilibrada com frutas, vegetais e proteínas magras.",
      icon: Heart,
      categoria: "Nutrição"
    },
    {
      titulo: "Exercícios Regulares",
      descricao: "Pratique pelo menos 30 minutos de atividade física por dia.",
      icon: Calendar,
      categoria: "Atividade Física"
    },
    {
      titulo: "Sono de Qualidade",
      descricao: "Durma entre 7-9 horas por noite para uma boa recuperação.",
      icon: FileText,
      categoria: "Bem-estar"
    },
    {
      titulo: "Hidratação",
      descricao: "Beba pelo menos 2 litros de água por dia.",
      icon: Info,
      categoria: "Saúde Geral"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarPaciente 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <HeaderPaciente nome={currentUser.name} tipo={currentUser.role} marginLeft={isSidebarOpen ? '16rem' : '4rem'} titulo="Dicas de Saúde" />

      <FloatingChat currentUser={currentUser} />

      <main 
        className="transition-all duration-300 ease-in-out pt-20 px-4"
        style={{ 
          marginLeft: isSidebarOpen ? '16rem' : '4rem',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dicas.map((dica, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <dica.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                      {dica.categoria}
                    </span>
                    <h3 className="mt-2 font-semibold text-lg">{dica.titulo}</h3>
                    <p className="mt-2 text-gray-600 text-sm">
                      {dica.descricao}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DicasSaudePaciente;
