
import React, { useState } from 'react';
import SidebarPaciente from '../components/SidebarPaciente';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Download, Calendar, Eye } from 'lucide-react';
import { cn } from "@/lib/utils";
import FloatingChat from '@/components/FloatingChat';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Definindo os tipos para evitar erros de tipagem
interface ResultadoExame {
  [key: string]: string;
}

interface Exame {
  id: number;
  tipo: string;
  medico: string;
  data: string;
  laboratorio: string;
  status: string;
  resultados?: ResultadoExame;
}

const ExamesPaciente: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedExame, setSelectedExame] = useState<Exame | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const currentUser = {
    id: '1',
    name: 'João Silva',
    role: 'Paciente',
    avatar: '/images/avatar.png'
  };

  const exames: Exame[] = [
    {
      id: 1,
      tipo: "Hemograma Completo",
      medico: "Dr. Carlos Santos",
      data: "27/04/2025",
      laboratorio: "Laboratório Central",
      status: "Disponível",
      resultados: {
        hemoglobina: "14.5 g/dL",
        hematocrito: "43%",
        leucocitos: "7.500/mm³",
        plaquetas: "250.000/mm³"
      }
    },
    {
      id: 2,
      tipo: "Raio-X Tórax",
      medico: "Dra. Maria Oliveira",
      data: "25/04/2025",
      laboratorio: "Centro de Imagem",
      status: "Em análise"
    }
  ];

  const handleDownload = (exame: Exame) => {
    // Simula o download do exame
    toast.success(`Download do exame ${exame.tipo} iniciado`);
  };

  const handleVisualizar = (exame: Exame) => {
    setSelectedExame(exame);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarPaciente 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <Header 
        title="EXAMES" 
        isSidebarOpen={isSidebarOpen}
        currentUser={currentUser}
      />

      <FloatingChat currentUser={currentUser} />

      <main 
        className="transition-all duration-300 ease-in-out pt-20 px-4"
        style={{ 
          marginLeft: isSidebarOpen ? '16rem' : '4rem',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Meus Exames</CardTitle>
              <CardDescription>Visualize seus exames e resultados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exames.map((exame) => (
                  <Card key={exame.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <FileText className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{exame.tipo}</h3>
                            <p className="text-sm text-gray-500">{exame.laboratorio}</p>
                          </div>
                          <span className={cn(
                            "px-3 py-1 rounded-full text-sm",
                            exame.status === "Disponível" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-yellow-100 text-yellow-700"
                          )}>
                            {exame.status}
                          </span>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Realizado em: {exame.data}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            <strong>Médico Solicitante:</strong> {exame.medico}
                          </p>
                        </div>
                        <div className="mt-4 flex gap-2">
                          {exame.status === "Disponível" && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleVisualizar(exame)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Visualizar
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDownload(exame)}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Resultados do Exame - {selectedExame?.tipo}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedExame?.resultados && (
              <div className="space-y-4">
                {Object.entries(selectedExame.resultados).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium capitalize">{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamesPaciente;
