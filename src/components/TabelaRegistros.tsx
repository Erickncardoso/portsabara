import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Stethoscope,
  Baby,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  tipo: "medicos" | "pacientes";
}

export const TabelaRegistros: React.FC<TabelaRegistrosProps> = ({
  titulo,
  registros,
  tipo,
}) => {
  // Dados atualizados com nomes brasileiros e especialidades pediátricas
  const dadosAtualizados =
    tipo === "medicos"
      ? [
          {
            id: "1",
            nome: "Dr. Roberto Silva",
            especialidade: "Pediatria Geral",
            avatar: "RS",
            avatarColor: "bg-blue-500",
            data: "28/12",
            status: "Ativo",
            aprovado: true,
          },
          {
            id: "2",
            nome: "Dra. Ana Santos",
            especialidade: "Neonatologia",
            avatar: "AS",
            avatarColor: "bg-green-500",
            data: "27/12",
            status: "Ativo",
            aprovado: true,
          },
          {
            id: "3",
            nome: "Dr. Carlos Lima",
            especialidade: "Cardiologia Pediátrica",
            avatar: "CL",
            avatarColor: "bg-purple-500",
            data: "26/12",
            status: "Pendente",
            aprovado: false,
          },
          {
            id: "4",
            nome: "Dra. Marina Costa",
            especialidade: "Neurologia Infantil",
            avatar: "MC",
            avatarColor: "bg-orange-500",
            data: "25/12",
            status: "Ativo",
            aprovado: true,
          },
        ]
      : [
          {
            id: "1",
            nome: "Sofia Oliveira",
            idade: "8 anos",
            avatar: "SO",
            avatarColor: "bg-pink-500",
            data: "28/12",
            consulta: "Consulta de Rotina",
            aprovado: true,
          },
          {
            id: "2",
            nome: "Gabriel Santos",
            idade: "5 anos",
            avatar: "GS",
            avatarColor: "bg-blue-500",
            data: "27/12",
            consulta: "Acompanhamento",
            aprovado: true,
          },
          {
            id: "3",
            nome: "Isabella Lima",
            idade: "12 anos",
            avatar: "IL",
            avatarColor: "bg-purple-500",
            data: "26/12",
            consulta: "Exame Cardiológico",
            aprovado: false,
          },
          {
            id: "4",
            nome: "Lucas Costa",
            idade: "3 anos",
            avatar: "LC",
            avatarColor: "bg-green-500",
            data: "25/12",
            consulta: "Consulta Neurológica",
            aprovado: true,
          },
        ];

  const getStatusIcon = (aprovado: boolean) => {
    return aprovado ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  const getTitleIcon = () => {
    return tipo === "medicos" ? (
      <Stethoscope className="h-5 w-5 text-blue-600" />
    ) : (
      <Baby className="h-5 w-5 text-pink-600" />
    );
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          {getTitleIcon()}
          {titulo}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dadosAtualizados.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
            >
              {/* Layout responsivo */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Informações principais */}
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={cn(
                      "w-12 h-12 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm",
                      item.avatarColor
                    )}
                  >
                    {item.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-base sm:text-sm truncate">
                      {item.nome}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {tipo === "medicos"
                        ? item.especialidade
                        : `${item.idade} - ${item.consulta}`}
                    </p>
                  </div>
                </div>

                {/* Status e data */}
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">
                      {item.data}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge
                      variant={item.aprovado ? "default" : "secondary"}
                      className={cn(
                        "text-xs px-2 py-1",
                        item.aprovado
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                      )}
                    >
                      {tipo === "medicos"
                        ? item.aprovado
                          ? "Ativo"
                          : "Pendente"
                        : item.aprovado
                        ? "Confirmado"
                        : "Agendado"}
                    </Badge>

                    <div className="flex justify-center">
                      {getStatusIcon(item.aprovado)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium transition-colors">
            Ver todos os {tipo}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TabelaRegistros;
