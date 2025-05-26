import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

interface LembreteConsultaProps {
  especialidade: string;
  medico: string;
  data: string;
  hora: string;
}

const LembreteConsulta: React.FC<LembreteConsultaProps> = ({
  especialidade,
  medico,
  data,
  hora
}) => {
  return (
    <Link to="/consultas-paciente" className="block">
      <Card className="overflow-hidden border-l-4 border-l-sabara-blue shadow-md hover:shadow-lg transition-all cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <Calendar className="h-6 w-6 text-sabara-blue" />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800 text-lg">Lembrete Consulta</h3>
                  <span className="bg-blue-100 text-sabara-blue text-xs font-medium px-2.5 py-0.5 rounded-full">{especialidade}</span>
                </div>
                <p className="text-gray-700 font-medium">{medico}</p>
              </div>
            </div>
            
            <div className="text-right flex items-center gap-1">
              <Clock className="h-4 w-4 text-sabara-blue" />
              <p className="text-gray-600 font-medium">{data} às {hora}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LembreteConsulta;
