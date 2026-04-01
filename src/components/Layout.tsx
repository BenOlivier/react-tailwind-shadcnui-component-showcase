import { Outlet, NavLink, useLocation } from "react-router"
import { useState, useEffect } from "react"
import { Moon, Sun, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", path: "/" },
  { label: "Typography", path: "/typography" },
  { label: "Buttons", path: "/buttons" },
  { label: "Forms", path: "/forms" },
  { label: "Cards", path: "/cards" },
  { label: "Dialogs", path: "/dialogs" },
  { label: "Feedback", path: "/feedback" },
  { label: "Navigation", path: "/navigation" },
  { label: "Data", path: "/data" },
]

// Extracted so the same nav renders in both the desktop sidebar and mobile Sheet
function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ScrollArea className="h-full py-4">
      <div className="px-3 pb-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1">
          Components
        </p>
        <Separator className="mb-2" />
        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-2 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-secondary font-medium text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </ScrollArea>
  )
}

export default function Layout() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark")
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close the mobile sheet whenever the route changes
  const location = useLocation()
  useEffect(() => setMobileOpen(false), [location.pathname])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Navbar ────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 h-14 z-50 border-b bg-background flex items-center px-4 gap-3">
        {/*
          Hamburger — only visible below the lg breakpoint.
          lg:hidden means "display:none at lg and above".
        */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <span className="font-semibold text-sm flex-1">UI Component Showcase</span>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDark(d => !d)}
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </header>

      {/* ── Mobile sidebar — Sheet overlay ────────────────────── */}
      {/*
        Sheet is shown on mobile when mobileOpen is true.
        It's an uncontrolled open/close so we pass open + onOpenChange.
        Navigating to a page (via useLocation effect above) closes it.
      */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-56 p-0">
          <SheetHeader className="px-4 pt-4 pb-0">
            <SheetTitle className="text-sm font-semibold">Navigation</SheetTitle>
          </SheetHeader>
          <SidebarNav onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* ── Below the navbar ──────────────────────────────────── */}
      <div className="flex pt-14">

        {/* ── Desktop sidebar — always visible at lg+ ───────────── */}
        {/*
          hidden on mobile (display:none), flex at lg and above.
          This prevents the sidebar from overlapping content on small screens.
        */}
        <aside className="hidden lg:block fixed top-14 left-0 bottom-0 w-56 border-r bg-background">
          <SidebarNav />
        </aside>

        {/* ── Main content ──────────────────────────────────────── */}
        {/*
          lg:ml-56 only applies the left margin on desktop where the
          sidebar is visible. On mobile it's full-width.
        */}
        <main className="flex-1 lg:ml-56 p-6 lg:p-8 min-h-[calc(100vh-3.5rem)]">
          <Outlet />
        </main>

      </div>

      <Toaster richColors />
    </div>
  )
}
