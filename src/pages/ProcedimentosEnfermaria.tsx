import React, { useState, useEffect } from 'react';
import SidebarEnfermaria from '../components/SidebarEnfermaria';
import HeaderEnfermaria from '../components/HeaderEnfermaria';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Stethoscope } from 'lucide-react';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import FloatingChat from '../components/FloatingChat';

const ProcedimentosEnfermaria = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  // Atualiza o estado da sidebar quando o tamanho da tela muda
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const procedimentos = [
    {
      id: 1,
      paciente: 'João Silva',
      procedimento: 'Troca de Curativo',
      horario: '08:00',
      status: 'Realizado',
      observacoes: 'Curativo limpo, sem sinais de infecção'
    },
    {
      id: 2,
      paciente: 'Maria Santos',
      procedimento: 'Medicação EV',
      horario: '10:00',
      status: 'Pendente',
      observacoes: 'Antibiótico de 12/12h'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarEnfermaria 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderEnfermaria 
          titulo="PROCEDIMENTOS"
          className={cn(
            "sticky top-0 z-30",
            isMobile && "pt-16"
          )}
        />
        
        <main className="p-3 sm:p-6">
          <Card className="shadow-md">
            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-6 w-6 text-white" />
                <CardTitle className="text-xl font-bold text-white">Procedimentos</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Procedimento</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {procedimentos.map((procedimento) => (
                    <TableRow key={procedimento.id}>
                      <TableCell className="font-medium">{procedimento.paciente}</TableCell>
                      <TableCell>{procedimento.procedimento}</TableCell>
                      <TableCell>{procedimento.horario}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs",
                          procedimento.status === 'Pendente' ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                        )}>
                          {procedimento.status}
                        </span>
                      </TableCell>
                      <TableCell>{procedimento.observacoes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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

export default ProcedimentosEnfermaria;
