import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPaciente from '../components/SidebarPaciente';
import HeaderPaciente from '../components/HeaderPaciente';
import FloatingChat from '@/components/FloatingChat';
import { cn, getMainContentClasses } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Clock, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InternacaoPaciente: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  
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

  const currentUser = {
    id: '1',
    name: 'João Silva',
    role: 'Paciente',
    avatar: '/images/avatar.png'
  };

  const internacoes = [
    {
      id: 1,
      motivo: "Cirurgia de Apendicite",
      medico: "Dr. Carlos Silva",
      especialidade: "Cirurgião Geral",
      dataEntrada: "25/04/2025",
      dataPrevista: "28/04/2025",
      quarto: "204",
      ala: "Cirúrgica",
      status: "Em andamento"
    },
    {
      id: 2,
      motivo: "Pneumonia",
      medico: "Dra. Maria Santos",
      especialidade: "Pneumologista",
      dataEntrada: "20/03/2025",
      dataSaida: "25/03/2025",
      quarto: "305",
      ala: "Clínica",
      status: "Concluída"
    },
    {
      id: 3,
      motivo: "Fratura no Fêmur",
      medico: "Dr. Pedro Oliveira",
      especialidade: "Ortopedista",
      dataEntrada: "15/02/2025",
      dataSaida: "20/02/2025",
      quarto: "102",
      ala: "Ortopédica",
      status: "Concluída"
    }
  ];

  const handleNotificacoesClick = () => {
    toast({
      title: "Notificações",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handlePerfilClick = () => {
    navigate('/perfil-paciente');
  };

  const internacoesFiltradas = internacoes.filter(internacao => {
    const matchesSearch = 
      internacao.motivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internacao.medico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internacao.quarto.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filtroStatus === 'todos' || 
      internacao.status.toLowerCase() === filtroStatus.toLowerCase().replace('-', ' ');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarPaciente 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderPaciente 
          titulo="INTERNAÇÃO"
          nome={currentUser.name}
          tipo={currentUser.role}
          notificacoes={2}
          onNotificacoesClick={handleNotificacoesClick}
          onPerfilClick={handlePerfilClick}
          onMenuClick={handleMenuClick}
        />

        <FloatingChat currentUser={currentUser} />

        <main className="flex-1 pt-8 px-4 pb-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-lg font-semibold">Histórico de Internações</CardTitle>
                    <CardDescription>Acompanhe suas internações e histórico hospitalar</CardDescription>
                  </div>
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Buscar internações..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                      <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="em-andamento">Em andamento</SelectItem>
                        <SelectItem value="concluída">Concluídas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-4">
                  {internacoesFiltradas.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Nenhuma internação encontrada
                    </div>
                  ) : (
                    internacoesFiltradas.map((internacao) => (
                      <div key={internacao.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{internacao.motivo}</h3>
                              <Badge 
                                variant="outline" 
                                className={cn(
                                  internacao.status === "Em andamento"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-green-50 text-green-700 border-green-200"
                                )}
                              >
                                {internacao.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">{internacao.medico} - {internacao.especialidade}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Entrada: {internacao.dataEntrada}</span>
                              </div>
                              {internacao.dataSaida ? (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>Saída: {internacao.dataSaida}</span>
                                </div>
                              ) : internacao.dataPrevista && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>Previsão de saída: {internacao.dataPrevista}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>Quarto {internacao.quarto} - Ala {internacao.ala}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col md:items-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => navigate(`/internacao/${internacao.id}`)}>
                              Ver detalhes
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InternacaoPaciente;
