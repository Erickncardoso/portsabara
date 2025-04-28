
import React from 'react';
import { Calendar, FileText } from 'lucide-react';

interface NotificacaoItemProps {
  id: number;
  titulo: string;
  mensagem: string;
  tempo: string;
  tipo: 'alerta' | 'info';
}

export const NotificacaoItem: React.FC<NotificacaoItemProps> = ({ 
  id, 
  titulo, 
  mensagem, 
  tempo,
  tipo 
}) => {
  return (
    <div className={`p-4 border rounded-lg mb-4 ${tipo === 'alerta' ? 'border-red-200' : 'border-green-200'}`}>
      <div className="flex items-start">
        <div className={`p-2 rounded-md mr-3 ${tipo === 'alerta' ? 'bg-red-100' : 'bg-green-100'}`}>
          {tipo === 'alerta' ? (
            <Calendar className="h-5 w-5 text-red-600" />
          ) : (
            <FileText className="h-5 w-5 text-green-600" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="text-sm font-semibold">Notificação {id}</h3>
            <span className="text-xs text-gray-500">{tempo}</span>
          </div>
          
          <p className="text-sm font-semibold text-blue-600 mb-1">{titulo}</p>
          <p className="text-xs text-gray-600">{mensagem}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificacaoItem;
