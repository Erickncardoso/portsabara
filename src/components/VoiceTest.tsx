import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Mic } from "lucide-react";

interface VoiceTestProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceTest: React.FC<VoiceTestProps> = ({ isOpen, onClose }) => {
  console.log("VoiceTest render - isOpen:", isOpen);

  if (!isOpen) {
    console.log("VoiceTest not rendering - isOpen is false");
    return null;
  }

  console.log("VoiceTest rendering modal");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-blue-600" />
            Teste de Modal de Voz
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p>
            Este é um teste para verificar se o modal está aparecendo
            corretamente.
          </p>

          <div className="flex gap-3">
            <Button onClick={onClose} className="flex-1">
              Fechar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceTest;
