import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'
import { Clock, Users, CalendarClock, AlertCircle } from 'lucide-react'

const CalendarioMedico = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  // Exemplo de dias com consultas (você pode integrar com sua API/dados reais)
  const diasComConsultas = [
    new Date(2024, 3, 4),
    new Date(2024, 3, 10),
    new Date(2024, 3, 15),
    new Date(2024, 3, 20),
    new Date(2024, 3, 25),
  ]

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

  // Função para renderizar o conteúdo do dia
  const renderDayContent = (day: Date) => {
    const hasAppointment = diasComConsultas.some(
      (d) => format(d, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    )

    return (
      <div className="relative w-full h-full">
        <div className={cn(
          'w-full h-full flex items-center justify-center',
          hasAppointment && 'font-semibold'
        )}>
          {format(day, 'd')}
        </div>
        {hasAppointment && (
          <Badge 
            variant="secondary" 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 p-0"
          />
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <Card className="p-0 overflow-hidden w-full lg:w-fit">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ptBR}
          className="rounded-md border-0 mx-auto"
          classNames={{
            months: "space-y-4",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              "hover:bg-gray-100 rounded-md transition-colors",
              "disabled:pointer-events-none disabled:opacity-50"
            ),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex justify-between",
            head_cell: cn(
              "text-gray-500 rounded-md w-8 font-normal text-xs",
              "flex items-center justify-center h-8"
            ),
            row: "flex w-full mt-2 justify-between",
            cell: cn(
              "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
              "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
              "h-8 w-8 flex items-center justify-center"
            ),
            day: cn(
              "h-8 w-8 p-0 font-normal",
              "hover:bg-gray-100 rounded-md transition-colors",
              "aria-selected:opacity-100"
            ),
            day_selected: cn(
              "bg-blue-600 text-white hover:bg-blue-600 hover:text-white",
              "focus:bg-blue-600 focus:text-white"
            ),
            day_today: "bg-gray-100",
            day_outside: "text-gray-400 opacity-50",
            day_disabled: "text-gray-400 opacity-50",
            day_range_middle: "aria-selected:bg-gray-100 aria-selected:text-gray-900",
            day_hidden: "invisible",
          }}
          components={{
            DayContent: ({ date }) => renderDayContent(date),
          }}
        />
      </Card>

      <div className="flex flex-col gap-4 w-full lg:flex-1">
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
    </div>
  )
}

export default CalendarioMedico
