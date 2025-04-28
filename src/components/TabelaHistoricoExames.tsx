
import React from 'react';
import { Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Exame {
  medico: string;
  tipoExame: string;
  data: string;
  resultado: boolean;
}

interface TabelaHistoricoExamesProps {
  exames: Exame[];
}

const TabelaHistoricoExames: React.FC<TabelaHistoricoExamesProps> = ({ exames }) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">Histórico de Exames</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Médico</TableHead>
            <TableHead>Exame</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Resultado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exames.map((exame, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${exame.medico}`} alt={exame.medico} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span>{exame.medico}</span>
                </div>
              </TableCell>
              <TableCell>{exame.tipoExame}</TableCell>
              <TableCell>{exame.data}</TableCell>
              <TableCell>
                {exame.resultado ? 
                  <Check className="h-5 w-5 text-green-500" /> : 
                  <span className="h-5 w-5 text-red-500">✗</span>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="text-right mt-4">
        <button className="text-gray-500 hover:text-gray-700 text-sm">Ver mais...</button>
      </div>
    </div>
  );
};

export default TabelaHistoricoExames;
