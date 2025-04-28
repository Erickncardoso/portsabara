
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export const CartaoSolicitacoesManutencao: React.FC = () => {
  return (
    <Card className="border shadow-sm h-full hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col items-center justify-center p-8">
          <div className="bg-red-100 rounded-full p-4 mb-4">
            <div className="relative">
              <Calendar size={48} className="text-red-500" />
              
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">
                31
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-center mb-4">Ver Solicitações</h2>
          
          <Link to="#" className="text-blue-500 text-sm font-medium hover:underline">
            Ver detalhes
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
