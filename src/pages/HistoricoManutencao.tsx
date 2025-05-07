import React, { useState, useEffect } from 'react';
import SidebarManutencao from '../components/SidebarManutencao';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import FloatingChat from '../components/FloatingChat';

const HistoricoManutencao = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

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
          )}>HISTÓRICO</h1>
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
            <CardHeader>
              <CardTitle>Histórico de Manutenções</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 overflow-x-auto">
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
        </div>
      </div>
      <FloatingChat currentUser={currentUser} />
    </div>
  );
};

export default HistoricoManutencao;
