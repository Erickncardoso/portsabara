import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Plus, Calendar } from 'lucide-react';
import SidebarMedico from '@/components/SidebarMedico';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import FloatingChat from '@/components/FloatingChat';

export default function ExamesMedico() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const currentUser = {
    id: '2',
    name: 'Dr. João Silva',
    role: 'Médico',
    avatar: '/images/avatar-doctor.png'
  };

  const exames = [
    {
      id: 'EX001',
      paciente: 'Maria Silva',
      idade: '34',
      tipo: 'Hemograma',
      data: '27 Abr 2025',
      status: 'Aguardando',
      prioridade: 'Alta'
    },
    {
      id: 'EX002',
      paciente: 'João Santos',
      idade: '45',
      tipo: 'Raio-X Tórax',
      data: '27 Abr 2025',
      status: 'Em Análise',
      prioridade: 'Média'
    },
    {
      id: 'EX003',
      paciente: 'Ana Oliveira',
      idade: '28',
      tipo: 'Eletrocardiograma',
      data: '28 Abr 2025',
      status: 'Concluído',
      prioridade: 'Normal'
    }
  ];

  const handleNovoExame = () => {
    toast({
      title: "Novo Exame",
      description: "Funcionalidade de novo exame será implementada em breve.",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <SidebarMedico 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className={cn(
        "transition-all duration-300 ease-in-out flex-1 p-4 lg:p-6 overflow-y-auto",
        isSidebarOpen ? "ml-0 lg:ml-64" : "ml-0 lg:ml-16"
      )}>
        <FloatingChat currentUser={currentUser} />

        <header className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Exames</h1>
              <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {exames.length} exames
              </div>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar exames..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="pb-6">
          <div className={cn(
            "grid gap-4 transition-all duration-300",
            "grid-cols-1 sm:grid-cols-2",
            isSidebarOpen 
              ? "lg:grid-cols-3 xl:grid-cols-4" 
              : "lg:grid-cols-4 xl:grid-cols-5"
          )}>
            <Card 
              onClick={handleNovoExame}
              className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-blue-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 transition-all cursor-pointer group p-4 min-h-[280px]"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-blue-600 mb-1">Novo Exame</h3>
                <p className="text-sm text-gray-500">Adicionar novo exame</p>
              </div>
            </Card>

            {exames.map((exame) => (
              <Card key={exame.id} className="bg-white hover:shadow-lg transition-all p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-lg shrink-0">
                    {exame.paciente.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 mb-1 truncate">{exame.paciente}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {exame.idade} anos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 truncate">{exame.tipo}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Prioridade: {exame.prioridade}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Data do exame</span>
                    <span className="font-medium">{exame.data}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      exame.status === 'Concluído' ? "bg-green-100 text-green-700" :
                      exame.status === 'Em Análise' ? "bg-yellow-100 text-yellow-700" :
                      "bg-blue-100 text-blue-700"
                    )}>
                      {exame.status}
                    </span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Ver Detalhes</span>
                </button>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
