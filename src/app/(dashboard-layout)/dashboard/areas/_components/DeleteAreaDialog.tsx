'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Area } from '@/types/area'
import { AlertTriangle } from 'lucide-react'

interface DeleteAreaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (locationId: string) => void
  area: Area | null
}

export function DeleteAreaDialog({ open, onOpenChange, onConfirm, area }: DeleteAreaDialogProps) {
  const handleConfirm = () => {
    if (area) {
      onConfirm(area.id)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-red-500" />
            Delete Area
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{area?.area}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
