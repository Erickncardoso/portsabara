import React from 'react';
import { Printer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  isSidebarOpen: boolean;
  currentUser: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
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

const Header: React.FC<HeaderProps> = ({ title, isSidebarOpen, currentUser }) => {
  return (
    <header 
      className={cn(
        "fixed top-0 right-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 shadow-sm transition-all duration-300",
        isSidebarOpen ? "lg:left-64" : "left-0 lg:left-16"
      )}
    >
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
        <div className="flex items-center gap-2 md:gap-4">
          <Printer className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
              {getInitials(currentUser.name)}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs text-red-500">{currentUser.role.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
