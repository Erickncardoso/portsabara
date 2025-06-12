import React from "react";
import CardExame from "./CardExame";

interface Exame {
  medico: string;
  iniciais?: string;
  tipoExame: string;
  data: string;
  resultado: boolean;
}

interface ListaExamesProps {
  exames: Exame[];
}

const ListaExames: React.FC<ListaExamesProps> = ({ exames }) => {
  return (
    <div className="space-y-3">
      {exames.map((exame, index) => (
        <CardExame
          key={index}
          medico={exame.medico}
          iniciais={exame.iniciais}
          tipoExame={exame.tipoExame}
          data={exame.data}
          resultado={exame.resultado}
        />
      ))}
    </div>
  );
};

export default ListaExames;
