import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';
import { getLogoUrl } from '../services/logoService';
import { User, UserRound, Hospital, Wrench, LogIn, UserPlus } from 'lucide-react';
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
        return <Wrench className="mr-2" />;
      default:
        return <User className="mr-2" />;
    }
  };
  
  const getLoginUrl = () => {
    if (tipo === 'paciente') return '/login-paciente';
    if (tipo === 'medico') return '/login-medico';
    if (tipo === 'enfermeiro') return '/login-enfermeiro';
    if (tipo === 'manutencao') return '/login-manutencao';
    if (tipo === 'limpeza') return '/login-limpeza';
    return '/login';
  };
  
  const getCadastroUrl = () => {
    if (tipo === 'paciente') return '/cadastro-paciente';
    if (tipo === 'medico') return '/cadastro-medico';
    if (tipo === 'enfermeiro') return '/cadastro-enfermeiro';
    if (tipo === 'manutencao') return '/cadastro-manutencao';
    if (tipo === 'limpeza') return '/cadastro-limpeza';
    return `/cadastro?tipo=${tipo}`;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md rounded-xl border-none shadow-lg">
        <DialogHeader className="flex items-center">
          <DialogTitle className="flex items-center justify-center text-xl font-semibold">
            {getTipoIcon()} Área do {titulo}
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
          
          <Button 
            variant="outline" 
            className="border-green-500 text-green-500 hover:bg-green-50 h-12 gap-2 text-base rounded-xl shadow-sm hover:shadow-md transition-all"
            asChild
          >
            <Link to={getCadastroUrl()}>
              <UserPlus /> Cadastrar
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
  
  const logoUrl = getLogoUrl();
  
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
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-grow py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white/90 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-100">
            <div className="flex justify-center mb-10">
              <img src='/images/logo-sabara.png' alt="Logo Hospital Sabará" className="h-20" />
            </div>
            
            <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Escolha o tipo do cadastro</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
                  icon={<Wrench size={48} />} 
                  titulo="Manutenção"
                  onClick={() => openModal('manutencao', 'Manutenção', <Wrench size={48} />)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:col-start-2 lg:col-end-4 gap-8 mb-12">
              <div>
                <TipoCard 
                  icon={<Wrench size={48} />} 
                  titulo="Limpeza"
                  onClick={() => openModal('limpeza', 'Limpeza', <Wrench size={48} />)}
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button asChild className="bg-sabara-blue hover:bg-blue-600 flex items-center gap-2 rounded-xl transition-all shadow-md hover:shadow-lg px-6 py-2">
                <Link to="/">
                  Voltar para Home
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <TipoModal 
        isOpen={modalData.isOpen}
        onClose={closeModal}
        titulo={modalData.titulo}
        tipo={modalData.tipo}
      />
      
      <Rodape />
    </div>
  );
};

export default TipoCadastro;
