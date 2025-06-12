import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { nome: "Resfriado/Gripe", quantidade: 95, cor: "#36A2EB" },
  { nome: "Febre", quantidade: 85, cor: "#FF6384" },
  { nome: "Asma/Bronquite", quantidade: 70, cor: "#4BC0C0" },
  { nome: "Gastroenterite", quantidade: 60, cor: "#FFCE56" },
  { nome: "Otite", quantidade: 50, cor: "#9966FF" },
  { nome: "Faringite", quantidade: 45, cor: "#FF9F40" },
  { nome: "Dermatite", quantidade: 35, cor: "#00CED1" },
  { nome: "Pneumonia", quantidade: 25, cor: "#7CC67C" },
];

export const PainelMedicamentos: React.FC = () => {
  const total = data.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 pb-3">
        <CardTitle className="text-gray-800">DOENÇAS MAIS TRATADAS</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.cor }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {item.nome}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      backgroundColor: item.cor,
                      width: `${
                        (item.quantidade /
                          Math.max(...data.map((d) => d.quantidade))) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-600 w-8 text-right">
                  {item.quantidade}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800">{total}</p>
            <p className="text-xs text-gray-600">Total de Casos este Mês</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
