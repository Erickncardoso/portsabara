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
    if (pathname.includes('/home-')) return 'home-area';
    if (pathname.includes('/perfil-')) return 'perfil';
    if (pathname.includes('/exames-')) return 'exames';
    if (pathname.includes('/consultas-')) return 'consultas';
    if (pathname.includes('/receitas-')) return 'receitas';
    if (pathname.includes('/internacao-')) return 'internacao';
    if (pathname.includes('/leitos-')) return 'leitos';
    if (pathname.includes('/prescricoes-')) return 'prescricoes';
    if (pathname.includes('/procedimentos-')) return 'procedimentos';
    if (pathname.includes('/agenda-')) return 'agenda';
    if (pathname.includes('/tarefas-')) return 'tarefas';
    if (pathname.includes('/historico-')) return 'historico';
    if (pathname.includes('/inventario-')) return 'inventario';
    if (pathname.includes('/protocolos-')) return 'protocolos';
    if (pathname.includes('/quartos-')) return 'quartos';
    if (pathname.includes('/solicitacoes-')) return 'solicitacoes';
    if (pathname.includes('/medicamentos-')) return 'medicamentos';
    if (pathname.includes('/pacientes-')) return 'pacientes';
    if (pathname.includes('/admin-')) return 'admin';
    if (pathname.includes('/dicas-')) return 'dicas';
    return 'other';
  };

  // Verificar se deve mostrar o modal quando a rota mudar
  useEffect(() => {
    const pageName = getPageName(location.pathname);
    
    // Timing específico para cada página
    let delay = 2000; // 2 segundos para todas as páginas
    
    // Timing especial para página principal
    if (pageName === 'tipo-cadastro') {
      delay = 2000; // 2 segundos para página tipo-cadastro
    }
    
    const timer = setTimeout(() => {
      if (shouldShowOnPage(pageName)) {
        openModal();
      }
    }, delay);

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