'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SubServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceId: string | null
  serviceName?: string
  onSave: (serviceId: string, name: string) => void
}

export function SubServiceDialog({
  open,
  onOpenChange,
  serviceId,
  serviceName,
  onSave,
}: SubServiceDialogProps) {
  const [name, setName] = useState('')

  useEffect(() => {
    if (!open) {
      setName('')
    }
  }, [open])

  const handleSave = () => {
    if (name.trim() && serviceId) {
      onSave(serviceId, name.trim())
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Sub-Service</DialogTitle>
          <DialogDescription>
            Add a new sub-service to {serviceName || 'this service'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Sub-Service Name</label>
            <Input
              placeholder="e.g., Pipe Repair, Drain Cleaning"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
