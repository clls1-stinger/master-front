"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Tag, Trash } from "lucide-react"
import { fetchCategories, deleteCategory } from "@/lib/data"
import { formatDistanceToNow } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

type Category = {
  id: number
  name: string
  description: string
  creation: string
}

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    getCategories()
  }, [toast])

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id)
      setCategories(categories.filter((category) => category.id !== id))
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to delete category:", error)
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <Card className="text-center p-6">
        <CardHeader>
          <CardTitle>No Categories Found</CardTitle>
          <CardDescription>Get started by creating your first category</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/categories/new">Create Category</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <Tag className="h-5 w-5 text-primary mt-1" />
                <CardTitle className="text-lg">{category.name}</CardTitle>
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
                    <Link href={`/categories/${category.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>Created {formatDistanceToNow(new Date(category.creation))}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{category.description}</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" size="sm">
              <Link href={`/categories/${category.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

