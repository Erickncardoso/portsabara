import React, { useState, useEffect } from 'react';
import SidebarManutencao from '../components/SidebarManutencao';
import { HeaderManutencao } from '../components/HeaderManutencao';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingChat from '@/components/FloatingChat';

const TarefasManutencao = () => {
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

  const tarefas = [
    {
      id: 1,
      equipamento: "Ressonância Magnética",
      local: "Sala de Exames 3",
      prioridade: "Alta",
      status: "Pendente",
      prazo: "2025-05-01"
    },
    {
      id: 2,
      equipamento: "Sistema de Ar Condicionado",
      local: "UTI",
      prioridade: "Média",
      status: "Em Andamento",
      prazo: "2025-05-03"
    },
    {
      id: 3,
      equipamento: "Monitor Cardíaco",
      local: "Quarto 405",
      prioridade: "Baixa",
      status: "Concluído",
      prazo: "2025-04-30"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Concluído':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Em Andamento':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Pendente':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
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
          titulo="TAREFAS"
          nome="ROBERT SILVA"
          tipo="MANUTENÇÃO"
          onMenuClick={handleMenuClick}
          className={cn(
            "sticky top-0 z-30"
          )}
        />
        <main className="flex-1 p-3 sm:p-6 bg-gray-50">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Visão Geral das Tarefas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-700">Concluídas</h3>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-700">Em Andamento</h3>
                  <p className="text-2xl font-bold text-yellow-600">5</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-700">Pendentes</h3>
                  <p className="text-2xl font-bold text-red-600">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Tarefas</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Equipamento</TableHead>
                    <TableHead>Local</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tarefas.map((tarefa) => (
                    <TableRow key={tarefa.id}>
                      <TableCell>{getStatusIcon(tarefa.status)}</TableCell>
                      <TableCell>{tarefa.equipamento}</TableCell>
                      <TableCell>{tarefa.local}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs",
                          tarefa.prioridade === "Alta" && "bg-red-100 text-red-700",
                          tarefa.prioridade === "Média" && "bg-yellow-100 text-yellow-700",
                          tarefa.prioridade === "Baixa" && "bg-green-100 text-green-700"
                        )}>
                          {tarefa.prioridade}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(tarefa.prazo).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </TableCell>
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
          id: currentUser.id,
          name: currentUser.name,
          role: currentUser.role
        }}
      />
    </div>
  );
};

export default TarefasManutencao;
