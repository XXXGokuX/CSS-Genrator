"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Paintbrush,
  Square,
  Type,
  Radius,
  GlassWater,
  Layers,
  LayoutGrid,
  AlignJustify,
  Scissors,
  Play,
  Move3d,
  Sliders,
  Droplets,
  Waves,
  Github,
  Sun,
  Moon,
  Home,
  Menu,
} from "lucide-react"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const tools = [
    { id: "gradient", name: "Gradient", icon: Paintbrush },
    { id: "box-shadow", name: "Box Shadow", icon: Square },
    { id: "text-shadow", name: "Text Shadow", icon: Type },
    { id: "border-radius", name: "Border Radius", icon: Radius },
    { id: "glassmorphism", name: "Glassmorphism", icon: GlassWater },
    { id: "neumorphism", name: "Neumorphism", icon: Layers },
    { id: "grid", name: "CSS Grid", icon: LayoutGrid },
    { id: "flexbox", name: "Flexbox", icon: AlignJustify },
    { id: "clip-path", name: "Clip Path", icon: Scissors },
    { id: "animation", name: "Animation", icon: Play },
    { id: "transform", name: "Transform", icon: Move3d },
    { id: "filter", name: "CSS Filter", icon: Sliders },
    { id: "blob", name: "Blob Generator", icon: Droplets },
    { id: "wave", name: "Wave Generator", icon: Waves },
  ]

  if (!mounted) {
    return null
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar variant="inset" collapsible="offcanvas">
          <SidebarHeader className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2 font-semibold">
              <Paintbrush className="h-5 w-5" />
              <span>CSS Generator</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Home" isActive={pathname === "/"}>
                    <Link href="/">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Tools</SidebarGroupLabel>
              <SidebarMenu>
                {tools.map((tool) => (
                  <SidebarMenuItem key={tool.id}>
                    <SidebarMenuButton asChild tooltip={tool.name} isActive={pathname === `/tools/${tool.id}`}>
                      <Link href={`/tools/${tool.id}`}>
                        <tool.icon className="h-4 w-4" />
                        <span>{tool.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <MobileHeader theme={theme} setTheme={setTheme} />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <footer className="border-t py-6 text-center text-sm text-muted-foreground">
            <div className="container">
              <p>© {new Date().getFullYear()} CSS Generator. All rights reserved.</p>
              <p className="mt-1">A collection of modern CSS and UI generators for web developers and designers.</p>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function MobileHeader({ theme, setTheme }: { theme: string | undefined; setTheme: (theme: string) => void }) {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden" aria-label="Toggle menu">
          <Menu className="h-5 w-5" />
        </Button>
        <SidebarTrigger className="hidden md:flex" />
        <h1 className="text-xl font-semibold">CSS Generator</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="gap-2"
        >
          {theme === "dark" ? (
            <>
              <Sun className="h-4 w-4" />
              <span className="hidden sm:inline">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              <span className="hidden sm:inline">Dark Mode</span>
            </>
          )}
        </Button>
      </div>
    </header>
  )
}

