import { useState, useEffect } from "react";
import { usePWA } from "./usePWA";

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
  const DONT_SHOW_KEY = "pwa-install-dont-show";
  const LAST_CLOSED_KEY = "pwa-install-last-closed"; // Para o X (3 min)
  const LAST_DISMISSED_KEY = "pwa-install-last-dismissed"; // Para "agora não" (5 min)
  const PERMANENT_DISMISS_KEY = "pwa-install-permanent-dismiss"; // Para "não mostrar mais"

  // Intervalos em millisegundos
  const CLOSE_COOLDOWN = 3 * 60 * 1000; // 3 minutos para X
  const DISMISS_COOLDOWN = 5 * 60 * 1000; // 5 minutos para "agora não"

  // Verificar se deve mostrar o modal
  const shouldShow = (): boolean => {
    // Não mostrar se já está instalado
    if (isInstalled) return false;

    // Verificar se usuário escolheu "não mostrar mais" permanentemente
    const permanentDismiss = localStorage.getItem(PERMANENT_DISMISS_KEY);
    if (permanentDismiss === "true") return false;

    const now = Date.now();

    // Verificar cooldown do X (3 minutos)
    const lastClosed = localStorage.getItem(LAST_CLOSED_KEY);
    if (lastClosed) {
      const lastClosedTime = parseInt(lastClosed);
      if (now - lastClosedTime < CLOSE_COOLDOWN) {
        console.log(
          `⏱️ Modal PWA: Aguardando ${Math.ceil(
            (CLOSE_COOLDOWN - (now - lastClosedTime)) / 60000
          )} min para mostrar novamente (fechado com X)`
        );
        return false;
      }
    }

    // Verificar cooldown do "agora não" (5 minutos)
    const lastDismissed = localStorage.getItem(LAST_DISMISSED_KEY);
    if (lastDismissed) {
      const lastDismissedTime = parseInt(lastDismissed);
      if (now - lastDismissedTime < DISMISS_COOLDOWN) {
        console.log(
          `⏱️ Modal PWA: Aguardando ${Math.ceil(
            (DISMISS_COOLDOWN - (now - lastDismissedTime)) / 60000
          )} min para mostrar novamente (agora não)`
        );
        return false;
      }
    }

    return true;
  };

  // Verificar se deve mostrar em uma página específica
  const shouldShowOnPage = (pageName: string): boolean => {
    return shouldShow();
  };

  // Abrir modal
  const openModal = (): void => {
    if (shouldShow()) {
      setShowModal(true);
      console.log("📱 Modal PWA aberto");
    }
  };

  // Fechar modal com X (cooldown de 3 minutos)
  const closeModal = (): void => {
    setShowModal(false);
    localStorage.setItem(LAST_CLOSED_KEY, Date.now().toString());
    console.log(
      "❌ Modal PWA fechado com X - aparecerá novamente em 3 minutos"
    );
  };

  // "Agora não" (cooldown de 5 minutos)
  const dismissForNow = (): void => {
    setShowModal(false);
    localStorage.setItem(LAST_DISMISSED_KEY, Date.now().toString());
    console.log('⏭️ Modal PWA: "Agora não" - aparecerá novamente em 5 minutos');
  };

  // Não mostrar mais (permanente)
  const dontShowAgain = (): void => {
    localStorage.setItem(PERMANENT_DISMISS_KEY, "true");
    setShowModal(false);
    // Limpar outros timers
    localStorage.removeItem(LAST_CLOSED_KEY);
    localStorage.removeItem(LAST_DISMISSED_KEY);
    console.log('🚫 Modal PWA: "Não mostrar mais" - não aparecerá mais');
  };

  // Limpar configurações se o app for instalado
  useEffect(() => {
    if (isInstalled) {
      setShowModal(false);
      // Limpar todas as configurações quando instalado
      localStorage.removeItem(DONT_SHOW_KEY);
      localStorage.removeItem(LAST_CLOSED_KEY);
      localStorage.removeItem(LAST_DISMISSED_KEY);
      localStorage.removeItem(PERMANENT_DISMISS_KEY);
      console.log(
        "✅ PWA instalada - Modal de instalação desabilitado e configurações limpas"
      );
    }
  }, [isInstalled]);

  // Configurar timers automáticos para reexibir o modal
  useEffect(() => {
    if (!showModal && !isInstalled) {
      const now = Date.now();
      let nextShowTime = null;

      // Verificar qual timer deve ser aplicado
      const lastClosed = localStorage.getItem(LAST_CLOSED_KEY);
      const lastDismissed = localStorage.getItem(LAST_DISMISSED_KEY);

      if (lastClosed) {
        const lastClosedTime = parseInt(lastClosed);
        const closeShowTime = lastClosedTime + CLOSE_COOLDOWN;
        if (closeShowTime > now) {
          nextShowTime = closeShowTime;
        }
      }

      if (lastDismissed) {
        const lastDismissedTime = parseInt(lastDismissed);
        const dismissShowTime = lastDismissedTime + DISMISS_COOLDOWN;
        if (
          dismissShowTime > now &&
          (!nextShowTime || dismissShowTime > nextShowTime)
        ) {
          nextShowTime = dismissShowTime;
        }
      }

      // Configurar timer para o próximo show
      if (nextShowTime && shouldShow()) {
        const delay = nextShowTime - now;
        console.log(
          `⏰ Timer configurado para mostrar modal PWA em ${Math.ceil(
            delay / 60000
          )} minutos`
        );

        const timer = setTimeout(() => {
          if (shouldShow()) {
            openModal();
          }
        }, delay);

        return () => clearTimeout(timer);
      }
    }
  }, [showModal, isInstalled]);

  return {
    showModal,
    openModal,
    closeModal, // Fecha com X (3 min cooldown)
    dontShowAgain: dismissForNow, // Renomeado para ser mais claro - "agora não" (5 min cooldown)
    shouldShowOnPage,
  };
};
