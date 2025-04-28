
// Este serviço gerencia o armazenamento da logo no localStorage

// Definir um caminho padrão para a logo
const DEFAULT_LOGO = "/lovable-uploads/e964e47a-aeb1-4df7-bf5b-aeed2c4f2ac2.png";

export const getLogoUrl = (): string => {
  const savedLogo = localStorage.getItem('hospitalLogo');
  return savedLogo || DEFAULT_LOGO;
};

export const setLogoUrl = (logoUrl: string): void => {
  localStorage.setItem('hospitalLogo', logoUrl);
};

export const resetLogo = (): void => {
  localStorage.removeItem('hospitalLogo');
};
