
import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const HeaderAdmin: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 h-16">
        <h1 className="text-xl font-bold">INÍCIO</h1>
        
        <div className="flex items-center gap-4">
          <button className="relative p-1 rounded-full hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-500" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">ROBERTO</p>
              <p className="text-xs text-gray-500">ADMIN</p>
            </div>
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Robert" />
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
