import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StatusIcon } from "@/components/ui/status-icon";

interface Manutencao {
  id: string;
  medico: {
    nome: string;
    imagem: string;
    especialidade: string;
  };
  quarto: string;
  data: string;
  status: "aprovado" | "rejeitado";
}

export const TabelaHistoricoManutencoes: React.FC = () => {
  const manutencoes: Manutencao[] = [
    {
      id: "1",
      medico: {
        nome: "Shyam Khanna",
        imagem: "https://api.dicebear.com/7.x/avataaars/svg?seed=ShyamKhanna",
        especialidade: "Heart Disease",
      },
      quarto: "301",
      data: "27/12",
      status: "aprovado",
    },
    {
      id: "2",
      medico: {
        nome: "Jean Lee Lin",
        imagem: "https://api.dicebear.com/7.x/avataaars/svg?seed=JeanLeeLin",
        especialidade: "Heart Disease",
      },
      quarto: "302",
      data: "27/12",
      status: "aprovado",
    },
    {
      id: "3",
      medico: {
        nome: "Clara Brook",
        imagem: "https://api.dicebear.com/7.x/avataaars/svg?seed=ClaraBrook",
        especialidade: "Heart Disease",
      },
      quarto: "303",
      data: "27/12",
      status: "rejeitado",
    },
  ];

  return (
    <Card className="shadow-sm border">
      <CardHeader className="bg-white pb-0">
        <CardTitle className="text-xl font-semibold">
          Histórico de Manutenções
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2 font-medium">Médico</th>
                <th className="pb-2 font-medium">Quarto</th>
                <th className="pb-2 font-medium">Data</th>
                <th className="pb-2 font-medium">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {manutencoes.map((manutencao) => (
                <tr key={manutencao.id} className="border-b last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={manutencao.medico.imagem}
                          alt={manutencao.medico.nome}
                        />
                        <AvatarFallback>
                          {manutencao.medico.nome.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{manutencao.medico.nome}</p>
                        <p className="text-xs text-gray-500">
                          {manutencao.medico.especialidade}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">{manutencao.quarto}</td>
                  <td className="py-3">{manutencao.data}</td>
                  <td className="py-3">
                    <StatusIcon status={manutencao.status} size="md" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
          >
            Ver mais...
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
