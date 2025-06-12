import React from "react";
import { Check, X, Clock, UserCheck } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CardConsultaProps {
  id: string;
  paciente: string;
  doenca: string;
  data: string;
  aprovada?: boolean | null;
  tipo: "proximas" | "internados";
  onAprovar: (id: string) => void;
  onRecusar: (id: string) => void;
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

// Função para traduzir doenças para português
const traduzirDoenca = (doenca: string): string => {
  const traducoes: { [key: string]: string } = {
    "Heart Disease": "Doença Cardíaca",
    Diabetes: "Diabetes",
    Hypertension: "Hipertensão",
    Pneumonia: "Pneumonia",
  };
  return traducoes[doenca] || doenca;
};

const CardConsulta: React.FC<CardConsultaProps> = ({
  id,
  paciente,
  doenca,
  data,
  aprovada,
  tipo,
  onAprovar,
  onRecusar,
}) => {
  const getStatusBadge = () => {
    if (aprovada === true) {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          <UserCheck className="w-3 h-3 mr-1" />
          {tipo === "proximas" ? "Aprovada" : "Alta Concedida"}
        </Badge>
      );
    }
    if (aprovada === false) {
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200">
          <X className="w-3 h-3 mr-1" />
          {tipo === "proximas" ? "Recusada" : "Alta Negada"}
        </Badge>
      );
    }
    return (
      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
        <Clock className="w-3 h-3 mr-1" />
        Pendente
      </Badge>
    );
  };

  return (
    <div
      className={`
      bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow
      ${aprovada === true ? "bg-green-50 border-green-200" : ""}
      ${aprovada === false ? "bg-red-50 border-red-200" : ""}
    `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
              {getInitials(paciente)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-900 text-sm truncate">
              {paciente}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{data}</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <div className="border-t border-gray-100 pt-3">
        <p className="text-sm text-gray-700 font-medium mb-3">
          {traduzirDoenca(doenca)}
        </p>

        {(tipo === "internados" || aprovada === null) && (
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => onAprovar(id)}
            >
              <Check className="w-4 h-4 mr-1" />
              {tipo === "proximas" ? "Aprovar" : "Dar Alta"}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="flex-1"
              onClick={() => onRecusar(id)}
            >
              <X className="w-4 h-4 mr-1" />
              {tipo === "proximas" ? "Recusar" : "Negar Alta"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardConsulta;
