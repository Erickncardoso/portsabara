import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusIcon } from "@/components/ui/status-icon";

interface CardExameProps {
  medico: string;
  iniciais?: string;
  tipoExame: string;
  data: string;
  resultado: boolean;
}

// Função para gerar iniciais do nome
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const CardExame: React.FC<CardExameProps> = ({
  medico,
  iniciais,
  tipoExame,
  data,
  resultado,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
              {iniciais || getInitials(medico)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-900 text-sm truncate">
              {medico}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{data}</p>
          </div>
        </div>
        <StatusIcon status={resultado ? "success" : "error"} size="md" />
      </div>

      <div className="border-t border-gray-100 pt-3">
        <p className="text-sm text-gray-700 font-medium">{tipoExame}</p>
        <p className="text-xs text-gray-500 mt-1">
          Resultado: {resultado ? "Aprovado" : "Pendente"}
        </p>
      </div>
    </div>
  );
};

export default CardExame;
