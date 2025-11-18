'use client'

import { useState } from 'react'
import { Dispute } from '@/types/dispute'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MoreHorizontal, Eye, CheckCircle, Trash2 } from 'lucide-react'

interface DisputeActionsProps {
  dispute: Dispute
  onViewDetails: (dispute: Dispute) => void
  onResolve: (disputeId: string) => void
  onDelete: (disputeId: string) => void
}

export function DisputeActions({ dispute, onViewDetails, onResolve, onDelete }: DisputeActionsProps) {
  const [showResolveDialog, setShowResolveDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleResolve = async () => {
    setLoading(true)
    await onResolve(dispute.id)
    setShowResolveDialog(false)
    setLoading(false)
  }

  const handleDelete = async () => {
    setLoading(true)
    await onDelete(dispute.id)
    setShowDeleteDialog(false)
    setLoading(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onViewDetails(dispute)}>
            <Eye className="mr-2 size-4" />
            View Details
          </DropdownMenuItem>
          {!dispute.isSolved && (
            <DropdownMenuItem onClick={() => setShowResolveDialog(true)}>
              <CheckCircle className="mr-2 size-4" />
              Resolve Dispute
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 size-4" />
            Delete Dispute
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Dispute</DialogTitle>
            <DialogDescription>
              Are you sure you want to resolve this dispute? This will mark it as solved and notify all parties.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResolveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleResolve} disabled={loading}>
              {loading ? 'Resolving...' : 'Resolve'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Dispute</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this dispute? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}