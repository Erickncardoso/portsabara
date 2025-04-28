import React, { useState } from 'react';
import SidebarPaciente from '../components/SidebarPaciente';
import HeaderPaciente from '../components/HeaderPaciente';
import LembreteConsulta from '../components/LembreteConsulta';
import CardAcao from '../components/CardAcao';
import TabelaHistoricoExames from '../components/TabelaHistoricoExames';
import Banner from '../components/Banner';
import { Calendar, User, BookOpen, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';
import FloatingChat from '@/components/FloatingChat';

const HomePaciente: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentUser = {
    id: '1',
    name: 'João Silva',
    role: 'Paciente',
    avatar: '/images/avatar.png'
  };

  // Dados simulados para os exames
  const examesHistorico = [
    {
      medico: "Shyam Khanna",
      tipoExame: "Heart Disease",
      data: "27/12",
      resultado: true
    },
    {
      medico: "Jean Lee Un",
      tipoExame: "Heart Disease",
      data: "27/12",
      resultado: true
    },
    {
      medico: "Clara Brook",
      tipoExame: "Heart Disease",
      data: "27/12",
      resultado: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarPaciente 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      {/* Conteúdo principal */}
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden",
        "transition-all duration-300 ease-in-out",
        isSidebarOpen ? "ml-64" : "ml-16"
      )}>
        {/* Cabeçalho */}
        <HeaderPaciente />
        
        {/* Chat flutuante */}
        <FloatingChat currentUser={currentUser} />
        
        {/* Conteúdo da página */}
        <main className="flex-1 p-6">
          <div className="px-6 py-6">
            {/* Banner com espaçamento lateral */}
            <Banner 
              titulo="Bem-vindo ao Hospital Sabará" 
              descricao="Confira seus agendamentos e resultados de exames. Aqui você encontra todas as informações sobre sua saúde."
              botoes={[
                {
                  texto: "Agendar Consulta",
                  link: "#",
                  variante: "primario"
                },
                {
                  texto: "Ver Exames",
                  link: "#",
                  variante: "secundario"
                }
              ]}
            />
            
            {/* Lembrete de consulta com design melhorado */}
            <div className="mb-6 mt-6">
              <LembreteConsulta 
                especialidade="Dermatologista"
                medico="Nome do Médico(a)"
                data="15/12/2024"
                hora="11:00"
              />
            </div>
            
            {/* Conteúdo principal - reorganizado para 2 colunas com cards à esquerda */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Grid de cards de ação - agora com largura ajustada */}
              <div className="md:w-96 flex flex-col">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="flex flex-col w-full">
                    <CardAcao 
                      titulo="Agendar Exame" 
                      icon={<Calendar className="text-red-500" />}
                      link="#"
                    />
                  </div>
                  
                  <div className="flex flex-col w-full">
                    <CardAcao 
                      titulo="Agendar Consulta" 
                      icon={<User className="text-blue-500" />}
                      link="#"
                    />
                  </div>
                  
                  <div className="flex flex-col w-full">
                    <CardAcao 
                      titulo="Dicas de Saúde" 
                      icon={<BookOpen className="text-green-500" />}
                      link="#"
                    />
                  </div>
                  
                  <div className="flex flex-col w-full">
                    <CardAcao 
                      titulo="Ver Resultado de Exame" 
                      icon={<Monitor className="text-purple-500" />}
                      link="#"
                    />
                  </div>
                </div>
              </div>
              
              {/* Tabela de histórico de exames - agora no lado direito */}
              <div className="md:flex-1">
                <TabelaHistoricoExames exames={examesHistorico} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePaciente;
