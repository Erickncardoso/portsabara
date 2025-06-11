import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

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
  hora,
}) => {
  return (
    <Link to="/consultas-paciente" className="block">
      <Card className="overflow-hidden border-l-4 border-l-sabara-blue shadow-md hover:shadow-lg transition-all cursor-pointer">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-3 sm:gap-4 flex-1">
              <div className="p-2.5 sm:p-3 bg-blue-50 rounded-full shrink-0">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-sabara-blue" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                    Lembrete Consulta
                  </h3>
                  <span className="bg-blue-100 text-sabara-blue text-xs font-medium px-2 py-1 rounded-full self-start">
                    {especialidade}
                  </span>
                </div>
                <p className="text-gray-700 font-medium text-sm sm:text-base">
                  {medico}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 sm:bg-transparent sm:p-0 sm:text-right">
              <Clock className="h-4 w-4 text-sabara-blue" />
              <div className="text-sm sm:text-base">
                <p className="text-gray-600 font-medium whitespace-nowrap">
                  <span className="sm:hidden">
                    {data} - {hora}
                  </span>
                  <span className="hidden sm:inline">
                    {data} às {hora}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LembreteConsulta;
