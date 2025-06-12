import React, { useState, useEffect } from "react";
import CardConsulta from "./CardConsulta";
import { toast } from "@/components/ui/use-toast";

interface Consulta {
  id: string;
  paciente: string;
  doenca: string;
  data: string;
  aprovada?: boolean | null;
}

interface ListaConsultasProps {
  consultas?: Consulta[];
  tipo: "proximas" | "internados";
}

const ListaConsultas: React.FC<ListaConsultasProps> = ({
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
          paciente: "Ana Silva",
          doenca: "Pneumonia Infantil",
          data: "27/12",
          aprovada: null,
        },
        {
          id: Math.random().toString(36).substring(2, 9),
          paciente: "Pedro Santos",
          doenca: "Bronquite",
          data: "27/12",
          aprovada: null,
        },
        {
          id: Math.random().toString(36).substring(2, 9),
          paciente: "Sofia Costa",
          doenca: "Gastroenterite",
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
    <div className="space-y-3">
      {consultas.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Nenhum registro encontrado</p>
        </div>
      ) : (
        consultas.map((consulta) => (
          <CardConsulta
            key={consulta.id}
            id={consulta.id}
            paciente={consulta.paciente}
            doenca={consulta.doenca}
            data={consulta.data}
            aprovada={consulta.aprovada}
            tipo={tipo}
            onAprovar={aprovarConsulta}
            onRecusar={recusarConsulta}
          />
        ))
      )}

      <div className="text-right mt-4">
        <button className="text-blue-500 text-sm hover:underline">
          Ver mais...
        </button>
      </div>
    </div>
  );
};

export default ListaConsultas;
