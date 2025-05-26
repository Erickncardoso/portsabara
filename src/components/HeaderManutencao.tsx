import React, { useState, useEffect } from 'react';
import { Bell, User, X, Menu } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface Notificacao {
  id: string;
  mensagem: string;
  lida: boolean;
  data: string;
}

interface HeaderManutencaoProps {
  nome?: string;
  tipo?: string;
  titulo?: string;
  className?: string;
  onMenuClick?: () => void;
}

// Função para extrair as iniciais do nome
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const HeaderManutencao: React.FC<HeaderManutencaoProps> = ({ 
  nome = 'ROBERT SILVA', 
  tipo = 'MANUTENÇÃO',
  titulo = 'HOME',
  className,
  onMenuClick
}) => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Carrega notificações do localStorage
    const notificacoesArmazenadas = localStorage.getItem('notificacoesManutencao');
    
    if (notificacoesArmazenadas) {
      setNotificacoes(JSON.parse(notificacoesArmazenadas));
    } else {
      // Cria notificações de exemplo se não existirem
      const notificacoesIniciais: Notificacao[] = [
        {
          id: '1',
          mensagem: 'Nova solicitação de manutenção no quarto 190',
          lida: false,
          data: new Date().toISOString()
        },
        {
          id: '2',
          mensagem: 'Protocolo de manutenção preventiva agendado',
          lida: false,
          data: new Date().toISOString()
        }
      ];
      
      setNotificacoes(notificacoesIniciais);
      localStorage.setItem('notificacoesManutencao', JSON.stringify(notificacoesIniciais));
    }
  }, []);

  const salvarNotificacoes = (novasNotificacoes: Notificacao[]) => {
    setNotificacoes(novasNotificacoes);
    localStorage.setItem('notificacoesManutencao', JSON.stringify(novasNotificacoes));
  };

  const marcarComoLida = (id: string) => {
    const atualizadas = notificacoes.map(notif => 
      notif.id === id ? { ...notif, lida: true } : notif
    );
    
    salvarNotificacoes(atualizadas);
    toast({
      description: "Notificação marcada como lida",
    });
  };

  const removerNotificacao = (id: string) => {
    const atualizadas = notificacoes.filter(notif => notif.id !== id);
    salvarNotificacoes(atualizadas);
    toast({
      description: "Notificação removida",
    });
  };

  const notificacoesNaoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <div className={cn("bg-white w-full", className)}>
      <div className={cn(
        "px-2 sm:px-6 py-2"
      )}>
        <div className="bg-white rounded-2xl shadow-sm border p-3 sm:p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {isMobile && onMenuClick && (
                <button 
                  onClick={onMenuClick}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Menu size={20} className="text-gray-700" />
                </button>
              )}
              <h1 className={cn(
                "font-bold",
                isMobile ? "text-xl" : "text-3xl"
              )}>{titulo}</h1>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                  onClick={() => setMostrarNotificacoes(!mostrarNotificacoes)}
                >
                  <Bell size={isMobile ? 18 : 20} />
                  {notificacoesNaoLidas > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {notificacoesNaoLidas}
                    </span>
                  )}
                </button>
                
                {mostrarNotificacoes && (
                  <div className={cn(
                    "absolute right-0 mt-2 bg-white rounded-lg border shadow-lg z-10 p-2 max-h-80 overflow-y-auto",
                    isMobile ? "w-64" : "w-72"
                  )}>
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
                                className="text-xs text-blue-500" 
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
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm border border-gray-200">
                  {getInitials(nome)}
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">{nome}</p>
                  <p className="text-xs sm:text-sm text-red-500">{tipo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
