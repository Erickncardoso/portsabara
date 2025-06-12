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
import { toast } from "@/hooks/use-toast";
import FloatingChat from "@/components/FloatingChat";

// Adicionar estilos customizados para campos de data/hora no mobile
const customStyles = `
  <style>
    @media (max-width: 768px) {
      /* Melhorar aparência de inputs date e time no mobile */
      input[type="date"]::-webkit-datetime-edit-fields-wrapper,
      input[type="time"]::-webkit-datetime-edit-fields-wrapper {
        padding: 8px 12px;
        font-size: 16px;
        border-radius: 6px;
      }
      
      input[type="date"]::-webkit-datetime-edit-text,
      input[type="time"]::-webkit-datetime-edit-text {
        color: #6b7280;
      }
      
      input[type="date"]::-webkit-datetime-edit-month-field,
      input[type="date"]::-webkit-datetime-edit-day-field,
      input[type="date"]::-webkit-datetime-edit-year-field,
      input[type="time"]::-webkit-datetime-edit-hour-field,
      input[type="time"]::-webkit-datetime-edit-minute-field {
        padding: 2px 4px;
        color: #111827;
        font-weight: 500;
      }
      
      /* Estilização para o estado vazio */
      input[type="date"]:invalid,
      input[type="time"]:invalid {
        color: #9ca3af;
      }
      
      /* Melhoria para campos de formulário no mobile */
      .mobile-form-field {
        touch-action: manipulation;
        -webkit-appearance: none;
      }
      
      /* Melhoria para selects no mobile */
      [data-radix-select-trigger] {
        font-size: 16px !important;
        min-height: 48px !important;
      }
    }
  </style>
`;

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

    // Injetar estilos customizados para mobile
    if (isMobile) {
      const styleElement = document.createElement("div");
      styleElement.innerHTML = customStyles;
      document.head.appendChild(styleElement.firstElementChild!);

      return () => {
        const existingStyle = document.head.querySelector(
          "style[data-mobile-form]"
        );
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
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
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">
                Agendar Consulta
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome e Gênero */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Nome do Paciente *
                    </label>
                    <Input
                      placeholder="Digite o nome completo"
                      value={formData.nome}
                      onChange={(e) =>
                        handleInputChange("nome", e.target.value)
                      }
                      required
                      className={`h-12 ${isMobile ? "text-base" : ""}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Gênero *
                    </label>
                    <Select
                      value={formData.genero}
                      onValueChange={(value) =>
                        handleInputChange("genero", value)
                      }
                    >
                      <SelectTrigger
                        className={`h-12 ${isMobile ? "text-base" : ""}`}
                      >
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
                </div>

                {/* Email e Telefone */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="exemplo@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                      className={`h-12 ${isMobile ? "text-base" : ""}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <Input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.telefone}
                      onChange={(e) =>
                        handleInputChange("telefone", e.target.value)
                      }
                      className={`h-12 ${isMobile ? "text-base" : ""}`}
                    />
                  </div>
                </div>

                {/* Data e Horário */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Data da Consulta *
                    </label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={formData.data}
                        onChange={(e) =>
                          handleInputChange("data", e.target.value)
                        }
                        required
                        className={`h-12 ${isMobile ? "text-base" : ""}`}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {!formData.data && isMobile && (
                        <div className="text-xs text-gray-500 mt-1">
                          Toque para selecionar a data
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Horário *
                    </label>
                    <div className="relative">
                      <Input
                        type="time"
                        value={formData.horario}
                        onChange={(e) =>
                          handleInputChange("horario", e.target.value)
                        }
                        required
                        className={`h-12 ${isMobile ? "text-base" : ""}`}
                        min="07:00"
                        max="18:00"
                      />
                      {!formData.horario && isMobile && (
                        <div className="text-xs text-gray-500 mt-1">
                          Horários: 07:00 às 18:00
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Médico */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Médico *
                  </label>
                  <Select
                    value={formData.medico}
                    onValueChange={(value) =>
                      handleInputChange("medico", value)
                    }
                  >
                    <SelectTrigger
                      className={`h-12 ${isMobile ? "text-base" : ""}`}
                    >
                      <SelectValue placeholder="Selecione o médico" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-joao">
                        Dr. João Silva - Cardiologia Pediátrica
                      </SelectItem>
                      <SelectItem value="dra-maria">
                        Dra. Maria Santos - Dermatologia Pediátrica
                      </SelectItem>
                      <SelectItem value="dr-carlos">
                        Dr. Carlos Lima - Ortopedia Pediátrica
                      </SelectItem>
                      <SelectItem value="dra-ana">
                        Dra. Ana Costa - Pediatria Geral
                      </SelectItem>
                      <SelectItem value="dr-pedro">
                        Dr. Pedro Oliveira - Neurologia Pediátrica
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Observações
                  </label>
                  <Textarea
                    placeholder="Informações adicionais, sintomas ou observações importantes..."
                    rows={4}
                    value={formData.observacoes}
                    onChange={(e) =>
                      handleInputChange("observacoes", e.target.value)
                    }
                    className="resize-none"
                  />
                </div>

                {/* Botão de Submit */}
                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 h-12 text-base font-medium"
                >
                  Agendar Consulta
                </Button>

                {/* Informação sobre campos obrigatórios */}
                <p className="text-xs text-gray-500 text-center">
                  * Campos obrigatórios
                </p>
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
