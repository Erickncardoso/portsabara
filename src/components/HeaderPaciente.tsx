import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderPacienteProps {
  nome?: string;
  tipo?: string;
  titulo?: string;
  className?: string;
  notificacoes?: number;
  onNotificacoesClick?: () => void;
  onPerfilClick?: () => void;
  onMenuClick?: () => void;
}

// Função para extrair as iniciais do nome
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const HeaderPaciente: React.FC<HeaderPacienteProps> = ({ 
  nome = 'João Silva', 
  tipo = 'Paciente',
  titulo = 'HOME',
  className,
  notificacoes = 0,
  onNotificacoesClick,
  onPerfilClick,
  onMenuClick
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn("bg-white w-full sticky top-0 z-30 border-b border-gray-100", className)}>
      <div className={cn(
        "px-2 sm:px-6 py-2"
      )}>
        <div className="bg-white rounded-2xl shadow-sm border p-3 sm:p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {isMobile && onMenuClick && (
                <button 
                  onClick={onMenuClick}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Menu size={20} className="text-gray-700" />
                </button>
              )}
              <h1 className={cn(
                "font-bold text-gray-900",
                isMobile ? "text-xl" : "text-3xl"
              )}>{titulo}</h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell size={isMobile ? 18 : 20} className="text-gray-600" />
                    {notificacoes > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {notificacoes}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={onNotificacoesClick}>
                    Ver todas as notificações
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 sm:gap-3 p-1 hover:bg-gray-50">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm border border-gray-200">
                      {getInitials(nome)}
                    </div>
                    
                    <div className="text-right">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{nome}</p>
                      <p className="text-xs sm:text-sm text-red-500">{tipo}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={onPerfilClick}>
                    Meu Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPaciente;
