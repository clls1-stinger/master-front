"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CalendarCheck, FileText, ListTodo } from "lucide-react"
import { fetchRecentItems } from "@/lib/data"
import { formatDistanceToNow } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

type RecentItem = {
  id: number
  title: string
  creation: string
}

export function RecentItems({ type, limit = 5 }: { type: "tasks" | "notes" | "habits"; limit?: number }) {
  const [items, setItems] = useState<RecentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRecentItems = async () => {
      try {
        const data = await fetchRecentItems()
        setItems(data[type].slice(0, limit))
      } catch (error) {
        console.error(`Failed to fetch recent ${type}:`, error)
      } finally {
        setLoading(false)
      }
    }

    getRecentItems()
  }, [type, limit])

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="h-12 rounded-lg bg-muted/50 animate-pulse" />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex h-24 items-center justify-center rounded-lg border border-dashed">
        <p className="text-sm text-muted-foreground">
          No hay {type === "tasks" ? "tareas" : type === "notes" ? "notas" : "hábitos"} recientes
        </p>
      </div>
    )
  }

  const getIcon = () => {
    switch (type) {
      case "tasks":
        return <ListTodo className="h-4 w-4 text-primary" />
      case "notes":
        return <FileText className="h-4 w-4 text-primary" />
      case "habits":
        return <CalendarCheck className="h-4 w-4 text-primary" />
    }
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link
            href={`/${type}/${item.id}`}
            className="flex items-center justify-between rounded-lg p-3 transition-all hover:translate-x-1 morphic-item"
          >
            <div className="flex items-center gap-3">
              {getIcon()}
              <span className="font-medium">{item.title}</span>
            </div>
            <Badge variant="morphic" className="bg-white/10">
              {formatDistanceToNow(new Date(item.creation))}
            </Badge>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

