
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

interface CartaoProtocolosManutencaoProps {
  titulo: string;
  descricao: string;
  categoria: string;
}

export const CartaoProtocolosManutencao: React.FC<CartaoProtocolosManutencaoProps> = ({ 
  titulo, 
  descricao, 
  categoria 
}) => {
  return (
    <Card className="border shadow-sm h-full hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col items-center justify-center p-8">
          <div className="bg-blue-100 rounded-full p-4 mb-4">
            <FileText size={48} className="text-blue-500" />
          </div>
          
          <h2 className="text-xl font-semibold text-center mb-2">{titulo}</h2>
          <p className="text-gray-600 text-center mb-4">{descricao}</p>
          
          <div className="bg-gray-100 px-3 py-1 rounded-full mb-4 text-sm">
            {categoria}
          </div>
          
          <Link to="#" className="text-blue-500 text-sm font-medium hover:underline">
            Ver detalhes
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
