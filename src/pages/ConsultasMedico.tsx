import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import SidebarMedico from '@/components/SidebarMedico';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import FloatingChat from '@/components/FloatingChat';

export default function ConsultasMedico() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const currentUser = {
    id: '2',
    name: 'Dr. João Silva',
    role: 'Médico',
    avatar: '/images/avatar-doctor.png'
  };

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <SidebarMedico isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <div className={cn(
          'flex justify-between items-center',
          'sticky top-0 z-30 bg-white border-b border-gray-100 py-3 px-2 sm:px-6 mb-8'
        )}>
          <h1 className={cn(
            'font-bold',
            isMobile ? 'text-xl' : 'text-2xl'
          )}>CONSULTAS</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell size={isMobile ? 18 : 20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-gray-200">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=JoaoSilva" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">DR. JOÃO SILVA</p>
                <p className="text-xs sm:text-sm text-blue-600">MÉDICO</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {/* Banner e Imagem do Médico */}
            <div className="relative">
              <img
                src="/images/doctor-banner.jpg"
                alt="Doctor"
                className="w-full h-[500px] object-cover rounded-lg"
              />
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
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src="/images/avatar-doctor.png"
                    alt="Doctor"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">Dr. João Silva</h3>
                    <p className="text-sm text-gray-500">Cardiologista</p>
                    <p className="text-sm text-gray-500">15 Anos de Experiência</p>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Próxima Consulta:</p>
                      <p className="text-sm text-gray-500">Segunda, 10 de Abril</p>
                      <p className="text-sm text-gray-500">14:30</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <FloatingChat currentUser={currentUser} />
    </div>
  );
}
