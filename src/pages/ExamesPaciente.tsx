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
import { Search, FileText, Download } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ExamesPaciente: React.FC = () => {
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

  const exames = [
    {
      id: 1,
      tipo: "Hemograma Completo",
      medico: "Dra. Maria Santos",
      especialidade: "Cardiologista",
      data: "28/04/2025",
      dataResultado: "29/04/2025",
      status: "Concluído",
      resultado: "https://exemplo.com/resultado1.pdf"
    },
    {
      id: 2,
      tipo: "Raio-X Tórax",
      medico: "Dr. Carlos Silva",
      especialidade: "Pneumologista",
      data: "30/04/2025",
      status: "Agendado"
    },
    {
      id: 3,
      tipo: "Eletrocardiograma",
      medico: "Dra. Maria Santos",
      especialidade: "Cardiologista",
      data: "25/04/2025",
      dataResultado: "26/04/2025",
      status: "Concluído",
      resultado: "https://exemplo.com/resultado2.pdf"
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

  const handleDownload = (exame: any) => {
    toast({
      title: "Download iniciado",
      description: `Baixando resultado do exame: ${exame.tipo}`,
    });
  };

  const examesFiltrados = exames.filter(exame => {
    const matchesSearch = 
      exame.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exame.medico.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filtroStatus === 'todos' || 
      exame.status.toLowerCase() === filtroStatus.toLowerCase();

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
          titulo="EXAMES"
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
                    <CardTitle className="text-lg font-semibold">Meus Exames</CardTitle>
                    <CardDescription>Visualize e acompanhe seus exames</CardDescription>
                  </div>
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Buscar exames..."
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
                        <SelectItem value="agendado">Agendados</SelectItem>
                        <SelectItem value="concluído">Concluídos</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => navigate('/agendar-exame')}>
                      Agendar Exame
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-4">
                  {examesFiltrados.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Nenhum exame encontrado
                    </div>
                  ) : (
                    examesFiltrados.map((exame) => (
                      <div key={exame.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{exame.tipo}</h3>
                              <Badge 
                                variant="outline" 
                                className={cn(
                                  exame.status === "Concluído" 
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-blue-50 text-blue-700 border-blue-200"
                                )}
                              >
                                {exame.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">{exame.medico} - {exame.especialidade}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>Data: {exame.data}</span>
                              {exame.dataResultado && (
                                <>
                                  <span>•</span>
                                  <span>Resultado: {exame.dataResultado}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col md:items-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => navigate(`/exame/${exame.id}`)}>
                              Ver detalhes
                            </Button>
                            {exame.resultado && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="gap-2"
                                onClick={() => handleDownload(exame)}
                              >
                                <Download className="h-4 w-4" />
                                Baixar resultado
                              </Button>
                            )}
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

export default ExamesPaciente;
