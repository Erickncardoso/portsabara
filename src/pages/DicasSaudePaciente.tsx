import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPaciente from '../components/SidebarPaciente';
import HeaderPaciente from '../components/HeaderPaciente';
import FloatingChat from '@/components/FloatingChat';
import { cn, getMainContentClasses } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, Brain, Apple, Dumbbell, BookOpen } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DicasSaudePaciente: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleMenuClick = () => {
    if (isMobile) {
      setIsSheetOpen(true);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const currentUser = {
    id: '1',
    name: 'João Silva',
    role: 'Paciente',
    avatar: '/images/avatar.png'
  };

  const dicasSaude = [
    {
      id: 1,
      titulo: "Alimentação Saudável",
      descricao: "Mantenha uma dieta equilibrada com frutas, verduras e proteínas. Evite alimentos processados e reduza o consumo de açúcar.",
      categoria: "Nutrição",
      autor: "Dra. Maria Santos",
      especialidade: "Nutricionista",
      dataPublicacao: "25/04/2025",
      tempoLeitura: "5 min",
      icone: Apple
    },
    {
      id: 2,
      titulo: "Exercícios para o Coração",
      descricao: "Pratique pelo menos 30 minutos de exercícios aeróbicos por dia. Caminhada, corrida ou natação são excelentes opções.",
      categoria: "Atividade Física",
      autor: "Dr. Carlos Silva",
      especialidade: "Cardiologista",
      dataPublicacao: "24/04/2025",
      tempoLeitura: "4 min",
      icone: Heart
    },
    {
      id: 3,
      titulo: "Saúde Mental",
      descricao: "Pratique meditação e mindfulness. Reserve um tempo para relaxar e fazer atividades que você gosta.",
      categoria: "Bem-estar",
      autor: "Dra. Ana Oliveira",
      especialidade: "Psicóloga",
      dataPublicacao: "23/04/2025",
      tempoLeitura: "6 min",
      icone: Brain
    },
    {
      id: 4,
      titulo: "Treino em Casa",
      descricao: "Exercícios simples que você pode fazer em casa para manter a forma, mesmo sem equipamentos.",
      categoria: "Atividade Física",
      autor: "Dr. Pedro Lima",
      especialidade: "Educador Físico",
      dataPublicacao: "22/04/2025",
      tempoLeitura: "8 min",
      icone: Dumbbell
    }
  ];

  const handleNotificacoesClick = () => {
    toast({
      title: "Notificações",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handlePerfilClick = () => {
    navigate('/perfil-paciente');
  };

  const dicasFiltradas = dicasSaude.filter(dica => {
    const matchesSearch = 
      dica.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dica.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dica.autor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategoria = 
      filtroCategoria === 'todas' || 
      dica.categoria.toLowerCase() === filtroCategoria.toLowerCase();

    return matchesSearch && matchesCategoria;
  });

  const categorias = [...new Set(dicasSaude.map(dica => dica.categoria))];

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarPaciente 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderPaciente 
          titulo="DICAS DE SAÚDE"
          nome={currentUser.name}
          tipo={currentUser.role}
          notificacoes={2}
          onNotificacoesClick={handleNotificacoesClick}
          onPerfilClick={handlePerfilClick}
          onMenuClick={handleMenuClick}
        />

        <FloatingChat currentUser={currentUser} />

        <main className="flex-1 pt-8 px-4 pb-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-lg font-semibold">Dicas e Recomendações</CardTitle>
                    <CardDescription>Informações importantes para manter sua saúde em dia</CardDescription>
                  </div>
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Buscar dicas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                      <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas</SelectItem>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria} value={categoria.toLowerCase()}>
                            {categoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-4">
                  {dicasFiltradas.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Nenhuma dica encontrada
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dicasFiltradas.map((dica) => (
                        <Card key={dica.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-blue-50 rounded-lg">
                                {React.createElement(dica.icone, { 
                                  className: "h-5 w-5 text-blue-500" 
                                })}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <CardTitle className="text-base font-medium">
                                    {dica.titulo}
                                  </CardTitle>
                                  <Badge variant="secondary" className="ml-2">
                                    {dica.categoria}
                                  </Badge>
                                </div>
                                <CardDescription className="mt-1 text-xs">
                                  {dica.autor} • {dica.especialidade}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {dica.descricao}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <BookOpen className="h-4 w-4" />
                                <span>{dica.tempoLeitura} de leitura</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => navigate(`/dica/${dica.id}`)}
                              >
                                Ler mais
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DicasSaudePaciente;
