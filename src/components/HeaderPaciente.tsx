import React from 'react';
import { Bell, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderPacienteProps {
  nome?: string;
  tipo?: string;
  marginLeft?: string;
  titulo?: string;
}

const HeaderPaciente: React.FC<HeaderPacienteProps> = ({ 
  nome = 'ROBERT', 
  tipo = 'PACIENTE',
  marginLeft,
  titulo = 'HOME'
}) => {
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
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${nome}`} alt={nome} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-right">
                  <p className="font-semibold">{nome}</p>
                  <p className="text-xs text-red-500">{tipo}</p>
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
