import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Pill, Activity, MessageCircle, BookOpen, User, LogOut, Phone, ChevronFirst, ChevronLast, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface SidebarPacienteProps {
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarPaciente: React.FC<SidebarPacienteProps> = ({ className, isOpen, onToggle }) => {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Conteúdo do menu para ser reutilizado
  const MenuItems = () => (
    <>
      <nav className="flex-1 py-6 px-2 space-y-2">
        <Link 
          to="/home-paciente" 
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && setIsSheetOpen(false)}
        >
          <FileText size={20} className="min-w-[20px]" />
          <span className={cn(
            "ml-3",
            isMobile ? "opacity-100 inline" : isOpen ? "opacity-100 inline" : "opacity-0 hidden"
          )}>Consultas</span>
        </Link>
        
        <Link 
          to="/receitas-paciente" 
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && setIsSheetOpen(false)}
        >
          <Pill size={20} className="min-w-[20px]" />
          <span className={cn(
            "ml-3",
            isMobile ? "opacity-100 inline" : isOpen ? "opacity-100 inline" : "opacity-0 hidden"
          )}>Receitas</span>
        </Link>
        
        <Link 
          to="/exames-paciente" 
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && setIsSheetOpen(false)}
        >
          <Activity size={20} className="min-w-[20px]" />
          <span className={cn(
            "ml-3",
            isMobile ? "opacity-100 inline" : isOpen ? "opacity-100 inline" : "opacity-0 hidden"
          )}>Exames</span>
        </Link>
        
        <Link 
          to="/internacao-paciente" 
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && setIsSheetOpen(false)}
        >
          <Heart size={20} className="min-w-[20px]" />
          <span className={cn(
            "ml-3",
            isMobile ? "opacity-100 inline" : isOpen ? "opacity-100 inline" : "opacity-0 hidden"
          )}>Internação</span>
        </Link>

        <Link 
          to="/dicas-saude-paciente" 
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && setIsSheetOpen(false)}
        >
          <BookOpen size={20} className="min-w-[20px]" />
          <span className={cn(
            "ml-3",
            isMobile ? "opacity-100 inline" : isOpen ? "opacity-100 inline" : "opacity-0 hidden"
          )}>Dicas de Saúde</span>
        </Link>
      </nav>
      
      <div className="px-2 py-4">
        <p className={cn(
          "text-xs font-semibold text-gray-500 mb-4 px-3",
          isMobile ? "block" : isOpen ? "block" : "hidden"
        )}>ACCOUNT</p>
        
        <Link 
          to="/perfil-paciente" 
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && setIsSheetOpen(false)}
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
          onClick={() => isMobile && setIsSheetOpen(false)}
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
      <>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 left-4 z-50 rounded-full w-10 h-10 bg-white shadow-md hover:bg-gray-100"
            >
              <Menu size={20} className="text-gray-700" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            <div className="h-full flex flex-col">
              <div className="bg-white p-4 flex items-center justify-center">
                <img 
                  src="/images/logo-sabara.png" 
                  alt="Logo Hospital Sabará" 
                  className="h-12 object-contain" 
                />
              </div>
              <MenuItems />
            </div>
          </SheetContent>
        </Sheet>
      </>
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
            <img 
              src="/images/logo-sabara.png" 
              alt="Logo Hospital Sabará" 
              className={cn(
                "transition-all duration-300",
                isOpen ? "h-12" : "h-8",
                "object-contain"
              )} 
            />
          </div>
          
          <MenuItems />
        </div>
      </div>
    </>
  );
};

export default SidebarPaciente;
