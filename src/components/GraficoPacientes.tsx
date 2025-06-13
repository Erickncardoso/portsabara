import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Baby, Users, TrendingUp, Calendar } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "Bebês (0-2 anos)", value: 1240, color: "#3b82f6", percentage: 35 },
  {
    name: "Pré-escola (3-5 anos)",
    value: 1065,
    color: "#ef4444",
    percentage: 30,
  },
  { name: "Escola (6-12 anos)", value: 887, color: "#f59e0b", percentage: 25 },
  {
    name: "Adolescentes (13-17 anos)",
    value: 355,
    color: "#8b5cf6",
    percentage: 10,
  },
];

const TOTAL = data.reduce((acc, item) => acc + item.value, 0);

export const GraficoPacientes: React.FC = () => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Baby className="h-5 w-5 text-pink-600" />
          PACIENTES PEDIÁTRICOS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 sm:space-y-6">
          {/* Gráfico */}
          <div className="relative h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
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
              </PieChart>
            </ResponsiveContainer>

            {/* Total no centro */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">
                  {TOTAL.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
            </div>
          </div>

          {/* Lista de estatísticas */}
          <div className="space-y-2 sm:space-y-3">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.value.toLocaleString()} pacientes
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  {item.percentage}%
                </Badge>
              </div>
            ))}
          </div>

          {/* Resumo mensal */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-gray-900">+12%</span>
              </div>
              <p className="text-xs text-gray-600">vs. mês anterior</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-900">
                  28 dias
                </span>
              </div>
              <p className="text-xs text-gray-600">período atual</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraficoPacientes;
