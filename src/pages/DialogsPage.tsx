import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
      <div className="flex flex-wrap gap-2">{children}</div>
    </section>
  )
}

export default function DialogsPage() {
  const [deleted, setDeleted] = useState(false)

  return (
    <div className="max-w-2xl space-y-10">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dialogs</h1>
        <p className="text-muted-foreground mt-1">
          Overlay components built on Radix UI primitives. They handle focus
          trapping, scroll locking, and keyboard dismissal (Escape) automatically.
        </p>
      </div>

      {/* ── Dialog ───────────────────────────────────────────── */}
      <Section
        title="Dialog"
        description="A modal overlay. Wraps content in DialogContent — clicking the backdrop or pressing Escape closes it."
      >
        {/*
          DialogTrigger wraps whatever opens the dialog.
          asChild passes the open behaviour to the child element
          rather than rendering an extra wrapper element.
        */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="dlg-name">Name</Label>
                <Input id="dlg-name" defaultValue="Jane Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dlg-username">Username</Label>
                <Input id="dlg-username" defaultValue="@janesmith" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Simple message</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This is a simple informational dialog with no form.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button>Got it</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      {/* ── Alert Dialog ─────────────────────────────────────── */}
      <Section
        title="Alert Dialog"
        description="For destructive or irreversible actions. Unlike Dialog, it cannot be dismissed by clicking the backdrop — the user must make an explicit choice."
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {/* Cancel dismisses without action */}
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* Action confirms — style it destructively */}
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => setDeleted(true)}
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {deleted && (
          <p className="text-sm text-muted-foreground self-center">
            ✓ Action confirmed
          </p>
        )}
      </Section>

      {/* ── Sheet ────────────────────────────────────────────── */}
      <Section
        title="Sheet"
        description="Slides in from any edge. Useful for navigation drawers, filter panels, or detail views."
      >
        {(["left", "right", "top", "bottom"] as const).map(side => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="outline" className="capitalize">{side}</Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>Sheet — {side}</SheetTitle>
                <SheetDescription>
                  This sheet slides in from the {side}. Use the right side for
                  detail panels, left for navigation, bottom for mobile actions.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 text-sm text-muted-foreground">
                Content goes here.
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </Section>

      {/* ── Drawer ───────────────────────────────────────────── */}
      <Section
        title="Drawer"
        description="A bottom sheet with a drag handle — built with Vaul. Commonly used on mobile for action menus."
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Move goal</DrawerTitle>
                <DrawerDescription>
                  Drag the handle or tap outside to dismiss.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 text-sm text-muted-foreground">
                Put actions or content here. On mobile, the user can drag this
                panel down to dismiss it.
              </div>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </Section>

    </div>
  )
}
