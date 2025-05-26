import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPaciente from '../components/SidebarPaciente';
import HeaderPaciente from '../components/HeaderPaciente';
import FloatingChat from '@/components/FloatingChat';
import { ptBR } from "date-fns/locale";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn, getMainContentClasses } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const ConsultasPaciente: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
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

  const proximas_consultas = [
    {
      id: 1,
      medico: "Dra. Maria Santos",
      especialidade: "Cardiologista",
      data: "28/04/2025",
      horario: "14:30",
      status: "Agendada"
    },
    {
      id: 2,
      medico: "Dr. Carlos Silva",
      especialidade: "Ortopedista",
      data: "30/04/2025",
      horario: "10:00",
      status: "Agendada"
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
          titulo="CONSULTAS"
          nome={currentUser.name}
          tipo={currentUser.role}
          notificacoes={2}
          onNotificacoesClick={handleNotificacoesClick}
          onPerfilClick={handlePerfilClick}
          onMenuClick={handleMenuClick}
        />

        <FloatingChat currentUser={currentUser} />

        <main className="flex-1 pt-8 px-4 pb-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 w-full bg-white shadow-sm">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-semibold">Calendário</CardTitle>
                <CardDescription>Selecione uma data para agendar</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pt-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ptBR}
                  className={cn(
                    "rounded-md w-full",
                    "mx-auto"
                  )}
                  classNames={{
                    months: "flex flex-col space-y-4",
                    month: "space-y-2 w-full",
                    caption: "flex justify-center pt-1 relative items-center px-8 text-sm",
                    caption_label: "text-sm font-medium",
                    nav: "space-x-1 flex items-center",
                    table: "w-full border-collapse",
                    head_row: "flex w-full",
                    head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] text-center",
                    row: "flex w-full mt-1",
                    cell: cn(
                      "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-9 h-9",
                    ),
                    day: cn(
                      "h-9 w-9 p-0 font-normal text-sm rounded-md aria-selected:opacity-100 hover:bg-gray-100"
                    ),
                    day_selected: "bg-blue-500 text-white hover:bg-blue-500 hover:text-white",
                    day_today: "font-bold",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_hidden: "invisible",
                  }}
                />
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white shadow-sm">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg font-semibold">Próximas Consultas</CardTitle>
                      <CardDescription>Consultas agendadas para os próximos dias</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/agendar-consulta')}>
                      Agendar Nova
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 pt-2">
                    {proximas_consultas.map((consulta) => (
                      <div key={consulta.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="space-y-1">
                            <h3 className="font-medium">{consulta.medico}</h3>
                            <p className="text-sm text-gray-500">{consulta.especialidade}</p>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <span>{consulta.data}</span>
                              <span>•</span>
                              <span>{consulta.horario}</span>
                            </div>
                          </div>
                          <div className="flex flex-col md:items-end gap-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-2">
                              {consulta.status}
                            </Badge>
                            <Button variant="outline" size="sm" onClick={() => navigate(`/consulta/${consulta.id}`)}>
                              Ver detalhes
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConsultasPaciente;
