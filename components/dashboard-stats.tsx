"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarCheck, FileText, ListTodo, Tag } from "lucide-react"
import { fetchStats } from "@/lib/data"

type Stats = {
  tasks: number
  notes: number
  habits: number
  categories: number
}

export function DashboardStats() {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard title="Tasks" value={stats.tasks} icon={<ListTodo className="h-5 w-5" />} loading={loading} />
      <StatsCard title="Notes" value={stats.notes} icon={<FileText className="h-5 w-5" />} loading={loading} />
      <StatsCard title="Habits" value={stats.habits} icon={<CalendarCheck className="h-5 w-5" />} loading={loading} />
      <StatsCard title="Categories" value={stats.categories} icon={<Tag className="h-5 w-5" />} loading={loading} />
    </div>
  )
}

function StatsCard({
  title,
  value,
  icon,
  loading,
}: {
  title: string
  value: number
  icon: React.ReactNode
  loading: boolean
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-7 w-16 bg-muted rounded animate-pulse" />
        ) : (
          <p className="text-2xl font-bold">{value}</p>
        )}
      </CardContent>
    </Card>
  )
}

