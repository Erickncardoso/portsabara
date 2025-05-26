import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, CalendarClock, AlertCircle } from 'lucide-react'

const InfoCalendario = () => {
  // Exemplo de próximas consultas (integrar com API real)
  const proximasConsultas = [
    {
      paciente: "Maria Silva",
      horario: "09:30",
      tipo: "Consulta de Rotina",
      status: "Confirmada"
    },
    {
      paciente: "João Santos",
      horario: "10:45",
      tipo: "Retorno",
      status: "Aguardando"
    },
    {
      paciente: "Ana Oliveira",
      horario: "14:15",
      tipo: "Primeira Consulta",
      status: "Confirmada"
    }
  ]

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Estatísticas do Dia */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Pacientes Hoje</span>
          </div>
          <p className="text-2xl font-bold mt-2">12</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Próxima Consulta</span>
          </div>
          <p className="text-2xl font-bold mt-2">09:30</p>
        </Card>
      </div>

      {/* Próximas Consultas */}
      <Card className="flex-1">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-blue-600" />
            <h3 className="font-medium">Próximas Consultas</h3>
          </div>
        </div>
        <div className="p-2 max-h-[300px] overflow-y-auto">
          {proximasConsultas.map((consulta, index) => (
            <div key={index} className="p-2 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                <span className="font-medium">{consulta.paciente}</span>
                <Badge variant={consulta.status === "Confirmada" ? "default" : "secondary"}>
                  {consulta.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                <span>{consulta.horario}</span>
                <span>{consulta.tipo}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Alertas */}
      <Card className="p-4 border-l-4 border-l-yellow-400">
        <div className="flex items-center gap-2 text-yellow-600">
          <AlertCircle className="h-4 w-4" />
          <span className="font-medium">Lembretes</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Você tem 3 relatórios pendentes para preencher
        </p>
      </Card>
    </div>
  )
}

export default InfoCalendario 