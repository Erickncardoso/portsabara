import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bed,
  History,
  ListTodo,
  FileText,
  User,
  LogOut, 
  Phone,
  ChevronFirst,
  ChevronLast,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface SidebarLimpezaProps {
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
  isSheetOpen?: boolean;
  onSheetOpenChange?: (open: boolean) => void;
}

export function SidebarLimpeza({ 
  className, 
  isOpen, 
  onToggle, 
  isSheetOpen = false, 
  onSheetOpenChange 
}: SidebarLimpezaProps) {
  const isMobile = useIsMobile();

  // Conteúdo do menu para ser reutilizado
  const MenuItems = () => (
    <>
      <nav className="flex-1 py-6 px-2 space-y-2">
        <Link 
          to="/home-limpeza" 
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && onSheetOpenChange?.(false)}
        >
          <Bed size={20} className="min-w-[20px]" />
          <span className={cn(
            "ml-3",
            isMobile ? "opacity-100 inline" : isOpen ? "opacity-100 inline" : "opacity-0 hidden"
          )}>Home</span>
        </Link>
        
        <Link 
          to="/quartos-limpeza" 
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && onSheetOpenChange?.(false)}
        >
          <Bed size={20} className="min-w-[20px]" />
          <span className={cn(
            "ml-3",
            isMobile ? "opacity-100 inline" : isOpen ? "opacity-100 inline" : "opacity-0 hidden"
          )}>Quartos</span>
        </Link>
        
        <Link 
          to="/historico-limpeza" 
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && onSheetOpenChange?.(false)}
        >
          <History size={20} className="min-w-[20px]" />
          <span className={cn(
            "ml-3",
            isMobile ? "opacity-100 inline" : isOpen ? "opacity-100 inline" : "opacity-0 hidden"
          )}>Histórico</span>
        </Link>
        
        <Link 
          to="/solicitacoes-limpeza" 
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && onSheetOpenChange?.(false)}
        >
          <ListTodo size={20} className="min-w-[20px]" />
          <span className={cn(
            "ml-3",
            isMobile ? "opacity-100 inline" : isOpen ? "opacity-100 inline" : "opacity-0 hidden"
          )}>Solicitações</span>
        </Link>
        
        <Link 
          to="/protocolos-limpeza" 
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && onSheetOpenChange?.(false)}
        >
          <FileText size={20} className="min-w-[20px]" />
          <span className={cn(
            "ml-3",
            isMobile ? "opacity-100 inline" : isOpen ? "opacity-100 inline" : "opacity-0 hidden"
          )}>Protocolos</span>
        </Link>
      </nav>
      
      <div className="px-2 py-4">
        <p className={cn(
          "text-xs font-semibold text-gray-500 mb-4 px-3",
          isMobile ? "block" : isOpen ? "block" : "hidden"
        )}>CONTA</p>
        
        <Link 
          to="/perfil-limpeza" 
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && onSheetOpenChange?.(false)}
        >
          <User size={20} className="min-w-[20px]" />
          <span className={cn(
            "ml-3",
            isMobile ? "opacity-100 inline" : isOpen ? "opacity-100 inline" : "opacity-0 hidden"
          )}>Perfil</span>
        </Link>
        
        <Link 
          to="/" 
          className="flex items-center px-3 py-3 text-blue-600 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && onSheetOpenChange?.(false)}
        >
          <LogOut size={20} className="min-w-[20px]" />
          <span className={cn(
            "ml-3",
            isMobile ? "opacity-100 inline" : isOpen ? "opacity-100 inline" : "opacity-0 hidden"
          )}>Sair</span>
        </Link>
      </div>
      
      <div className={cn(
        "px-6 py-4 border-t",
        isMobile ? "block" : isOpen ? "block" : "hidden"
      )}>
        <div className="flex items-center text-blue-600 text-sm">
          <Phone size={18} className="mr-2" />
          <div>
            <p className="font-semibold">Número de emergência:</p>
            <p>+55 (11) xxxx - xxxx</p>
          </div>
        </div>
      </div>
    </>
  );

  // Versão mobile com Sheet
  if (isMobile) {
    return (
      <Sheet open={isSheetOpen} onOpenChange={onSheetOpenChange}>
        <SheetContent side="left" className="p-0 w-[280px]">
          <div className="h-full flex flex-col">
            <div className="bg-white p-4 flex items-center justify-center">
              <Link to="/home-limpeza" onClick={() => onSheetOpenChange?.(false)}>
                <img 
                  src="/images/logo-sabara.png" 
                  alt="Logo Hospital Sabará" 
                  className="h-12 object-contain cursor-pointer hover:opacity-80 transition-opacity" 
                />
              </Link>
            </div>
            <MenuItems />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Versão desktop
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "fixed z-50 rounded-full w-8 h-8 bg-white",
          "hover:bg-gray-100 hover:text-gray-900",
          "border-gray-200 shadow-md",
          "transition-all duration-300 ease-in-out",
          "lg:left-[240px] lg:top-6",
          "left-4 top-4",
          isOpen && "lg:left-[240px]",
          !isOpen && "lg:left-[60px]"
        )}
        onClick={onToggle}
      >
        <div className="transition-transform duration-300 ease-in-out">
          {isOpen ? (
            <ChevronFirst size={18} className="text-gray-600" />
          ) : (
            <ChevronLast size={18} className="text-gray-600" />
          )}
        </div>
      </Button>

      <div className={cn(
        "fixed top-0 left-0 h-full z-40 bg-white shadow-lg transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16",
        className
      )}>
        <div className="h-full flex flex-col">
          <div className="bg-white p-4 flex items-center justify-center">
            <Link to="/home-limpeza">
              <img 
                src="/images/logo-sabara.png" 
                alt="Logo Hospital Sabará" 
                className={cn(
                  "transition-all duration-300 cursor-pointer hover:opacity-80",
                  isOpen ? "h-12" : "h-8",
                  "object-contain"
                )} 
              />
            </Link>
          </div>
          
          <MenuItems />
        </div>
      </div>
    </>
  );
}
