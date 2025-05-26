import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PWAInstallModal from './PWAInstallModal';
import { usePWAInstallModal } from '@/hooks/usePWAInstallModal';

interface PWAInstallProviderProps {
  children: React.ReactNode;
}

export const PWAInstallProvider: React.FC<PWAInstallProviderProps> = ({ children }) => {
  const location = useLocation();
  const {
    showModal,
    openModal,
    closeModal,
    dontShowAgain,
    shouldShowOnPage
  } = usePWAInstallModal();

  // Mapear rotas para nomes de páginas
  const getPageName = (pathname: string): string => {
    if (pathname === '/tipo-cadastro') return 'tipo-cadastro';
    if (pathname === '/') return 'home';
    if (pathname.includes('/login')) return 'login';
    if (pathname.includes('/cadastro')) return 'cadastro';
    return 'other';
  };

  // Verificar se deve mostrar o modal quando a rota mudar
  useEffect(() => {
    const pageName = getPageName(location.pathname);
    
    // Aguardar um pouco para a página carregar
    const timer = setTimeout(() => {
      if (shouldShowOnPage(pageName)) {
        openModal();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.pathname, shouldShowOnPage, openModal]);

  return (
    <>
      {children}
      <PWAInstallModal
        isOpen={showModal}
        onClose={closeModal}
        onDontShowAgain={dontShowAgain}
      />
    </>
  );
};

export default PWAInstallProvider; 