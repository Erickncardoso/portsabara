
import React, { useState } from 'react';
import SidebarEnfermaria from '../components/SidebarEnfermaria';
import HeaderEnfermaria from '../components/HeaderEnfermaria';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

const PrescricoesEnfermaria = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const prescricoes = [
    { 
      id: 1,
      paciente: 'João Silva',
      medicamento: 'Dipirona',
      dosagem: '1 comprimido',
      frequencia: '8/8h',
      inicio: '2025-04-27',
      status: 'Pendente'
    },
    { 
      id: 2,
      paciente: 'Maria Santos',
      medicamento: 'Paracetamol',
      dosagem: '2 comprimidos',
      frequencia: '6/6h',
      inicio: '2025-04-27',
      status: 'Administrado'
    },
  ];

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
          <Card className="shadow-md">
            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-6 w-6 text-white" />
                <CardTitle className="text-xl font-bold text-white">Prescrições</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Medicamento</TableHead>
                    <TableHead>Dosagem</TableHead>
                    <TableHead>Frequência</TableHead>
                    <TableHead>Início</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescricoes.map((prescricao) => (
                    <TableRow key={prescricao.id}>
                      <TableCell className="font-medium">{prescricao.paciente}</TableCell>
                      <TableCell>{prescricao.medicamento}</TableCell>
                      <TableCell>{prescricao.dosagem}</TableCell>
                      <TableCell>{prescricao.frequencia}</TableCell>
                      <TableCell>{prescricao.inicio}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs",
                          prescricao.status === 'Pendente' ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                        )}>
                          {prescricao.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default PrescricoesEnfermaria;
