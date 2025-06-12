import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";

interface Medicamento {
  id: string;
  paciente: string;
  doenca: string;
  data: string;
  aprovada: boolean | null;
  avatar: string;
}

const TabelaValidacaoMedicamentosSimples: React.FC = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

  useEffect(() => {
    // Carregar dados do localStorage ao iniciar
    const medicamentosArmazenados = localStorage.getItem(
      "medicamentosValidacaoEnfermaria"
    );

    if (medicamentosArmazenados) {
      setMedicamentos(JSON.parse(medicamentosArmazenados));
    } else {
      // Dados de exemplo se não existir no localStorage
      const dadosIniciais = [
        {
          id: "1",
          paciente: "João Silva",
          doenca: "Pneumonia Infantil",
          data: "27/12",
          aprovada: true,
          avatar: "JoaoSilva",
        },
        {
          id: "2",
          paciente: "Maria Santos",
          doenca: "Bronquite",
          data: "27/12",
          aprovada: true,
          avatar: "MariaSantos",
        },
        {
          id: "3",
          paciente: "Pedro Oliveira",
          doenca: "Gastroenterite",
          data: "27/12",
          aprovada: true,
          avatar: "PedroOliveira",
        },
      ];

      setMedicamentos(dadosIniciais);
      localStorage.setItem(
        "medicamentosValidacaoEnfermaria",
        JSON.stringify(dadosIniciais)
      );
    }
  }, []);

  const salvarMedicamentos = (novosMedicamentos: Medicamento[]) => {
    setMedicamentos(novosMedicamentos);
    localStorage.setItem(
      "medicamentosValidacaoEnfermaria",
      JSON.stringify(novosMedicamentos)
    );
  };

  const aprovarMedicamento = (id: string) => {
    const novosMedicamentos = medicamentos.map((medicamento) =>
      medicamento.id === id ? { ...medicamento, aprovada: true } : medicamento
    );

    salvarMedicamentos(novosMedicamentos);
    toast.success("Medicamento aprovado com sucesso!", {
      position: "top-right",
    });
  };

  const reprovarMedicamento = (id: string) => {
    const novosMedicamentos = medicamentos.map((medicamento) =>
      medicamento.id === id ? { ...medicamento, aprovada: false } : medicamento
    );

    salvarMedicamentos(novosMedicamentos);
    toast.error("Medicamento reprovado!", {
      position: "top-right",
    });
  };

  return (
    <Card className="shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg pb-3 pt-4">
        <CardTitle className="text-lg font-semibold">
          Validação de Medicamentos
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {medicamentos.map((medicamento) => (
            <div
              key={medicamento.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border-2 border-orange-100">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${medicamento.avatar}`}
                  />
                  <AvatarFallback className="bg-orange-100 text-orange-700">
                    {medicamento.paciente.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-800">
                    {medicamento.paciente}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                      {medicamento.doenca}
                    </span>
                    <span className="text-xs text-gray-500">
                      {medicamento.data}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => aprovarMedicamento(medicamento.id)}
                  className={`p-1.5 rounded-md ${
                    medicamento.aprovada === true
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 hover:bg-green-100 text-gray-500 hover:text-green-600"
                  } transition-colors`}
                  aria-label="Aprovar medicamento"
                  title="Aprovar medicamento"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => reprovarMedicamento(medicamento.id)}
                  className={`p-1.5 rounded-md ${
                    medicamento.aprovada === false
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600"
                  } transition-colors`}
                  aria-label="Reprovar medicamento"
                  title="Reprovar medicamento"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-3 bg-gray-50 text-center">
        <button className="w-full text-sm text-orange-600 hover:text-orange-800 font-medium">
          Ver mais...
        </button>
      </CardFooter>
    </Card>
  );
};

export default TabelaValidacaoMedicamentosSimples;
