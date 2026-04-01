import { Link } from "react-router"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Type,
  MousePointer2,
  ClipboardList,
  LayoutGrid,
  Layers,
  Bell,
  Navigation,
  Table2,
  ArrowRight,
} from "lucide-react"

const sections = [
  {
    title: "Typography",
    path: "/typography",
    icon: Type,
    description: "Headings, body text, blockquotes, inline code, and keyboard shortcuts styled with Tailwind utilities.",
  },
  {
    title: "Buttons",
    path: "/buttons",
    icon: MousePointer2,
    description: "All Button variants and sizes, loading states, icon buttons, and the asChild pattern.",
  },
  {
    title: "Forms",
    path: "/forms",
    icon: ClipboardList,
    description: "Input, Select, Checkbox, Radio, Switch, and Slider — plus a validated form with React Hook Form and Zod.",
  },
  {
    title: "Cards",
    path: "/cards",
    icon: LayoutGrid,
    description: "Card anatomy, stat cards for dashboards, profile cards, and clickable cards with hover effects.",
  },
  {
    title: "Dialogs",
    path: "/dialogs",
    icon: Layers,
    description: "Modal Dialog, AlertDialog for destructive actions, Sheet panels from any edge, and the Vaul Drawer.",
  },
  {
    title: "Feedback",
    path: "/feedback",
    icon: Bell,
    description: "Alert banners, Badge labels, Progress bar, Skeleton loaders, and Sonner toast notifications.",
  },
  {
    title: "Navigation",
    path: "/navigation",
    icon: Navigation,
    description: "Tabs, Accordion (single and multiple), Breadcrumb with ellipsis, and Pagination wired to state.",
  },
  {
    title: "Data",
    path: "/data",
    icon: Table2,
    description: "Sortable, filterable data table built with shadcn Table and TanStack Table's headless API.",
  },
]

export default function HomePage() {
  return (
    <div className="max-w-4xl space-y-10">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">UI Component Showcase</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A hands-on reference for building with{" "}
          <span className="text-foreground font-medium">React</span>,{" "}
          <span className="text-foreground font-medium">Tailwind CSS v4</span>, and{" "}
          <span className="text-foreground font-medium">shadcn/ui</span>.
          Each page demonstrates a set of components with live interactive examples
          and inline explanations.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {["React 19", "Tailwind v4", "shadcn/ui", "Vite", "TypeScript", "React Router v7"].map(tag => (
            <span
              key={tag}
              className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Section grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(({ title, path, icon: Icon, description }) => (
          <Link key={path} to={path}>
            <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50 group">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-md bg-secondary w-fit">
                    <Icon className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
                <div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription className="text-sm mt-1 leading-relaxed">
                    {description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

    </div>
  )
}
