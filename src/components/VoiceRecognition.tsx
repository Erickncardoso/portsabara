import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, Square, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { toast } from "./ui/use-toast";

interface VoiceRecognitionProps {
  onTextTranscribed: (text: string) => void;
  onExamCreated: (examData: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface ExamData {
  paciente?: string;
  idade?: string;
  tipo?: string;
  observacoes?: string;
  urgencia?: string;
}

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({
  onTextTranscribed,
  onExamCreated,
  isOpen,
  onClose,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [extractedData, setExtractedData] = useState<ExamData>({});
  const recognitionRef = useRef<any>(null);

  // Debug: Log quando o componente é renderizado
  useEffect(() => {
    console.log("VoiceRecognition mounted, isOpen:", isOpen);
  }, [isOpen]);

  useEffect(() => {
    // Verificar se a Web Speech API é suportada
    const hasWebkitSpeech =
      typeof window !== "undefined" && "webkitSpeechRecognition" in window;
    const hasSpeech =
      typeof window !== "undefined" && "SpeechRecognition" in window;

    console.log("Speech API check:", { hasWebkitSpeech, hasSpeech });

    if (hasWebkitSpeech || hasSpeech) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
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
        console.log("Speech recognition started");
        setIsListening(true);
        toast({
          title: "🎤 Microfone Ativo",
          description: "Comece a ditar as informações do exame",
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
          extractExamInfo(transcript + finalTranscript);
        }
        setInterimTranscript(interimText);
      };

      recognition.onerror = (event: any) => {
        console.error("Erro no reconhecimento de voz:", event.error);
        toast({
          title: "Erro no Reconhecimento",
          description: `Erro: ${event.error}. Tente novamente.`,
          variant: "destructive",
        });
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isSupported, isOpen, transcript]);

  const extractExamInfo = (text: string) => {
    const lowerText = text.toLowerCase();
    const newData: ExamData = { ...extractedData };

    // Extrair nome do paciente
    const nomePatterns = [
      /(?:paciente|criança|menino|menina|nome)\s+(?:é|:)?\s*([a-záàâãéêíóôõúç\s]{2,30})/i,
      /para\s+(?:o\s+|a\s+)?([a-záàâãéêíóôõúç\s]{2,30})\s+(?:de\s+)?(\d+)/i,
    ];

    for (const pattern of nomePatterns) {
      const match = text.match(pattern);
      if (match && match[1] && !newData.paciente) {
        newData.paciente = match[1]
          .trim()
          .replace(/\b\w/g, (l) => l.toUpperCase());
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
        if (idade >= 0 && idade <= 17) {
          newData.idade = idade.toString();
          break;
        }
      }
    }

    // Extrair tipo de exame
    const examePatterns = [
      /(?:exame\s+de\s+|solicitar\s+|fazer\s+)([a-záàâãéêíóôõúç\s-]{3,50})/i,
      /(hemograma|raio.?x|ultrassom|ressonância|tomografia|eletrocardiograma|ecocardiograma|endoscopia)/i,
      /(sangue|urina|fezes|radiografia|eco|holter|teste)/i,
    ];

    for (const pattern of examePatterns) {
      const match = text.match(pattern);
      if (match && match[1] && !newData.tipo) {
        newData.tipo = match[1].trim().replace(/\b\w/g, (l) => l.toUpperCase());
        break;
      }
    }

    // Extrair urgência
    if (
      lowerText.includes("urgente") ||
      lowerText.includes("emergência") ||
      lowerText.includes("prioridade")
    ) {
      newData.urgencia = "Alta";
    } else if (lowerText.includes("rotina") || lowerText.includes("normal")) {
      newData.urgencia = "Normal";
    }

    // Extrair observações
    const obsPatterns = [
      /(?:observação|observações|nota|notas)(?::\s*)?(.{10,200})/i,
      /(?:porque|pois|devido|motivo)(.{10,150})/i,
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
      console.log("Starting speech recognition...");
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      console.log("Stopping speech recognition...");
      recognitionRef.current.stop();
    }
  };

  const clearTranscript = () => {
    setTranscript("");
    setInterimTranscript("");
    setExtractedData({});
  };

  const createExam = () => {
    if (!extractedData.paciente || !extractedData.tipo) {
      toast({
        title: "Informações Incompletas",
        description:
          "Por favor, informe pelo menos o nome do paciente e o tipo de exame.",
        variant: "destructive",
      });
      return;
    }

    const examData = {
      paciente: extractedData.paciente,
      idade: extractedData.idade || "Não informado",
      tipo: extractedData.tipo,
      data: new Date().toISOString().split("T")[0],
      status: "Agendado",
      urgencia: extractedData.urgencia || "Normal",
      observacoes: extractedData.observacoes || "",
    };

    onExamCreated(examData);
    toast({
      title: "✅ Exame Criado",
      description: `Exame de ${examData.tipo} agendado para ${examData.paciente}`,
    });

    // Limpar dados
    clearTranscript();
    onClose();
  };

  // Debug: Log para verificar se está sendo renderizado
  console.log(
    "VoiceRecognition render - isOpen:",
    isOpen,
    "isSupported:",
    isSupported
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-blue-600" />
              Ditar Exame por Voz
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
              {/* Controles de Gravação */}
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

              {/* Indicador de Status */}
              {isListening && (
                <div className="flex items-center justify-center gap-2 p-3 bg-red-50 rounded-lg">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-700 font-medium">Ouvindo...</span>
                </div>
              )}

              {/* Exemplo de Uso */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">
                  💡 Exemplo de como falar:
                </h4>
                <p className="text-blue-700 text-sm">
                  "Paciente João Silva, 8 anos, solicitar hemograma completo,
                  urgente, observação: paciente com suspeita de anemia"
                </p>
              </div>

              {/* Transcrição */}
              <div className="space-y-3">
                <h4 className="font-medium">Transcrição:</h4>
                <div className="p-3 bg-gray-50 rounded-lg min-h-[100px] border">
                  <p className="text-gray-800">{transcript}</p>
                  {interimTranscript && (
                    <p className="text-gray-500 italic">{interimTranscript}</p>
                  )}
                </div>
              </div>

              {/* Dados Extraídos */}
              <div className="space-y-3">
                <h4 className="font-medium">Informações Extraídas:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-600">Paciente:</label>
                    <p className="font-medium">
                      {extractedData.paciente || "Não identificado"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Idade:</label>
                    <p className="font-medium">
                      {extractedData.idade || "Não informada"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Tipo de Exame:
                    </label>
                    <p className="font-medium">
                      {extractedData.tipo || "Não identificado"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Urgência:</label>
                    <Badge
                      variant={
                        extractedData.urgencia === "Alta"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {extractedData.urgencia || "Normal"}
                    </Badge>
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

              {/* Botão Criar Exame */}
              <div className="flex gap-3">
                <Button
                  onClick={createExam}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!extractedData.paciente || !extractedData.tipo}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Criar Exame
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

export default VoiceRecognition;
