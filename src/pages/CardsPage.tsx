import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowRight } from "lucide-react"

function Section({ title, description, children }: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b pb-2">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export default function CardsPage() {
  return (
    <div className="max-w-3xl space-y-10">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cards</h1>
        <p className="text-muted-foreground mt-1">
          <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">Card</code> is a
          layout primitive composed of sub-components: Header, Title, Description, Content, and Footer.
        </p>
      </div>

      {/* ── Anatomy ──────────────────────────────────────────── */}
      <Section
        title="Anatomy"
        description="A Card with all sub-components: Header (Title + Description), Content, and Footer."
      >
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>
              CardDescription sits below the title in muted text — good for subtitles or
              short context.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              CardContent is the main body. Put anything here — text, forms, lists,
              charts, etc.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button size="sm">Save</Button>
          </CardFooter>
        </Card>
      </Section>

      {/* ── Stat cards ───────────────────────────────────────── */}
      <Section
        title="Stat cards"
        description="A common dashboard pattern — icon, label, value, and a trend indicator."
      >
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Total revenue", value: "$45,231", change: "+20.1%", up: true, icon: DollarSign },
            { label: "Active users", value: "2,350", change: "+18.1%", up: true, icon: Users },
            { label: "Transactions", value: "12,234", change: "-4.5%", up: false, icon: Activity },
            { label: "Growth rate", value: "8.4%", change: "+2.3%", up: true, icon: TrendingUp },
          ].map(({ label, value, change, up, icon: Icon }) => (
            <Card key={label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{value}</p>
                <p className={`text-xs mt-1 flex items-center gap-1 ${up ? "text-green-600" : "text-red-500"}`}>
                  {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Profile / avatar card ────────────────────────────── */}
      <Section title="Profile card">
        <div className="flex gap-4">
          {[
            { name: "Alice Chen", role: "Engineer", status: "online" },
            { name: "Bob Marsh", role: "Designer", status: "away" },
          ].map(({ name, role, status }) => (
            <Card key={name} className="w-48 text-center">
              <CardHeader className="pb-2">
                {/* Avatar placeholder — a real app would use an <img> */}
                <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
                  {name[0]}
                </div>
                <CardTitle className="text-base mt-2">{name}</CardTitle>
                <CardDescription>{role}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <Badge variant={status === "online" ? "default" : "secondary"}>
                  {status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Clickable / hover cards ──────────────────────────── */}
      <Section
        title="Clickable cards"
        description="Add hover styles directly with Tailwind — transition-colors + hover:bg-muted/50."
      >
        <div className="grid grid-cols-3 gap-3">
          {[
            { title: "Documentation", desc: "How-to guides and API reference." },
            { title: "Components", desc: "Browse all available UI components." },
            { title: "Themes", desc: "Customise colours and design tokens." },
          ].map(({ title, desc }) => (
            <Card
              key={title}
              className="cursor-pointer transition-colors hover:bg-muted/50 group"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{title}</CardTitle>
                <CardDescription className="text-xs">{desc}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-foreground transition-colors">
                  Explore <ArrowRight className="h-3 w-3" />
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

    </div>
  )
}
