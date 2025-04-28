
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from 'lucide-react';

interface HeaderManutencaoProps {
  nome: string;
  tipo: string;
}

export const HeaderManutencao: React.FC<HeaderManutencaoProps> = ({ nome, tipo }) => {
  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HOME</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-gray-200">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Robert" alt={nome} />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
            
            <div className="text-right hidden md:block">
              <p className="font-semibold text-gray-900">{nome.toUpperCase()}</p>
              <p className="text-xs text-red-600">{tipo}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
