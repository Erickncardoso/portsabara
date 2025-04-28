import React, { useState } from 'react';
import SidebarPaciente from '../components/SidebarPaciente';
import Header from '@/components/Header';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Download, Calendar } from 'lucide-react';
import FloatingChat from '@/components/FloatingChat';
import { cn } from '@/lib/utils';

const ReceitasPaciente: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
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
    <div className="flex h-screen bg-gray-100">
      <SidebarPaciente 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 relative",
        isSidebarOpen ? "lg:ml-64" : "lg:ml-16"
      )}>
        <Header 
          title="RECEITAS" 
          isSidebarOpen={isSidebarOpen}
          currentUser={currentUser}
        />

        <FloatingChat currentUser={currentUser} />

        <main className="flex-1 pt-20 px-4 pb-6">
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
        </main>
      </div>
    </div>
  );
};

export default ReceitasPaciente;
