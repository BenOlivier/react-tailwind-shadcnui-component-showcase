import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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

export default function NavigationPage() {
  const [page, setPage] = useState(3)
  const totalPages = 7

  return (
    <div className="max-w-2xl space-y-10">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Navigation</h1>
        <p className="text-muted-foreground mt-1">
          Components for organising and moving between content — tabs, accordions,
          breadcrumbs, and pagination.
        </p>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────── */}
      <Section
        title="Tabs"
        description="Tabs show one content panel at a time. The value prop (or defaultValue) controls which tab is active."
      >
        <Tabs defaultValue="account">
          {/*
            TabsList is the row of tab buttons.
            Each TabsTrigger has a value that matches a TabsContent.
          */}
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-4 space-y-2">
            <p className="text-sm font-medium">Account settings</p>
            <p className="text-sm text-muted-foreground">
              Update your name, email address, and profile photo here.
            </p>
          </TabsContent>

          <TabsContent value="password" className="mt-4 space-y-2">
            <p className="text-sm font-medium">Password settings</p>
            <p className="text-sm text-muted-foreground">
              Change your password. You'll be required to confirm your current
              password before setting a new one.
            </p>
          </TabsContent>

          <TabsContent value="notifications" className="mt-4 space-y-2">
            <p className="text-sm font-medium">Notification preferences</p>
            <p className="text-sm text-muted-foreground">
              Choose which events trigger email, push, or in-app notifications.
            </p>
          </TabsContent>
        </Tabs>
      </Section>

      {/* ── Accordion ────────────────────────────────────────── */}
      <Section
        title="Accordion"
        description='type="single" allows only one open panel at a time. type="multiple" allows any number.'
      >
        {/* Single — only one item open */}
        <p className="text-xs text-muted-foreground font-medium">type="single" (default)</p>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              q: "What is shadcn/ui?",
              a: "A collection of reusable components that you copy into your project. It's not a package — you own the code.",
            },
            {
              q: "Why Tailwind for styling?",
              a: "Tailwind's utility classes keep styles co-located with markup, eliminating context-switching between CSS and JSX files.",
            },
            {
              q: "Do I need TypeScript?",
              a: "No, but it's strongly recommended. TypeScript catches prop type errors at edit time rather than at runtime.",
            },
          ].map(({ q, a }) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Multiple — several items can be open simultaneously */}
        <p className="text-xs text-muted-foreground font-medium mt-4">type="multiple"</p>
        <Accordion type="multiple" className="w-full">
          {["Section A", "Section B", "Section C"].map(s => (
            <AccordionItem key={s} value={s}>
              <AccordionTrigger>{s}</AccordionTrigger>
              <AccordionContent>
                Content for {s}. Multiple accordion items can be expanded
                simultaneously in this mode.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* ── Breadcrumb ───────────────────────────────────────── */}
      <Section
        title="Breadcrumb"
        description="Shows the user's location within a hierarchy. BreadcrumbPage marks the current (non-linked) item."
      >
        <div className="space-y-3">
          {/* Simple */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* With ellipsis for long paths */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Navigation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </Section>

      {/* ── Pagination ───────────────────────────────────────── */}
      <Section
        title="Pagination"
        description="A display component — it doesn't manage state itself. Wire it to your own page state as shown below."
      >
        <div className="space-y-2 w-full">
          <p className="text-sm text-muted-foreground">
            Current page: <strong className="text-foreground">{page}</strong> of {totalPages}
          </p>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={e => { e.preventDefault(); setPage(p => Math.max(1, p - 1)) }}
                  aria-disabled={page === 1}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {[1, 2, 3].map(p => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={page === p}
                    onClick={e => { e.preventDefault(); setPage(p) }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem><PaginationEllipsis /></PaginationItem>

              {[6, 7].map(p => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={page === p}
                    onClick={e => { e.preventDefault(); setPage(p) }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={e => { e.preventDefault(); setPage(p => Math.min(totalPages, p + 1)) }}
                  aria-disabled={page === totalPages}
                  className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Section>

    </div>
  )
}
