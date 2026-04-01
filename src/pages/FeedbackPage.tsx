import { useState } from "react"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Terminal, AlertCircle, CheckCircle2, Info } from "lucide-react"

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

export default function FeedbackPage() {
  const [progress, setProgress] = useState(40)

  return (
    <div className="max-w-2xl space-y-10">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
        <p className="text-muted-foreground mt-1">
          Components that communicate status, loading state, and system messages to the user.
        </p>
      </div>

      {/* ── Alert ────────────────────────────────────────────── */}
      <Section
        title="Alert"
        description="Inline status messages. Not a popup — the user must dismiss it manually or it stays visible."
      >
        <div className="space-y-3">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
              Default alert — informational message that doesn't require immediate action.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again to continue.
            </AlertDescription>
          </Alert>

          {/* Custom variant using Tailwind directly — shadcn only ships two variants */}
          <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your changes have been saved successfully.
            </AlertDescription>
          </Alert>

          <Alert className="border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
            <Info className="h-4 w-4" />
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>
              Custom colour using Tailwind classes directly — shadcn components are
              always open to extension this way.
            </AlertDescription>
          </Alert>
        </div>
      </Section>

      {/* ── Badge ────────────────────────────────────────────── */}
      <Section title="Badge" description="Small inline labels. Useful for tags, statuses, and counts.">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
          {/* Custom colours via className */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-100">Active</Badge>
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-100">Pending</Badge>
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-100">Overdue</Badge>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-100">In review</Badge>
          </div>
        </div>
      </Section>

      {/* ── Progress ─────────────────────────────────────────── */}
      <Section title="Progress" description="Controlled by a numeric value prop (0–100).">
        <div className="space-y-4 max-w-sm">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>Uploading…</span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setProgress(p => Math.max(0, p - 10))}
            >
              −10
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setProgress(p => Math.min(100, p + 10))}
            >
              +10
            </Button>
          </div>
          <Progress value={100} className="[&>div]:bg-green-500" />
          <p className="text-xs text-muted-foreground">
            Indicator colour can be overridden with{" "}
            <code className="bg-muted px-1 rounded">[&gt;div]:bg-green-500</code>
          </p>
        </div>
      </Section>

      {/* ── Skeleton ─────────────────────────────────────────── */}
      <Section
        title="Skeleton"
        description="Placeholder shapes shown while content loads. Match them to your actual layout."
      >
        {/* Mimics a card with an avatar, heading, and two lines of text */}
        <div className="flex items-start gap-4 max-w-sm">
          <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2 pt-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </div>

        {/* Mimics a list of items */}
        <div className="space-y-2 max-w-sm mt-4">
          {[80, 100, 60].map(w => (
            <div key={w} className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-4" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </Section>

      {/* ── Toast (Sonner) ───────────────────────────────────── */}
      <Section
        title="Toast — Sonner"
        description="Transient notifications. The Toaster component (added to Layout) renders these outside the normal DOM flow."
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast("Event has been created.")}>
            Default
          </Button>
          <Button variant="outline" onClick={() => toast.success("Profile saved successfully.")}>
            Success
          </Button>
          <Button variant="outline" onClick={() => toast.error("Something went wrong.")}>
            Error
          </Button>
          <Button variant="outline" onClick={() => toast.warning("Your storage is 90% full.")}>
            Warning
          </Button>
          <Button variant="outline" onClick={() => toast.info("A new version is available.")}>
            Info
          </Button>
          {/* Toast with an action button */}
          <Button
            variant="outline"
            onClick={() =>
              toast("File deleted", {
                description: "report-q4.pdf has been removed.",
                action: { label: "Undo", onClick: () => toast.success("Restored!") },
              })
            }
          >
            With action
          </Button>
        </div>
      </Section>

    </div>
  )
}
