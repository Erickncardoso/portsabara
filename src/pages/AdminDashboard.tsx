import React, { useState } from 'react';
import SidebarAdmin from '@/components/SidebarAdmin';
import HeaderAdmin from '@/components/HeaderAdmin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  UserCircle, 
  Hospital, 
  BookOpen, 
  FileText,
  Settings,
  Bell,
  CalendarClock,
  UserPlus,
  Stethoscope,
  Wrench,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('geral');
  const [showRegistroDialog, setShowRegistroDialog] = useState(false);
  const [tipoRegistro, setTipoRegistro] = useState('');
  
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  if (!isAdminLoggedIn) {
    return <Navigate to="/login-admin" replace />;
  }

  const handleRegistro = (tipo: string) => {
    setTipoRegistro(tipo);
    setShowRegistroDialog(true);
  };

  const handleSubmitRegistro = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registro realizado",
      description: `Novo ${tipoRegistro} registrado com sucesso!`,
      duration: 3000,
    });
    setShowRegistroDialog(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        
        <main className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6">Painel de Controle</h1>
            
            <Tabs defaultValue="geral" className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="geral">Visão Geral</TabsTrigger>
                <TabsTrigger value="usuarios">Usuários</TabsTrigger>
                <TabsTrigger value="servicos">Serviços</TabsTrigger>
                <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
              </TabsList>
              
              <TabsContent value="geral">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center">
                        <Users className="mr-2 h-5 w-5 text-blue-500" />
                        Total de Usuários
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1.284</div>
                      <p className="text-xs text-muted-foreground">
                        +12% em relação ao mês passado
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center">
                        <Hospital className="mr-2 h-5 w-5 text-green-500" />
                        Atendimentos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">432</div>
                      <p className="text-xs text-muted-foreground">
                        Esta semana
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center">
                        <Bell className="mr-2 h-5 w-5 text-red-500" />
                        Notificações
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground">
                        Pendentes
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="usuarios">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-32 flex flex-col items-center justify-center gap-2"
                    onClick={() => handleRegistro('médico')}
                  >
                    <Stethoscope className="h-8 w-8 text-blue-500" />
                    <span>Registrar Médico</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-32 flex flex-col items-center justify-center gap-2"
                    onClick={() => handleRegistro('enfermeiro')}
                  >
                    <UserPlus className="h-8 w-8 text-green-500" />
                    <span>Registrar Enfermeiro</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-32 flex flex-col items-center justify-center gap-2"
                    onClick={() => handleRegistro('limpeza')}
                  >
                    <Sparkles className="h-8 w-8 text-purple-500" />
                    <span>Registrar Limpeza</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-32 flex flex-col items-center justify-center gap-2"
                    onClick={() => handleRegistro('manutenção')}
                  >
                    <Wrench className="h-8 w-8 text-orange-500" />
                    <span>Registrar Manutenção</span>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="servicos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Serviços do Sistema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Hospital className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium">Serviço de Atendimento</h3>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm text-green-500">Ativo</span>
                          </div>
                        </div>
                        <Button variant="ghost">
                          Reiniciar
                        </Button>
                      </div>
                      
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="bg-green-100 p-3 rounded-full">
                          <FileText className="h-6 w-6 text-green-500" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium">Serviço de Relatórios</h3>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm text-green-500">Ativo</span>
                          </div>
                        </div>
                        <Button variant="ghost">
                          Reiniciar
                        </Button>
                      </div>
                      
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="bg-yellow-100 p-3 rounded-full">
                          <CalendarClock className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium">Serviço de Agendamento</h3>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-sm text-yellow-500">Em manutenção</span>
                          </div>
                        </div>
                        <Button variant="ghost">
                          Reiniciar
                        </Button>
                      </div>
                      
                      <div className="flex items-center p-4 border rounded-lg">
                        <div className="bg-red-100 p-3 rounded-full">
                          <Bell className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium">Serviço de Notificações</h3>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm text-red-500">Inativo</span>
                          </div>
                        </div>
                        <Button variant="outline">
                          Iniciar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="configuracoes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações do Sistema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Manutenção Programada</h3>
                          <p className="text-sm text-muted-foreground">
                            Ativar modo de manutenção
                          </p>
                        </div>
                        <Button variant="outline">
                          Ativar
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Backup do Sistema</h3>
                          <p className="text-sm text-muted-foreground">
                            Último backup: 27/04/2025 10:45
                          </p>
                        </div>
                        <Button>
                          Iniciar Backup
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Configurações de Email</h3>
                          <p className="text-sm text-muted-foreground">
                            Atualizar configurações de SMTP
                          </p>
                        </div>
                        <Button variant="outline">
                          Configurar
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Limpeza de Logs</h3>
                          <p className="text-sm text-muted-foreground">
                            Remover logs antigos do sistema
                          </p>
                        </div>
                        <Button variant="outline">
                          Limpar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <Dialog open={showRegistroDialog} onOpenChange={setShowRegistroDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Novo {tipoRegistro}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitRegistro} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" placeholder="Digite o nome completo" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Digite o email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="documento">CPF</Label>
              <Input id="documento" placeholder="Digite o CPF" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha Provisória</Label>
              <Input id="senha" type="password" placeholder="Digite a senha" required />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowRegistroDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                Registrar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
