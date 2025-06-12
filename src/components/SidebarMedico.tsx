import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  FileText,
  Activity,
  Hospital,
  User,
  LogOut,
  Phone,
  ChevronFirst,
  ChevronLast,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SidebarMedicoProps {
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
  isSheetOpen?: boolean;
  onSheetOpenChange?: (open: boolean) => void;
  nome?: string;
  tipo?: string;
}

// Função para extrair as iniciais do nome
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const SidebarMedico: React.FC<SidebarMedicoProps> = ({
  className,
  isOpen,
  onToggle,
  isSheetOpen = false,
  onSheetOpenChange,
  nome = "ROBERT",
  tipo = "MÉDICO",
}) => {
  const isMobile = useIsMobile();

  // Conteúdo do menu para ser reutilizado
  const MenuItems = () => (
    <>
      {/* Seção do Perfil */}
      <div
        className={cn(
          "px-4 py-4 border-b border-gray-200",
          isMobile ? "block" : isOpen ? "block" : "hidden"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm border border-gray-200 flex-shrink-0">
            {getInitials(nome)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-gray-900 text-sm truncate">{nome}</p>
            <p className="text-xs text-red-500 truncate">{tipo}</p>
          </div>
        </div>
      </div>

      {/* Avatar apenas quando sidebar fechada */}
      <div
        className={cn(
          "px-2 py-4 flex justify-center",
          isMobile ? "hidden" : isOpen ? "hidden" : "block"
        )}
      >
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs border border-gray-200">
          {getInitials(nome)}
        </div>
      </div>

      <nav className="flex-1 py-2 px-2 space-y-2">
        <Link
          to="/consultas-medico"
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && onSheetOpenChange?.(false)}
        >
          <Calendar size={20} className="min-w-[20px]" />
          <span
            className={cn(
              "ml-3",
              isMobile
                ? "opacity-100 inline"
                : isOpen
                ? "opacity-100 inline"
                : "opacity-0 hidden"
            )}
          >
            Consultas
          </span>
        </Link>

        <Link
          to="/receitas-medico"
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && onSheetOpenChange?.(false)}
        >
          <FileText size={20} className="min-w-[20px]" />
          <span
            className={cn(
              "ml-3",
              isMobile
                ? "opacity-100 inline"
                : isOpen
                ? "opacity-100 inline"
                : "opacity-0 hidden"
            )}
          >
            Receitas
          </span>
        </Link>

        <Link
          to="/exames-medico"
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && onSheetOpenChange?.(false)}
        >
          <Activity size={20} className="min-w-[20px]" />
          <span
            className={cn(
              "ml-3",
              isMobile
                ? "opacity-100 inline"
                : isOpen
                ? "opacity-100 inline"
                : "opacity-0 hidden"
            )}
          >
            Exames
          </span>
        </Link>

        <Link
          to="/internacao-medico"
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && onSheetOpenChange?.(false)}
        >
          <Hospital size={20} className="min-w-[20px]" />
          <span
            className={cn(
              "ml-3",
              isMobile
                ? "opacity-100 inline"
                : isOpen
                ? "opacity-100 inline"
                : "opacity-0 hidden"
            )}
          >
            Internação
          </span>
        </Link>
      </nav>

      <div className="px-2 py-4">
        <p
          className={cn(
            "text-xs font-semibold text-gray-500 mb-4 px-3",
            isMobile ? "block" : isOpen ? "block" : "hidden"
          )}
        >
          CONTA
        </p>

        <Link
          to="/perfil-medico"
          className="flex items-center px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && onSheetOpenChange?.(false)}
        >
          <User size={20} className="min-w-[20px]" />
          <span
            className={cn(
              "ml-3",
              isMobile
                ? "opacity-100 inline"
                : isOpen
                ? "opacity-100 inline"
                : "opacity-0 hidden"
            )}
          >
            Perfil
          </span>
        </Link>

        <Link
          to="/"
          className="flex items-center px-3 py-3 text-blue-600 hover:bg-gray-100 rounded-md"
          onClick={() => isMobile && onSheetOpenChange?.(false)}
        >
          <LogOut size={20} className="min-w-[20px]" />
          <span
            className={cn(
              "ml-3",
              isMobile
                ? "opacity-100 inline"
                : isOpen
                ? "opacity-100 inline"
                : "opacity-0 hidden"
            )}
          >
            Sair
          </span>
        </Link>
      </div>

      <div
        className={cn(
          "px-6 py-4 border-t",
          isMobile ? "block" : isOpen ? "block" : "hidden"
        )}
      >
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
              <Link
                to="/home-medico"
                onClick={() => onSheetOpenChange?.(false)}
              >
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

      <div
        className={cn(
          "fixed top-0 left-0 h-full z-40 bg-white shadow-lg transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-16",
          className
        )}
      >
        <div className="h-full flex flex-col">
          <div className="bg-white p-4 flex items-center justify-center">
            <Link to="/home-medico">
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
};

export default SidebarMedico;
