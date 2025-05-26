import { useState, useEffect } from 'react';
import { usePWA } from './usePWA';

interface UsePWAInstallModalReturn {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  dontShowAgain: () => void;
  shouldShowOnPage: (pageName: string) => boolean;
}

export const usePWAInstallModal = (): UsePWAInstallModalReturn => {
  const { isInstalled, isInstallable } = usePWA();
  const [showModal, setShowModal] = useState(false);

  // Chaves do localStorage
  const DONT_SHOW_KEY = 'pwa-install-dont-show';
  const LAST_SHOWN_KEY = 'pwa-install-last-shown';
  const VISIT_COUNT_KEY = 'pwa-install-visit-count';

  // Verificar se deve mostrar o modal
  const shouldShow = (): boolean => {
    // Não mostrar se já está instalado
    if (isInstalled) return false;

    // Verificar se usuário escolheu "não mostrar mais"
    const dontShow = localStorage.getItem(DONT_SHOW_KEY);
    if (dontShow === 'true') return false;

    return true;
  };

  // Verificar se deve mostrar em uma página específica
  const shouldShowOnPage = (pageName: string): boolean => {
    if (!shouldShow()) return false;

    // Sempre mostrar na página de tipo de cadastro (se não foi mostrado nos últimos 5 minutos)
    if (pageName === 'tipo-cadastro') {
      const lastShown = localStorage.getItem(LAST_SHOWN_KEY);
      const now = Date.now();
      
      if (lastShown) {
        const lastShownTime = parseInt(lastShown);
        const fiveMinutes = 5 * 60 * 1000; // 5 minutos em ms
        
        // Se foi mostrado há menos de 5 minutos, não mostrar
        if (now - lastShownTime < fiveMinutes) {
          return false;
        }
      }
      
      return true;
    }

    // Para outras páginas, verificar se é uma nova visita e se passou tempo suficiente
    const lastShown = localStorage.getItem(LAST_SHOWN_KEY);
    const now = Date.now();
    
    if (lastShown) {
      const lastShownTime = parseInt(lastShown);
      const fiveMinutes = 5 * 60 * 1000; // 5 minutos em ms
      
      // Se foi mostrado há menos de 5 minutos, não mostrar
      if (now - lastShownTime < fiveMinutes) {
        return false;
      }
    }

    // Para outras páginas, verificar contador de visitas
    const visitCount = localStorage.getItem(VISIT_COUNT_KEY);
    const currentCount = visitCount ? parseInt(visitCount) : 0;
    
    // Incrementar contador de visitas
    localStorage.setItem(VISIT_COUNT_KEY, (currentCount + 1).toString());
    
    // Mostrar a cada 3 visitas (se não foi mostrado recentemente)
    return currentCount > 0 && currentCount % 3 === 0;
  };

  // Abrir modal
  const openModal = (): void => {
    if (shouldShow()) {
      setShowModal(true);
      // Registrar quando foi mostrado
      localStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
    }
  };

  // Fechar modal
  const closeModal = (): void => {
    setShowModal(false);
  };

  // Não mostrar mais
  const dontShowAgain = (): void => {
    localStorage.setItem(DONT_SHOW_KEY, 'true');
    setShowModal(false);
  };

  // Limpar configurações se o app for desinstalado
  useEffect(() => {
    if (!isInstalled) {
      // Se o app não está instalado, limpar a flag "não mostrar mais"
      // para permitir que o modal apareça novamente
      const dontShow = localStorage.getItem(DONT_SHOW_KEY);
      if (dontShow === 'true') {
        // Verificar se realmente não está instalado há um tempo
        const lastShown = localStorage.getItem(LAST_SHOWN_KEY);
        if (lastShown) {
          const lastShownTime = parseInt(lastShown);
          const oneDay = 24 * 60 * 60 * 1000; // 1 dia em ms
          
          // Se passou mais de 1 dia, permitir mostrar novamente
          if (Date.now() - lastShownTime > oneDay) {
            localStorage.removeItem(DONT_SHOW_KEY);
          }
        }
      }
    } else {
      // Se está instalado, não mostrar o modal
      setShowModal(false);
    }
  }, [isInstalled]);

  // Auto-mostrar em desenvolvimento para testes
  useEffect(() => {
    if (import.meta.env.DEV && !isInstalled) {
      // Em desenvolvimento, mostrar após 3 segundos para testes
      const timer = setTimeout(() => {
        if (shouldShow()) {
          console.log('🔧 DEV MODE: Modal de instalação PWA disponível para teste');
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isInstalled]);

  return {
    showModal,
    openModal,
    closeModal,
    dontShowAgain,
    shouldShowOnPage
  };
}; 