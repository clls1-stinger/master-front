"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CalendarCheck, Edit, MoreHorizontal, Trash } from "lucide-react"
import { fetchHabits, deleteHabit } from "@/lib/data"
import { formatDistanceToNow } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

type Habit = {
  id: number
  name: string
  creation: string
  categories: { id: number; name: string }[]
}

export function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const getHabits = async () => {
      try {
        const data = await fetchHabits()
        setHabits(data)
      } catch (error) {
        console.error("Failed to fetch habits:", error)
        toast({
          title: "Error",
          description: "Failed to load habits. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    getHabits()
  }, [toast])

  const handleDelete = async (id: number) => {
    try {
      await deleteHabit(id)
      setHabits(habits.filter((habit) => habit.id !== id))
      toast({
        title: "Success",
        description: "Habit deleted successfully",
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to delete habit:", error)
      toast({
        title: "Error",
        description: "Failed to delete habit. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-40 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (habits.length === 0) {
    return (
      <Card className="text-center p-6">
        <CardHeader>
          <CardTitle>No Habits Found</CardTitle>
          <CardDescription>Get started by creating your first habit</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/habits/new">Create Habit</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {habits.map((habit) => (
        <Card key={habit.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <CalendarCheck className="h-5 w-5 text-primary mt-1" />
                <CardTitle className="text-lg">{habit.name}</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/habits/${habit.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => handleDelete(habit.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>Created {formatDistanceToNow(new Date(habit.creation))}</CardDescription>
          </CardHeader>
          <CardContent>
            {habit.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {habit.categories.map((category) => (
                  <Badge key={category.id} variant="outline">
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" size="sm">
              <Link href={`/habits/${habit.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

