import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";

interface Consulta {
  id: string;
  paciente: string;
  doenca: string;
  data: string;
  aprovada?: boolean | null;
}

interface TabelaConsultasProps {
  consultas?: Consulta[];
  tipo: "proximas" | "internados";
}

const TabelaConsultas: React.FC<TabelaConsultasProps> = ({
  consultas: consultasIniciais,
  tipo,
}) => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  const chaveLocalStorage =
    tipo === "proximas" ? "consultasProximas" : "pacientesInternados";

  useEffect(() => {
    // Tenta carregar do localStorage primeiro
    const dadosArmazenados = localStorage.getItem(chaveLocalStorage);

    if (dadosArmazenados) {
      setConsultas(JSON.parse(dadosArmazenados));
    } else if (consultasIniciais) {
      // Se não houver dados no localStorage, usa os iniciais passados como prop
      const consultasComId = consultasIniciais.map((consulta) => ({
        ...consulta,
        id: Math.random().toString(36).substring(2, 9),
      }));

      setConsultas(consultasComId);
      localStorage.setItem(chaveLocalStorage, JSON.stringify(consultasComId));
    } else {
      // Dados exemplo caso nem localStorage nem props existam
      const dadosExemplo: Consulta[] = [
        {
          id: Math.random().toString(36).substring(2, 9),
          paciente: "Luísa Silva",
          doenca: "Bronquite Infantil",
          data: "27/12",
          aprovada: null,
        },
        {
          id: Math.random().toString(36).substring(2, 9),
          paciente: "Gabriel Santos",
          doenca: "Otite Média",
          data: "27/12",
          aprovada: null,
        },
        {
          id: Math.random().toString(36).substring(2, 9),
          paciente: "Isabella Costa",
          doenca: "Faringite",
          data: "27/12",
          aprovada: null,
        },
      ];

      setConsultas(dadosExemplo);
      localStorage.setItem(chaveLocalStorage, JSON.stringify(dadosExemplo));
    }
  }, [chaveLocalStorage, consultasIniciais]);

  const salvarConsultas = (novasConsultas: Consulta[]) => {
    setConsultas(novasConsultas);
    localStorage.setItem(chaveLocalStorage, JSON.stringify(novasConsultas));
  };

  const aprovarConsulta = (id: string) => {
    const consultasAtualizadas = consultas.map((consulta) =>
      consulta.id === id ? { ...consulta, aprovada: true } : consulta
    );

    salvarConsultas(consultasAtualizadas);

    toast({
      title: tipo === "proximas" ? "Consulta aprovada" : "Alta concedida",
      description: `Paciente ${consultas.find((c) => c.id === id)?.paciente}`,
    });
  };

  const recusarConsulta = (id: string) => {
    if (tipo === "proximas") {
      // No caso de próximas consultas, apenas marca como recusada
      const consultasAtualizadas = consultas.map((consulta) =>
        consulta.id === id ? { ...consulta, aprovada: false } : consulta
      );

      salvarConsultas(consultasAtualizadas);

      toast({
        title: "Consulta recusada",
        description: `Paciente ${consultas.find((c) => c.id === id)?.paciente}`,
        variant: "destructive",
      });
    } else {
      // No caso de pacientes internados, remove da lista
      const consultasAtualizadas = consultas.filter(
        (consulta) => consulta.id !== id
      );
      salvarConsultas(consultasAtualizadas);

      toast({
        title: "Alta recusada",
        description: `Paciente ${
          consultas.find((c) => c.id === id)?.paciente
        } permanece internado`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border p-3 shadow-md hover:shadow-lg transition-all h-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-1 text-xs">Nome</TableHead>
            <TableHead className="py-1 text-xs">Doença</TableHead>
            <TableHead className="py-1 text-xs">Data</TableHead>
            <TableHead className="py-1 text-xs">
              {tipo === "proximas" ? "Aprovação" : "Alta"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {consultas.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-4 text-xs text-gray-500"
              >
                Nenhum registro encontrado
              </TableCell>
            </TableRow>
          ) : (
            consultas.map((consulta) => (
              <TableRow
                key={consulta.id}
                className={
                  consulta.aprovada === false
                    ? "bg-red-50"
                    : consulta.aprovada
                    ? "bg-green-50"
                    : ""
                }
              >
                <TableCell className="py-1 text-xs">
                  <div className="flex items-center gap-1">
                    <Avatar className="h-5 w-5">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${consulta.paciente}`}
                        alt={consulta.paciente}
                      />
                      <AvatarFallback>
                        {consulta.paciente.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {consulta.paciente}
                  </div>
                </TableCell>
                <TableCell className="py-1 text-xs">
                  {consulta.doenca}
                </TableCell>
                <TableCell className="py-1 text-xs">{consulta.data}</TableCell>
                <TableCell className="py-1 text-xs">
                  {(tipo === "internados" || consulta.aprovada === null) && (
                    <div className="flex space-x-1">
                      <button
                        className="bg-green-100 p-1 rounded-full hover:bg-green-200"
                        onClick={() => aprovarConsulta(consulta.id)}
                      >
                        <Check size={14} className="text-green-600" />
                      </button>
                      <button
                        className="bg-red-100 p-1 rounded-full hover:bg-red-200"
                        onClick={() => recusarConsulta(consulta.id)}
                      >
                        <X size={14} className="text-red-600" />
                      </button>
                    </div>
                  )}

                  {consulta.aprovada === true && tipo === "proximas" && (
                    <span className="text-xs text-green-600 font-medium">
                      Aprovada
                    </span>
                  )}

                  {consulta.aprovada === false && tipo === "proximas" && (
                    <span className="text-xs text-red-600 font-medium">
                      Recusada
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="text-right mt-1">
        <a href="#" className="text-blue-500 text-xs hover:underline">
          Ver mais...
        </a>
      </div>
    </div>
  );
};

export default TabelaConsultas;
