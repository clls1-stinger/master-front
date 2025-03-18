"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MultiSelect } from "@/components/multi-select"
import { createNote, fetchCategories } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"
import type { Category } from "@/lib/api"

export default function NewNotePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categories: [] as { value: string; label: string }[],
  })

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Failed to load categories:", error)
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again.",
          variant: "destructive",
        })
      }
    }

    loadCategories()
  }, [toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const categoryIds = formData.categories.map((cat) => Number.parseInt(cat.value))
      await createNote({
        title: formData.title,
        content: formData.content,
        categoryIds,
        creation: new Date(), // Add creation date here
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

  const categoryOptions = categories.map((category) => ({
    value: category.id?.toString() || "",
    label: category.name,
  }))

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