
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Phone, Calendar, Droplet } from 'lucide-react';

interface CardReceitaProps {
  nome: string;
  idade: string;
  sexo: string;
  grupoSanguineo: string;
  contato: string;
  medico: string;
  dataConsulta: string;
}

const CardReceita: React.FC<CardReceitaProps> = ({
  nome,
  idade,
  sexo,
  grupoSanguineo,
  contato,
  medico,
  dataConsulta
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-none shadow-md bg-gradient-to-br from-white to-blue-50">
      <CardContent className="p-0">
        <div className="p-4 border-b border-blue-100 bg-gradient-to-r from-blue-500 to-blue-400">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">{nome}</h3>
              <p className="text-xs text-blue-100">{idade} anos | {sexo}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <User size={22} className="text-white" />
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="bg-red-100 p-1.5 rounded-md">
                <Droplet size={16} className="text-red-500" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Grupo Sanguíneo</p>
                <p className="font-medium text-gray-800">{grupoSanguineo}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-1.5 rounded-md">
                <Phone size={16} className="text-blue-500" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Contato</p>
                <p className="font-medium text-gray-800">{contato}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-md">
                <User size={16} className="text-green-500" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Médico</p>
                <p className="font-medium text-gray-800">{medico}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-amber-100 p-1.5 rounded-md">
                <Calendar size={16} className="text-amber-500" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Última consulta</p>
                <p className="font-medium text-gray-800">{dataConsulta}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardReceita;
