import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'

const CalendarioSimples = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  // Exemplo de dias com consultas (você pode integrar com sua API/dados reais)
  const diasComConsultas = [
    new Date(2025, 4, 4),
    new Date(2025, 4, 10),
    new Date(2025, 4, 15),
    new Date(2025, 4, 20),
    new Date(2025, 4, 25),
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
    <Card className="p-0 overflow-hidden w-full">
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
  )
}

export default CalendarioSimples 