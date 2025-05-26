import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';
import { usePWA } from '../hooks/usePWA';
import { Menu, Download } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const MenuNavegacao: React.FC = () => {
  const isMobile = useIsMobile();
  const { isInstallable, installApp, isInstalled } = usePWA();

  const handleInstall = async () => {
    try {
      await installApp();
    } catch (error) {
      console.error('Erro ao instalar PWA:', error);
    }
  };

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
      {(isInstallable || import.meta.env.DEV) && !isInstalled && (
        <Button
          onClick={handleInstall}
          size="sm"
          variant="outline"
          className="ml-2 text-xs"
        >
          <Download className="w-3 h-3 mr-1" />
          Instalar App
        </Button>
      )}
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
