'use client'

import { useState } from 'react'
import { Order } from '@/types/order'
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
import { MoreHorizontal, Eye, CheckCircle, Trash2, Edit, XCircle } from 'lucide-react'

interface OrderActionsProps {
  order: Order
  onViewDetails: (order: Order) => void
  onApprove: (orderId: string) => void
  onDelete: (orderId: string) => void
}

export function OrderActions({ order, onViewDetails, onApprove, onDelete }: OrderActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleApprove = async () => {
    setLoading(true)
    await onApprove(order.id)
    setLoading(false)
  }

  const handleDelete = async () => {
    setLoading(true)
    await onDelete(order.id)
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
          <DropdownMenuItem onClick={() => onViewDetails(order)}>
            <Eye className="mr-2 size-4" />
            View Details
          </DropdownMenuItem>
          {!order.isCompletedFromAdmin && !order.isDeleteRequestToAdmin && (
            <DropdownMenuItem onClick={handleApprove} disabled={loading}>
              <CheckCircle className="mr-2 size-4" />
              Mark as Completed
            </DropdownMenuItem>
          )}
          {order.isDeleteRequestToAdmin && (
            <DropdownMenuItem 
              onClick={() => onApprove(order.id)} 
              disabled={loading}
              className="text-orange-600"
            >
              <XCircle className="mr-2 size-4" />
              Approve Deletion
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {!order.isDeleteRequestToAdmin && (
            <DropdownMenuItem
              onClick={() => setShowDeleteDialog(true)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 size-4" />
              Request Deletion
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Order Deletion</DialogTitle>
            <DialogDescription>
              This will send a deletion request to admin. The order will be marked for review and deletion approval.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? 'Requesting...' : 'Request Deletion'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
