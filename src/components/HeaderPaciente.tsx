import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface HeaderPacienteProps {
  nome?: string;
  tipo?: string;
  titulo?: string;
  className?: string;
}

const HeaderPaciente: React.FC<HeaderPacienteProps> = ({ 
  nome = 'João Silva', 
  tipo = 'Paciente',
  titulo = 'HOME',
  className
}) => {
  const isMobile = useIsMobile();
  // Pega a primeira letra do nome
  const inicial = nome.split(' ')[0].charAt(0);

  return (
    <div className={cn("bg-white w-full", className)}>
      <div className="px-2 sm:px-6 py-2">
        <div className="bg-white rounded-2xl shadow-sm border p-3 sm:p-4">
          <div className="flex justify-between items-center">
            <h1 className={cn(
              "font-bold",
              isMobile ? "text-xl" : "text-3xl"
            )}>{titulo}</h1>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell size={isMobile ? 18 : 20} />
              </button>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border border-gray-200">
                  <AvatarFallback className="bg-gray-100 text-gray-600">
                    {inicial}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">{nome}</p>
                  <p className="text-xs sm:text-sm text-red-500">{tipo}</p>
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
