import React, { useState, useEffect } from 'react';
import { SidebarLimpeza } from '@/components/SidebarLimpeza';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User, Bell } from 'lucide-react';
import FloatingChat from '@/components/FloatingChat';

export default function PerfilLimpeza() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const currentUser = {
    id: '5',
    name: 'Maria Silva',
    role: 'Limpeza',
    avatar: '/images/avatar-limpeza.png'
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <SidebarLimpeza isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
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
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=MariaSilva" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">MARIA SILVA</p>
                <p className="text-xs sm:text-sm text-red-600">LIMPEZA</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=MariaSilva" />
                  <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-2">Maria Silva</h2>
                <p className="text-gray-600 mb-4">Equipe de Limpeza</p>
                <div className="w-full max-w-md space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Informações Pessoais</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">ID:</span> #12345</p>
                      <p><span className="font-medium">Email:</span> maria.silva@hospital.com</p>
                      <p><span className="font-medium">Telefone:</span> (11) 98765-4321</p>
                    </div>
                  </div>
                  <Button className="w-full">Editar Perfil</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FloatingChat currentUser={currentUser} />
    </div>
  );
}
