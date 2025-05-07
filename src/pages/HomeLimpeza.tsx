import React, { useState, useEffect } from 'react';
import { SidebarLimpeza } from '@/components/SidebarLimpeza';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import FloatingChat from '@/components/FloatingChat';

export default function HomeLimpeza() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const currentUser = {
    id: '5',
    name: 'Maria Silva',
    role: 'Limpeza',
    avatar: '/images/avatar-limpeza.png'
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <SidebarLimpeza 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <div className={cn(
          "flex justify-between items-center",
          "sticky top-0 z-30 bg-white border-b border-gray-100 py-3 px-2 sm:px-6 mb-8"
        )}>
          <h1 className={cn(
            "font-bold",
            isMobile ? "text-xl" : "text-2xl"
          )}>HOME</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell size={isMobile ? 18 : 20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-gray-200">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=MariaSilva" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">MARIA SILVA</p>
                <p className="text-xs sm:text-sm text-red-600">LIMPEZA</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-8">
          {/* Alerta Quarto */}
          <Card className="mb-8 border border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-yellow-600" />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">Alerta quarto 190</h2>
                    <span className="text-blue-600">Dermatologista</span>
                  </div>
                  <p className="text-gray-600">Nome do Médico(a)</p>
                </div>
                <div className="ml-auto">
                  <span className="text-gray-600">Status</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Solicitações */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <Calendar className="h-12 w-12 mb-4 text-gray-400" />
                  <div className="text-2xl font-bold mb-2">31</div>
                  <Button variant="link" className="text-blue-600">
                    Ver Solicitações
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Protocolos de Limpeza */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="bg-blue-100 rounded-full p-3 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                      <path d="M18 14h-8"></path>
                      <path d="M15 18h-5"></path>
                      <path d="M10 6h8v4h-8V6Z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Protocolos de Limpeza</h3>
                  <Button variant="link" className="text-blue-600">
                    Ver detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Histórico de Limpezas */}
          <Card className="mt-8 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Histórico de Limpezas</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2">Médico</th>
                      <th className="pb-2">Exame</th>
                      <th className="pb-2">Data</th>
                      <th className="pb-2">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=ShyamKhanna" />
                            <AvatarFallback>SK</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Shyam Khanna</p>
                            <p className="text-sm text-gray-500">Heart Disease</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">Heart Disease</td>
                      <td className="py-3">27/12</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=JeanLeeLin" />
                            <AvatarFallback>JL</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Jean Lee Un</p>
                            <p className="text-sm text-gray-500">Heart Disease</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">Heart Disease</td>
                      <td className="py-3">27/12</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=ClaraBrook" />
                            <AvatarFallback>CB</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Clara Brook</p>
                            <p className="text-sm text-gray-500">Heart Disease</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">Heart Disease</td>
                      <td className="py-3">27/12</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="link" className="text-blue-600">
                  Ver mais...
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <FloatingChat currentUser={currentUser} />
    </div>
  );
}
