import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { NoteList } from "@/components/note-list"
import { NoteFilters } from "@/components/note-filters"

export default function NotesPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <Button asChild>
            <Link href="/notes/new">
              <Plus className="mr-2 h-4 w-4" />
              New Note
            </Link>
          </Button>
        </div>

        <NoteFilters />

        <Suspense fallback={<div className="h-96 w-full rounded-lg bg-muted animate-pulse" />}>
          <NoteList />
        </Suspense>
      </div>
    </main>
  )
}

