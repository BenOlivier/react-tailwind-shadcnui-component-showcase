import { useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

// ── Data ───────────────────────────────────────────────────────────────────
type User = {
  id: number
  name: string
  email: string
  role: "Admin" | "Editor" | "Viewer"
  status: "Active" | "Inactive" | "Pending"
  joined: string
}

const users: User[] = [
  { id: 1, name: "Alice Chen", email: "alice@example.com", role: "Admin", status: "Active", joined: "2023-01-15" },
  { id: 2, name: "Bob Marsh", email: "bob@example.com", role: "Editor", status: "Active", joined: "2023-03-22" },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "Viewer", status: "Inactive", joined: "2023-05-10" },
  { id: 4, name: "David Kim", email: "david@example.com", role: "Editor", status: "Pending", joined: "2024-01-08" },
  { id: 5, name: "Eva Larson", email: "eva@example.com", role: "Viewer", status: "Active", joined: "2024-02-14" },
  { id: 6, name: "Frank Moore", email: "frank@example.com", role: "Admin", status: "Active", joined: "2022-11-30" },
  { id: 7, name: "Grace Patel", email: "grace@example.com", role: "Editor", status: "Inactive", joined: "2023-09-01" },
]

const statusStyles: Record<User["status"], string> = {
  Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-100",
  Inactive: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100",
  Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-100",
}

// ── Column definitions ─────────────────────────────────────────────────────
// ColumnDef tells TanStack Table how to access and render each column.
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      // Clicking the header toggles sort direction on this column
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-1 h-3 w-3" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-1 h-3 w-3" />
        ) : (
          <ArrowUpDown className="ml-1 h-3 w-3 opacity-40" />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.getValue("name")}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Role
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-1 h-3 w-3" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-1 h-3 w-3" />
        ) : (
          <ArrowUpDown className="ml-1 h-3 w-3 opacity-40" />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("role")}</Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<User["status"]>("status")
      return <Badge className={statusStyles[status]}>{status}</Badge>
    },
  },
  {
    accessorKey: "joined",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Joined
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-1 h-3 w-3" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-1 h-3 w-3" />
        ) : (
          <ArrowUpDown className="ml-1 h-3 w-3 opacity-40" />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {new Date(row.getValue("joined")).toLocaleDateString("en-GB", {
          day: "numeric", month: "short", year: "numeric",
        })}
      </span>
    ),
  },
]

export default function DataPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data: users,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="max-w-3xl space-y-8">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data</h1>
        <p className="text-muted-foreground mt-1">
          The shadcn <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">Table</code> component
          provides styled HTML table elements. TanStack Table handles sorting,
          filtering, and pagination logic separately — it's headless (no UI of its own).
        </p>
      </div>

      {/* ── Filter ───────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter by name, email, role…"
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="max-w-xs"
        />
        {globalFilter && (
          <Button variant="ghost" size="sm" onClick={() => setGlobalFilter("")}>
            Clear
          </Button>
        )}
        <span className="text-sm text-muted-foreground ml-auto">
          {table.getFilteredRowModel().rows.length} of {users.length} users
        </span>
      </div>

      {/* ── Table ────────────────────────────────────────────── */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {/*
              table.getHeaderGroups() returns rows of headers.
              Most tables have one header group (no column grouping).
            */}
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-muted-foreground py-8">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">
        Click any column header with the sort icon to sort. Type in the filter box to search across all fields.
      </p>

    </div>
  )
}
