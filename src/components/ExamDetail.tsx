import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Calendar,
  Edit2,
  Mic,
  Save,
  X,
  User,
  Clock,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { toast } from "./ui/use-toast";
import VoiceRecognition from "./VoiceRecognition";

interface ExamDetailProps {
  exam: {
    id: number;
    paciente: string;
    idade: string;
    tipo: string;
    data: string;
    status: string;
    urgencia?: string;
    observacoes?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedExam: any) => void;
}

const ExamDetail: React.FC<ExamDetailProps> = ({
  exam,
  isOpen,
  onClose,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [editedExam, setEditedExam] = useState(exam);

  if (!isOpen) return null;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedExam(exam);
  };

  const handleSave = () => {
    onSave(editedExam);
    setIsEditing(false);
    toast({
      title: "✅ Exame Atualizado",
      description: "As informações do exame foram atualizadas com sucesso.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedExam(exam);
  };

  const handleVoiceUpdate = (voiceData: any) => {
    setEditedExam((prev) => ({
      ...prev,
      ...voiceData,
    }));
    toast({
      title: "🎤 Dados Atualizados por Voz",
      description:
        "As informações foram atualizadas usando reconhecimento de voz.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedExam((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "concluído":
        return "bg-green-100 text-green-700";
      case "em andamento":
        return "bg-yellow-100 text-yellow-700";
      case "agendado":
        return "bg-blue-100 text-blue-700";
      case "cancelado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getUrgencyColor = (urgencia: string) => {
    switch (urgencia?.toLowerCase()) {
      case "alta":
        return "destructive";
      case "média":
        return "default";
      case "normal":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Detalhes do Exame #{exam.id}
            </CardTitle>
            <div className="flex gap-2">
              {!isEditing && (
                <>
                  <Button onClick={handleEdit} variant="outline" size="sm">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    onClick={() => setIsVoiceModalOpen(true)}
                    variant="outline"
                    size="sm"
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Refalar
                  </Button>
                </>
              )}
              <Button variant="ghost" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Informações do Paciente */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-lg">
                    {exam.paciente.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Informações do Paciente
                    </h3>
                    <p className="text-sm text-gray-500">Dados pessoais</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Nome:
                    </label>
                    {isEditing ? (
                      <Input
                        value={editedExam.paciente}
                        onChange={(e) =>
                          handleInputChange("paciente", e.target.value)
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium">{exam.paciente}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Idade:
                    </label>
                    {isEditing ? (
                      <Input
                        value={editedExam.idade}
                        onChange={(e) =>
                          handleInputChange("idade", e.target.value)
                        }
                        className="mt-1"
                        type="number"
                        min="0"
                        max="17"
                      />
                    ) : (
                      <p className="font-medium">{exam.idade} anos</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações do Exame */}
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      Informações do Exame
                    </h3>
                    <p className="text-sm text-gray-500">
                      Detalhes do procedimento
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Tipo de Exame:
                    </label>
                    {isEditing ? (
                      <Input
                        value={editedExam.tipo}
                        onChange={(e) =>
                          handleInputChange("tipo", e.target.value)
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium">{exam.tipo}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Data:
                    </label>
                    {isEditing ? (
                      <Input
                        value={editedExam.data}
                        onChange={(e) =>
                          handleInputChange("data", e.target.value)
                        }
                        className="mt-1"
                        type="date"
                      />
                    ) : (
                      <p className="font-medium">{exam.data}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Status:
                    </label>
                    {isEditing ? (
                      <select
                        value={editedExam.status}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                        className="mt-1 w-full p-2 border rounded-md"
                      >
                        <option value="Agendado">Agendado</option>
                        <option value="Em andamento">Em andamento</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    ) : (
                      <Badge className={getStatusColor(exam.status)}>
                        {exam.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Urgência e Observações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-8 h-8 text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Urgência</h3>
                    <p className="text-sm text-gray-500">Nível de prioridade</p>
                  </div>
                </div>

                {isEditing ? (
                  <select
                    value={editedExam.urgencia || "Normal"}
                    onChange={(e) =>
                      handleInputChange("urgencia", e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>
                ) : (
                  <Badge variant={getUrgencyColor(exam.urgencia || "Normal")}>
                    {exam.urgencia || "Normal"}
                  </Badge>
                )}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Observações</h3>
                    <p className="text-sm text-gray-500">
                      Informações adicionais
                    </p>
                  </div>
                </div>

                {isEditing ? (
                  <Textarea
                    value={editedExam.observacoes || ""}
                    onChange={(e) =>
                      handleInputChange("observacoes", e.target.value)
                    }
                    placeholder="Adicione observações sobre o exame..."
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-gray-700">
                    {exam.observacoes || "Nenhuma observação registrada."}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            {isEditing ? (
              <>
                <Button onClick={handleCancel} variant="outline">
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </Button>
              </>
            ) : (
              <Button onClick={onClose} variant="outline">
                Fechar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Reconhecimento de Voz */}
      <VoiceRecognition
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onTextTranscribed={(text) => console.log("Voice text:", text)}
        onExamCreated={handleVoiceUpdate}
      />
    </div>
  );
};

export default ExamDetail;
