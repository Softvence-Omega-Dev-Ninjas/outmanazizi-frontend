'use client'

import { Transfer } from '@/types/transfer'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import {
  User,
  DollarSign,
  CreditCard,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
} from 'lucide-react'

interface TransferDetailsDialogProps {
  transfer: Transfer | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransferDetailsDialog({ transfer, open, onOpenChange }: TransferDetailsDialogProps) {
  if (!transfer) return null

  const getStatusIcon = () => {
    switch (transfer.status) {
      case 'completed':
        return <CheckCircle className="size-5 text-green-500" />
      case 'processing':
        return <Loader2 className="size-5 text-blue-500 animate-spin" />
      case 'failed':
        return <XCircle className="size-5 text-destructive" />
      default:
        return <Clock className="size-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = () => {
    switch (transfer.status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Transfer Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold">Transfer #{transfer.id.slice(0, 8)}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Transaction ID: {transfer.transactionId || 'N/A'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              {getStatusBadge()}
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <User className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Service Provider</p>
                <p className="text-sm text-muted-foreground">{transfer.serviceProviderName}</p>
                <p className="text-xs text-muted-foreground">{transfer.serviceProviderEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Order</p>
                <p className="text-sm text-muted-foreground">{transfer.orderTitle}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {transfer.orderId}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Amount</p>
                <p className="text-lg font-semibold text-green-600">${transfer.amount}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Payment Method</p>
                <p className="text-sm text-muted-foreground">{transfer.paymentMethod}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(transfer.createdAt), 'PPP p')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(transfer.updatedAt), 'PPP p')}
                </p>
              </div>
            </div>

            {transfer.completedAt && (
              <div className="flex items-start gap-3 sm:col-span-2">
                <CheckCircle className="size-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Completed At</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(transfer.completedAt), 'PPP p')}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Transfer Timeline</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <div className="size-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">
                  Transfer created on {format(new Date(transfer.createdAt), 'PPP')}
                </span>
              </div>
              {transfer.status === 'processing' && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="size-2 rounded-full bg-blue-500" />
                  <span className="text-muted-foreground">Transfer is being processed</span>
                </div>
              )}
              {transfer.status === 'completed' && transfer.completedAt && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="size-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">
                    Transfer completed on {format(new Date(transfer.completedAt), 'PPP')}
                  </span>
                </div>
              )}
              {transfer.status === 'failed' && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="size-2 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">Transfer failed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
