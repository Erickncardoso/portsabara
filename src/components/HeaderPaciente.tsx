import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderPacienteProps {
  nome?: string;
  tipo?: string;
  marginLeft?: string;
  titulo?: string;
}

const HeaderPaciente: React.FC<HeaderPacienteProps> = ({ 
  nome = 'João Silva', 
  tipo = 'Paciente',
  marginLeft,
  titulo = 'HOME'
}) => {
  // Pega a primeira letra do nome
  const inicial = nome.split(' ')[0].charAt(0);

  return (
    <div className="bg-white" style={marginLeft ? { marginLeft } : undefined}>
      <div className="px-6 py-2">
        <div className="bg-white rounded-2xl shadow-sm border p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{titulo}</h1>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
              </button>
              
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-gray-200">
                  <AvatarFallback className="bg-gray-100 text-gray-600">
                    {inicial}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-right">
                  <p className="font-medium text-gray-900">{nome}</p>
                  <p className="text-sm text-red-500">{tipo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPaciente;
