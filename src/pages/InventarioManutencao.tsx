
import React, { useState } from 'react';
import SidebarManutencao from '../components/SidebarManutencao';
import { HeaderManutencao } from '../components/HeaderManutencao';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import FloatingChat from '../components/FloatingChat';

const InventarioManutencao = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const inventario = [
    {
      id: 1,
      item: "Chave de Fenda",
      quantidade: 5,
      status: "Disponível",
      localização: "Armário 1"
    },
    {
      id: 2,
      item: "Multímetro Digital",
      quantidade: 2,
      status: "Em Uso",
      localização: "Caixa de Ferramentas"
    },
    {
      id: 3,
      item: "Kit de Manutenção",
      quantidade: 3,
      status: "Disponível",
      localização: "Estante 2"
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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Inventário de Equipamentos</CardTitle>
              <Button>Adicionar Item</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventario.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.item}</TableCell>
                      <TableCell>{item.quantidade}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs",
                          item.status === "Disponível" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        )}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>{item.localização}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Editar</Button>
                          <Button variant="outline" size="sm">Remover</Button>
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

export default InventarioManutencao;
