
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Crianças', value: 5500, color: '#3498db' },
  { name: 'Adultos', value: 4200, color: '#e74c3c' },
  { name: 'Idosos', value: 2300, color: '#f39c12' },
];

const TOTAL = data.reduce((acc, item) => acc + item.value, 0);

export const GraficoPacientes: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 pb-3">
        <CardTitle className="text-gray-800">PACIENTES</CardTitle>
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
                  formatter={(value: number) => [`${value.toLocaleString()} pacientes`, '']}
                  labelFormatter={(label) => `${label}`}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="text-sm">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-3xl font-bold">{TOTAL.toLocaleString()}</p>
              <p className="text-xs text-gray-500 uppercase">Total de Pacientes</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full mt-4">
            {data.map((item) => (
              <div key={item.name} className="text-center">
                <p className="text-sm font-semibold" style={{ color: item.color }}>
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">
                  {Math.round((item.value / TOTAL) * 100)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraficoPacientes;
