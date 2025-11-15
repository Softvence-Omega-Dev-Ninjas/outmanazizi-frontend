'use client'

import { ServiceProvider } from '@/types/serviceProvider'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Eye, MapPin, Briefcase, FileText } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface VerificationCardProps {
  provider: ServiceProvider
  onApprove: (providerId: string) => void
  onReject: (providerId: string) => void
  onViewDetails: (provider: ServiceProvider) => void
}

export function VerificationCard({
  provider,
  onApprove,
  onReject,
  onViewDetails,
}: VerificationCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage src={provider.user.picture} alt={provider.user.name} />
              <AvatarFallback className="text-lg">
                {provider.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{provider.user.name}</h3>
              <p className="text-sm text-muted-foreground">{provider.user.email}</p>
              <p className="text-sm text-muted-foreground">{provider.user.phone}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {formatDistanceToNow(new Date(provider.createdAt), { addSuffix: true })}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="size-4 text-muted-foreground mt-0.5 shrink-0" />
            <span className="text-muted-foreground">{provider.address}</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Briefcase className="size-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="flex flex-wrap gap-1">
              {provider.serviceCategories.map((category, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="size-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="flex flex-wrap gap-1">
              {provider.serviceArea.map((area, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
          {provider.documents && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">Documents uploaded</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            onClick={() => onViewDetails(provider)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Eye className="mr-2 size-4" />
            View Details
          </Button>
          <Button
            onClick={() => onReject(provider.id)}
            variant="destructive"
            size="sm"
            className="flex-1"
          >
            <XCircle className="mr-2 size-4" />
            Reject
          </Button>
          <Button onClick={() => onApprove(provider.id)} size="sm" className="flex-1">
            <CheckCircle className="mr-2 size-4" />
            Approve
          </Button>
        </div>
      </div>
    </Card>
  )
}
