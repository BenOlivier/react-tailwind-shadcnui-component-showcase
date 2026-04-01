import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Mail, Plus, Trash2, ChevronRight, Download } from "lucide-react"

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
      <div className="flex flex-wrap gap-2 items-center">{children}</div>
    </section>
  )
}

export default function ButtonsPage() {
  const [loading, setLoading] = useState(false)

  function handleLoadingClick() {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="max-w-2xl space-y-10">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Buttons</h1>
        <p className="text-muted-foreground mt-1">
          The <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">Button</code> component uses{" "}
          <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">cva</code> (class-variance-authority)
          to manage variants and sizes declaratively.
        </p>
      </div>

      {/* ── Variants ─────────────────────────────────────────── */}
      <Section
        title="Variants"
        description="The variant prop controls visual style. Use destructive for irreversible actions."
      >
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </Section>

      {/* ── Sizes ────────────────────────────────────────────── */}
      <Section
        title="Sizes"
        description="The size prop maps to fixed height and padding values defined in buttonVariants."
      >
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        {/* icon size makes the button square — pair with a single icon, no text */}
        <Button size="icon" aria-label="Add item">
          <Plus />
        </Button>
      </Section>

      {/* ── With icons ───────────────────────────────────────── */}
      <Section
        title="With icons"
        description="Lucide icons are sized automatically by the [&_svg]:size-4 rule in buttonVariants."
      >
        <Button>
          <Mail /> Send email
        </Button>
        <Button variant="outline">
          <Download /> Export
        </Button>
        <Button variant="destructive">
          <Trash2 /> Delete
        </Button>
        {/* Icon on the right — just put it after the text */}
        <Button variant="ghost">
          Continue <ChevronRight />
        </Button>
      </Section>

      {/* ── States ───────────────────────────────────────────── */}
      <Section
        title="States"
        description="disabled prevents interaction. For loading, swap in a spinner and disable manually."
      >
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled outline</Button>

        {/*
          Loading pattern: no built-in loading prop exists — you manage it with
          state. Disable the button to prevent double-submits, and replace the
          icon with Loader2 (which is animated via animate-spin).
        */}
        <Button onClick={handleLoadingClick} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Saving…
            </>
          ) : (
            "Click to load"
          )}
        </Button>
      </Section>

      {/* ── asChild ──────────────────────────────────────────── */}
      <Section
        title="asChild — rendering as a link"
        description="asChild merges Button's props onto its child element instead of rendering a <button>. Useful for routing links that need button styling."
      >
        {/*
          Here we render an <a> tag with full button styling.
          In a real app you'd use React Router's <Link> as the child.
        */}
        <Button asChild>
          <a href="#">Anchor styled as button</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="#">Outline anchor</a>
        </Button>
      </Section>

    </div>
  )
}
