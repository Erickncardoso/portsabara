import React, { useState } from 'react';
import { SidebarLimpeza } from '@/components/SidebarLimpeza';
import { HeaderLimpeza } from '@/components/HeaderLimpeza';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import FloatingChat from '@/components/FloatingChat';

export default function PerfilLimpeza() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentUser = {
    id: '5',
    name: 'Maria Silva',
    role: 'Limpeza',
    avatar: '/images/avatar-limpeza.png'
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <SidebarLimpeza isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <FloatingChat currentUser={currentUser} />
      <main 
        className={"transition-all duration-300 ease-in-out"}
        style={{ 
          marginLeft: isSidebarOpen ? '16rem' : '4rem',
        }}
      >
        <HeaderLimpeza />
        <div className="p-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" />
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
      </main>
    </div>
  );
}
