
import React from 'react';
import { Clock, Send, FileSearch, Users, Pill, PackageOpen, Building } from 'lucide-react';

interface CartaoInformativoProps {
  titulo: string;
  descricao: string;
  tipo: 'realizacao' | 'comunicacao' | 'paciente' | 'farmacia' | 'fluxo' | 'organizacao' | 'generico';
}

const CartaoInformativo: React.FC<CartaoInformativoProps> = ({ titulo, descricao, tipo }) => {
  const getIcone = () => {
    switch (tipo) {
      case 'realizacao':
        return <FileSearch className="h-12 w-12 text-sabara-blue" />;
      case 'comunicacao':
        return <Send className="h-12 w-12 text-sabara-blue" />;
      case 'paciente':
        return <Users className="h-12 w-12 text-sabara-blue" />;
      case 'farmacia':
        return <Pill className="h-12 w-12 text-sabara-blue" />;
      case 'fluxo':
        return <PackageOpen className="h-12 w-12 text-sabara-blue" />;
      case 'organizacao':
        return <Building className="h-12 w-12 text-sabara-blue" />;
      default:
        return <Clock className="h-12 w-12 text-sabara-blue" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full">
      <div className="mb-4">
        {getIcone()}
      </div>
      <h3 className="text-lg font-semibold mb-3">{titulo}</h3>
      <p className="text-gray-600">{descricao}</p>
    </div>
  );
};

export default CartaoInformativo;
