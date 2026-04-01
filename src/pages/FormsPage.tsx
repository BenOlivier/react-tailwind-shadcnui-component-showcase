import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

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

// ── Zod schema ─────────────────────────────────────────────────────────────
// z.object() defines the shape. Each field has its own validation chain.
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string({ required_error: "Please select a role" }).min(1, "Please select a role"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subscribe: z.boolean(),
})

type ContactValues = z.infer<typeof contactSchema>

export default function FormsPage() {
  const [submitted, setSubmitted] = useState<ContactValues | null>(null)
  const [sliderValue, setSliderValue] = useState([50])

  // useForm wires React Hook Form to our Zod schema via the resolver.
  // defaultValues pre-populates the form fields.
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", subscribe: false },
  })

  function onSubmit(values: ContactValues) {
    setSubmitted(values)
  }

  return (
    <div className="max-w-2xl space-y-10">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Forms</h1>
        <p className="text-muted-foreground mt-1">
          Form primitives from shadcn/ui, plus a complete validated form
          built with React Hook Form and Zod.
        </p>
      </div>

      {/* ── Input ────────────────────────────────────────────── */}
      <Section title="Input" description="Pairs with Label. The htmlFor/id link makes the label clickable.">
        <div className="space-y-2 max-w-sm">
          <Label htmlFor="demo-input">Email address</Label>
          <Input id="demo-input" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2 max-w-sm mt-3">
          <Label htmlFor="demo-disabled">Disabled</Label>
          <Input id="demo-disabled" placeholder="Cannot edit this" disabled />
        </div>
      </Section>

      {/* ── Textarea ─────────────────────────────────────────── */}
      <Section title="Textarea">
        <div className="space-y-2 max-w-sm">
          <Label htmlFor="demo-textarea">Message</Label>
          <Textarea id="demo-textarea" placeholder="Write something…" rows={3} />
        </div>
      </Section>

      {/* ── Select ───────────────────────────────────────────── */}
      <Section
        title="Select"
        description="Built on Radix UI Select — fully keyboard navigable and accessible."
      >
        <div className="space-y-2 max-w-sm">
          <Label>Favourite framework</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pick one…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue</SelectItem>
              <SelectItem value="svelte">Svelte</SelectItem>
              <SelectItem value="solid">Solid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      {/* ── Checkbox ─────────────────────────────────────────── */}
      <Section title="Checkbox">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="checked-demo" defaultChecked />
            <Label htmlFor="checked-demo">Checked by default</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="disabled-demo" disabled />
            <Label htmlFor="disabled-demo" className="text-muted-foreground">Disabled</Label>
          </div>
        </div>
      </Section>

      {/* ── Radio Group ──────────────────────────────────────── */}
      <Section title="Radio Group" description="Only one item can be selected at a time.">
        <RadioGroup defaultValue="comfortable">
          {["compact", "comfortable", "spacious"].map(v => (
            <div key={v} className="flex items-center gap-2">
              <RadioGroupItem value={v} id={`radio-${v}`} />
              <Label htmlFor={`radio-${v}`} className="capitalize">{v}</Label>
            </div>
          ))}
        </RadioGroup>
      </Section>

      {/* ── Switch ───────────────────────────────────────────── */}
      <Section title="Switch" description="Use for on/off settings rather than form choices.">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Switch id="notifs" />
            <Label htmlFor="notifs">Email notifications</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="mkt" defaultChecked />
            <Label htmlFor="mkt">Marketing emails</Label>
          </div>
        </div>
      </Section>

      {/* ── Slider ───────────────────────────────────────────── */}
      <Section title="Slider" description="Returns an array of values (supports range sliders with two thumbs).">
        <div className="max-w-sm space-y-2">
          <div className="flex justify-between">
            <Label>Volume</Label>
            <span className="text-sm text-muted-foreground">{sliderValue[0]}%</span>
          </div>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </Section>

      {/* ── Validated form ───────────────────────────────────── */}
      <Section
        title="Complete form — React Hook Form + Zod"
        description="FormField connects each input to the form state. Errors appear automatically via FormMessage when validation fails."
      >
        {submitted ? (
          <div className="rounded-lg bg-muted p-4 space-y-1">
            <p className="text-sm font-medium">Submitted successfully!</p>
            <pre className="text-xs text-muted-foreground">{JSON.stringify(submitted, null, 2)}</pre>
            <Button variant="outline" size="sm" onClick={() => { setSubmitted(null); form.reset() }}>
              Reset
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-sm">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jane@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*
                Select needs special handling — it's not a native input, so
                we pass value/onValueChange instead of spreading {...field}.
              */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="engineer">Engineer</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What's on your mind?" rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subscribe"
                render={({ field }) => (
                  <FormItem className="flex items-start gap-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div>
                      <FormLabel>Subscribe to newsletter</FormLabel>
                      <FormDescription>
                        We'll send you updates once a month.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        )}
      </Section>

    </div>
  )
}
