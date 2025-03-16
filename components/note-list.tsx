"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, FileText, MoreHorizontal, Trash } from "lucide-react"
import { fetchNotes, deleteNote } from "@/lib/data"
import { formatDistanceToNow } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

type Note = {
  id: number
  title: string
  content: string
  creation: string
  categories: { id: number; name: string }[]
}

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await fetchNotes()
        setNotes(data)
      } catch (error) {
        console.error("Failed to fetch notes:", error)
        toast({
          title: "Error",
          description: "Failed to load notes. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    getNotes()
  }, [toast])

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id)
      setNotes(notes.filter((note) => note.id !== id))
      toast({
        title: "Success",
        description: "Note deleted successfully",
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to delete note:", error)
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <Card className="text-center p-6">
        <CardHeader>
          <CardTitle>No Notes Found</CardTitle>
          <CardDescription>Get started by creating your first note</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/notes/new">Create Note</Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <Card key={note.id} className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-primary mt-1" />
                <CardTitle className="text-lg">{note.title}</CardTitle>
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
                    <Link href={`/notes/${note.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => handleDelete(note.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>Created {formatDistanceToNow(new Date(note.creation))}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm line-clamp-4 whitespace-pre-line">{note.content}</p>
            {note.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {note.categories.map((category) => (
                  <Badge key={category.id} variant="outline">
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            <Button asChild variant="outline" size="sm">
              <Link href={`/notes/${note.id}`}>View Note</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

