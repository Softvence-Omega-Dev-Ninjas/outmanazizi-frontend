'use client'

import { Dispute } from '@/types/dispute'
import { Badge } from '@/components/ui/badge'
import { DisputeActions } from './DisputeActions'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react'

interface DisputesTableProps {
  disputes: Dispute[]
  loading: boolean
  onViewDetails: (dispute: Dispute) => void
  onResolve: (disputeId: string) => void
  onDelete: (disputeId: string) => void
}

export function DisputesTable({ disputes, loading, onViewDetails, onResolve, onDelete }: DisputesTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border">
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Loading disputes...</p>
        </div>
      </div>
    )
  }

  if (disputes.length === 0) {
    return (
      <div className="rounded-lg border">
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No disputes found</p>
        </div>
      </div>
    )
  }

  const getStatusBadge = (dispute: Dispute) => {
    if (dispute.isSolved) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="mr-1 size-3" />
          Resolved
        </Badge>
      )
    }
    return (
      <Badge className="bg-red-100 text-red-800 border-red-200">
        <AlertTriangle className="mr-1 size-3" />
        Pending
      </Badge>
    )
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50">
          <tr className="border-b">
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">Dispute ID</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">Service ID</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">Details</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">Status</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">Evidence</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap">Created</th>
            <th className="h-10 px-2 text-right align-middle font-medium whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {disputes.map((dispute) => (
            <tr key={dispute.id} className="border-b transition-colors hover:bg-muted/50">
              <td className="p-2 align-middle">
                <div className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                  {dispute.id.slice(0, 8)}...
                </div>
              </td>
              <td className="p-2 align-middle">
                <div className="font-mono text-xs">
                  {dispute.serviceid.slice(0, 8)}...
                </div>
              </td>
              <td className="p-2 align-middle">
                <div className="max-w-xs truncate text-sm" title={dispute.details}>
                  {dispute.details}
                </div>
              </td>
              <td className="p-2 align-middle">{getStatusBadge(dispute)}</td>
              <td className="p-2 align-middle">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {dispute.pictures?.length || 0} files
                </Badge>
              </td>
              <td className="p-2 align-middle text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(dispute.createdAt), { addSuffix: true })}
              </td>
              <td className="p-2 align-middle text-right">
                <DisputeActions
                  dispute={dispute}
                  onViewDetails={onViewDetails}
                  onResolve={onResolve}
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