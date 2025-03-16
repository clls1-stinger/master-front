"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { fetchStats } from "@/lib/data"
import { motion } from "framer-motion"

export function DashboardHeader() {
  const [greeting, setGreeting] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [stats, setStats] = useState({ tasks: 0, notes: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Buenos días")
    else if (hour < 18) setGreeting("Buenas tardes")
    else setGreeting("Buenas noches")

    // Format current time
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
      }
      setCurrentTime(now.toLocaleDateString("es-ES", options))
    }
    updateTime()

    // Get stats
    const getStats = async () => {
      try {
        const data = await fetchStats()
        setStats({ tasks: data.tasks, notes: data.notes })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }
    getStats()
  }, [])

  return (
    <div className="morphic-header">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <motion.h1
            className="text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {greeting}
          </motion.h1>
          <motion.p
            className="text-muted-foreground capitalize"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {currentTime}
          </motion.p>

          <motion.div
            className="mt-2 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">Tienes</span>
              <span className="font-medium">{stats.tasks}</span>
              <span className="text-sm text-muted-foreground">tareas</span>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">y</span>
              <span className="font-medium">{stats.notes}</span>
              <span className="text-sm text-muted-foreground">notas</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-4 flex flex-wrap gap-2 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button asChild size="sm" variant="morphic" className="h-9 gap-1">
            <Link href="/tasks/new">
              <Plus className="h-4 w-4" />
              <span>Tarea</span>
            </Link>
          </Button>
          <Button asChild size="sm" variant="morphic" className="h-9 gap-1">
            <Link href="/notes/new">
              <Plus className="h-4 w-4" />
              <span>Nota</span>
            </Link>
          </Button>
          <Button asChild size="sm" variant="morphic" className="h-9 gap-1">
            <Link href="/habits/new">
              <Plus className="h-4 w-4" />
              <span>Hábito</span>
            </Link>
          </Button>
        </motion.div>
      </div>

      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted/50">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: "65%" }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>Progreso semanal</span>
        <span>65%</span>
      </div>
    </div>
  )
}

