import React from "react";
import { Calendar } from "lucide-react";
import { RoomStatus } from "./ui/room-status";

interface AlertaQuartoProps {
  numeroQuarto: string;
  especialidade: string;
  nomeMedico: string;
  status?: "Aguardando" | "Em Andamento" | "Finalizado";
}

export const AlertaQuarto: React.FC<AlertaQuartoProps> = ({
  numeroQuarto,
  especialidade,
  nomeMedico,
  status = "Aguardando",
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-green-500">
            <Calendar size={24} />
          </div>
          <div>
            <span className="font-medium text-gray-800">
              Alerta quarto {numeroQuarto}{" "}
              <span className="text-blue-500">{especialidade}</span>
            </span>
            <div className="text-sm text-gray-500">{nomeMedico}</div>
          </div>
        </div>
        <div>
          <RoomStatus status={status} size="sm" />
        </div>
      </div>
    </div>
  );
};
