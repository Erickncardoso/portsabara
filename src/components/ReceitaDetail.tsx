import React, { useState } from "react";
import { X, Download, User, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { generateReceitaPDF, getMedicoDefault } from "@/utils/pdfGenerator";
import { toast } from "./ui/use-toast";

interface ReceitaDetailProps {
  receita: any;
  isOpen: boolean;
  onClose: () => void;
}

const ReceitaDetail: React.FC<ReceitaDetailProps> = ({
  receita,
  isOpen,
  onClose,
}) => {
  const [medicoData, setMedicoData] = useState(getMedicoDefault());

  const handleGerarPDF = async () => {
    try {
      const nomeArquivo = await generateReceitaPDF(receita, medicoData);
      toast({
        title: "📄 PDF Gerado com Sucesso",
        description: `Receita salva como: ${nomeArquivo}`,
      });
      onClose();
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast({
        title: "❌ Erro ao Gerar PDF",
        description: "Houve um problema ao gerar o PDF. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen || !receita) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Detalhes da Receita
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dados do Paciente */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5" />
                Dados do Paciente
              </h3>

              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Nome
                  </Label>
                  <p className="font-medium text-gray-900">{receita.nome}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Idade
                    </Label>
                    <p className="font-medium text-gray-900">
                      {receita.idade} anos
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">
                      Sexo
                    </Label>
                    <p className="font-medium text-gray-900">{receita.sexo}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">
                    Data da Prescrição
                  </Label>
                  <p className="font-medium text-gray-900">{receita.data}</p>
                </div>
              </div>
            </div>

            {/* Dados do Médico */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Dados do Médico
              </h3>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="medico-nome">Nome do Médico</Label>
                  <Input
                    id="medico-nome"
                    value={medicoData.nome}
                    onChange={(e) =>
                      setMedicoData({ ...medicoData, nome: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="medico-crm">CRM</Label>
                    <Input
                      id="medico-crm"
                      value={medicoData.crm}
                      onChange={(e) =>
                        setMedicoData({ ...medicoData, crm: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="medico-especialidade">Especialidade</Label>
                    <Input
                      id="medico-especialidade"
                      value={medicoData.especialidade}
                      onChange={(e) =>
                        setMedicoData({
                          ...medicoData,
                          especialidade: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="medico-telefone">Telefone</Label>
                  <Input
                    id="medico-telefone"
                    value={medicoData.telefone || ""}
                    onChange={(e) =>
                      setMedicoData({ ...medicoData, telefone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Prescrição */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Prescrição Médica
            </h3>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-green-800">
                    Medicamento
                  </Label>
                  <p className="font-semibold text-green-900 text-lg">
                    {receita.medicamento}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-green-800">
                      Dosagem
                    </Label>
                    <p className="font-medium text-green-900">
                      {receita.dosagem}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-green-800">
                      Duração
                    </Label>
                    <p className="font-medium text-green-900">
                      {receita.duracao}
                    </p>
                  </div>
                </div>

                {receita.observacoes && (
                  <div>
                    <Label className="text-sm font-medium text-green-800">
                      Observações
                    </Label>
                    <p className="font-medium text-green-900">
                      {receita.observacoes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Instruções */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">
              Instruções Importantes:
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Siga rigorosamente as orientações médicas</li>
              <li>• Em caso de dúvidas, entre em contato com o hospital</li>
              <li>• Mantenha o medicamento fora do alcance de crianças</li>
              <li>• Não interrompa o tratamento sem orientação médica</li>
            </ul>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleGerarPDF}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Gerar PDF da Receita
            </Button>
            <Button onClick={onClose} variant="outline">
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceitaDetail;
