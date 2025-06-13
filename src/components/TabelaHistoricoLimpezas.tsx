import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, User, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Limpeza {
  id: string;
  funcionario: {
    nome: string;
    avatar: string;
    avatarColor: string;
  };
  quarto: string;
  setor: string;
  data: string;
  status: "aprovado" | "rejeitado";
}

export const TabelaHistoricoLimpezas: React.FC = () => {
  const limpezas: Limpeza[] = [
    {
      id: "1",
      funcionario: {
        nome: "Maria Silva",
        avatar: "MS",
        avatarColor: "bg-orange-500",
      },
      quarto: "Quarto 501",
      setor: "UTI",
      data: "27/12",
      status: "aprovado",
    },
    {
      id: "2",
      funcionario: {
        nome: "João Santos",
        avatar: "JS",
        avatarColor: "bg-blue-500",
      },
      quarto: "Quarto 303",
      setor: "Pediatria",
      data: "26/12",
      status: "aprovado",
    },
    {
      id: "3",
      funcionario: {
        nome: "Ana Costa",
        avatar: "AC",
        avatarColor: "bg-purple-500",
      },
      quarto: "Quarto 205",
      setor: "Cardiologia",
      data: "25/12",
      status: "rejeitado",
    },
  ];

  const getResultadoIcon = (status: string) => {
    switch (status) {
      case "aprovado":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "rejeitado":
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Histórico de Limpezas
        </h2>
        <div className="flex items-center gap-2 text-gray-600">
          <User className="h-5 w-5" />
          <span className="text-sm font-medium">
            {limpezas.length} registros
          </span>
        </div>
      </div>

      {/* Cards em formato de tabela moderna */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header da tabela */}
        <div className="grid grid-cols-4 gap-4 p-4 border-b bg-gray-50 font-semibold text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Funcionário
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Quarto
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Data
          </div>
          <div className="text-center">Resultado</div>
        </div>

        {/* Rows dos cards */}
        {limpezas.map((limpeza, index) => (
          <div
            key={limpeza.id}
            className={cn(
              "grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0",
              "group cursor-pointer"
            )}
          >
            {/* Coluna Funcionário */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm",
                  limpeza.funcionario.avatarColor
                )}
              >
                {limpeza.funcionario.avatar}
              </div>
              <div>
                <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {limpeza.funcionario.nome}
                </p>
              </div>
            </div>

            {/* Coluna Quarto */}
            <div className="flex items-center">
              <div>
                <p className="text-gray-900 font-medium">{limpeza.quarto}</p>
                <p className="text-sm text-gray-500">{limpeza.setor}</p>
              </div>
            </div>

            {/* Coluna Data */}
            <div className="flex items-center">
              <p className="text-gray-600 font-medium">{limpeza.data}</p>
            </div>

            {/* Coluna Resultado */}
            <div className="flex items-center justify-center">
              {getResultadoIcon(limpeza.status)}
            </div>
          </div>
        ))}
      </div>

      {/* Card de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aprovados</p>
                <p className="text-2xl font-bold text-green-600">
                  {limpezas.filter((l) => l.status === "aprovado").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejeitados</p>
                <p className="text-2xl font-bold text-red-600">
                  {limpezas.filter((l) => l.status === "rejeitado").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-blue-600">
                  {limpezas.length}
                </p>
              </div>
              <User className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
