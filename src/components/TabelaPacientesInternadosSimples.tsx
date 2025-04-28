
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface Paciente {
  id: string;
  paciente: string;
  detalhes: string;
  avatar: string;
}

const TabelaPacientesInternadosSimples: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    // Carregar dados do localStorage ou usar dados de exemplo
    const pacientesArmazenados = localStorage.getItem('pacientesEnfermaria');
    
    if (pacientesArmazenados) {
      setPacientes(JSON.parse(pacientesArmazenados));
    } else {
      // Dados de exemplo
      const dadosIniciais = [
        {
          id: '1',
          paciente: "João Silva",
          detalhes: "4 ciclistas",
          avatar: "JoaoSilva"
        },
        {
          id: '2',
          paciente: "Maria Santos",
          detalhes: "2 médicos",
          avatar: "MariaSantos"
        },
        {
          id: '3',
          paciente: "Pedro Oliveira",
          detalhes: "Urgência",
          avatar: "PedroOliveira"
        }
      ];
      
      setPacientes(dadosIniciais);
      localStorage.setItem('pacientesEnfermaria', JSON.stringify(dadosIniciais));
    }
  }, []);

  return (
    <Card className="shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg pb-3 pt-4">
        <div className="flex items-center gap-2">
          <Users size={20} />
          <CardTitle className="text-lg font-semibold">Pacientes Internados</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {pacientes.map((paciente) => (
            <div key={paciente.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
              <Avatar className="h-11 w-11 border-2 border-red-100">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${paciente.avatar}`} />
                <AvatarFallback className="bg-red-100 text-red-700">{paciente.paciente.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-800">{paciente.paciente}</p>
                <p className="text-xs text-gray-500">{paciente.detalhes}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-3 bg-gray-50 text-center">
        <button className="w-full text-sm text-red-600 hover:text-red-800 font-medium">
          Ver mais...
        </button>
      </CardFooter>
    </Card>
  );
};

export default TabelaPacientesInternadosSimples;
