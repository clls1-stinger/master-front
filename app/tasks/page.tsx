import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskList } from "@/components/task-list"
import { TaskFilters } from "@/components/task-filters"

export default function TasksPage() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="morphic-header">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Tareas</h1>
          <Button asChild variant="morphic">
            <Link href="/tasks/new">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Tarea
            </Link>
          </Button>
        </div>
      </div>

      <div className="morphic-card">
        <TaskFilters />
      </div>

      <Suspense fallback={<div className="h-96 w-full rounded-lg bg-muted/50 animate-pulse" />}>
        <TaskList />
      </Suspense>
    </div>
  )
}

