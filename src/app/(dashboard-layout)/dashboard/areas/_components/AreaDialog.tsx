'use client'

import { useState, useEffect } from 'react'
import { Area } from '@/types/area'
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

interface AreaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  area?: Area | null
  onSave: (name: string, areaId?: string) => void
}

export function AreaDialog({ open, onOpenChange, area, onSave }: AreaDialogProps) {
  const [name, setName] = useState('')

  useEffect(() => {
    if (area) {
      setName(area.area)
    } else {
      setName('')
    }
  }, [area, open])

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), area?.id)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{area ? 'Edit Area' : 'Create Area'}</DialogTitle>
          <DialogDescription>
            {area ? 'Update the area name' : 'Add a new service area'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Area Name</label>
            <Input
              placeholder="e.g., Manhattan, Brooklyn, Downtown"
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
            {area ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
