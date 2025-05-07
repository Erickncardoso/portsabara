import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone, Medal, Activity, Bell } from 'lucide-react';
import SidebarMedico from '@/components/SidebarMedico';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FloatingChat from '@/components/FloatingChat';

export default function PerfilMedico() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const currentUser = {
    id: '2',
    name: 'Dr. João Silva',
    role: 'Médico',
    avatar: '/images/avatar-doctor.png'
  };

  const medicoInfo = {
    nome: 'Dr. João Silva',
    especialidade: 'Cardiologista',
    crm: '123456',
    email: 'joao.silva@hospital.com',
    telefone: '(11) 99999-9999',
    anoFormacao: '2010',
    universidade: 'Universidade de São Paulo',
    experiencia: '15 anos',
  };

  const estatisticas = [
    { titulo: 'Pacientes Atendidos', valor: '1.2k', icone: User },
    { titulo: 'Exames Realizados', valor: '850', icone: Activity },
    { titulo: 'Anos de Experiência', valor: '15', icone: Medal },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <SidebarMedico isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <div className={cn(
          'flex justify-between items-center',
          'sticky top-0 z-30 bg-white border-b border-gray-100 py-3 px-2 sm:px-6 mb-8'
        )}>
          <h1 className={cn(
            'font-bold',
            isMobile ? 'text-xl' : 'text-2xl'
          )}>PERFIL</h1>
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
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
            <p className="text-gray-600">Gerencie suas informações pessoais e profissionais</p>
          </header>
          <div className="grid gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=JoaoSilva`} />
                      <AvatarFallback>
                        <User className="h-16 w-16" />
                      </AvatarFallback>
                    </Avatar>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Alterar foto
                    </button>
                  </div>

                  <div className="flex-1 grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                        <Input value={medicoInfo.nome} className="mt-1" disabled />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">CRM</label>
                        <Input value={medicoInfo.crm} className="mt-1" disabled />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Especialidade</label>
                        <Input value={medicoInfo.especialidade} className="mt-1" disabled />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Ano de Formação</label>
                        <Input value={medicoInfo.anoFormacao} className="mt-1" disabled />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {estatisticas.map((estatistica) => (
                <Card key={estatistica.titulo}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <estatistica.icone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">{estatistica.titulo}</p>
                        <h3 className="text-2xl font-bold text-gray-900">{estatistica.valor}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{medicoInfo.email}</p>
                      <p className="text-sm text-gray-500">Email profissional</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{medicoInfo.telefone}</p>
                      <p className="text-sm text-gray-500">Telefone de contato</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <FloatingChat currentUser={currentUser} />
    </div>
  );
}
