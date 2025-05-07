import React, { useState, useEffect } from 'react';
import SidebarPaciente from '../components/SidebarPaciente';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Download, Calendar, Bell } from 'lucide-react';
import FloatingChat from '@/components/FloatingChat';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const ReceitasPaciente: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const currentUser = {
    id: '1',
    name: 'João Silva',
    role: 'Paciente',
    avatar: '/images/avatar.png'
  };

  const receitas = [
    {
      id: 1,
      medico: "Dr. Carlos Santos",
      data: "27/04/2025",
      medicamento: "Dipirona 500mg",
      posologia: "1 comprimido a cada 6 horas",
      duracao: "5 dias",
      status: "Ativa"
    },
    {
      id: 2,
      medico: "Dra. Maria Oliveira",
      data: "25/04/2025",
      medicamento: "Amoxicilina 500mg",
      posologia: "1 comprimido a cada 8 horas",
      duracao: "7 dias",
      status: "Ativa"
    }
  ];

  const handleDownload = (receita: any) => {
    toast.success(`Download da receita de ${receita.medicamento} iniciado`);
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <SidebarPaciente isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <div className={cn(
          'flex justify-between items-center',
          'sticky top-0 z-30 bg-white border-b border-gray-100 py-3 px-2 sm:px-6 mb-8'
        )}>
          <h1 className={cn(
            'font-bold',
            isMobile ? 'text-xl' : 'text-2xl'
          )}>RECEITAS</h1>
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
                <p className="font-semibold text-gray-900 text-sm sm:text-base">JOÃO SILVA</p>
                <p className="text-xs sm:text-sm text-blue-600">PACIENTE</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Receitas</CardTitle>
                <CardDescription>Visualize e faça download das suas receitas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {receitas.map((receita) => (
                    <Card key={receita.id} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{receita.medicamento}</h3>
                              <p className="text-sm text-gray-500">{receita.medico}</p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                              {receita.status}
                            </span>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>Emitido em: {receita.data}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              <strong>Posologia:</strong> {receita.posologia}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Duração:</strong> {receita.duracao}
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-4"
                            onClick={() => handleDownload(receita)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <FloatingChat currentUser={currentUser} />
    </div>
  );
};

export default ReceitasPaciente;
