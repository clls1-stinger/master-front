"use client"

import { useEffect, useState } from "react"
import { CalendarCheck, FileText, ListTodo, Tag } from "lucide-react"
import { fetchStats } from "@/lib/data"
import { motion } from "framer-motion"

type Stats = {
  tasks: number
  notes: number
  habits: number
  categories: number
}

export function StatsCards() {
  const [stats, setStats] = useState<Stats>({
    tasks: 0,
    notes: 0,
    habits: 0,
    categories: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchStats()
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    getStats()
  }, [])

  const cards = [
    {
      title: "Tareas",
      value: stats.tasks,
      icon: <ListTodo className="h-5 w-5" />,
      color: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-300",
      delay: 0,
    },
    {
      title: "Notas",
      value: stats.notes,
      icon: <FileText className="h-5 w-5" />,
      color: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-300",
      delay: 0.1,
    },
    {
      title: "Hábitos",
      value: stats.habits,
      icon: <CalendarCheck className="h-5 w-5" />,
      color: "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-300",
      delay: 0.2,
    },
    {
      title: "Categorías",
      value: stats.categories,
      icon: <Tag className="h-5 w-5" />,
      color: "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-300",
      delay: 0.3,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="morphic-stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: card.delay }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
              {loading ? (
                <div className="mt-1 h-7 w-16 animate-pulse rounded bg-muted/50" />
              ) : (
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    delay: card.delay + 0.2,
                  }}
                >
                  {card.value}
                </motion.p>
              )}
            </div>
            <div className={`rounded-full p-2 ${card.color} morphic-icon`}>{card.icon}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

