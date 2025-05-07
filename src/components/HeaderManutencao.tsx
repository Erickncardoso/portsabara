import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderManutencaoProps {
  nome: string;
  tipo: string;
  marginLeft?: string;
  titulo?: string;
  className?: string;
}

export const HeaderManutencao: React.FC<HeaderManutencaoProps> = ({ nome, tipo, marginLeft, titulo = 'HOME', className }) => {
  const isMobile = useIsMobile();
  return (
    <header
      className={cn(
        "bg-white border-b border-gray-100 py-3 px-2 sm:px-6",
        className
      )}
      style={marginLeft ? { marginLeft } : undefined}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className={cn(
            "font-bold",
            isMobile ? "text-xl" : "text-3xl"
          )}>{titulo}</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={isMobile ? 18 : 20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-gray-200">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Robert" alt={nome} />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
            <div className="text-right">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">{nome.toUpperCase()}</p>
              <p className="text-xs sm:text-sm text-red-600">{tipo}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
