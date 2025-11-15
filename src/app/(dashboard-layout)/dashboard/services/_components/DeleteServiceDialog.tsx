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

interface DeleteServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceName: string
  onConfirm: () => void
}

export function DeleteServiceDialog({ 
  open, 
  onOpenChange, 
  serviceName,
  onConfirm 
}: DeleteServiceDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Service</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{serviceName}"? This will also delete all sub-services. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
