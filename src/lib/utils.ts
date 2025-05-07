import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para gerar as classes CSS do layout principal com base no estado da sidebar e se é mobile
export function getMainContentClasses(isSidebarOpen: boolean, isMobile: boolean) {
  return cn(
    "flex-1 flex flex-col overflow-hidden",
    "transition-all duration-300 ease-in-out",
    !isMobile && (isSidebarOpen ? "ml-64" : "ml-16"),
    isMobile && "ml-0"
  );
}
