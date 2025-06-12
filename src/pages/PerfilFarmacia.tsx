import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarFarmacia from "../components/SidebarFarmacia";
import HeaderFarmacia from "../components/HeaderFarmacia";
import FloatingChat from "@/components/FloatingChat";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Key,
  Bell,
  FileText,
  AlertCircle,
  Pill,
  Award,
  BookOpen,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PerfilFarmacia: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dados-pessoais");

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
    id: "3",
    name: "Dra. Maria Santos",
    email: "maria.santos@hospital.com",
    role: "Farmacêutico(a)",
    avatar: "/images/avatar-farmacia.png",
    dataNascimento: "10/05/1985",
    telefone: "(11) 98888-7777",
    cpf: "234.567.890-11",
    endereco: {
      rua: "Rua dos Farmacêuticos",
      numero: "789",
      complemento: "Sala 12",
      bairro: "Vila Farmácia",
      cidade: "São Paulo",
      estado: "SP",
      cep: "05678-901",
    },
    dadosProfissionais: {
      crf: "CRF-12345",
      especialidade: "Farmácia Hospitalar",
      experiencia: "10 anos",
      formacao: "Farmácia - UNIFESP",
      especializacao: "Farmácia Clínica",
      certificacoes: [
        "Farmácia Hospitalar",
        "Farmácia Clínica",
        "Controle de Qualidade",
      ],
    },
  };

  const handleNotificacoesClick = () => {
    toast({
      title: "Notificações",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handlePerfilClick = () => {
    navigate("/perfil-farmacia");
  };

  const handleSalvarAlteracoes = () => {
    toast({
      title: "Sucesso",
      description: "Alterações salvas com sucesso!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarFarmacia
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
        nome={currentUser.name}
        tipo={currentUser.role}
      />

      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderFarmacia titulo="MEU PERFIL" onMenuClick={handleMenuClick} />

        <FloatingChat currentUser={currentUser} />

        <main className="flex-1 pt-8 px-4 pb-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <CardTitle className="text-2xl font-semibold">
                      {currentUser.name}
                    </CardTitle>
                    <CardDescription>{currentUser.email}</CardDescription>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Badge variant="secondary">
                        {currentUser.dadosProfissionais.especialidade}
                      </Badge>
                      <Badge variant="outline">
                        {currentUser.dadosProfissionais.crf}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="pt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <TabsTrigger
                      value="dados-pessoais"
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      <span>Dados Pessoais</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="endereco"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>Endereço</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="dados-profissionais"
                      className="flex items-center gap-2"
                    >
                      <Pill className="h-4 w-4" />
                      <span>Dados Profissionais</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="seguranca"
                      className="flex items-center gap-2"
                    >
                      <Key className="h-4 w-4" />
                      <span>Segurança</span>
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-6 space-y-6">
                    <TabsContent value="dados-pessoais" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome">Nome Completo</Label>
                          <Input id="nome" value={currentUser.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail</Label>
                          <Input
                            id="email"
                            type="email"
                            value={currentUser.email}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefone">Telefone</Label>
                          <Input id="telefone" value={currentUser.telefone} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cpf">CPF</Label>
                          <Input id="cpf" value={currentUser.cpf} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dataNascimento">
                            Data de Nascimento
                          </Label>
                          <Input
                            id="dataNascimento"
                            value={currentUser.dataNascimento}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="endereco" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="rua">Rua</Label>
                          <Input id="rua" value={currentUser.endereco.rua} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="numero">Número</Label>
                          <Input
                            id="numero"
                            value={currentUser.endereco.numero}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="complemento">Complemento</Label>
                          <Input
                            id="complemento"
                            value={currentUser.endereco.complemento}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bairro">Bairro</Label>
                          <Input
                            id="bairro"
                            value={currentUser.endereco.bairro}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cidade">Cidade</Label>
                          <Input
                            id="cidade"
                            value={currentUser.endereco.cidade}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="estado">Estado</Label>
                          <Select defaultValue={currentUser.endereco.estado}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o estado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SP">São Paulo</SelectItem>
                              <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                              <SelectItem value="MG">Minas Gerais</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cep">CEP</Label>
                          <Input id="cep" value={currentUser.endereco.cep} />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="dados-profissionais"
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="crf">CRF</Label>
                          <Input
                            id="crf"
                            value={currentUser.dadosProfissionais.crf}
                            disabled
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="especialidade">Especialidade</Label>
                          <Input
                            id="especialidade"
                            value={currentUser.dadosProfissionais.especialidade}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experiencia">Experiência</Label>
                          <Input
                            id="experiencia"
                            value={currentUser.dadosProfissionais.experiencia}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="formacao">Formação</Label>
                          <Input
                            id="formacao"
                            value={currentUser.dadosProfissionais.formacao}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="especializacao">Especialização</Label>
                          <Input
                            id="especializacao"
                            value={
                              currentUser.dadosProfissionais.especializacao
                            }
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Certificações</Label>
                          <div className="flex flex-wrap gap-2">
                            {currentUser.dadosProfissionais.certificacoes.map(
                              (cert, index) => (
                                <Badge key={index} variant="secondary">
                                  {cert}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="seguranca" className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="senha-atual">Senha Atual</Label>
                          <Input id="senha-atual" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nova-senha">Nova Senha</Label>
                          <Input id="nova-senha" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmar-senha">
                            Confirmar Nova Senha
                          </Label>
                          <Input id="confirmar-senha" type="password" />
                        </div>
                      </div>
                    </TabsContent>

                    <div className="flex justify-end gap-4 pt-4">
                      <Button variant="outline">Cancelar</Button>
                      <Button onClick={handleSalvarAlteracoes}>
                        Salvar Alterações
                      </Button>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PerfilFarmacia;
