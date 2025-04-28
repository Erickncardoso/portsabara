
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getLogoUrl } from '../services/logoService';
import MenuNavegacao from './MenuNavegacao';

const Cabecalho: React.FC = () => {
  const location = useLocation();
  const logoUrl = getLogoUrl();
  const isLandingPage = location.pathname === '/';
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src={logoUrl}
            alt="Logo Hospital Sabará" 
            className="h-8 md:h-12 object-contain" 
          />
        </Link>
        
        {isLandingPage && <MenuNavegacao />}
      </div>
    </header>
  );
};

export default Cabecalho;
