
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Registro {
  id: string;
  nome: string;
  doenca: string;
  data: string;
  aprovado: boolean;
  avatar: string;
}

interface TabelaRegistrosProps {
  titulo: string;
  registros: Registro[];
  tipo: 'medicos' | 'pacientes';
}

export const TabelaRegistros: React.FC<TabelaRegistrosProps> = ({ titulo, registros, tipo }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 pb-3">
        <CardTitle>{titulo}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-xs text-left text-gray-500 border-b">
                <th className="p-3 w-32">Nome</th>
                <th className="p-3">Doença</th>
                <th className="p-3 w-16 text-center">Data</th>
                <th className="p-3 w-24 text-center">Realizado</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro) => (
                <tr key={registro.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${registro.avatar}`} />
                        <AvatarFallback>{registro.nome.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{registro.nome}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    <div className="text-sm">{registro.doenca}</div>
                  </td>
                  <td className="p-3 text-xs text-center">{registro.data}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-1">
                      <div className={`w-4 h-4 rounded-full ${registro.aprovado ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`w-4 h-4 rounded-full ${!registro.aprovado ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 text-center text-sm">
          <a href="#" className="text-blue-500 hover:underline">Ver mais...</a>
        </div>
      </CardContent>
    </Card>
  );
};

export default TabelaRegistros;
