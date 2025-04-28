
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  History, 
  Package, 
  FileText,
  User, 
  LogOut, 
  Phone,
  ChevronFirst,
  ChevronLast
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarManutencaoProps {
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarManutencao: React.FC<SidebarManutencaoProps> = ({ className, isOpen, onToggle }) => {
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
          
          <nav className="flex-1 py-6 px-2 space-y-2">
            <Link 
              to="/tarefas-manutencao" 
              className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <CheckSquare size={20} className="min-w-[20px]" />
              <span className={cn(
                "ml-3 transition-all duration-300",
                isOpen ? "opacity-100 inline" : "opacity-0 hidden"
              )}>Tarefas</span>
            </Link>
            
            <Link 
              to="/historico-manutencao" 
              className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <History size={20} className="min-w-[20px]" />
              <span className={cn(
                "ml-3 transition-all duration-300",
                isOpen ? "opacity-100 inline" : "opacity-0 hidden"
              )}>Histórico</span>
            </Link>
            
            <Link 
              to="/inventario-manutencao" 
              className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Package size={20} className="min-w-[20px]" />
              <span className={cn(
                "ml-3 transition-all duration-300",
                isOpen ? "opacity-100 inline" : "opacity-0 hidden"
              )}>Inventário</span>
            </Link>
            
            <Link 
              to="/protocolos-manutencao" 
              className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <FileText size={20} className="min-w-[20px]" />
              <span className={cn(
                "ml-3 transition-all duration-300",
                isOpen ? "opacity-100 inline" : "opacity-0 hidden"
              )}>Protocolos</span>
            </Link>
          </nav>
          
          <div className="px-2 py-4">
            <p className={cn(
              "text-xs font-semibold text-gray-500 mb-4 px-3",
              isOpen ? "block" : "hidden"
            )}>ACCOUNT</p>
            
            <Link 
              to="/perfil-manutencao" 
              className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <User size={20} className="min-w-[20px]" />
              <span className={cn(
                "ml-3 transition-all duration-300",
                isOpen ? "opacity-100 inline" : "opacity-0 hidden"
              )}>Perfil</span>
            </Link>
            
            <Link 
              to="/" 
              className="flex items-center px-3 py-3 text-blue-600 hover:bg-gray-100 rounded-md"
            >
              <LogOut size={20} className="min-w-[20px]" />
              <span className={cn(
                "ml-3 transition-all duration-300",
                isOpen ? "opacity-100 inline" : "opacity-0 hidden"
              )}>Sair</span>
            </Link>
          </div>
          
          <div className={cn(
            "px-6 py-4 border-t",
            isOpen ? "block" : "hidden"
          )}>
            <div className="flex items-center text-blue-600 text-sm">
              <Phone size={18} className="mr-2" />
              <div>
                <p className="font-semibold">Número de emergência:</p>
                <p>+55 (11) xxxx - xxxx</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarManutencao;
