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

  // Verificar se deve mostrar o modal
  const shouldShow = (): boolean => {
    // Não mostrar se já está instalado
    if (isInstalled) return false;

    // Verificar se usuário escolheu "não mostrar mais"
    const dontShow = localStorage.getItem(DONT_SHOW_KEY);
    if (dontShow === 'true') return false;

    // SEMPRE MOSTRAR se não está instalado e usuário não escolheu "não mostrar mais"
    return true;
  };

  // Verificar se deve mostrar em uma página específica
  const shouldShowOnPage = (pageName: string): boolean => {
    if (!shouldShow()) return false;

    // REMOVER verificação de intervalo de 5 minutos
    // O modal deve aparecer sempre ao recarregar, independente do tempo

    // MOSTRAR EM TODAS AS PÁGINAS sempre que recarregar
    // Apenas respeitando se usuário escolheu "não mostrar mais"
    return true;
  };

  // Abrir modal
  const openModal = (): void => {
    if (shouldShow()) {
      setShowModal(true);
      // Registrar quando foi mostrado (para analytics, se necessário)
      localStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
      console.log('📱 Modal PWA aberto - aparece sempre ao recarregar');
    }
  };

  // Fechar modal (NÃO impede de aparecer novamente)
  const closeModal = (): void => {
    setShowModal(false);
    console.log('❌ Modal PWA fechado - aparecerá novamente ao recarregar');
  };

  // Não mostrar mais (ÚNICA forma de impedir o modal)
  const dontShowAgain = (): void => {
    localStorage.setItem(DONT_SHOW_KEY, 'true');
    setShowModal(false);
    console.log('🚫 Modal PWA: "Não mostrar mais" - não aparecerá mais');
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
            console.log('🔄 PWA: Resetando "não mostrar mais" após 1 dia sem instalação');
          }
        }
      }
    } else {
      // Se está instalado, não mostrar o modal
      setShowModal(false);
      console.log('✅ PWA instalada - Modal de instalação desabilitado');
    }
  }, [isInstalled]);

  // Auto-mostrar em desenvolvimento para testes
  useEffect(() => {
    if (import.meta.env.DEV && !isInstalled) {
      // Em desenvolvimento, mostrar após 3 segundos para testes
      const timer = setTimeout(() => {
        if (shouldShow()) {
          console.log('🔧 DEV MODE: Modal de instalação PWA disponível para teste');
          console.log('🔄 NOVO COMPORTAMENTO: Modal aparece sempre ao recarregar (exceto "não mostrar mais")');
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