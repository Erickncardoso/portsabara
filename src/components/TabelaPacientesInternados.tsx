import React, { useState, useEffect } from 'react';
import { Check, X, Users, Calendar } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface Paciente {
  id: string;
  paciente: string;
  doenca: string;
  data: string;
  alta: boolean | null;
}

const TabelaPacientesInternados: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    // Carregar dados do localStorage ao iniciar
    const pacientesArmazenados = localStorage.getItem('pacientesFarmacia');
    
    if (pacientesArmazenados) {
      setPacientes(JSON.parse(pacientesArmazenados));
    } else {
      // Dados de exemplo se não existir no localStorage
      const dadosIniciais = [
        {
          id: '1',
          paciente: "João Silva",
          doenca: "Doença Cardíaca",
          data: "27/12",
          alta: null
        },
        {
          id: '2',
          paciente: "Maria Santos",
          doenca: "Pneumonia",
          data: "28/12",
          alta: null
        },
        {
          id: '3',
          paciente: "Pedro Oliveira",
          doenca: "Diabetes",
          data: "29/12",
          alta: null
        }
      ];
      
      setPacientes(dadosIniciais);
      localStorage.setItem('pacientesFarmacia', JSON.stringify(dadosIniciais));
    }
  }, []);

  const aprovarAlta = (id: string) => {
    const novosPacientes = pacientes.map(paciente => 
      paciente.id === id ? {...paciente, alta: true} : paciente
    );
    
    setPacientes(novosPacientes);
    localStorage.setItem('pacientesFarmacia', JSON.stringify(novosPacientes));
    toast.success('Alta aprovada com sucesso!', {
      position: 'top-right',
    });
  };

  const reprovarAlta = (id: string) => {
    const novosPacientes = pacientes.map(paciente => 
      paciente.id === id ? {...paciente, alta: false} : paciente
    );
    
    setPacientes(novosPacientes);
    localStorage.setItem('pacientesFarmacia', JSON.stringify(novosPacientes));
    toast.error('Alta reprovada!', {
      position: 'top-right',
    });
  };

  return (
    <div className="bg-white rounded-xl border border-indigo-100 shadow-lg hover:shadow-xl transition-all overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-indigo-500 to-indigo-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
            <Users className="text-white h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Pacientes Internados</h2>
            <p className="text-xs text-indigo-100">Gerenciamento de internações e altas</p>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto p-1">
        <Table className="w-full">
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-gray-100 border-b border-indigo-100">
              <TableHead className="text-indigo-700 font-medium">Paciente</TableHead>
              <TableHead className="text-indigo-700 font-medium">Doença</TableHead>
              <TableHead className="text-indigo-700 font-medium">Data</TableHead>
              <TableHead className="text-indigo-700 font-medium">Alta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow 
                key={paciente.id} 
                className="hover:bg-indigo-50 transition-colors border-b border-indigo-50"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-9 w-9 ring-2 ring-indigo-100 ring-offset-1">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${paciente.paciente}`} />
                      <AvatarFallback className="bg-indigo-100 text-indigo-700">{paciente.paciente.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-800">{paciente.paciente}</p>
                      <p className="text-xs text-gray-500">#{paciente.id}-{Math.floor(Math.random() * 10000)}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                    {paciente.doenca}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    <span>{paciente.data}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => aprovarAlta(paciente.id)}
                      className={`p-2 rounded-lg ${
                        paciente.alta === true 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-100 hover:bg-green-100 text-gray-500 hover:text-green-600'
                      } transition-all`}
                      aria-label="Aprovar alta"
                      title="Aprovar alta"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => reprovarAlta(paciente.id)}
                      className={`p-2 rounded-lg ${
                        paciente.alta === false 
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600'
                      } transition-all`}
                      aria-label="Reprovar alta"
                      title="Reprovar alta"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 border-t border-indigo-50 bg-gray-50 text-center">
        <button className="text-indigo-600 text-sm hover:text-indigo-800 font-medium transition-colors">
          Ver todos os pacientes
        </button>
      </div>
    </div>
  );
};

export default TabelaPacientesInternados;
