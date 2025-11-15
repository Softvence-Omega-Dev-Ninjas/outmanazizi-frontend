'use client'

import { ServiceProvider } from '@/types/serviceProvider'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ProviderActions } from './ProviderActions'
import { ProvidersTableSkeleton } from './ProvidersTableSkeleton'
import { formatDistanceToNow } from 'date-fns'
import { Star } from 'lucide-react'

interface ProvidersTableProps {
  providers: ServiceProvider[]
  loading: boolean
  onBlock: (userId: string) => void
  onUnblock: (userId: string) => void
  onVerify: (providerId: string) => void
  onUnverify: (providerId: string) => void
  onDelete: (userId: string) => void
}

export function ProvidersTable({
  providers,
  loading,
  onBlock,
  onUnblock,
  onVerify,
  onUnverify,
  onDelete,
}: ProvidersTableProps) {
  if (loading) {
    return <ProvidersTableSkeleton />
  }

  if (providers.length === 0) {
    return (
      <div className="rounded-lg border">
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No service providers found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm" style={{ width: 'max-content' }}>
        <thead className="bg-muted/50">
          <tr className="border-b">
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[200px]">Provider</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[150px]">Contact</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[150px]">Services</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[100px]">Rating</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[120px]">Status</th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[120px]">Joined</th>
            <th className="h-10 px-2 text-right align-middle font-medium whitespace-nowrap min-w-[100px]">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
            {providers.map((provider) => (
              <tr key={provider.id} className="border-b transition-colors hover:bg-muted/50">
                <td className="p-2 align-middle whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Avatar className="shrink-0">
                      <AvatarImage src={provider.user.picture} alt={provider.user.name} />
                      <AvatarFallback>
                        {provider.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="font-medium truncate">{provider.user.name}</div>
                      <div className="text-sm text-muted-foreground truncate">{provider.user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap">
                  <div className="text-sm">{provider.user.phone}</div>
                  <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {provider.address}
                  </div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap">
                  <div className="flex flex-wrap gap-1 max-w-[150px]">
                    {provider.serviceCategories.slice(0, 2).map((category, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                    {provider.serviceCategories.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{provider.serviceCategories.length - 2}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {provider.serviceArea.length} area{provider.serviceArea.length > 1 ? 's' : ''}
                  </div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">
                      {provider.myCurrentRating?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {provider.ratingGetFromUsers} review{provider.ratingGetFromUsers !== 1 ? 's' : ''}
                  </div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    {provider.user.isBlocked ? (
                      <Badge variant="destructive">Blocked</Badge>
                    ) : provider.user.isActive ? (
                      <Badge className="bg-green-500">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                    {provider.isVerifiedFromAdmin ? (
                      <Badge className="bg-blue-500">Verified</Badge>
                    ) : (
                      <Badge variant="outline">Not Verified</Badge>
                    )}
                    {!provider.isProfileCompleted && (
                      <Badge variant="secondary" className="text-xs">
                        Incomplete
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(provider.createdAt), { addSuffix: true })}
                </td>
                <td className="p-2 align-middle whitespace-nowrap text-right">
                  <ProviderActions
                    provider={provider}
                    onBlock={onBlock}
                    onUnblock={onUnblock}
                    onVerify={onVerify}
                    onUnverify={onUnverify}
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
