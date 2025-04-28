
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export const CartaoSolicitacoes: React.FC = () => {
  return (
    <Card className="border shadow-sm h-full hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col items-center justify-center p-8">
          <div className="bg-red-100 rounded-full p-4 mb-4">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                <path d="M16 2v4"></path>
                <path d="M8 2v4"></path>
                <path d="M3 10h18"></path>
              </svg>
              
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
