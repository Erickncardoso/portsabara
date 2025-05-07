import React, { useState, useEffect } from 'react';
import SidebarManutencao from '../components/SidebarManutencao';
import { cn, getMainContentClasses } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import FloatingChat from '@/components/FloatingChat';
import { HeaderManutencao } from '../components/HeaderManutencao';

const HomeManutencao: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarManutencao 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderManutencao 
          nome="Robert" 
          tipo="Manutenção" 
          titulo="HOME"
          className={cn(
            "sticky top-0 z-30",
            isMobile && "pt-16"
          )}
        />
        <main className="flex-1 p-3 sm:p-6 mt-0">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Ver Solicitações</h3>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <svg className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Protocolos de Manutenção</h3>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Histórico de Manutenções</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4"></th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Quarto</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Exame</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Data</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <img src="/images/avatar.png" alt="Shyam Khanna" className="w-8 h-8 rounded-full" />
                    </td>
                    <td className="py-3 px-4 text-sm">Shyam Khanna</td>
                    <td className="py-3 px-4 text-sm">Heart Disease</td>
                    <td className="py-3 px-4 text-sm">27/12</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <img src="/images/avatar.png" alt="Jean Lee Un" className="w-8 h-8 rounded-full" />
                    </td>
                    <td className="py-3 px-4 text-sm">Jean Lee Un</td>
                    <td className="py-3 px-4 text-sm">Heart Disease</td>
                    <td className="py-3 px-4 text-sm">27/12</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <img src="/images/avatar.png" alt="Clara Brook" className="w-8 h-8 rounded-full" />
                    </td>
                    <td className="py-3 px-4 text-sm">Clara Brook</td>
                    <td className="py-3 px-4 text-sm">Heart Disease</td>
                    <td className="py-3 px-4 text-sm">27/12</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 text-right">
                <button className="text-sm text-gray-600 hover:text-gray-900">Ver mais...</button>
              </div>
            </div>
          </div>
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

export default HomeManutencao;
