import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '../hooks/use-mobile';

interface HeaderFarmaciaProps {
  nome?: string;
}

interface PerfilData {
  nome: string;
  foto?: string;
}

const HeaderFarmacia: React.FC<HeaderFarmaciaProps> = ({ 
  nome = 'Farmacêutico(a) Responsável'
}) => {
  const isMobile = useIsMobile();
  const [perfilData, setPerfilData] = useState<PerfilData>({ nome });

  useEffect(() => {
    const savedPerfil = localStorage.getItem('perfilFarmacia');
    if (savedPerfil) {
      const data = JSON.parse(savedPerfil);
      setPerfilData({
        nome: data.nome,
        foto: data.foto
      });
    }

    // Listener para atualizações no localStorage
    const handleStorageChange = () => {
      const updatedPerfil = localStorage.getItem('perfilFarmacia');
      if (updatedPerfil) {
        const data = JSON.parse(updatedPerfil);
        setPerfilData({
          nome: data.nome,
          foto: data.foto
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return (
    <div className="bg-gradient-to-r from-white to-blue-50 w-full">
      <div className="px-3 sm:px-6 py-3">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">INÍCIO</h1>
            
            <div className="flex items-center gap-3 sm:gap-6">
              <button className="relative p-2 hover:bg-blue-50 rounded-full transition-all duration-200">
                <Bell size={isMobile ? 18 : 22} className="text-blue-500" />
                <span className="absolute top-0 right-0 bg-red-500 h-2 w-2 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 sm:h-11 sm:w-11 border-2 border-blue-200 shadow-sm">
                  {perfilData.foto ? (
                    <AvatarImage src={perfilData.foto} alt={perfilData.nome} />
                  ) : (
                    <AvatarFallback className="bg-blue-50 text-blue-500">
                      {perfilData.nome.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="text-right">
                  <p className="font-bold text-sm sm:text-base text-gray-800">{perfilData.nome}</p>
                  <p className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full inline-block">FARMÁCIA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderFarmacia;
