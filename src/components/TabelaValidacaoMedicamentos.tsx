import React, { useState, useEffect } from 'react';
import { Check, X, Pill } from 'lucide-react';
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

interface Medicamento {
  id: string;
  paciente: string;
  doenca: string;
  data: string;
  aprovada: boolean | null;
}

const TabelaValidacaoMedicamentos: React.FC = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

  useEffect(() => {
    // Carregar dados do localStorage ao iniciar
    const medicamentosArmazenados = localStorage.getItem('medicamentosValidacao');
    
    if (medicamentosArmazenados) {
      setMedicamentos(JSON.parse(medicamentosArmazenados));
    } else {
      // Dados de exemplo se não existir no localStorage
      const dadosIniciais = [
        {
          id: '1',
          paciente: "Shyam Khanna",
          doenca: "Heart Disease",
          data: "27/12",
          aprovada: null
        },
        {
          id: '2',
          paciente: "Jean Lee Un",
          doenca: "Heart Disease",
          data: "27/12",
          aprovada: null
        },
        {
          id: '3',
          paciente: "Clara Brook",
          doenca: "Heart Disease",
          data: "27/12",
          aprovada: null
        }
      ];
      
      setMedicamentos(dadosIniciais);
      localStorage.setItem('medicamentosValidacao', JSON.stringify(dadosIniciais));
    }
  }, []);

  const aprovarMedicamento = (id: string) => {
    const novosMedicamentos = medicamentos.map(medicamento => 
      medicamento.id === id ? {...medicamento, aprovada: true} : medicamento
    );
    
    setMedicamentos(novosMedicamentos);
    localStorage.setItem('medicamentosValidacao', JSON.stringify(novosMedicamentos));
    toast.success('Medicamento aprovado com sucesso!', {
      position: 'top-right',
    });
  };

  const reprovarMedicamento = (id: string) => {
    const novosMedicamentos = medicamentos.map(medicamento => 
      medicamento.id === id ? {...medicamento, aprovada: false} : medicamento
    );
    
    setMedicamentos(novosMedicamentos);
    localStorage.setItem('medicamentosValidacao', JSON.stringify(novosMedicamentos));
    toast.error('Medicamento reprovado!', {
      position: 'top-right',
    });
  };

  return (
    <div className="bg-white rounded-xl border border-blue-100 shadow-lg hover:shadow-xl transition-all overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-blue-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
            <Pill className="text-white h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Validação de Medicamentos</h2>
            <p className="text-xs text-blue-100">Aprove ou rejeite prescrições de medicamentos</p>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto p-1">
        <Table className="w-full">
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-gray-100 border-b border-blue-100">
              <TableHead className="text-blue-700 font-medium">Paciente</TableHead>
              <TableHead className="text-blue-700 font-medium">Doença</TableHead>
              <TableHead className="text-blue-700 font-medium">Data</TableHead>
              <TableHead className="text-blue-700 font-medium">Aprovação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicamentos.map((medicamento) => (
              <TableRow 
                key={medicamento.id} 
                className="hover:bg-blue-50 transition-colors border-b border-blue-50"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-9 w-9 ring-2 ring-blue-100 ring-offset-1">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${medicamento.paciente}`} />
                      <AvatarFallback className="bg-blue-100 text-blue-700">{medicamento.paciente.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-800">{medicamento.paciente}</p>
                      <p className="text-xs text-gray-500">#ID-{Math.floor(Math.random() * 10000)}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                    {medicamento.doenca}
                  </span>
                </TableCell>
                <TableCell className="text-gray-600">{medicamento.data}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => aprovarMedicamento(medicamento.id)}
                      className={`p-2 rounded-lg ${
                        medicamento.aprovada === true 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-100 hover:bg-green-100 text-gray-500 hover:text-green-600'
                      } transition-all`}
                      aria-label="Aprovar medicamento"
                      title="Aprovar medicamento"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => reprovarMedicamento(medicamento.id)}
                      className={`p-2 rounded-lg ${
                        medicamento.aprovada === false 
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600'
                      } transition-all`}
                      aria-label="Reprovar medicamento"
                      title="Reprovar medicamento"
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
      
      <div className="p-4 border-t border-blue-50 bg-gray-50 text-center">
        <button className="text-blue-600 text-sm hover:text-blue-800 font-medium transition-colors">
          Ver todos os medicamentos
        </button>
      </div>
    </div>
  );
};

export default TabelaValidacaoMedicamentos;
