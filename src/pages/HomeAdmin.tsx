import React, { useEffect, useState } from "react";
import SidebarAdmin from "@/components/SidebarAdmin";
import HeaderAdmin from "@/components/HeaderAdmin";
import TabelaRegistros from "@/components/TabelaRegistros";
import GraficoPacientes from "@/components/GraficoPacientes";
import NotificacaoItem from "@/components/NotificacaoItem";

interface Registro {
  id: string;
  nome: string;
  doenca: string;
  data: string;
  aprovado: boolean;
  avatar: string;
}

const HomeAdmin: React.FC = () => {
  const [medicosCadastrados, setMedicosCadastrados] = useState<Registro[]>([]);
  const [pacientesCadastrados, setPacientesCadastrados] = useState<Registro[]>(
    []
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Inicializar dados de exemplo
  useEffect(() => {
    const dadosExemploMedicos = [
      {
        id: "1",
        nome: "Shyam Khanna",
        doenca: "Heart Disease",
        data: "27/12",
        aprovado: true,
        avatar: "ShyamKhanna",
      },
      {
        id: "2",
        nome: "Jean Lee Un",
        doenca: "Heart Disease",
        data: "27/12",
        aprovado: false,
        avatar: "JeanLeeUn",
      },
      {
        id: "3",
        nome: "Clara Brook",
        doenca: "Heart Disease",
        data: "27/12",
        aprovado: true,
        avatar: "ClaraBrook",
      },
    ];

    const dadosExemploPacientes = [
      {
        id: "1",
        nome: "Shyam Khanna",
        doenca: "Heart Disease",
        data: "27/12",
        aprovado: true,
        avatar: "ShyamKhanna",
      },
      {
        id: "2",
        nome: "Jean Lee Un",
        doenca: "Heart Disease",
        data: "27/12",
        aprovado: false,
        avatar: "JeanLeeUn",
      },
      {
        id: "3",
        nome: "Clara Brook",
        doenca: "Heart Disease",
        data: "27/12",
        aprovado: true,
        avatar: "ClaraBrook",
      },
    ];

    setMedicosCadastrados(dadosExemploMedicos);
    setPacientesCadastrados(dadosExemploPacientes);
  }, []);

  const handleMenuClick = () => {
    setIsSheetOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin onMenuClick={handleMenuClick} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2">
                <div className="space-y-4 sm:space-y-6">
                  <TabelaRegistros
                    titulo="MÉDICOS REGISTRADOS"
                    registros={medicosCadastrados}
                    tipo="medicos"
                  />

                  <TabelaRegistros
                    titulo="PACIENTES REGISTRADOS"
                    registros={pacientesCadastrados}
                    tipo="pacientes"
                  />
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <GraficoPacientes />

                <div className="mt-4 sm:mt-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Notificações Recentes
                  </h2>

                  <NotificacaoItem
                    id={1}
                    titulo="Sistema de Backup Concluído"
                    mensagem="Backup automático dos dados do hospital foi realizado com sucesso"
                    tempo="Hoje 11:35"
                    tipo="alerta"
                  />

                  <NotificacaoItem
                    id={3}
                    titulo="Novo Médico Cadastrado"
                    mensagem="Dr. Roberto Silva foi adicionado ao sistema - Pediatria"
                    tempo="Hoje 09:30"
                    tipo="info"
                  />

                  <NotificacaoItem
                    id={4}
                    titulo="Atualização de Sistema"
                    mensagem="Sistema de prescrições foi atualizado para versão 2.1"
                    tempo="Ontem 14:45"
                    tipo="info"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeAdmin;
