'use client'

import { useState, useEffect } from 'react'
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
import { Area } from '@/types/area'

interface UpdateAreaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (locationId: string, area: string) => void
  area: Area | null
}

export function UpdateAreaDialog({ open, onOpenChange, onSubmit, area }: UpdateAreaDialogProps) {
  const [areaName, setAreaName] = useState('')

  useEffect(() => {
    if (area) {
      setAreaName(area.area)
    }
  }, [area])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (areaName.trim() && area) {
      onSubmit(area.id, areaName.trim())
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Area</DialogTitle>
            <DialogDescription>
              Update the service area name.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="area">Area Name</Label>
            <Input
              id="area"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              placeholder="e.g., Dhaka, Chittagong, etc."
              className="mt-2"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!areaName.trim()}>
              Update Area
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
