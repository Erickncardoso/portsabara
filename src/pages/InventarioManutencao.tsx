import React, { useState, useEffect } from 'react';
import SidebarManutencao from '../components/SidebarManutencao';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import FloatingChat from '../components/FloatingChat';

const InventarioManutencao = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

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

  const currentUser = {
    id: 'manutencao-1',
    name: 'Robert Silva',
    role: 'Manutenção',
    avatar: '/images/avatar-manutencao.png'
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <SidebarManutencao isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <div className={cn(
          'flex justify-between items-center',
          'sticky top-0 z-30 bg-white border-b border-gray-100 py-3 px-2 sm:px-6 mb-8'
        )}>
          <h1 className={cn(
            'font-bold',
            isMobile ? 'text-xl' : 'text-2xl'
          )}>INVENTÁRIO</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell size={isMobile ? 18 : 20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-gray-200">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=RobertSilva" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">ROBERT SILVA</p>
                <p className="text-xs sm:text-sm text-red-600">MANUTENÇÃO</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Inventário de Equipamentos</CardTitle>
              <Button>Adicionar Item</Button>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 overflow-x-auto">
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
        </div>
      </div>
      <FloatingChat currentUser={currentUser} />
    </div>
  );
};

export default InventarioManutencao;
