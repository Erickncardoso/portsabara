
import React, { useState, useEffect } from 'react';
import { Bell, User, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface Notificacao {
  id: string;
  mensagem: string;
  lida: boolean;
  data: string;
}

interface HeaderEnfermariaProps {
  nome?: string;
  tipo?: string;
}

const HeaderEnfermaria: React.FC<HeaderEnfermariaProps> = ({ 
  nome = 'ANA', 
  tipo = 'ENFERMEIRA' 
}) => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);

  useEffect(() => {
    // Carrega notificações do localStorage
    const notificacoesArmazenadas = localStorage.getItem('notificacoesEnfermaria');
    
    if (notificacoesArmazenadas) {
      setNotificacoes(JSON.parse(notificacoesArmazenadas));
    } else {
      // Cria notificações de exemplo se não existirem
      const notificacoesIniciais: Notificacao[] = [
        {
          id: '1',
          mensagem: 'Paciente João Silva precisa de medicação às 14:00',
          lida: false,
          data: new Date().toISOString()
        },
        {
          id: '2',
          mensagem: 'Novo paciente internado no quarto 302',
          lida: false,
          data: new Date().toISOString()
        },
        {
          id: '3',
          mensagem: 'Solicitação de troca de plantão para amanhã',
          lida: true,
          data: new Date().toISOString()
        }
      ];
      
      setNotificacoes(notificacoesIniciais);
      localStorage.setItem('notificacoesEnfermaria', JSON.stringify(notificacoesIniciais));
    }
  }, []);

  const salvarNotificacoes = (novasNotificacoes: Notificacao[]) => {
    setNotificacoes(novasNotificacoes);
    localStorage.setItem('notificacoesEnfermaria', JSON.stringify(novasNotificacoes));
  };

  const marcarComoLida = (id: string) => {
    const atualizadas = notificacoes.map(notif => 
      notif.id === id ? { ...notif, lida: true } : notif
    );
    
    salvarNotificacoes(atualizadas);
    toast.success('Notificação marcada como lida', {
      position: 'top-right',
    });
  };

  const removerNotificacao = (id: string) => {
    const atualizadas = notificacoes.filter(notif => notif.id !== id);
    salvarNotificacoes(atualizadas);
    toast.success('Notificação removida', {
      position: 'top-right',
    });
  };

  const notificacoesNaoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <div className="bg-white">
      <div className="px-6 py-2">
        <div className="bg-white rounded-2xl shadow-sm border p-2">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">HOME</h1>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                  onClick={() => setMostrarNotificacoes(!mostrarNotificacoes)}
                >
                  <Bell size={18} />
                  {notificacoesNaoLidas > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {notificacoesNaoLidas}
                    </span>
                  )}
                </button>
                
                {mostrarNotificacoes && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg border shadow-lg z-10 p-2 max-h-80 overflow-y-auto">
                    <h3 className="font-semibold text-sm p-2 border-b">Notificações</h3>
                    
                    {notificacoes.length === 0 ? (
                      <p className="text-sm text-gray-500 p-4 text-center">Nenhuma notificação</p>
                    ) : (
                      notificacoes.map(notificacao => (
                        <div 
                          key={notificacao.id}
                          className={`p-2 border-b last:border-b-0 flex items-start justify-between hover:bg-gray-50 ${notificacao.lida ? 'opacity-70' : ''}`}
                        >
                          <div className="flex-1 pr-2">
                            <p className="text-xs">{notificacao.mensagem}</p>
                            <div className="flex gap-2 mt-1">
                              <button 
                                className="text-xs text-red-500" 
                                onClick={() => marcarComoLida(notificacao.id)}
                              >
                                {notificacao.lida ? 'Lida' : 'Marcar como lida'}
                              </button>
                            </div>
                          </div>
                          <button 
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => removerNotificacao(notificacao.id)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border border-gray-200">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${nome}`} alt={nome} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-right">
                  <p className="font-semibold text-sm">{nome}</p>
                  <p className="text-xs text-red-500">{tipo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderEnfermaria;
