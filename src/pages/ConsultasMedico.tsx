import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import SidebarMedico from "@/components/SidebarMedico";
import HeaderMedico from "@/components/HeaderMedico";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/use-toast";
import FloatingChat from "@/components/FloatingChat";

export default function ConsultasMedico() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    genero: "",
    email: "",
    telefone: "",
    data: "",
    horario: "",
    medico: "",
    observacoes: "",
  });

  const currentUser = {
    id: "2",
    name: "Dr. João Silva",
    role: "Médico",
    avatar: "/images/avatar-doctor.png",
  };

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

  const handleNotificacoesClick = () => {
    toast({
      title: "Notificações",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handlePerfilClick = () => {
    navigate("/perfil-medico");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (
      !formData.nome ||
      !formData.genero ||
      !formData.email ||
      !formData.data ||
      !formData.horario ||
      !formData.medico
    ) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Aqui você pode adicionar a lógica para salvar a consulta
    toast({
      title: "Consulta Agendada",
      description: "A consulta foi agendada com sucesso!",
    });

    // Limpar formulário
    setFormData({
      nome: "",
      genero: "",
      email: "",
      telefone: "",
      data: "",
      horario: "",
      medico: "",
      observacoes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarMedico
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSheetOpen={isSheetOpen}
        onSheetOpenChange={setIsSheetOpen}
      />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderMedico
          titulo="CONSULTAS"
          nome={currentUser.name}
          tipo={currentUser.role}
          onMenuClick={handleMenuClick}
        />

        <div className="p-3 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Banner Visual Melhorado */}
            <div className="relative">
              <div className="w-full h-[500px] bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-lg flex flex-col items-center justify-center text-white p-8">
                <div className="text-center space-y-6">
                  <img
                    src="/images/logo-sabara-branca.png"
                    alt="Hospital Sabará"
                    className="h-24 mx-auto mb-6"
                  />
                  <h1 className="text-3xl font-bold mb-4">Consultas Médicas</h1>
                  <p className="text-lg text-blue-100 max-w-md">
                    Gerencie seus agendamentos e consultas de forma eficiente e
                    organizada
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold">150+</div>
                      <div className="text-sm text-blue-100">Consultas/Mês</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold">98%</div>
                      <div className="text-sm text-blue-100">Satisfação</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário de Agendamento */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Agendar Consulta</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nome do Paciente"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    required
                  />
                  <Select
                    value={formData.genero}
                    onValueChange={(value) =>
                      handleInputChange("genero", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                      <SelectItem value="nao-informar">
                        Prefiro não informar
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChange={(e) =>
                      handleInputChange("telefone", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="date"
                    placeholder="Data da Consulta"
                    value={formData.data}
                    onChange={(e) => handleInputChange("data", e.target.value)}
                    required
                  />
                  <Input
                    type="time"
                    placeholder="Horário"
                    value={formData.horario}
                    onChange={(e) =>
                      handleInputChange("horario", e.target.value)
                    }
                    required
                  />
                </div>

                <Select
                  value={formData.medico}
                  onValueChange={(value) => handleInputChange("medico", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o Médico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-joao">
                      Dr. João Silva - Cardiologista
                    </SelectItem>
                    <SelectItem value="dra-maria">
                      Dra. Maria Santos - Dermatologista
                    </SelectItem>
                    <SelectItem value="dr-carlos">
                      Dr. Carlos Lima - Ortopedista
                    </SelectItem>
                    <SelectItem value="dra-ana">
                      Dra. Ana Costa - Pediatra
                    </SelectItem>
                    <SelectItem value="dr-pedro">
                      Dr. Pedro Oliveira - Neurologista
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Textarea
                  placeholder="Mensagem/Observações"
                  rows={4}
                  value={formData.observacoes}
                  onChange={(e) =>
                    handleInputChange("observacoes", e.target.value)
                  }
                />

                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600"
                >
                  Agendar Consulta
                </Button>
              </form>
            </Card>
          </div>

          {/* Consultas Agendadas */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Consultas Agendadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600">JS</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      Dr. João Silva
                    </h3>
                    <p className="text-sm text-gray-500">Cardiologista</p>
                    <p className="text-sm text-gray-500">
                      15 Anos de Experiência
                    </p>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        Próxima Consulta:
                      </p>
                      <p className="text-sm text-blue-600">
                        Segunda, 10 de Abril
                      </p>
                      <p className="text-sm text-blue-600">14:30</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-green-600">MS</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      Dra. Maria Santos
                    </h3>
                    <p className="text-sm text-gray-500">Dermatologista</p>
                    <p className="text-sm text-gray-500">
                      12 Anos de Experiência
                    </p>
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">
                        Próxima Consulta:
                      </p>
                      <p className="text-sm text-green-600">
                        Terça, 11 de Abril
                      </p>
                      <p className="text-sm text-green-600">09:00</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-purple-600">
                      CL
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      Dr. Carlos Lima
                    </h3>
                    <p className="text-sm text-gray-500">Ortopedista</p>
                    <p className="text-sm text-gray-500">
                      18 Anos de Experiência
                    </p>
                    <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">
                        Próxima Consulta:
                      </p>
                      <p className="text-sm text-purple-600">
                        Quarta, 12 de Abril
                      </p>
                      <p className="text-sm text-purple-600">16:00</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <FloatingChat currentUser={currentUser} />
      </div>
    </div>
  );
}
