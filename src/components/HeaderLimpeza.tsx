
import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function HeaderLimpeza() {
  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Painel de Limpeza</h1>
        
        <div className="flex items-center gap-4">
          <button className={cn(
            "relative p-2 text-gray-600 hover:bg-gray-100 rounded-full",
            "transition-colors duration-200"
          )}>
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Maria Silva</p>
              <p className="text-xs text-blue-600">Equipe de Limpeza</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
