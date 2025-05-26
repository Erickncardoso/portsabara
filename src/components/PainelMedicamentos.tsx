import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

const data = [
  { nome: 'Hipertensão', quantidade: 80, cor: '#FF6384' },
  { nome: 'Diabetes', quantidade: 70, cor: '#36A2EB' },
  { nome: 'Asma', quantidade: 60, cor: '#4BC0C0' },
  { nome: 'Erupções', quantidade: 50, cor: '#FFCE56' },
  { nome: 'Febre', quantidade: 40, cor: '#9966FF' },
  { nome: 'Resfriado', quantidade: 30, cor: '#FF9F40' },
  { nome: 'Covid', quantidade: 20, cor: '#00CED1' },
  { nome: 'Câncer', quantidade: 10, cor: '#7CC67C' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
        <p className="font-medium">{`${payload[0].payload.nome}`}</p>
        <p className="text-sm text-gray-600">{`${payload[0].value} unidades`}</p>
      </div>
    );
  }

  return null;
};

const PainelMedicamentos: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all h-full overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-blue-50">
        <h2 className="text-base sm:text-lg font-bold text-gray-800">Painel de Medicamentos</h2>
        <p className="text-xs sm:text-sm text-gray-500">Distribuição por condição médica</p>
      </div>
      
      <div className="p-3 sm:p-4 h-[240px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={isMobile ? data.slice(0, 5) : data}
            layout="vertical"
            margin={{ 
              top: 10, 
              right: isMobile ? 10 : 30, 
              left: isMobile ? 75 : 100, 
              bottom: 10 
            }}
          >
            <defs>
              {data.map((entry, index) => (
                <linearGradient key={`gradient-${index}`} id={`colorGrad${index}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={entry.cor} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={entry.cor} stopOpacity={1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
            <XAxis 
              type="number" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: isMobile ? 10 : 12, fill: '#666' }}
            />
            <YAxis 
              type="category" 
              dataKey="nome" 
              tick={{ fontSize: isMobile ? 10 : 12, fill: '#666' }} 
              width={isMobile ? 70 : 95} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
            <Bar 
              dataKey="quantidade" 
              radius={[0, 6, 6, 0]} 
              name="Quantidade"
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#colorGrad${index})`} 
                  className="hover:opacity-90 transition-opacity"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {isMobile && (
        <div className="text-center pb-3 text-xs text-gray-500">
          <p>Mostrando 5 de {data.length} condições</p>
        </div>
      )}
    </div>
  );
};

export default PainelMedicamentos;
