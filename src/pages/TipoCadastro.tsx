import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, UserRound, Hospital, Wrench, LogIn, UserPlus, Pill, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

interface ModalData {
  isOpen: boolean;
  tipo: string;
  titulo: string;
  icone: React.ReactNode;
}

const TipoCard: React.FC<{ 
  icon: React.ReactNode; 
  titulo: string;
  onClick: () => void;
}> = ({ icon, titulo, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-xl hover:shadow-lg hover:border-sabara-blue transition-all cursor-pointer bg-white/80 hover:bg-white hover:scale-105 transform duration-300"
      onClick={onClick}
    >
      <div className="text-sabara-blue mb-4 flex justify-center bg-blue-50 p-4 rounded-full">
        {icon}
      </div>
      <span className="text-gray-700 font-medium">{titulo}</span>
    </div>
  );
};

const TipoModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
  titulo: string;
  tipo: string;
}> = ({ isOpen, onClose, titulo, tipo }) => {
  const getTipoIcon = () => {
    switch(tipo) {
      case 'paciente':
        return <User className="mr-2" />;
      case 'medico':
        return <UserRound className="mr-2" />;
      case 'enfermeiro':
        return <Hospital className="mr-2" />;
      case 'manutencao':
        return <Wrench className="mr-2" />;
      case 'limpeza':
        return <Trash2 className="mr-2" />;
      case 'farmacia':
        return <Pill className="mr-2" />;
      default:
        return <User className="mr-2" />;
    }
  };
  
  const getArtigo = () => {
    if (tipo === 'farmacia' || tipo === 'manutencao' || tipo === 'limpeza') {
      return 'da';
    }
    return 'do';
  };
  
  const getLoginUrl = () => {
    if (tipo === 'paciente') return '/login-paciente';
    if (tipo === 'medico') return '/login-medico';
    if (tipo === 'enfermeiro') return '/login-enfermeiro';
    if (tipo === 'manutencao') return '/login-manutencao';
    if (tipo === 'limpeza') return '/login-limpeza';
    if (tipo === 'farmacia') return '/login-farmacia';
    return '/login';
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md rounded-xl border-none shadow-lg">
        <DialogHeader className="flex items-center">
          <DialogTitle className="flex items-center justify-center text-xl font-semibold">
            {getTipoIcon()} Área {getArtigo()} {titulo}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-6">
          <Button 
            className="bg-green-500 hover:bg-green-600 h-12 text-white gap-2 text-base rounded-xl shadow-md hover:shadow-lg transition-all"
            asChild
          >
            <Link to={getLoginUrl()}>
              <LogIn /> Fazer Login
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const TipoCadastro: React.FC = () => {
  const [modalData, setModalData] = useState<ModalData>({
    isOpen: false,
    tipo: '',
    titulo: '',
    icone: null
  });
  
  const openModal = (tipo: string, titulo: string, icone: React.ReactNode) => {
    setModalData({
      isOpen: true,
      tipo,
      titulo,
      icone
    });
  };
  
  const closeModal = () => {
    setModalData({
      ...modalData,
      isOpen: false
    });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/90 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-100">
          <div className="flex justify-center mb-8">
            <Link to="/">
              <img src='/images/logo-sabara.png' alt="Logo PortAll" className="h-10 md:h-14 cursor-pointer hover:opacity-80 transition-opacity" />
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Escolha o tipo do login</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <TipoCard 
                icon={<User size={48} />} 
                titulo="Paciente"
                onClick={() => openModal('paciente', 'Paciente', <User size={48} />)}
              />
            </div>
            <div>
              <TipoCard 
                icon={<UserRound size={48} />} 
                titulo="Médico"
                onClick={() => openModal('medico', 'Médico', <UserRound size={48} />)}
              />
            </div>
            <div>
              <TipoCard 
                icon={<Hospital size={48} />} 
                titulo="Enfermeiro(a)"
                onClick={() => openModal('enfermeiro', 'Enfermeiro(a)', <Hospital size={48} />)}
              />
            </div>
            <div>
              <TipoCard 
                icon={<Pill size={48} />} 
                titulo="Farmácia"
                onClick={() => openModal('farmacia', 'Farmácia', <Pill size={48} />)}
              />
            </div>
            <div>
              <TipoCard 
                icon={<Wrench size={48} />} 
                titulo="Manutenção"
                onClick={() => openModal('manutencao', 'Manutenção', <Wrench size={48} />)}
              />
            </div>
            <div>
              <TipoCard 
                icon={<Trash2 size={48} />} 
                titulo="Limpeza"
                onClick={() => openModal('limpeza', 'Limpeza', <Trash2 size={48} />)}
              />
            </div>
          </div>
        </div>
      </div>

      <TipoModal 
        isOpen={modalData.isOpen}
        onClose={closeModal}
        titulo={modalData.titulo}
        tipo={modalData.tipo}
      />
    </div>
  );
};

export default TipoCadastro;
