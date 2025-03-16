"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function TaskFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tasks..."
          className="pl-8 bg-white/5 border-white/10 focus:border-white/20 focus:bg-white/10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-9 w-9"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="morphic-dropdown">
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="a-z">A-Z</SelectItem>
            <SelectItem value="z-a">Z-A</SelectItem>
          </SelectContent>
        </Select>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="morphic" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="morphic-card border-0">
            <SheetHeader>
              <SheetTitle>Filter Tasks</SheetTitle>
              <SheetDescription>Narrow down tasks based on categories and other criteria.</SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Categories</h3>
                <div className="space-y-2">
                  {["Work", "Personal", "Health", "Learning"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={`category-${category.toLowerCase()}`} />
                      <Label htmlFor={`category-${category.toLowerCase()}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Date Created</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="date-from">From</Label>
                    <Input type="date" id="date-from" className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="date-to">To</Label>
                    <Input type="date" id="date-to" className="bg-white/5 border-white/10" />
                  </div>
                </div>
              </div>
              <div className="pt-4 flex justify-between">
                <Button variant="outline">Reset</Button>
                <Button variant="morphic">Apply Filters</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

