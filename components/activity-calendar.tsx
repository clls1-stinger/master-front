"use client"

import { useEffect, useState } from "react"
import { fetchActivityData } from "@/lib/data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

type ActivityData = {
  date: string
  count: number
}[]

export function ActivityCalendar({ type }: { type: "tasks" | "notes" }) {
  const [activityData, setActivityData] = useState<ActivityData>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getActivityData = async () => {
      try {
        const data = await fetchActivityData(type)
        setActivityData(data)
      } catch (error) {
        console.error(`Failed to fetch ${type} activity data:`, error)
      } finally {
        setLoading(false)
      }
    }

    getActivityData()
  }, [type])

  if (loading) {
    return <div className="h-48 w-full rounded-lg bg-muted/50 animate-pulse" />
  }

  // Generar los últimos 3 meses de fechas
  const today = new Date()
  const months = []
  const days = []

  for (let i = 0; i < 12; i++) {
    const month = new Date(today.getFullYear(), today.getMonth() - i, 1)
    months.unshift(month)
  }

  // Generar los últimos 90 días
  for (let i = 0; i < 90; i++) {
    const day = new Date(today)
    day.setDate(today.getDate() - i)
    days.unshift(day)
  }

  // Formatear fechas para comparar con los datos
  const formattedDays = days.map((day) => {
    const date = day.toISOString().split("T")[0]
    const existingData = activityData.find((d) => d.date === date)
    return {
      date,
      count: existingData ? existingData.count : 0,
      day: day.getDate(),
      month: day.getMonth(),
    }
  })

  // Agrupar por semana para el formato de GitHub
  const weeks = []
  let week = []

  for (let i = 0; i < formattedDays.length; i++) {
    week.push(formattedDays[i])
    if (week.length === 7 || i === formattedDays.length - 1) {
      weeks.push(week)
      week = []
    }
  }

  // Función para determinar el color basado en la cantidad
  const getColor = (count: number) => {
    if (count === 0) return "bg-muted/50 hover:bg-muted/80"
    if (count < 2) return "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50"
    if (count < 4) return "bg-emerald-200 hover:bg-emerald-300 dark:bg-emerald-800/40 dark:hover:bg-emerald-800/60"
    if (count < 6) return "bg-emerald-300 hover:bg-emerald-400 dark:bg-emerald-700/50 dark:hover:bg-emerald-700/70"
    return "bg-emerald-400 hover:bg-emerald-500 dark:bg-emerald-600/60 dark:hover:bg-emerald-600/80"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        {months.slice(-3).map((month, i) => (
          <div key={i}>{month.toLocaleDateString("es", { month: "short" })}</div>
        ))}
      </div>

      <TooltipProvider>
        <div className="grid grid-flow-col gap-1">
          {weeks.slice(-13).map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-flow-row gap-1">
              {week.map((day, dayIndex) => (
                <Tooltip key={dayIndex}>
                  <TooltipTrigger asChild>
                    <motion.div
                      className={`h-3 w-3 rounded-sm ${getColor(day.count)} transition-colors morphic-cell`}
                      aria-label={`${day.count} ${type} on ${day.date}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.01 * (weekIndex * 7 + dayIndex),
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" className="morphic-tooltip">
                    <div className="text-xs">
                      <div className="font-medium">
                        {day.count} {type}
                      </div>
                      <div className="text-muted-foreground">
                        {new Date(day.date).toLocaleDateString("es", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
      </TooltipProvider>
    </div>
  )
}

