import React, { useState, useEffect } from 'react';
import SidebarManutencao from '../components/SidebarManutencao';
import { HeaderManutencao } from '../components/HeaderManutencao';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User, Mail, Phone, Award, Calendar } from 'lucide-react';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import FloatingChat from '../components/FloatingChat';

const PerfilManutencao = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentUser] = useState({
    id: 'manutencao-1',
    name: 'Robert Silva',
    role: 'Manutenção',
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

  const tecnico = {
    nome: "Robert Silva",
    email: "robert.silva@hospital.com",
    telefone: "(11) 98765-4321",
    registro: "MT-123456",
    experiencia: "8 anos",
    especialidade: "Equipamentos Hospitalares",
    turno: "Manhã",
    setor: "Manutenção Geral"
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarManutencao 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderManutencao 
          titulo="PERFIL"
          nome="ROBERT SILVA"
          tipo="MANUTENÇÃO"
          onMenuClick={handleMenuClick}
          className={cn(
            "sticky top-0 z-30"
          )}
        />
        
        <main className="flex-1 p-3 sm:p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600">
                <div className="flex items-center gap-2">
                  <User className="h-6 w-6 text-white" />
                  <CardTitle className="text-xl font-bold text-white">Informações Pessoais</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Nome</p>
                      <p className="text-gray-600">{tecnico.nome}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p className="text-gray-600">{tecnico.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-gray-600">{tecnico.telefone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600">
                <div className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-white" />
                  <CardTitle className="text-xl font-bold text-white">Informações Profissionais</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Registro</p>
                      <p className="text-gray-600">{tecnico.registro}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Experiência</p>
                      <p className="text-gray-600">{tecnico.experiencia}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Especialidade</p>
                      <p className="text-gray-600">{tecnico.especialidade}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Turno</p>
                      <p className="text-gray-600">{tecnico.turno}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Setor</p>
                      <p className="text-gray-600">{tecnico.setor}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <FloatingChat
        currentUser={{
          id: currentUser.id,
          name: currentUser.name,
          role: currentUser.role
        }}
      />
    </div>
  );
};

export default PerfilManutencao;
