import React, { useState, useEffect } from "react";
import SidebarPaciente from "../components/SidebarPaciente";
import HeaderPaciente from "../components/HeaderPaciente";
import LembreteConsulta from "../components/LembreteConsulta";
import CardAcao from "../components/CardAcao";
import ListaExames from "../components/ListaExames";
import Banner from "../components/Banner";
import { Calendar, User, BookOpen, Monitor } from "lucide-react";
import { cn, getMainContentClasses } from "@/lib/utils";
import FloatingChat from "@/components/FloatingChat";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const HomePaciente: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const currentUser = {
    id: "1",
    name: "João Silva",
    role: "Paciente",
    avatar: "/images/avatar.png",
  };

  // Informações do usuário para header e sidebar
  const usuarioInfo = {
    nome: "JOÃO SILVA",
    tipo: "PACIENTE",
  };

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

  // Dados simulados para os exames
  const examesHistorico = [
    {
      medico: "Dr. Carlos Silva",
      iniciais: "CS",
      tipoExame: "Hemograma Completo",
      data: "27/12",
      resultado: true,
    },
    {
      medico: "Dra. Maria Santos",
      iniciais: "MS",
      tipoExame: "Raio-X Tórax",
      data: "26/12",
      resultado: true,
    },
    {
      medico: "Dr. João Costa",
      iniciais: "JC",
      tipoExame: "Eletrocardiograma",
      data: "25/12",
      resultado: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarPaciente
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
        nome={usuarioInfo.nome}
        tipo={usuarioInfo.tipo}
      />

      {/* Conteúdo principal */}
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        {/* Cabeçalho */}
        <HeaderPaciente
          onMenuClick={handleMenuClick}
          nome={usuarioInfo.nome}
          tipo={usuarioInfo.tipo}
        />

        {/* Chat flutuante */}
        <FloatingChat currentUser={currentUser} />

        {/* Conteúdo da página */}
        <main className="flex-1 p-4 md:p-6">
          <div className="px-2 md:px-6 py-4 md:py-6">
            {/* Banner com espaçamento lateral */}
            <Banner
              titulo="BEM-VINDO AO HOSPITALL"
              descricao="Confira seus agendamentos e resultados de exames. Aqui você encontra todas as informações sobre sua saúde."
              botoes={[
                {
                  texto: "Agendar Consulta",
                  link: "/consultas-paciente",
                  variante: "primario",
                },
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

            {/* Conteúdo principal - reorganizado para responsividade */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Grid de cards de ação - responsivo */}
              <div className="w-full lg:w-96">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <CardAcao
                    titulo="AGENDAR EXAME"
                    icon={<Calendar className="text-red-500" />}
                    link="/exames-paciente"
                  />

                  <CardAcao
                    titulo="AGENDAR CONSULTA"
                    icon={<User className="text-blue-500" />}
                    link="/consultas-paciente"
                  />

                  <CardAcao
                    titulo="DICAS DE SAÚDE"
                    icon={<BookOpen className="text-green-500" />}
                    link="/dicas-saude-paciente"
                  />

                  <CardAcao
                    titulo="VER RESULTADO"
                    icon={<Monitor className="text-purple-500" />}
                    link="/exames-paciente"
                  />
                </div>
              </div>

              {/* Tabela de histórico de exames - responsiva */}
              <div className="flex-1 mt-6 lg:mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Histórico de Exames</h2>
                  <Link
                    to="/exames-paciente"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Ver mais
                  </Link>
                </div>
                <div className="bg-white rounded-lg p-4 sm:p-6">
                  <ListaExames exames={examesHistorico} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePaciente;
