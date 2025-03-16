"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MultiSelect } from "@/components/multi-select"
import { createTask } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function NewTaskPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categories: [] as { value: string; label: string }[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const categoryIds = formData.categories.map((cat) => Number.parseInt(cat.value))
      await createTask({
        title: formData.title,
        description: formData.description,
        categoryIds,
      })

      toast({
        title: "Success",
        description: "Task created successfully",
      })
      router.push("/tasks")
      router.refresh()
    } catch (error) {
      console.error("Failed to create task:", error)
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Mock categories for the demo
  const categoryOptions = [
    { value: "1", label: "Work" },
    { value: "2", label: "Personal" },
    { value: "3", label: "Health" },
    { value: "4", label: "Learning" },
  ]

  return (
    <div className="p-4 md:p-8">
      <div className="morphic-card max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
          <CardDescription>Add a new task to your productivity system</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Categories</Label>
              <MultiSelect
                options={categoryOptions}
                selected={formData.categories}
                onChange={(selected) => setFormData({ ...formData, categories: selected })}
                placeholder="Select categories"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="morphic" disabled={loading}>
              {loading ? "Creating..." : "Create Task"}
            </Button>
          </CardFooter>
        </form>
      </div>
    </div>
  )
}

