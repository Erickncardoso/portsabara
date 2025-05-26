import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import SidebarMedico from '@/components/SidebarMedico';
import HeaderMedico from '@/components/HeaderMedico';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/use-toast';
import FloatingChat from '@/components/FloatingChat';

export default function ConsultasMedico() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const currentUser = {
    id: '2',
    name: 'Dr. João Silva',
    role: 'Médico',
    avatar: '/images/avatar-doctor.png'
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

  const handleNotificacoesClick = () => {
    toast({
      title: "Notificações",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handlePerfilClick = () => {
    navigate('/perfil-medico');
  };

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
          titulo="CONSULTAS"
          nome={currentUser.name}
          tipo={currentUser.role}
          notificacoes={2}
          onNotificacoesClick={handleNotificacoesClick}
          onPerfilClick={handlePerfilClick}
          onMenuClick={handleMenuClick}
        />

        <div className="p-3 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {/* Banner Visual Melhorado */}
            <div className="relative">
              <div className="w-full h-[500px] bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-lg flex flex-col items-center justify-center text-white p-8">
                <div className="text-center space-y-6">
                  <img
                    src="/images/logo-sabara-branca.png"
                    alt="Hospital Sabará"
                    className="h-24 mx-auto mb-6"
                  />
                  <h1 className="text-3xl font-bold mb-4">Consultas Médicas</h1>
                  <p className="text-lg text-blue-100 max-w-md">
                    Gerencie seus agendamentos e consultas de forma eficiente e organizada
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold">150+</div>
                      <div className="text-sm text-blue-100">Consultas/Mês</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold">98%</div>
                      <div className="text-sm text-blue-100">Satisfação</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário de Agendamento */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Agendar Consulta</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Nome do Paciente" />
                  <Select>
                    <option value="">Gênero</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="email" placeholder="Email" />
                  <Input type="tel" placeholder="Telefone" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="date" placeholder="Data da Consulta" />
                  <Input type="time" placeholder="Horário" />
                </div>

                <Select>
                  <option value="">Selecione o Médico</option>
                  <option value="dr-joao">Dr. João Silva</option>
                  <option value="dra-maria">Dra. Maria Santos</option>
                </Select>

                <Textarea placeholder="Mensagem/Observações" rows={4} />

                <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                  Agendar Consulta
                </Button>
              </form>
            </Card>
          </div>

          {/* Consultas Agendadas */}
          <div className="mt-8 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Consultas Agendadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600">JS</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Dr. João Silva</h3>
                    <p className="text-sm text-gray-500">Cardiologista</p>
                    <p className="text-sm text-gray-500">15 Anos de Experiência</p>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">Próxima Consulta:</p>
                      <p className="text-sm text-blue-600">Segunda, 10 de Abril</p>
                      <p className="text-sm text-blue-600">14:30</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-green-600">MS</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Dra. Maria Santos</h3>
                    <p className="text-sm text-gray-500">Dermatologista</p>
                    <p className="text-sm text-gray-500">12 Anos de Experiência</p>
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Próxima Consulta:</p>
                      <p className="text-sm text-green-600">Terça, 11 de Abril</p>
                      <p className="text-sm text-green-600">09:00</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-purple-600">CL</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Dr. Carlos Lima</h3>
                    <p className="text-sm text-gray-500">Ortopedista</p>
                    <p className="text-sm text-gray-500">18 Anos de Experiência</p>
                    <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">Próxima Consulta:</p>
                      <p className="text-sm text-purple-600">Quarta, 12 de Abril</p>
                      <p className="text-sm text-purple-600">16:00</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <FloatingChat currentUser={currentUser} />
      </div>
    </div>
  );
}
