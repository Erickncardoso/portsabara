
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Dados para o gráfico de ocupação
const dados = [
  { nome: 'UTI', ocupacao: 85, cor: '#DC2626' },
  { nome: 'Semi-Intensiva', ocupacao: 70, cor: '#FB923C' },
  { nome: 'Pediátrica', ocupacao: 50, cor: '#FBBF24' },
  { nome: 'Geral', ocupacao: 40, cor: '#34D399' },
  { nome: 'Cirúrgica', ocupacao: 30, cor: '#60A5FA' },
  { nome: 'Cardíaca', ocupacao: 20, cor: '#A855F7' },
];

const tooltipFormatter = (value: number) => [`${value}%`, 'Ocupação'];
const labelFormatter = (value: string) => [`${value}`, 'Setor'];

// Componente customizado para a barra que permite definir cores diferentes
const CustomBar = (props: any) => {
  const { x, y, width, height, index } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={dados[index].cor}
      rx={0}
      ry={0}
    />
  );
};

const GraficoOcupacao: React.FC = () => {
  return (
    <Card className="shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg pb-3 pt-4">
        <CardTitle className="text-lg font-semibold">Monitoramento de Ocupação</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dados}
              layout="vertical"
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                tickFormatter={(tick) => `${tick}%`} 
              />
              <YAxis 
                type="category" 
                dataKey="nome" 
                tick={{ fontSize: 12 }}
                width={100}
              />
              <Tooltip 
                formatter={tooltipFormatter}
                labelFormatter={labelFormatter}
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  padding: '8px'
                }}
              />
              <Bar 
                dataKey="ocupacao" 
                barSize={20}
                shape={<CustomBar />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraficoOcupacao;
