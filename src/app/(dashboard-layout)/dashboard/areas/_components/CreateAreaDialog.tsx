'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CreateAreaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (area: string) => void
}

export function CreateAreaDialog({ open, onOpenChange, onSubmit }: CreateAreaDialogProps) {
  const [area, setArea] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (area.trim()) {
      onSubmit(area.trim())
      setArea('')
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Area</DialogTitle>
            <DialogDescription>
              Add a new service area to the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="area">Area Name</Label>
            <Input
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g., Dhaka, Chittagong, etc."
              className="mt-2"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!area.trim()}>
              Create Area
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
