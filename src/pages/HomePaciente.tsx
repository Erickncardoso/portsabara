import React, { useState } from 'react';
import SidebarPaciente from '../components/SidebarPaciente';
import HeaderPaciente from '../components/HeaderPaciente';
import LembreteConsulta from '../components/LembreteConsulta';
import CardAcao from '../components/CardAcao';
import TabelaHistoricoExames from '../components/TabelaHistoricoExames';
import Banner from '../components/Banner';
import { Calendar, User, BookOpen, Monitor } from 'lucide-react';
import { cn, getMainContentClasses } from '@/lib/utils';
import FloatingChat from '@/components/FloatingChat';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const HomePaciente: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

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
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        {/* Cabeçalho */}
        <HeaderPaciente />
        
        {/* Chat flutuante */}
        <FloatingChat currentUser={currentUser} />
        
        {/* Conteúdo da página */}
        <main className="flex-1 p-4 md:p-6">
          <div className="px-2 md:px-6 py-4 md:py-6">
            {/* Banner com espaçamento lateral */}
            <Banner 
              titulo="Bem-vindo ao Hospital Sabará" 
              descricao="Confira seus agendamentos e resultados de exames. Aqui você encontra todas as informações sobre sua saúde."
              botoes={[
                {
                  texto: "Agendar Consulta",
                  link: "/consultas-paciente",
                  variante: "primario"
                },
                {
                  texto: "Ver Exames",
                  link: "/exames-paciente",
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
              <div className="md:w-96 flex flex-col w-full">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="flex flex-col w-full">
                    <CardAcao 
                      titulo="Agendar Exame" 
                      icon={<Calendar className="text-red-500" />}
                      link="/exames-paciente"
                    />
                  </div>
                  
                  <div className="flex flex-col w-full">
                    <CardAcao 
                      titulo="Agendar Consulta" 
                      icon={<User className="text-blue-500" />}
                      link="/consultas-paciente"
                    />
                  </div>
                  
                  <div className="flex flex-col w-full">
                    <CardAcao 
                      titulo="Dicas de Saúde" 
                      icon={<BookOpen className="text-green-500" />}
                      link="/dicas-saude"
                    />
                  </div>
                  
                  <div className="flex flex-col w-full">
                    <CardAcao 
                      titulo="Ver Resultado de Exame" 
                      icon={<Monitor className="text-purple-500" />}
                      link="/exames-paciente"
                    />
                  </div>
                </div>
              </div>
              
              {/* Tabela de histórico de exames - agora no lado direito */}
              <div className="md:flex-1 mt-6 md:mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Histórico de Exames</h2>
                  <Link to="/exames-paciente" className="text-blue-600 hover:text-blue-800">
                    Ver mais
                  </Link>
                </div>
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
