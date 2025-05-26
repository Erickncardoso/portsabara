import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { User, Mail, Phone, Medal } from 'lucide-react';
import SidebarMedico from '@/components/SidebarMedico';
import HeaderMedico from '@/components/HeaderMedico';
import { getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FloatingChat from '@/components/FloatingChat';
import { useToast } from "@/components/ui/use-toast";

export default function PerfilMedico() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
    experiencia: '15 anos',
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

  const handleMenuClick = () => {
    if (isMobile) {
      setIsSheetOpen(true);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
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
          titulo="PERFIL"
          nome={currentUser.name}
          tipo={currentUser.role}
          notificacoes={2}
          onNotificacoesClick={handleNotificacoesClick}
          onPerfilClick={handlePerfilClick}
          onMenuClick={handleMenuClick}
        />

        <div className="p-6">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=JoaoSilva`} />
                    <AvatarFallback>
                      <User className="h-16 w-16" />
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{medicoInfo.nome}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-blue-600">{medicoInfo.especialidade}</span>
                      <span className="text-sm text-gray-500">CRM {medicoInfo.crm}</span>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{medicoInfo.email}</p>
                        <p className="text-xs text-gray-500">Email profissional</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{medicoInfo.telefone}</p>
                        <p className="text-xs text-gray-500">Telefone de contato</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Medal className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{medicoInfo.experiencia}</p>
                        <p className="text-xs text-gray-500">Anos de experiência</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <FloatingChat currentUser={currentUser} />
      </div>
    </div>
  );
}
