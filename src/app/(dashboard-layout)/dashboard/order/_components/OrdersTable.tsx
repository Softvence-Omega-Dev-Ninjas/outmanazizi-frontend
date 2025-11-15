'use client'

import { Order } from '@/types/order'
import { Badge } from '@/components/ui/badge'
import { OrderActions } from './OrderActions'
import { OrdersTableSkeleton } from './OrdersTableSkeleton'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle, Clock, XCircle } from 'lucide-react'

interface OrdersTableProps {
  orders: Order[]
  loading: boolean
  onViewDetails: (order: Order) => void
  onApprove: (orderId: string) => void
  onDelete: (orderId: string) => void
}

export function OrdersTable({ orders, loading, onViewDetails, onApprove, onDelete }: OrdersTableProps) {
  if (loading) {
    return <OrdersTableSkeleton />
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-lg border">
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No orders found</p>
        </div>
      </div>
    )
  }

  const getStatusBadge = (order: Order) => {
    if (order.isCompletedFromAdmin) {
      return (
        <Badge className="bg-green-500">
          <CheckCircle className="mr-1 size-3" />
          Completed
        </Badge>
      )
    }
    if (order.isDeleteRequestToAdmin) {
      return (
        <Badge variant="destructive">
          <XCircle className="mr-1 size-3" />
          Delete Request
        </Badge>
      )
    }
    if (order.assignedServiceProviderId) {
      return (
        <Badge className="bg-blue-500">
          <Clock className="mr-1 size-3" />
          In Progress
        </Badge>
      )
    }
    return (
      <Badge variant="outline">
        <Clock className="mr-1 size-3" />
        Pending
      </Badge>
    )
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm" style={{ width: 'max-content' }}>
        <thead className="bg-muted/50">
          <tr className="border-b">
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[120px]">Order ID</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[150px]">Service</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[200px]">Description</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[100px]">Budget</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[120px]">Status</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[80px]">Bids</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[120px]">Created</th>
            <th className="h-10 px-2 text-right align-middle font-medium whitespace-nowrap min-w-[100px]">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
            {orders.map((order) => (
              <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                <td className="p-2 align-middle whitespace-nowrap font-mono text-xs">
                  {order.id.slice(0, 8)}...
                </td>
                <td className="p-2 align-middle whitespace-nowrap">
                  <div className="font-medium">{order.serviceName}</div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap max-w-xs truncate text-sm">
                  {order.description}
                </td>
                <td className="p-2 align-middle whitespace-nowrap font-medium">{order.budget}</td>
                <td className="p-2 align-middle whitespace-nowrap">{getStatusBadge(order)}</td>
                <td className="p-2 align-middle whitespace-nowrap">
                  <Badge variant="secondary">{order.bids?.length || 0}</Badge>
                </td>
                <td className="p-2 align-middle whitespace-nowrap text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                </td>
                <td className="p-2 align-middle whitespace-nowrap text-right">
                  <OrderActions
                    order={order}
                    onViewDetails={onViewDetails}
                    onApprove={onApprove}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
