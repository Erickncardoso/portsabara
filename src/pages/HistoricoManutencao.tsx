
import React, { useState } from 'react';
import SidebarManutencao from '../components/SidebarManutencao';
import { HeaderManutencao } from '../components/HeaderManutencao';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import FloatingChat from '../components/FloatingChat';

const HistoricoManutencao = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const historico = [
    {
      id: 1,
      data: "2025-04-25",
      equipamento: "Tomógrafo",
      tipo: "Manutenção Preventiva",
      tecnico: "Robert Silva",
      resultado: "Sucesso"
    },
    {
      id: 2,
      data: "2025-04-24",
      equipamento: "Raio-X",
      tipo: "Manutenção Corretiva",
      tecnico: "Robert Silva",
      resultado: "Falha"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarManutencao 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isSidebarOpen ? "ml-64" : "ml-16"
      )}>
        <HeaderManutencao nome="ROBERT" tipo="MANUTENÇÃO" />
        
        <main className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Manutenções</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Equipamento</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Técnico</TableHead>
                    <TableHead>Resultado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historico.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{new Date(item.data).toLocaleDateString()}</TableCell>
                      <TableCell>{item.equipamento}</TableCell>
                      <TableCell>{item.tipo}</TableCell>
                      <TableCell>{item.tecnico}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.resultado === "Sucesso" ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-green-500">Sucesso</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-4 w-4 text-red-500" />
                              <span className="text-red-500">Falha</span>
                            </>
                          )}
                        </div>
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
          id: "manutencao-1",
          name: "Robert",
          role: "Manutenção"
        }}
      />
    </div>
  );
};

export default HistoricoManutencao;
