function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b pb-2">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  )
}

export default function TypographyPage() {
  return (
    <div className="max-w-2xl space-y-10">

      {/* Page title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Typography</h1>
        <p className="text-muted-foreground mt-1">
          Text styles using Tailwind utility classes. There are no special
          components here — just HTML elements with classes applied directly.
        </p>
      </div>

      {/* ── Headings ─────────────────────────────────────────── */}
      <Section title="Headings">
        {/*
          tracking-tight tightens letter-spacing on large text — looks better
          at display sizes. font-bold / font-semibold control weight.
        */}
        <h1 className="text-4xl font-bold tracking-tight">Heading 1 — text-4xl</h1>
        <h2 className="text-3xl font-semibold tracking-tight">Heading 2 — text-3xl</h2>
        <h3 className="text-2xl font-semibold tracking-tight">Heading 3 — text-2xl</h3>
        <h4 className="text-xl font-semibold tracking-tight">Heading 4 — text-xl</h4>
      </Section>

      {/* ── Body text ────────────────────────────────────────── */}
      <Section title="Body text">
        {/*
          "Lead" paragraph — larger, for introductory copy.
          text-xl + text-muted-foreground is the conventional combo.
        */}
        <p className="text-xl text-muted-foreground">
          Lead — The quick brown fox jumps over the lazy dog. Used for
          introductory paragraphs or subtitles beneath a heading.
        </p>

        {/* Default body copy */}
        <p className="text-base leading-7">
          Body — The quick brown fox jumps over the lazy dog. This is standard
          body text at <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">text-base</code> (16px) with{" "}
          <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">leading-7</code> for comfortable reading
          line-height.
        </p>

        {/* Small / caption text */}
        <p className="text-sm text-muted-foreground">
          Small — Captions, helper text, and secondary labels use{" "}
          <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">text-sm</code> and{" "}
          <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">text-muted-foreground</code>.
        </p>
      </Section>

      {/* ── Inline styles ────────────────────────────────────── */}
      <Section title="Inline styles">
        <p className="text-base leading-7">
          Text can be{" "}
          <strong className="font-semibold">bold with font-semibold</strong>,{" "}
          <em className="italic">italic</em>,{" "}
          <span className="underline underline-offset-4">underlined with underline-offset-4</span>,{" "}
          <span className="line-through text-muted-foreground">struck through</span>, or{" "}
          <a href="#" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
            linked with hover state
          </a>.
        </p>
      </Section>

      {/* ── Blockquote ───────────────────────────────────────── */}
      <Section title="Blockquote">
        {/*
          border-l-2 + pl-6 is the classic blockquote indent.
          italic + text-muted-foreground gives it a "quoted" feel.
        */}
        <blockquote className="border-l-2 border-border pl-6 italic text-muted-foreground">
          "Any sufficiently advanced technology is indistinguishable from magic."
          <footer className="mt-1 text-sm not-italic font-medium text-foreground">
            — Arthur C. Clarke
          </footer>
        </blockquote>
      </Section>

      {/* ── Code ─────────────────────────────────────────────── */}
      <Section title="Code">
        {/* Inline code */}
        <p className="text-base leading-7">
          Use <code className="text-sm font-mono bg-muted text-foreground px-1.5 py-0.5 rounded">inline code</code> for
          variable names like <code className="text-sm font-mono bg-muted text-foreground px-1.5 py-0.5 rounded">onClick</code> or{" "}
          <code className="text-sm font-mono bg-muted text-foreground px-1.5 py-0.5 rounded">className</code>.
        </p>

        {/* Code block */}
        <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
          <code className="text-sm font-mono text-foreground">{`function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}</code>
        </pre>
      </Section>

      {/* ── Keyboard shortcuts ───────────────────────────────── */}
      <Section title="Keyboard shortcuts">
        <p className="text-base leading-7">
          Save with{" "}
          <kbd className="inline-flex items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-xs font-mono font-medium">
            ⌘
          </kbd>{" "}
          <kbd className="inline-flex items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-xs font-mono font-medium">
            S
          </kbd>,
          or open the command palette with{" "}
          <kbd className="inline-flex items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-xs font-mono font-medium">
            ⌘
          </kbd>{" "}
          <kbd className="inline-flex items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-xs font-mono font-medium">
            K
          </kbd>.
        </p>
      </Section>

      {/* ── Lists ────────────────────────────────────────────── */}
      <Section title="Lists">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium mb-2">Unordered</p>
            {/*
              list-disc turns on bullet points.
              list-inside indents bullets inside the element's padding box.
              space-y-1 adds vertical gap between items.
            */}
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>First item</li>
              <li>Second item</li>
              <li>Third item with a longer label</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Ordered</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Install dependencies</li>
              <li>Configure Tailwind</li>
              <li>Add shadcn/ui</li>
            </ol>
          </div>
        </div>
      </Section>

    </div>
  )
}
