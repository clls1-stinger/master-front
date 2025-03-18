"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { fetchTasks, deleteTask } from "@/lib/data"
import { formatDistanceToNow } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import type { Task } from "@/lib/api"

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks()
        setTasks(data)
      } catch (error) {
        console.error("Failed to fetch tasks:", error)
        toast({
          title: "Error",
          description: "Failed to load tasks. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    getTasks()
  }, [toast])

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter((task) => task.id !== id))
      toast({
        title: "Success",
        description: "Task deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete task:", error)
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 rounded-lg bg-muted/50 animate-pulse" />
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="morphic-card text-center p-6">
        <h2 className="text-xl font-semibold mb-2">No Tasks Found</h2>
        <p className="text-muted-foreground mb-6">Get started by creating your first task</p>
        <Button asChild variant="morphic">
          <Link href="/tasks/new">Create Task</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <div className="morphic-card">
            <div className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <Checkbox id={`task-${task.id}`} className="mt-1" />
                  <div>
                    <label htmlFor={`task-${task.id}`} className="text-lg font-semibold cursor-pointer">
                      {task.title}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Created {task.creation ? formatDistanceToNow(new Date(task.creation)) : "recently"}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="morphic-dropdown">
                    <DropdownMenuItem asChild>
                      <Link href={`/tasks/${task.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => task.id && handleDelete(task.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="py-2">
              <p className="text-sm">{task.description}</p>
              {task.categories && task.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {task.categories.map((category) => (
                    <Badge key={category.id} variant="morphic">
                      {category.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="pt-2">
              <Button asChild variant="morphic" size="sm">
                <Link href={`/tasks/${task.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

