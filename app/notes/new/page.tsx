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
import { createNote } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function NewNotePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categories: [] as { value: string; label: string }[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const categoryIds = formData.categories.map((cat) => Number.parseInt(cat.value))
      await createNote({
        title: formData.title,
        content: formData.content,
        categoryIds,
      })

      toast({
        title: "Success",
        description: "Note created successfully",
      })
      router.push("/notes")
      router.refresh()
    } catch (error) {
      console.error("Failed to create note:", error)
      toast({
        title: "Error",
        description: "Failed to create note. Please try again.",
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
          <CardTitle>Create New Note</CardTitle>
          <CardDescription>Add a new note to your productivity system</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter note title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter note content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
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
              {loading ? "Creating..." : "Create Note"}
            </Button>
          </CardFooter>
        </form>
      </div>
    </div>
  )
}

