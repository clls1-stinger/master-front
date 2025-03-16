"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MultiSelect } from "@/components/multi-select"
import { createHabit } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function NewHabitPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    categories: [] as { value: string; label: string }[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const categoryIds = formData.categories.map((cat) => Number.parseInt(cat.value))
      await createHabit({
        name: formData.name,
        categoryIds,
      })

      toast({
        title: "Success",
        description: "Habit created successfully",
      })
      router.push("/habits")
      router.refresh()
    } catch (error) {
      console.error("Failed to create habit:", error)
      toast({
        title: "Error",
        description: "Failed to create habit. Please try again.",
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
          <CardTitle>Create New Habit</CardTitle>
          <CardDescription>Add a new habit to your productivity system</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter habit name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
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
              {loading ? "Creating..." : "Create Habit"}
            </Button>
          </CardFooter>
        </form>
      </div>
    </div>
  )
}

