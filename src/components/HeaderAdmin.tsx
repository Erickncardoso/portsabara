import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Função para extrair as iniciais do nome
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

interface HeaderAdminProps {
  onMenuClick?: () => void;
}

export const HeaderAdmin: React.FC<HeaderAdminProps> = ({ onMenuClick }) => {
  const nome = 'ROBERTO';
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className={cn(
        "flex items-center justify-between px-4 h-16"
      )}>
        <div className="flex items-center gap-3">
          {isMobile && onMenuClick && (
            <button 
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Menu size={20} className="text-gray-700" />
            </button>
          )}
          <h1 className="text-xl font-bold">INÍCIO</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-1 rounded-full hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-500" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{nome}</p>
              <p className="text-xs text-gray-500">ADMIN</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-sm">
              {getInitials(nome)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
