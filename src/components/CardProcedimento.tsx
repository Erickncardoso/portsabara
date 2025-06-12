import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

interface CardProcedimentoProps {
  id: number;
  paciente: string;
  procedimento: string;
  horario: string;
  status: "Pendente" | "Concluído" | "Em Andamento";
  responsavel: string;
  onMarcarConcluido?: (id: number) => void;
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

const CardProcedimento: React.FC<CardProcedimentoProps> = ({
  id,
  paciente,
  procedimento,
  horario,
  status,
  responsavel,
  onMarcarConcluido,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "Concluído":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Em Andamento":
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = () => {
    const baseClasses =
      "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium";

    switch (status) {
      case "Concluído":
        return (
          <Badge
            className={`${baseClasses} bg-green-100 text-green-700 border-green-200`}
          >
            {getStatusIcon()}
            Concluído
          </Badge>
        );
      case "Em Andamento":
        return (
          <Badge
            className={`${baseClasses} bg-blue-100 text-blue-700 border-blue-200`}
          >
            {getStatusIcon()}
            Em Andamento
          </Badge>
        );
      default:
        return (
          <Badge
            className={`${baseClasses} bg-yellow-100 text-yellow-700 border-yellow-200`}
          >
            {getStatusIcon()}
            Pendente
          </Badge>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarFallback className="bg-red-100 text-red-700 text-sm font-medium">
              {getInitials(paciente)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-900 text-sm truncate">
              {paciente}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{horario}</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <div className="border-t border-gray-100 pt-3 space-y-3">
        <div>
          <p className="text-sm text-gray-700 font-medium">{procedimento}</p>
          <p className="text-xs text-gray-500 mt-1">
            Responsável: {responsavel}
          </p>
        </div>

        {status === "Pendente" && onMarcarConcluido && (
          <Button
            size="sm"
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => onMarcarConcluido(id)}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Marcar como Concluído
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardProcedimento;
