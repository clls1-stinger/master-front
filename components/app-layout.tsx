"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { CalendarCheck, FileText, Home, ListTodo, Menu, Tag, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-morphic-gradient">
      <SidebarProvider>
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <Sidebar variant="floating" className="hidden md:flex">
            <SidebarHeader className="flex items-center justify-between p-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Home className="h-4 w-4" />
                </div>
                <span className="text-xl font-bold">Productivity</span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="px-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/"}>
                    <Link href="/">
                      <Home className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/tasks")}>
                    <Link href="/tasks">
                      <ListTodo className="h-5 w-5" />
                      <span>Tasks</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/notes")}>
                    <Link href="/notes">
                      <FileText className="h-5 w-5" />
                      <span>Notes</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/habits")}>
                    <Link href="/habits">
                      <CalendarCheck className="h-5 w-5" />
                      <span>Habits</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/categories")}>
                    <Link href="/categories">
                      <Tag className="h-5 w-5" />
                      <span>Categories</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="mt-auto p-4">
              <ModeToggle />
            </SidebarFooter>
          </Sidebar>

          {/* Mobile Header */}
          <div className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-white/10 bg-background/80 p-4 backdrop-blur-lg md:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Home className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold">Productivity</span>
            </Link>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              "fixed inset-0 z-30 bg-background/80 backdrop-blur-lg transition-transform duration-300 md:hidden",
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <div className="flex h-full flex-col pt-16">
              <div className="flex-1 overflow-auto p-4">
                <nav className="space-y-2">
                  <NavLink
                    href="/"
                    icon={<Home className="h-5 w-5" />}
                    isActive={pathname === "/"}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    href="/tasks"
                    icon={<ListTodo className="h-5 w-5" />}
                    isActive={pathname.startsWith("/tasks")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Tasks
                  </NavLink>
                  <NavLink
                    href="/notes"
                    icon={<FileText className="h-5 w-5" />}
                    isActive={pathname.startsWith("/notes")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Notes
                  </NavLink>
                  <NavLink
                    href="/habits"
                    icon={<CalendarCheck className="h-5 w-5" />}
                    isActive={pathname.startsWith("/habits")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Habits
                  </NavLink>
                  <NavLink
                    href="/categories"
                    icon={<Tag className="h-5 w-5" />}
                    isActive={pathname.startsWith("/categories")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Categories
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 pt-16 md:pt-0">
            <div className="morphic-container">
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}

function NavLink({
  href,
  icon,
  isActive,
  onClick,
  children,
}: {
  href: string
  icon: React.ReactNode
  isActive: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl p-3 transition-colors",
        isActive ? "bg-primary/10 text-primary dark:bg-primary/20" : "hover:bg-muted/50",
      )}
      onClick={onClick}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

