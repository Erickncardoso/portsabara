import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, Square, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { toast } from "./ui/use-toast";

interface VoiceRecognitionReceitaProps {
  onTextTranscribed: (text: string) => void;
  onReceitaCreated: (receitaData: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface ReceitaData {
  nome?: string;
  idade?: string;
  sexo?: string;
  medicamento?: string;
  dosagem?: string;
  duracao?: string;
  observacoes?: string;
}

const VoiceRecognitionReceita: React.FC<VoiceRecognitionReceitaProps> = ({
  onTextTranscribed,
  onReceitaCreated,
  isOpen,
  onClose,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [extractedData, setExtractedData] = useState<ReceitaData>({});
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const hasWebkitSpeech =
      typeof window !== "undefined" && "webkitSpeechRecognition" in window;
    const hasSpeech =
      typeof window !== "undefined" && "SpeechRecognition" in window;
    setIsSupported(hasWebkitSpeech || hasSpeech);
  }, []);

  useEffect(() => {
    if (!isSupported || !isOpen) return;

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "pt-BR";
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "🎤 Microfone Ativo",
          description: "Dite as informações da receita médica",
        });
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = "";
        let interimText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimText += transcript;
          }
        }

        if (finalTranscript) {
          setTranscript((prev) => prev + finalTranscript);
          onTextTranscribed(finalTranscript);
          extractReceitaInfo(transcript + finalTranscript);
        }
        setInterimTranscript(interimText);
      };

      recognition.onerror = (event: any) => {
        toast({
          title: "Erro no Reconhecimento",
          description: `Erro: ${event.error}. Tente novamente.`,
          variant: "destructive",
        });
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isSupported, isOpen, transcript]);

  const extractReceitaInfo = (text: string) => {
    const lowerText = text.toLowerCase();
    const newData: ReceitaData = { ...extractedData };

    // Extrair nome do paciente
    const nomePatterns = [
      /(?:paciente|nome)\s+(?:é|:)?\s*([a-záàâãéêíóôõúç\s]{2,30})/i,
      /para\s+(?:o\s+|a\s+)?([a-záàâãéêíóôõúç\s]{2,30})\s+(?:de\s+)?(\d+)/i,
    ];

    for (const pattern of nomePatterns) {
      const match = text.match(pattern);
      if (match && match[1] && !newData.nome) {
        newData.nome = match[1].trim().replace(/\b\w/g, (l) => l.toUpperCase());
        break;
      }
    }

    // Extrair idade
    const idadePatterns = [
      /(\d+)\s*anos?/i,
      /idade\s+(?:de\s+)?(\d+)/i,
      /tem\s+(\d+)\s*anos?/i,
    ];

    for (const pattern of idadePatterns) {
      const match = text.match(pattern);
      if (match && match[1] && !newData.idade) {
        const idade = parseInt(match[1]);
        if (idade >= 0 && idade <= 120) {
          newData.idade = idade.toString();
          break;
        }
      }
    }

    // Extrair sexo
    if (lowerText.includes("feminino")) {
      newData.sexo = "Feminino";
    } else if (lowerText.includes("masculino")) {
      newData.sexo = "Masculino";
    }

    // Extrair medicamento
    const medPatterns = [
      /medicamento\s+(?:é|:)?\s*([a-záàâãéêíóôõúç\s-]{3,50})/i,
      /prescrever\s+([a-záàâãéêíóôõúç\s-]{3,50})/i,
      /usar\s+([a-záàâãéêíóôõúç\s-]{3,50})/i,
    ];

    for (const pattern of medPatterns) {
      const match = text.match(pattern);
      if (match && match[1] && !newData.medicamento) {
        newData.medicamento = match[1]
          .trim()
          .replace(/\b\w/g, (l) => l.toUpperCase());
        break;
      }
    }

    // Extrair dosagem
    const dosagemPatterns = [
      /dosagem\s+(?:é|:)?\s*([\w\s\/\.\-]+\d+[\w\s\/\.\-]*)/i,
      /(\d+\s*(ml|mg|comp|gotas|unidades)[^,\.;]*)/i,
    ];

    for (const pattern of dosagemPatterns) {
      const match = text.match(pattern);
      if (match && match[1] && !newData.dosagem) {
        newData.dosagem = match[1].trim();
        break;
      }
    }

    // Extrair duração
    const duracaoPatterns = [
      /duração\s+(?:é|:)?\s*([\w\s\/\.\-]+\d+[\w\s\/\.\-]*)/i,
      /(por\s+\d+\s*dias?)/i,
      /(\d+\s*dias?)/i,
    ];

    for (const pattern of duracaoPatterns) {
      const match = text.match(pattern);
      if (match && match[1] && !newData.duracao) {
        newData.duracao = match[1].trim();
        break;
      }
    }

    // Extrair observações
    const obsPatterns = [
      /observa[çc][aã]o(?:es)?(?::\s*)?(.{10,200})/i,
      /nota(?:s)?(?::\s*)?(.{10,200})/i,
    ];

    for (const pattern of obsPatterns) {
      const match = text.match(pattern);
      if (match && match[1] && !newData.observacoes) {
        newData.observacoes = match[1].trim();
        break;
      }
    }

    setExtractedData(newData);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const clearTranscript = () => {
    setTranscript("");
    setInterimTranscript("");
    setExtractedData({});
  };

  const createReceita = () => {
    if (!extractedData.nome || !extractedData.medicamento) {
      toast({
        title: "Informações Incompletas",
        description: "Informe pelo menos o nome do paciente e o medicamento.",
        variant: "destructive",
      });
      return;
    }

    const receitaData = {
      nome: extractedData.nome,
      idade: extractedData.idade || "Não informado",
      sexo: extractedData.sexo || "Não informado",
      medicamento: extractedData.medicamento,
      dosagem: extractedData.dosagem || "Não informado",
      duracao: extractedData.duracao || "Não informado",
      data: new Date().toLocaleDateString(),
      observacoes: extractedData.observacoes || "",
    };

    onReceitaCreated(receitaData);
    toast({
      title: "✅ Receita Criada",
      description: `Receita de ${receitaData.medicamento} para ${receitaData.nome}`,
    });

    clearTranscript();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-blue-600" />
              Ditar Receita por Voz
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!isSupported ? (
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <p className="text-red-600">
                Seu navegador não suporta reconhecimento de voz. Tente usar
                Chrome, Edge ou Safari.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={startListening}
                  disabled={isListening}
                  className={`flex items-center gap-2 ${
                    isListening
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                  {isListening ? "Gravando..." : "Iniciar Gravação"}
                </Button>

                {isListening && (
                  <Button onClick={stopListening} variant="outline">
                    <Square className="w-4 h-4 mr-2" />
                    Parar
                  </Button>
                )}

                <Button onClick={clearTranscript} variant="outline">
                  Limpar
                </Button>
              </div>

              {isListening && (
                <div className="flex items-center justify-center gap-2 p-3 bg-red-50 rounded-lg">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-700 font-medium">Ouvindo...</span>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">
                  💡 Exemplo de como falar:
                </h4>
                <p className="text-blue-700 text-sm">
                  "Paciente João Silva, 8 anos, masculino, prescrever
                  Paracetamol Infantil, dosagem 10ml de 6 em 6 horas, por 5
                  dias, observação: febre persistente"
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Transcrição:</h4>
                <div className="p-3 bg-gray-50 rounded-lg min-h-[100px] border">
                  <p className="text-gray-800">{transcript}</p>
                  {interimTranscript && (
                    <p className="text-gray-500 italic">{interimTranscript}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Informações Extraídas:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-600">Paciente:</label>
                    <p className="font-medium">
                      {extractedData.nome || "Não identificado"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Idade:</label>
                    <p className="font-medium">
                      {extractedData.idade || "Não informada"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Sexo:</label>
                    <p className="font-medium">
                      {extractedData.sexo || "Não informado"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Medicamento:
                    </label>
                    <p className="font-medium">
                      {extractedData.medicamento || "Não identificado"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Dosagem:</label>
                    <p className="font-medium">
                      {extractedData.dosagem || "Não informada"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Duração:</label>
                    <p className="font-medium">
                      {extractedData.duracao || "Não informada"}
                    </p>
                  </div>
                  {extractedData.observacoes && (
                    <div className="col-span-2">
                      <label className="text-sm text-gray-600">
                        Observações:
                      </label>
                      <p className="font-medium">{extractedData.observacoes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={createReceita}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!extractedData.nome || !extractedData.medicamento}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Criar Receita
                </Button>
                <Button onClick={onClose} variant="outline">
                  Cancelar
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceRecognitionReceita;
