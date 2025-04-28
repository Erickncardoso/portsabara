
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Limpeza {
  id: string;
  medico: {
    nome: string;
    imagem: string;
    especialidade: string;
  };
  quarto: string;
  data: string;
  status: 'aprovado' | 'rejeitado';
}

export const TabelaHistoricoLimpezas: React.FC = () => {
  const limpezas: Limpeza[] = [
    {
      id: '1',
      medico: {
        nome: 'Shyam Khanna',
        imagem: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShyamKhanna',
        especialidade: 'Heart Disease',
      },
      quarto: '301',
      data: '27/12',
      status: 'aprovado'
    },
    {
      id: '2',
      medico: {
        nome: 'Jean Lee Lin',
        imagem: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JeanLeeLin',
        especialidade: 'Heart Disease',
      },
      quarto: '302',
      data: '27/12',
      status: 'aprovado'
    },
    {
      id: '3',
      medico: {
        nome: 'Clara Brook',
        imagem: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ClaraBrook',
        especialidade: 'Heart Disease',
      },
      quarto: '303',
      data: '27/12',
      status: 'rejeitado'
    }
  ];

  return (
    <Card className="shadow-sm border">
      <CardHeader className="bg-white pb-0">
        <CardTitle className="text-xl font-semibold">Histórico de Limpezas</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2 font-medium">Médico</th>
                <th className="pb-2 font-medium">Quarto</th>
                <th className="pb-2 font-medium">Data</th>
                <th className="pb-2 font-medium">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {limpezas.map((limpeza) => (
                <tr key={limpeza.id} className="border-b last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={limpeza.medico.imagem} alt={limpeza.medico.nome} />
                        <AvatarFallback>{limpeza.medico.nome.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{limpeza.medico.nome}</p>
                        <p className="text-xs text-gray-500">{limpeza.medico.especialidade}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">{limpeza.quarto}</td>
                  <td className="py-3">{limpeza.data}</td>
                  <td className="py-3">
                    {limpeza.status === 'aprovado' ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-3">
          <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
            Ver mais...
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
