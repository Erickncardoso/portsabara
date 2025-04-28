
import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const MenuNavegacao: React.FC = () => {
  const isMobile = useIsMobile();

  const NavItems = () => (
    <>
      <a href="#inicio" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-sabara-blue transition-colors">
        Home
      </a>
      <a href="#sobre" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-sabara-blue transition-colors">
        Sobre
      </a>
      <a href="#dores" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-sabara-blue transition-colors">
        Dores
      </a>
      <a href="#areas" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-sabara-blue transition-colors">
        Áreas
      </a>
      <a href="#solucao" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-sabara-blue transition-colors">
        Solução
      </a>
      <Link to="/tipo-cadastro" className="ml-3 px-4 py-2 text-sm font-medium text-white bg-sabara-blue rounded-md hover:bg-blue-600 transition-colors">
        Cadastre-se
      </Link>
    </>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2 text-gray-700 hover:text-sabara-blue">
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[250px]">
          <nav className="flex flex-col space-y-4 mt-8">
            <NavItems />
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden md:flex items-center space-x-1 md:space-x-4">
      <NavItems />
    </nav>
  );
};

export default MenuNavegacao;
