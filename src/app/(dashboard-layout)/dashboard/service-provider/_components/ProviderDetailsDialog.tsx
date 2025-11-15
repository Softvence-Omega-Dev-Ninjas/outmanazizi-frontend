'use client'

import { ServiceProvider } from '@/types/serviceProvider'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import { Mail, Phone, MapPin, Calendar, Shield, CheckCircle, XCircle, Star, Briefcase } from 'lucide-react'

interface ProviderDetailsDialogProps {
  provider: ServiceProvider
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProviderDetailsDialog({ provider, open, onOpenChange }: ProviderDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Service Provider Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarImage src={provider.user.picture} alt={provider.user.name} />
              <AvatarFallback className="text-2xl">
                {provider.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{provider.user.name}</h3>
              <p className="text-sm text-muted-foreground">{provider.user.email}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge>SERVICE_PROVIDER</Badge>
                {provider.user.isBlocked && <Badge variant="destructive">Blocked</Badge>}
                {provider.user.isActive && !provider.user.isBlocked && (
                  <Badge className="bg-green-500">Active</Badge>
                )}
                {provider.isVerifiedFromAdmin ? (
                  <Badge className="bg-blue-500">Admin Verified</Badge>
                ) : (
                  <Badge variant="outline">Not Verified</Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Mail className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{provider.user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{provider.user.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <MapPin className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">{provider.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Star className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Rating</p>
                <p className="text-sm text-muted-foreground">
                  {provider.myCurrentRating?.toFixed(1) || '0.0'} ({provider.ratingGetFromUsers} reviews)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Joined</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(provider.createdAt), 'PPP')}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Briefcase className="size-4" />
              Service Information
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-2">Service Categories</p>
                <div className="flex flex-wrap gap-2">
                  {provider.serviceCategories.map((category, idx) => (
                    <Badge key={idx} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Service Areas</p>
                <div className="flex flex-wrap gap-2">
                  {provider.serviceArea.map((area, idx) => (
                    <Badge key={idx} variant="outline">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Account Status</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                {provider.user.isEmailVerified ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">Email Verified</span>
              </div>
              <div className="flex items-center gap-2">
                {provider.user.isActive ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">Active</span>
              </div>
              <div className="flex items-center gap-2">
                {provider.user.isBlocked ? (
                  <XCircle className="size-4 text-destructive" />
                ) : (
                  <CheckCircle className="size-4 text-green-500" />
                )}
                <span className="text-sm">{provider.user.isBlocked ? 'Blocked' : 'Not Blocked'}</span>
              </div>
              <div className="flex items-center gap-2">
                {provider.isVerifiedFromAdmin ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">Admin Verified</span>
              </div>
              <div className="flex items-center gap-2">
                {provider.isProfileCompleted ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">Profile Completed</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
