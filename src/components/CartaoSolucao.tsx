
import React from 'react';
import { MessageSquare, Calendar, FileText } from 'lucide-react';

interface CartaoSolucaoProps {
  titulo: string;
  descricao: string;
  tipo: 'comunicacao' | 'agilidade' | 'acesso';
}

const CartaoSolucao: React.FC<CartaoSolucaoProps> = ({ titulo, descricao, tipo }) => {
  const getIcone = () => {
    switch (tipo) {
      case 'comunicacao':
        return <MessageSquare className="h-12 w-12 text-white" />;
      case 'agilidade':
        return <Calendar className="h-12 w-12 text-white" />;
      case 'acesso':
        return <FileText className="h-12 w-12 text-white" />;
      default:
        return <MessageSquare className="h-12 w-12 text-white" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full">
      <div className="bg-sabara-blue rounded-full p-4 inline-flex items-center justify-center mb-6">
        {getIcone()}
      </div>
      <h3 className="text-xl font-semibold mb-4">{titulo}</h3>
      <p className="text-gray-600">{descricao}</p>
    </div>
  );
};

export default CartaoSolucao;
