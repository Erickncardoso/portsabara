import React, { useState } from 'react';
import { SidebarLimpeza } from '@/components/SidebarLimpeza';
import { HeaderLimpeza } from '@/components/HeaderLimpeza';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Card, CardContent } from '@/components/ui/card';
import FloatingChat from '@/components/FloatingChat';

export default function HistoricoLimpeza() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentUser = {
    id: '5',
    name: 'Maria Silva',
    role: 'Limpeza',
    avatar: '/images/avatar-limpeza.png'
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <SidebarLimpeza isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <FloatingChat currentUser={currentUser} />
      <main 
        className={"transition-all duration-300 ease-in-out"}
        style={{ 
          marginLeft: isSidebarOpen ? '16rem' : '4rem',
        }}
      >
        <HeaderLimpeza />
        <div className="p-8">
          <Card className="w-full">
            <CardContent className="p-6">
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
        </div>
      </main>
    </div>
  );
}
