import React, { useState, useEffect } from 'react';
import { SidebarLimpeza } from '@/components/SidebarLimpeza';
import { HeaderLimpeza } from '@/components/HeaderLimpeza';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Card, CardContent } from '@/components/ui/card';
import FloatingChat from '@/components/FloatingChat';

export default function HistoricoLimpeza() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentUser] = useState({
    id: 'limpeza-1',
    name: 'Maria Silva',
    role: 'Limpeza',
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

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarLimpeza 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderLimpeza 
          titulo="HISTÓRICO"
          nome="MARIA SILVA"
          tipo="LIMPEZA"
          onMenuClick={handleMenuClick}
          className={cn(
            "sticky top-0 z-30"
          )}
        />
        
        <main className="flex-1 p-3 sm:p-6 bg-gray-50">
          <Card className="w-full">
            <CardContent className="p-0 sm:p-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quarto</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>101</TableCell>
                    <TableCell>27/04/2025</TableCell>
                    <TableCell>Maria Silva</TableCell>
                    <TableCell>Concluído</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>102</TableCell>
                    <TableCell>27/04/2025</TableCell>
                    <TableCell>João Santos</TableCell>
                    <TableCell>Concluído</TableCell>
                  </TableRow>
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
}
