import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import OfflineIndicator from "@/components/OfflineIndicator";
import PWADebugPanel from "@/components/PWADebugPanel";
import NotFound from "./pages/NotFound";
import Cadastro from "./pages/Cadastro";
import TipoCadastro from "./pages/TipoCadastro";
import LoginPaciente from "./pages/LoginPaciente";
import CadastroPaciente from "./pages/CadastroPaciente";
import LoginMedico from "./pages/LoginMedico";
import CadastroMedico from "./pages/CadastroMedico";
import LoginEnfermeiro from "./pages/LoginEnfermeiro";
import CadastroEnfermeiro from "./pages/CadastroEnfermeiro";
import LoginManutencao from "./pages/LoginManutencao";
import CadastroManutencao from "./pages/CadastroManutencao";
import LoginLimpeza from "./pages/LoginLimpeza";
import CadastroLimpeza from "./pages/CadastroLimpeza";
import EsqueciSenha from "./pages/EsqueciSenha";
import HomePaciente from "./pages/HomePaciente";
import HomeMedico from "./pages/HomeMedico";
import HomeFarmacia from "./pages/HomeFarmacia";
import HomeEnfermaria from "./pages/HomeEnfermaria";
import HomeLimpeza from "./pages/HomeLimpeza";
import HomeManutencao from "./pages/HomeManutencao";
import HomeAdmin from "./pages/HomeAdmin";
import ExamesPaciente from "./pages/ExamesPaciente";
import ExamesMedico from "./pages/ExamesMedico";
import ConsultasPaciente from "./pages/ConsultasPaciente";
import ConsultasMedico from "./pages/ConsultasMedico";
import ReceitasMedico from "./pages/ReceitasMedico";
import InternacaoMedico from "./pages/InternacaoMedico";
import ReceitasPaciente from "./pages/ReceitasPaciente";
import InternacaoPaciente from "./pages/InternacaoPaciente";
import DicasSaudePaciente from "./pages/DicasSaudePaciente";
import PerfilPaciente from "./pages/PerfilPaciente";
import PerfilMedico from "./pages/PerfilMedico";
import LeitosEnfermaria from "./pages/LeitosEnfermaria";
import PrescricoesEnfermaria from "./pages/PrescricoesEnfermaria";
import ProcedimentosEnfermaria from "./pages/ProcedimentosEnfermaria";
import AgendaEnfermaria from "./pages/AgendaEnfermaria";
import PerfilEnfermeiro from "./pages/PerfilEnfermeiro";
import TarefasManutencao from "./pages/TarefasManutencao";
import HistoricoManutencao from "./pages/HistoricoManutencao";
import InventarioManutencao from "./pages/InventarioManutencao";
import ProtocolosManutencao from "./pages/ProtocolosManutencao";
import PerfilManutencao from "./pages/PerfilManutencao";
import QuartosLimpeza from "./pages/QuartosLimpeza";
import HistoricoLimpeza from "./pages/HistoricoLimpeza";
import SolicitacoesLimpeza from "./pages/SolicitacoesLimpeza";
import ProtocolosLimpeza from "./pages/ProtocolosLimpeza";
import PerfilLimpeza from "./pages/PerfilLimpeza";
import AdminDashboard from "./pages/AdminDashboard";
import LoginAdmin from "./pages/LoginAdmin";
import LoginFarmacia from "./pages/LoginFarmacia";
import CadastroFarmacia from "./pages/CadastroFarmacia";
import PacientesFarmacia from "./pages/PacientesFarmacia";
import MedicamentosFarmacia from "./pages/MedicamentosFarmacia";
import InternacaoFarmacia from "./pages/InternacaoFarmacia";
import PerfilFarmacia from "./pages/PerfilFarmacia";
import ReceitasFarmacia from "./pages/ReceitasFarmacia";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <OfflineIndicator />
        <PWAInstallPrompt />
        <PWADebugPanel />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TipoCadastro />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login-paciente" element={<LoginPaciente />} />
            <Route path="/cadastro-paciente" element={<CadastroPaciente />} />
            <Route path="/login-medico" element={<LoginMedico />} />
            <Route path="/cadastro-medico" element={<CadastroMedico />} />
            <Route path="/login-enfermeiro" element={<LoginEnfermeiro />} />
            <Route path="/cadastro-enfermeiro" element={<CadastroEnfermeiro />} />
            <Route path="/login-manutencao" element={<LoginManutencao />} />
            <Route path="/cadastro-manutencao" element={<CadastroManutencao />} />
            <Route path="/login-limpeza" element={<LoginLimpeza />} />
            <Route path="/cadastro-limpeza" element={<CadastroLimpeza />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            <Route path="/home-paciente" element={<HomePaciente />} />
            <Route path="/home-medico" element={<HomeMedico />} />
            <Route path="/home-farmacia" element={<HomeFarmacia />} />
            <Route path="/home-enfermaria" element={<HomeEnfermaria />} />
            <Route path="/home-limpeza" element={<HomeLimpeza />} />
            <Route path="/home-manutencao" element={<HomeManutencao />} />
            <Route path="/home-admin" element={<HomeAdmin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
            <Route path="/exames-paciente" element={<ExamesPaciente />} />
            <Route path="/exames-medico" element={<ExamesMedico />} />
            <Route path="/consultas-paciente" element={<ConsultasPaciente />} />
            <Route path="/consultas-medico" element={<ConsultasMedico />} />
            <Route path="/receitas-medico" element={<ReceitasMedico />} />
            <Route path="/internacao-medico" element={<InternacaoMedico />} />
            <Route path="/receitas-paciente" element={<ReceitasPaciente />} />
            <Route path="/internacao-paciente" element={<InternacaoPaciente />} />
            <Route path="/dicas-saude-paciente" element={<DicasSaudePaciente />} />
            <Route path="/perfil-paciente" element={<PerfilPaciente />} />
            <Route path="/perfil-medico" element={<PerfilMedico />} />
            <Route path="/leitos-enfermaria" element={<LeitosEnfermaria />} />
            <Route path="/prescricoes-enfermaria" element={<PrescricoesEnfermaria />} />
            <Route path="/procedimentos-enfermaria" element={<ProcedimentosEnfermaria />} />
            <Route path="/agenda-enfermaria" element={<AgendaEnfermaria />} />
            <Route path="/perfil-enfermeiro" element={<PerfilEnfermeiro />} />
            <Route path="/tarefas-manutencao" element={<TarefasManutencao />} />
            <Route path="/historico-manutencao" element={<HistoricoManutencao />} />
            <Route path="/inventario-manutencao" element={<InventarioManutencao />} />
            <Route path="/protocolos-manutencao" element={<ProtocolosManutencao />} />
            <Route path="/perfil-manutencao" element={<PerfilManutencao />} />
            <Route path="/quartos-limpeza" element={<QuartosLimpeza />} />
            <Route path="/historico-limpeza" element={<HistoricoLimpeza />} />
            <Route path="/solicitacoes-limpeza" element={<SolicitacoesLimpeza />} />
            <Route path="/protocolos-limpeza" element={<ProtocolosLimpeza />} />
            <Route path="/perfil-limpeza" element={<PerfilLimpeza />} />
            <Route path="/login-farmacia" element={<LoginFarmacia />} />
            <Route path="/cadastro-farmacia" element={<CadastroFarmacia />} />
            <Route path="/receitas-farmacia" element={<ReceitasFarmacia />} />
            <Route path="/pacientes-farmacia" element={<PacientesFarmacia />} />
            <Route path="/medicamentos-farmacia" element={<MedicamentosFarmacia />} />
            <Route path="/internacao-farmacia" element={<InternacaoFarmacia />} />
            <Route path="/perfil-farmacia" element={<PerfilFarmacia />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
