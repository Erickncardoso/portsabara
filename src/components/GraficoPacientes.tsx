import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "Bebês (0-2 anos)", value: 2800, color: "#3498db" },
  { name: "Pré-escola (3-5 anos)", value: 3200, color: "#e74c3c" },
  { name: "Escola (6-12 anos)", value: 4500, color: "#f39c12" },
  { name: "Adolescentes (13-17 anos)", value: 2000, color: "#9b59b6" },
];

const TOTAL = data.reduce((acc, item) => acc + item.value, 0);

export const GraficoPacientes: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 pb-3">
        <CardTitle className="text-gray-800">PACIENTES PEDIÁTRICOS</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <div className="relative w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    `${value.toLocaleString()} pacientes`,
                    "",
                  ]}
                  labelFormatter={(label) => `${label}`}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span className="text-sm">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-gray-800">
              {TOTAL.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              Total de Pacientes Atendidos
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraficoPacientes;
