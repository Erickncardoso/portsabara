import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, Calendar, Mic } from "lucide-react";
import SidebarMedico from "@/components/SidebarMedico";
import HeaderMedico from "@/components/HeaderMedico";
import VoiceRecognition from "@/components/VoiceRecognition";
import ExamDetail from "@/components/ExamDetail";
import { cn, getMainContentClasses } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import FloatingChat from "@/components/FloatingChat";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ExamesMedico() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [isExamDetailOpen, setIsExamDetailOpen] = useState(false);

  const [exames, setExames] = useState([
    {
      id: 1,
      paciente: "Ana Silva",
      idade: "8",
      tipo: "Hemograma Completo",
      data: "2025-01-27",
      status: "Agendado",
      urgencia: "Normal",
      observacoes:
        "Paciente com histórico de anemia. Verificar níveis de ferro.",
    },
    {
      id: 2,
      paciente: "Carlos Santos",
      idade: "10",
      tipo: "Raio-X Tórax",
      data: "2025-01-28",
      status: "Concluído",
      urgencia: "Alta",
      observacoes: "Suspeita de pneumonia. Paciente com febre há 3 dias.",
    },
    {
      id: 3,
      paciente: "Beatriz Costa",
      idade: "6",
      tipo: "Ultrassom Abdominal",
      data: "2025-01-29",
      status: "Em andamento",
      urgencia: "Média",
      observacoes:
        "Dores abdominais recorrentes. Investigar possível apendicite.",
    },
  ]);

  const currentUser = {
    id: "2",
    name: "Dr. João Silva",
    role: "Médico",
    avatar: "/images/avatar-doctor.png",
  };

  const handleMenuClick = () => {
    if (isMobile) {
      setIsSheetOpen(true);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleNovoExame = () => {
    console.log("handleNovoExame called, setting modal to true");
    setIsVoiceModalOpen(true);
  };

  const handleExamCreated = (examData: any) => {
    console.log("Exam created:", examData);
    const newExam = {
      id: exames.length + 1,
      ...examData,
    };

    setExames((prev) => [newExam, ...prev]);

    toast({
      title: "✅ Exame Criado com Sucesso",
      description: `Exame de ${examData.tipo} agendado para ${examData.paciente}`,
    });
  };

  const handleExamUpdated = (updatedExam: any) => {
    setExames((prev) =>
      prev.map((exam) => (exam.id === updatedExam.id ? updatedExam : exam))
    );
    setIsExamDetailOpen(false);
    setSelectedExam(null);
  };

  const handleViewDetails = (exam: any) => {
    setSelectedExam(exam);
    setIsExamDetailOpen(true);
  };

  const handleTextTranscribed = (text: string) => {
    console.log("Texto transcrito:", text);
  };

  const handleVoiceModalClose = () => {
    console.log("Closing voice modal");
    setIsVoiceModalOpen(false);
  };

  const handleNotificacoesClick = () => {
    toast({
      title: "Notificações",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handlePerfilClick = () => {
    navigate("/perfil-medico");
  };

  const filteredExames = exames.filter(
    (exame) =>
      exame.paciente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exame.tipo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Debug: Log do estado do modal
  console.log("ExamesMedico render - isVoiceModalOpen:", isVoiceModalOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarMedico
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderMedico
          titulo="EXAMES"
          nome={currentUser.name}
          tipo={currentUser.role}
          notificacoes={2}
          onNotificacoesClick={handleNotificacoesClick}
          onPerfilClick={handlePerfilClick}
          onMenuClick={handleMenuClick}
        />

        <div className="p-3 sm:p-8">
          <header className="mb-6 bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  Exames
                </h1>
                <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {exames.length} exames
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Botão de teste para o modal de voz */}
                <button
                  onClick={handleNovoExame}
                  className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Mic className="w-4 h-4" />
                  Novo por Voz
                </button>
                <div className="relative flex-1 sm:flex-none sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Buscar exames..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full"
                  />
                </div>
              </div>
            </div>
          </header>

          <div
            className={cn(
              "grid gap-4 transition-all duration-300",
              "grid-cols-1 sm:grid-cols-2",
              isSidebarOpen
                ? "lg:grid-cols-3 xl:grid-cols-4"
                : "lg:grid-cols-4 xl:grid-cols-5"
            )}
          >
            <Card
              onClick={handleNovoExame}
              className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-blue-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 transition-all cursor-pointer group p-4 min-h-[280px]"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-blue-600 mb-1">Novo Exame</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Adicionar novo exame
                </p>
                <div className="flex items-center justify-center gap-1 text-xs text-blue-500">
                  <Mic className="w-3 h-3" />
                  <span>Com reconhecimento de voz</span>
                </div>
              </div>
            </Card>

            {filteredExames.map((exame) => (
              <Card
                key={exame.id}
                className="bg-white hover:shadow-lg transition-all p-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-lg shrink-0">
                    {exame.paciente.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 mb-1 truncate">
                      {exame.paciente}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {exame.idade} anos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 truncate">
                      {exame.tipo}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Data do exame</span>
                    <span className="font-medium">{exame.data}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Status</span>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        exame.status === "Concluído"
                          ? "bg-green-100 text-green-700"
                          : exame.status === "Em andamento"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      )}
                    >
                      {exame.status}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleViewDetails(exame)}
                  className="w-full flex items-center justify-center gap-2 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Ver Detalhes</span>
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Reconhecimento de Voz para Novo Exame */}
      <VoiceRecognition
        isOpen={isVoiceModalOpen}
        onClose={handleVoiceModalClose}
        onTextTranscribed={handleTextTranscribed}
        onExamCreated={handleExamCreated}
      />

      {/* Modal de Detalhes do Exame */}
      {selectedExam && (
        <ExamDetail
          exam={selectedExam}
          isOpen={isExamDetailOpen}
          onClose={() => {
            setIsExamDetailOpen(false);
            setSelectedExam(null);
          }}
          onSave={handleExamUpdated}
        />
      )}

      <FloatingChat currentUser={currentUser} />
    </div>
  );
}
