import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarCheck, FileText, ListTodo, Tag } from "lucide-react"
import { ActivityCalendar } from "@/components/activity-calendar"
import { RecentItems } from "@/components/recent-items"
import { StatsCards } from "@/components/stats-cards"
import { DashboardHeader } from "@/components/dashboard-header"

export default function Home() {
  return (
    <div className="space-y-8 p-4 md:p-8">
      <DashboardHeader />

      <Suspense fallback={<div className="h-24 w-full rounded-xl bg-muted/50 animate-pulse" />}>
        <StatsCards />
      </Suspense>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Actividad de Tareas</h2>
            </div>
            <Button asChild size="sm" variant="morphic">
              <Link href="/tasks">Ver todas</Link>
            </Button>
          </div>
          <div className="morphic-card">
            <Suspense fallback={<div className="h-48 w-full rounded-lg bg-muted/50 animate-pulse" />}>
              <ActivityCalendar type="tasks" />
            </Suspense>
          </div>
          <div className="morphic-card">
            <h3 className="mb-4 text-lg font-medium">Tareas Recientes</h3>
            <Suspense fallback={<div className="h-48 w-full rounded-lg bg-muted/50 animate-pulse" />}>
              <RecentItems type="tasks" limit={5} />
            </Suspense>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Actividad de Notas</h2>
            </div>
            <Button asChild size="sm" variant="morphic">
              <Link href="/notes">Ver todas</Link>
            </Button>
          </div>
          <div className="morphic-card">
            <Suspense fallback={<div className="h-48 w-full rounded-lg bg-muted/50 animate-pulse" />}>
              <ActivityCalendar type="notes" />
            </Suspense>
          </div>
          <div className="morphic-card">
            <h3 className="mb-4 text-lg font-medium">Notas Recientes</h3>
            <Suspense fallback={<div className="h-48 w-full rounded-lg bg-muted/50 animate-pulse" />}>
              <RecentItems type="notes" limit={5} />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="morphic-card">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Hábitos</h2>
          </div>
          <Button asChild size="sm" variant="morphic">
            <Link href="/habits">Ver todos</Link>
          </Button>
        </div>
        <Suspense fallback={<div className="h-24 w-full rounded-lg bg-muted/50 animate-pulse" />}>
          <RecentItems type="habits" limit={3} />
        </Suspense>
      </div>

      <div className="morphic-card">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Categorías</h2>
          </div>
          <Button asChild size="sm" variant="morphic">
            <Link href="/categories">Ver todas</Link>
          </Button>
        </div>
        <Suspense fallback={<div className="h-24 w-full rounded-lg bg-muted/50 animate-pulse" />}>
          <div className="flex flex-wrap gap-2">
            <CategoryPills />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

function CategoryPills() {
  // Categorías de ejemplo
  const categories = [
    { id: 1, name: "Trabajo", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
    { id: 2, name: "Personal", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
    { id: 3, name: "Salud", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" },
    { id: 4, name: "Aprendizaje", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" },
  ]

  return (
    <>
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.id}`} className={`${category.color} morphic-pill`}>
          {category.name}
        </Link>
      ))}
    </>
  )
}

