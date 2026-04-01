# Plan: React + Tailwind + shadcn/ui Learning Site

## Context
Building a component showcase website from scratch to learn React, Tailwind CSS, and shadcn/ui, using Vite as the build tool. The site will demonstrate a wide range of UI components with real, practical examples — functioning as a mini interactive component library/demo.

---

## Step-by-Step Build Plan

### Step 1 — Scaffold with Vite
- Run `npm create vite@latest . -- --template react-ts` to initialize a React + TypeScript project in the current directory
- **Why TypeScript**: better tooling, autocomplete, and the standard in production React projects — worth learning from the start
- Install base dependencies with `npm install`
- Verify the dev server works with `npm run dev`

### Step 2 — Install and configure Tailwind CSS
- Install Tailwind CSS v4 and the Vite plugin: `npm install tailwindcss @tailwindcss/vite`
- Add the Tailwind Vite plugin to `vite.config.ts`
- Add `@import "tailwindcss"` to `src/index.css` (v4's new CSS-first config approach — no `tailwind.config.js` needed)
- Remove boilerplate from `App.tsx` and `App.css`, verify Tailwind classes work

### Step 3 — Install and configure shadcn/ui
- Run `npx shadcn@latest init` — this sets up `components.json`, configures path aliases, and scaffolds `src/lib/utils.ts`
- Update `tsconfig.json` and `vite.config.ts` with the `@/` path alias
- Install first component to verify: `npx shadcn@latest add button`
- **Why shadcn/ui**: it copies component source into your project (not a black-box library), so you can read and learn from the code

### Step 4 — Set up routing with React Router
- Install React Router v7: `npm install react-router`
- Create a page structure under `src/pages/`
- Set up routes in `src/main.tsx` or a dedicated `src/router.tsx`
- Routes to create:
  - `/` — Home / overview page
  - `/typography` — Text, headings, lists
  - `/buttons` — Button variants, sizes, states, icon buttons
  - `/forms` — Input, Textarea, Select, Checkbox, Radio, Switch, Slider
  - `/cards` — Card layouts, hover effects, content cards
  - `/dialogs` — Dialog (modal), Alert Dialog, Drawer, Sheet
  - `/feedback` — Alert, Badge, Progress, Skeleton, Toast/Sonner
  - `/navigation` — Tabs, Accordion, Breadcrumb, Pagination
  - `/data` — Table with sorting/filtering, DataTable

### Step 5 — Build the app layout
- Create `src/components/Layout.tsx` with:
  - Top navbar (site title, dark mode toggle)
  - Sidebar with navigation links to all component pages
  - Main content area
- Use shadcn `ScrollArea` for the sidebar
- Wire the layout into the router so all pages share it

### Step 6 — Build component pages (one per session)
Each page follows the same pattern: section heading, description of the component, live interactive demo, and notes on common props/usage.

**6a. Typography page** — `h1`–`h4`, `p`, `lead`, `muted`, `blockquote`, `code`, `kbd`, inline styles using Tailwind utility classes

**6b. Buttons page** — All shadcn Button variants (`default`, `secondary`, `destructive`, `outline`, `ghost`, `link`), sizes, disabled state, loading state with spinner, icon buttons using Lucide icons

**6c. Forms page** — `Input`, `Textarea`, `Label`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`; wire a small example form with validation using React Hook Form + Zod

**6d. Cards page** — shadcn `Card` with Header/Content/Footer; image cards, stat cards, action cards

**6e. Dialogs page** — `Dialog`, `AlertDialog`, `Sheet` (side panel), `Drawer` (bottom sheet)

**6f. Feedback page** — `Alert` (with variants), `Badge`, `Progress`, `Skeleton`, `Sonner` toast notifications

**6g. Navigation page** — `Tabs`, `Accordion`, `Breadcrumb`, `Pagination`

**6h. Data page** — `Table` component; build a sortable/filterable data table with TanStack Table (the pattern shadcn recommends)

### Step 7 — Polish
- Add a dark mode toggle (Tailwind dark mode via `class` strategy, store preference in localStorage)
- Add a simple home page with a grid of cards linking to each section
- Ensure responsive layout works on mobile (collapsible sidebar)

---

## Critical Files
- `vite.config.ts` — Tailwind plugin + path alias config
- `tsconfig.json` — path alias for `@/`
- `src/index.css` — Tailwind import + CSS variables for shadcn themes
- `components.json` — shadcn/ui configuration
- `src/main.tsx` — router setup
- `src/components/Layout.tsx` — shared shell
- `src/pages/` — one file per component showcase page

---

## Verification (after each step)
- After Step 1: `npm run dev` loads the Vite default page
- After Step 2: a Tailwind class (e.g. `bg-blue-500`) visually applies
- After Step 3: a shadcn `<Button>` renders with correct styles
- After Step 4: navigating between routes works, no 404s
- After Step 5: the sidebar layout appears on all pages
- After each Step 6 page: components render, interactions work (clicks, form input, modals open/close)
