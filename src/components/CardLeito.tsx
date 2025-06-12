import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, User, ClipboardCheck, Sparkles } from "lucide-react";

interface CardLeitoProps {
  numero: string;
  status: "Ocupado" | "Livre" | "Em Limpeza" | "Manutenção";
  paciente: string;
  tipo: "UTI" | "Enfermaria" | "Particular";
  onAcaoRapida?: (numero: string, acao: string) => void;
}

// Função para gerar iniciais do nome
const getInitials = (name: string): string => {
  if (name === "-") return "LE";
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const CardLeito: React.FC<CardLeitoProps> = ({
  numero,
  status,
  paciente,
  tipo,
  onAcaoRapida,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "Ocupado":
        return <User className="w-4 h-4 text-red-600" />;
      case "Livre":
        return <Bed className="w-4 h-4 text-green-600" />;
      case "Em Limpeza":
        return <Sparkles className="w-4 h-4 text-yellow-600" />;
      default:
        return <ClipboardCheck className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusBadge = () => {
    const baseClasses =
      "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium";

    switch (status) {
      case "Ocupado":
        return (
          <Badge
            className={`${baseClasses} bg-red-100 text-red-700 border-red-200`}
          >
            {getStatusIcon()}
            Ocupado
          </Badge>
        );
      case "Livre":
        return (
          <Badge
            className={`${baseClasses} bg-green-100 text-green-700 border-green-200`}
          >
            {getStatusIcon()}
            Livre
          </Badge>
        );
      case "Em Limpeza":
        return (
          <Badge
            className={`${baseClasses} bg-yellow-100 text-yellow-700 border-yellow-200`}
          >
            {getStatusIcon()}
            Em Limpeza
          </Badge>
        );
      default:
        return (
          <Badge
            className={`${baseClasses} bg-blue-100 text-blue-700 border-blue-200`}
          >
            {getStatusIcon()}
            Manutenção
          </Badge>
        );
    }
  };

  const getTipoColor = () => {
    switch (tipo) {
      case "UTI":
        return "bg-red-50 text-red-700 border-red-200";
      case "Particular":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const getAcaoRapida = () => {
    switch (status) {
      case "Livre":
        return {
          label: "Reservar Leito",
          acao: "reservar",
          color: "bg-blue-600 hover:bg-blue-700",
        };
      case "Em Limpeza":
        return {
          label: "Marcar Limpo",
          acao: "limpo",
          color: "bg-green-600 hover:bg-green-700",
        };
      case "Manutenção":
        return {
          label: "Finalizar Manutenção",
          acao: "manutencao-ok",
          color: "bg-green-600 hover:bg-green-700",
        };
      default:
        return null;
    }
  };

  const acaoRapida = getAcaoRapida();

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <Bed className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-gray-900 text-lg">Leito {numero}</h3>
            <Badge
              className={`${getTipoColor()} text-xs font-medium px-2 py-0.5 mt-1`}
            >
              {tipo}
            </Badge>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <div className="border-t border-gray-100 pt-3 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback
              className={`text-xs font-medium ${
                paciente === "-"
                  ? "bg-gray-100 text-gray-500"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {getInitials(paciente)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-900 font-medium">
              {paciente === "-" ? "Sem paciente" : paciente}
            </p>
            <p className="text-xs text-gray-500">
              {status === "Ocupado" ? "Paciente internado" : "Leito disponível"}
            </p>
          </div>
        </div>

        {acaoRapida && onAcaoRapida && (
          <Button
            size="sm"
            className={`w-full ${acaoRapida.color}`}
            onClick={() => onAcaoRapida(numero, acaoRapida.acao)}
          >
            {getStatusIcon()}
            {acaoRapida.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardLeito;
