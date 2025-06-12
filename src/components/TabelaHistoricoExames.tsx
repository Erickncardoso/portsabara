import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusIcon } from "@/components/ui/status-icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Exame {
  medico: string;
  iniciais?: string;
  tipoExame: string;
  data: string;
  resultado: boolean;
}

interface TabelaHistoricoExamesProps {
  exames: Exame[];
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

const TabelaHistoricoExames: React.FC<TabelaHistoricoExamesProps> = ({
  exames,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
        Histórico de Exames
      </h2>

      {/* Tabela responsiva com scroll horizontal em mobile */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">Médico</TableHead>
              <TableHead className="min-w-[120px]">Exame</TableHead>
              <TableHead className="min-w-[80px]">Data</TableHead>
              <TableHead className="min-w-[100px]">Resultado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exames.map((exame, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-gray-100 text-gray-700 text-sm font-medium">
                        {exame.iniciais || getInitials(exame.medico)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm truncate">{exame.medico}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{exame.tipoExame}</TableCell>
                <TableCell className="text-sm">{exame.data}</TableCell>
                <TableCell>
                  <StatusIcon
                    status={exame.resultado ? "success" : "error"}
                    size="md"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-right mt-4">
        <button className="text-gray-500 hover:text-gray-700 text-sm">
          Ver mais...
        </button>
      </div>
    </div>
  );
};

export default TabelaHistoricoExames;
