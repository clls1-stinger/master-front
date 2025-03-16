import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CategoryList } from "@/components/category-list"

export default function CategoriesPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <Button asChild>
            <Link href="/categories/new">
              <Plus className="mr-2 h-4 w-4" />
              New Category
            </Link>
          </Button>
        </div>

        <Suspense fallback={<div className="h-96 w-full rounded-lg bg-muted animate-pulse" />}>
          <CategoryList />
        </Suspense>
      </div>
    </main>
  )
}

