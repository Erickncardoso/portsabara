import React, { useState, useEffect } from "react";
import SidebarEnfermaria from "../components/SidebarEnfermaria";
import HeaderEnfermaria from "../components/HeaderEnfermaria";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn, getMainContentClasses } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import FloatingChat from "../components/FloatingChat";

const AgendaEnfermaria = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gray-100">
      <SidebarEnfermaria
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <HeaderEnfermaria
          titulo="AGENDA"
          className={cn("sticky top-0 z-30", isMobile && "pt-16")}
        />

        <main className="p-3 sm:p-6">
          <Card className="shadow-md">
            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-white" />
                <CardTitle className="text-xl font-bold text-white">
                  Gerenciamento de Eventos
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-4">Eventos do Dia</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-sm font-medium">
                        08:00 - Passagem de Plantão
                      </p>
                      <p className="text-sm text-gray-500">
                        Sala de Enfermagem
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-sm font-medium">
                        10:00 - Visita aos Pacientes
                      </p>
                      <p className="text-sm text-gray-500">Ala A</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-sm font-medium">
                        14:00 - Reunião de Equipe
                      </p>
                      <p className="text-sm text-gray-500">Sala de Reuniões</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <FloatingChat
        currentUser={{
          id: "nurse-1",
          name: "Ana Silva",
          role: "Enfermeiro",
        }}
      />
    </div>
  );
};

export default AgendaEnfermaria;
