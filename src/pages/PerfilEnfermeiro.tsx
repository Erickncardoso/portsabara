
import React, { useState } from 'react';
import SidebarEnfermaria from '../components/SidebarEnfermaria';
import HeaderEnfermaria from '../components/HeaderEnfermaria';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User, Mail, Phone, Award, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import FloatingChat from '../components/FloatingChat';

const PerfilEnfermeiro = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const enfermeiro = {
    nome: "Ana Silva",
    email: "ana.silva@hospital.com",
    telefone: "(11) 98765-4321",
    coren: "COREN-SP 123456",
    experiencia: "5 anos",
    especialidade: "UTI",
    turno: "Manhã",
    setor: "UTI Adulto"
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarEnfermaria 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isSidebarOpen ? "ml-64" : "ml-16"
      )}>
        <HeaderEnfermaria />
        
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-600">
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
                      <p className="text-gray-600">{enfermeiro.nome}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p className="text-gray-600">{enfermeiro.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-gray-600">{enfermeiro.telefone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-600">
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
                      <p className="font-medium">COREN</p>
                      <p className="text-gray-600">{enfermeiro.coren}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Experiência</p>
                      <p className="text-gray-600">{enfermeiro.experiencia}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Especialidade</p>
                      <p className="text-gray-600">{enfermeiro.especialidade}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Turno</p>
                      <p className="text-gray-600">{enfermeiro.turno}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Setor</p>
                      <p className="text-gray-600">{enfermeiro.setor}</p>
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
          id: "nurse-1",
          name: "Ana Silva",
          role: "Enfermeiro"
        }}
      />
    </div>
  );
};

export default PerfilEnfermeiro;
