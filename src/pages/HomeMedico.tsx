import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Users, Calendar as CalendarIcon, Bell } from 'lucide-react';
import SidebarMedico from '../components/SidebarMedico';
import HeaderMedico from '../components/HeaderMedico';
import TabelaConsultas from '../components/TabelaConsultas';
import CalendarioMedico from '../components/CalendarioMedico';
import LembreteConsulta from '../components/LembreteConsulta';
import { cn, getMainContentClasses } from '@/lib/utils';
import FloatingChat from '@/components/FloatingChat';
import { useIsMobile } from '@/hooks/use-mobile';

const HomeMedico: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentUser] = useState({
    id: 'medico-1',
    name: 'Dr. João Silva',
    role: 'Médico',
    avatar: '/images/avatar.png'
  });

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

  useEffect(() => {
    if (!localStorage.getItem('consultasProximas')) {
      const proximasConsultas = [
        {
          id: '1',
          paciente: "Shyam Khanna",
          doenca: "Heart Disease",
          data: "27/12",
          aprovada: null
        },
        {
          id: '2',
          paciente: "Jean Lee Un",
          doenca: "Heart Disease",
          data: "27/12",
          aprovada: null
        },
        {
          id: '3',
          paciente: "Clara Brook",
          doenca: "Heart Disease",
          data: "27/12",
          aprovada: null
        }
      ];
      localStorage.setItem('consultasProximas', JSON.stringify(proximasConsultas));
    }

    if (!localStorage.getItem('pacientesInternados')) {
      const pacientesInternados = [
        {
          id: '4',
          paciente: "Shyam Khanna",
          doenca: "Heart Disease",
          data: "27/12",
          aprovada: null
        },
        {
          id: '5',
          paciente: "Jean Lee Un",
          doenca: "Heart Disease",
          data: "27/12",
          aprovada: null
        },
        {
          id: '6',
          paciente: "Clara Brook",
          doenca: "Heart Disease",
          data: "27/12",
          aprovada: null
        }
      ];
      localStorage.setItem('pacientesInternados', JSON.stringify(pacientesInternados));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarMedico 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderMedico 
          nome={currentUser.name} 
          tipo="MÉDICO" 
          titulo="Home" 
          onMenuClick={handleMenuClick}
        />
        <FloatingChat currentUser={currentUser} />
        
        <ScrollArea className="flex-1">
          <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="w-full">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 lg:p-3 bg-blue-100 rounded-full">
                      <CalendarIcon className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Consultas Hoje</p>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">8</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 lg:p-3 bg-green-100 rounded-full">
                      <Users className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pacientes Ativos</p>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">24</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 lg:p-3 bg-purple-100 rounded-full">
                      <Activity className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Internados</p>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">6</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 lg:p-3 bg-yellow-100 rounded-full">
                      <Bell className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Lembretes</p>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">3</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4 lg:p-6">
                <LembreteConsulta 
                  especialidade="Cardiologia" 
                  medico="Dr. Miguel Soares" 
                  data="30/04/2025" 
                  hora="14:30" 
                />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
              <div className="lg:col-span-3 space-y-4 lg:space-y-6">
                <Card className="w-full">
                  <CardHeader className="p-4 lg:p-6">
                    <CardTitle>Próximas Consultas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TabelaConsultas 
                      tipo="proximas"
                    />
                  </CardContent>
                </Card>
                
                <Card className="w-full">
                  <CardHeader className="p-4 lg:p-6">
                    <CardTitle>Pacientes Internados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TabelaConsultas 
                      tipo="internados"
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card className="w-full">
                  <CardHeader className="p-4 lg:p-6">
                    <CardTitle>Calendário</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CalendarioMedico />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default HomeMedico;
