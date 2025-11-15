'use client'

import { useState } from 'react'
import { Transfer } from '@/types/transfer'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, CheckCircle, XCircle } from 'lucide-react'

interface TransferActionsProps {
  transfer: Transfer
  onViewDetails: (transfer: Transfer) => void
  onApprove: (transferId: string) => void
  onReject: (transferId: string) => void
}

export function TransferActions({
  transfer,
  onViewDetails,
  onApprove,
  onReject,
}: TransferActionsProps) {
  const [loading, setLoading] = useState(false)

  const handleApprove = async () => {
    setLoading(true)
    await onApprove(transfer.id)
    setLoading(false)
  }

  const handleReject = async () => {
    setLoading(true)
    await onReject(transfer.id)
    setLoading(false)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onViewDetails(transfer)}>
          <Eye className="mr-2 size-4" />
          View Details
        </DropdownMenuItem>
        {transfer.status === 'pending' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleApprove} disabled={loading}>
              <CheckCircle className="mr-2 size-4" />
              Approve Transfer
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleReject}
              disabled={loading}
              className="text-destructive"
            >
              <XCircle className="mr-2 size-4" />
              Reject Transfer
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
