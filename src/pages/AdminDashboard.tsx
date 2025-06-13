import React, { useState } from "react";
import SidebarAdmin from "@/components/SidebarAdmin";
import HeaderAdmin from "@/components/HeaderAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Sparkles,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("geral");
  const [showRegistroDialog, setShowRegistroDialog] = useState(false);
  const [tipoRegistro, setTipoRegistro] = useState("");

  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

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

  // Dados simulados com nomes reais
  const usuariosRecentes = [
    {
      id: "1",
      nome: "Dr. João Silva",
      tipo: "Médico",
      especialidade: "Pediatria",
      avatar: "JS",
      avatarColor: "bg-blue-500",
      status: "Ativo",
      dataRegistro: "28/12/2024",
    },
    {
      id: "2",
      nome: "Enf. Maria Santos",
      tipo: "Enfermeira",
      especialidade: "UTI",
      avatar: "MS",
      avatarColor: "bg-green-500",
      status: "Ativo",
      dataRegistro: "27/12/2024",
    },
    {
      id: "3",
      nome: "Ana Costa",
      tipo: "Limpeza",
      especialidade: "Quartos",
      avatar: "AC",
      avatarColor: "bg-purple-500",
      status: "Ativo",
      dataRegistro: "26/12/2024",
    },
    {
      id: "4",
      nome: "Carlos Lima",
      tipo: "Manutenção",
      especialidade: "Elétrica",
      avatar: "CL",
      avatarColor: "bg-orange-500",
      status: "Ativo",
      dataRegistro: "25/12/2024",
    },
  ];

  const atividadesRecentes = [
    {
      id: "1",
      acao: "Novo usuário registrado",
      usuario: "Dr. João Silva",
      tipo: "registro",
      tempo: "2 horas atrás",
      icon: UserPlus,
      color: "text-blue-500",
    },
    {
      id: "2",
      acao: "Backup realizado com sucesso",
      usuario: "Sistema",
      tipo: "backup",
      tempo: "4 horas atrás",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: "3",
      acao: "Serviço de notificações reiniciado",
      usuario: "Admin",
      tipo: "sistema",
      tempo: "6 horas atrás",
      icon: Settings,
      color: "text-orange-500",
    },
    {
      id: "4",
      acao: "Relatório mensal gerado",
      usuario: "Sistema",
      tipo: "relatorio",
      tempo: "1 dia atrás",
      icon: FileText,
      color: "text-purple-500",
    },
  ];

  const estatisticas = [
    {
      titulo: "Total de Usuários",
      valor: "327",
      mudanca: "+15",
      porcentagem: "+4.6%",
      periodo: "este mês",
      icon: Users,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      titulo: "Atendimentos Hoje",
      valor: "89",
      mudanca: "+12",
      porcentagem: "+15.6%",
      periodo: "nas últimas 24h",
      icon: Hospital,
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      titulo: "Médicos Ativos",
      valor: "45",
      mudanca: "+3",
      porcentagem: "+7.1%",
      periodo: "este mês",
      icon: Stethoscope,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      titulo: "Tarefas Pendentes",
      valor: "23",
      mudanca: "-8",
      porcentagem: "-25.8%",
      periodo: "esta semana",
      icon: AlertCircle,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Painel de Controle
              </h1>
              <p className="text-gray-600 mt-2">
                Bem-vindo ao sistema administrativo do Hospital Sabará
              </p>
            </div>

            <Tabs defaultValue="geral" className="mb-6">
              <TabsList className="mb-6">
                <TabsTrigger value="geral">Visão Geral</TabsTrigger>
                <TabsTrigger value="usuarios">Usuários</TabsTrigger>
                <TabsTrigger value="servicos">Serviços</TabsTrigger>
                <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
              </TabsList>

              <TabsContent value="geral" className="space-y-6">
                {/* Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {estatisticas.map((stat, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              {stat.titulo}
                            </p>
                            <div className="flex items-baseline mt-2">
                              <p className="text-2xl font-bold text-gray-900">
                                {stat.valor}
                              </p>
                              <span
                                className={cn(
                                  "ml-2 text-sm font-medium",
                                  stat.mudanca.startsWith("+")
                                    ? "text-green-600"
                                    : "text-red-600"
                                )}
                              >
                                {stat.mudanca}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {stat.porcentagem} {stat.periodo}
                            </p>
                          </div>
                          <div className={cn("p-3 rounded-full", stat.bgColor)}>
                            <stat.icon
                              className={cn("h-6 w-6", stat.iconColor)}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Usuários Recentes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <UserCircle className="h-5 w-5" />
                        Usuários Recentes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {usuariosRecentes.map((usuario) => (
                          <div
                            key={usuario.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm",
                                  usuario.avatarColor
                                )}
                              >
                                {usuario.avatar}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {usuario.nome}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {usuario.tipo} - {usuario.especialidade}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-green-600">
                                  {usuario.status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">
                                {usuario.dataRegistro}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Atividades Recentes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Atividades Recentes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {atividadesRecentes.map((atividade) => (
                          <div
                            key={atividade.id}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="p-2 bg-white rounded-full">
                              <atividade.icon
                                className={cn("h-4 w-4", atividade.color)}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">
                                {atividade.acao}
                              </p>
                              <p className="text-xs text-gray-600">
                                por {atividade.usuario}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500">
                                {atividade.tempo}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="usuarios">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button
                      variant="outline"
                      className="h-32 flex flex-col items-center justify-center gap-3 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      onClick={() => handleRegistro("médico")}
                    >
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Stethoscope className="h-8 w-8 text-blue-600" />
                      </div>
                      <span className="font-medium">Registrar Médico</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-32 flex flex-col items-center justify-center gap-3 hover:bg-green-50 hover:border-green-300 transition-colors"
                      onClick={() => handleRegistro("enfermeiro")}
                    >
                      <div className="p-3 bg-green-100 rounded-full">
                        <UserPlus className="h-8 w-8 text-green-600" />
                      </div>
                      <span className="font-medium">Registrar Enfermeiro</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-32 flex flex-col items-center justify-center gap-3 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                      onClick={() => handleRegistro("limpeza")}
                    >
                      <div className="p-3 bg-purple-100 rounded-full">
                        <Sparkles className="h-8 w-8 text-purple-600" />
                      </div>
                      <span className="font-medium">Registrar Limpeza</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-32 flex flex-col items-center justify-center gap-3 hover:bg-orange-50 hover:border-orange-300 transition-colors"
                      onClick={() => handleRegistro("manutenção")}
                    >
                      <div className="p-3 bg-orange-100 rounded-full">
                        <Wrench className="h-8 w-8 text-orange-600" />
                      </div>
                      <span className="font-medium">Registrar Manutenção</span>
                    </Button>
                  </div>

                  {/* Lista de Usuários em Cards */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Usuários do Sistema</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {usuariosRecentes.map((usuario) => (
                          <div
                            key={usuario.id}
                            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={cn(
                                  "w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold",
                                  usuario.avatarColor
                                )}
                              >
                                {usuario.avatar}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {usuario.nome}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {usuario.tipo}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  Especialidade:
                                </span>
                                <span className="font-medium">
                                  {usuario.especialidade}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Status:</span>
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-green-600">
                                    {usuario.status}
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Registro:</span>
                                <span className="font-medium">
                                  {usuario.dataRegistro}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="servicos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Status dos Serviços</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center p-4 border rounded-lg bg-green-50 border-green-200">
                        <div className="bg-green-100 p-3 rounded-full">
                          <Hospital className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-semibold text-green-900">
                            Serviço de Atendimento
                          </h3>
                          <p className="text-sm text-green-700">
                            Sistema funcionando normalmente
                          </p>
                          <div className="flex items-center mt-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-green-600">
                              Ativo
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-300 hover:bg-green-100"
                        >
                          Reiniciar
                        </Button>
                      </div>

                      <div className="flex items-center p-4 border rounded-lg bg-blue-50 border-blue-200">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-semibold text-blue-900">
                            Serviço de Relatórios
                          </h3>
                          <p className="text-sm text-blue-700">
                            Gerando relatórios automaticamente
                          </p>
                          <div className="flex items-center mt-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-blue-600">
                              Ativo
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-300 hover:bg-blue-100"
                        >
                          Reiniciar
                        </Button>
                      </div>

                      <div className="flex items-center p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                        <div className="bg-yellow-100 p-3 rounded-full">
                          <CalendarClock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-semibold text-yellow-900">
                            Serviço de Agendamento
                          </h3>
                          <p className="text-sm text-yellow-700">
                            Manutenção programada em andamento
                          </p>
                          <div className="flex items-center mt-1">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-yellow-600">
                              Em manutenção
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-yellow-300 hover:bg-yellow-100"
                        >
                          Verificar
                        </Button>
                      </div>

                      <div className="flex items-center p-4 border rounded-lg bg-red-50 border-red-200">
                        <div className="bg-red-100 p-3 rounded-full">
                          <Bell className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-semibold text-red-900">
                            Serviço de Notificações
                          </h3>
                          <p className="text-sm text-red-700">
                            Serviço temporariamente indisponível
                          </p>
                          <div className="flex items-center mt-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-red-600">
                              Inativo
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Iniciar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="configuracoes" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Configurações do Sistema
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Manutenção Programada
                          </h3>
                          <p className="text-sm text-gray-600">
                            Próxima manutenção: 01/01/2025 02:00
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Backup Automático
                          </h3>
                          <p className="text-sm text-gray-600">
                            Último backup: 28/12/2024 03:15
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Executar Agora
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Configurações de Email
                          </h3>
                          <p className="text-sm text-gray-600">
                            SMTP configurado e funcionando
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Testar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Estatísticas do Sistema
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-blue-900">
                              Uso de CPU
                            </span>
                            <span className="text-sm font-semibold text-blue-700">
                              23%
                            </span>
                          </div>
                          <div className="w-full bg-blue-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: "23%" }}
                            ></div>
                          </div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-green-900">
                              Uso de Memória
                            </span>
                            <span className="text-sm font-semibold text-green-700">
                              67%
                            </span>
                          </div>
                          <div className="w-full bg-green-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: "67%" }}
                            ></div>
                          </div>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-orange-900">
                              Armazenamento
                            </span>
                            <span className="text-sm font-semibold text-orange-700">
                              45%
                            </span>
                          </div>
                          <div className="w-full bg-orange-200 rounded-full h-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
              <Input
                id="email"
                type="email"
                placeholder="Digite o email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="documento">CPF</Label>
              <Input id="documento" placeholder="Digite o CPF" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha Provisória</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite a senha"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRegistroDialog(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Registrar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
