import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface CardPrescricaoProps {
  id: number;
  paciente: string;
  medicamento: string;
  dosagem: string;
  frequencia: string;
  inicio: string;
  status: "Pendente" | "Administrado" | "Vencido";
  onAdministrar?: (id: number) => void;
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

const CardPrescricao: React.FC<CardPrescricaoProps> = ({
  id,
  paciente,
  medicamento,
  dosagem,
  frequencia,
  inicio,
  status,
  onAdministrar,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "Administrado":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Vencido":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = () => {
    const baseClasses =
      "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium";

    switch (status) {
      case "Administrado":
        return (
          <Badge
            className={`${baseClasses} bg-green-100 text-green-700 border-green-200`}
          >
            {getStatusIcon()}
            Administrado
          </Badge>
        );
      case "Vencido":
        return (
          <Badge
            className={`${baseClasses} bg-red-100 text-red-700 border-red-200`}
          >
            {getStatusIcon()}
            Vencido
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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
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
            <p className="text-xs text-gray-500 mt-0.5">
              Desde: {formatDate(inicio)}
            </p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <div className="border-t border-gray-100 pt-3 space-y-3">
        <div className="flex items-start gap-2">
          <Pill className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-900 font-medium">{medicamento}</p>
            <p className="text-xs text-gray-600 mt-1">
              {dosagem} • {frequencia}
            </p>
          </div>
        </div>

        {status === "Pendente" && onAdministrar && (
          <Button
            size="sm"
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => onAdministrar(id)}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Marcar como Administrado
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardPrescricao;
