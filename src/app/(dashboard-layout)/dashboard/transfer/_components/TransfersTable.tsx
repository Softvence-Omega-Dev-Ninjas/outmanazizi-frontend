'use client'

import { Transfer } from '@/types/transfer'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { TransferActions } from './TransferActions'
import { formatDistanceToNow } from 'date-fns'
import { Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface TransfersTableProps {
  transfers: Transfer[]
  loading: boolean
  onViewDetails: (transfer: Transfer) => void
  onApprove: (transferId: string) => void
  onReject: (transferId: string) => void
}

export function TransfersTable({
  transfers,
  loading,
  onViewDetails,
  onApprove,
  onReject,
}: TransfersTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border">
        <div className="p-8 text-center">
          <div className="inline-block size-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          <p className="mt-4 text-muted-foreground">Loading transfers...</p>
        </div>
      </div>
    )
  }

  if (transfers.length === 0) {
    return (
      <div className="rounded-lg border">
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No transfers found</p>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: Transfer['status']) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="mr-1 size-3" />
            Completed
          </Badge>
        )
      case 'processing':
        return (
          <Badge className="bg-blue-500">
            <Loader2 className="mr-1 size-3 animate-spin" />
            Processing
          </Badge>
        )
      case 'failed':
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 size-3" />
            Failed
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <Clock className="mr-1 size-3" />
            Pending
          </Badge>
        )
    }
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transfer ID</TableHead>
              <TableHead>Service Provider</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transfers.map((transfer) => (
              <TableRow key={transfer.id}>
                <TableCell className="font-mono text-xs">
                  {transfer.id.slice(0, 8)}...
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{transfer.serviceProviderName}</div>
                    <div className="text-sm text-muted-foreground">
                      {transfer.serviceProviderEmail}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{transfer.orderTitle}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {transfer.orderId.slice(0, 8)}...
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-green-600">${transfer.amount}</TableCell>
                <TableCell>
                  <Badge variant="outline">{transfer.paymentMethod}</Badge>
                </TableCell>
                <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(transfer.createdAt), { addSuffix: true })}
                </TableCell>
                <TableCell className="text-right">
                  <TransferActions
                    transfer={transfer}
                    onViewDetails={onViewDetails}
                    onApprove={onApprove}
                    onReject={onReject}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
