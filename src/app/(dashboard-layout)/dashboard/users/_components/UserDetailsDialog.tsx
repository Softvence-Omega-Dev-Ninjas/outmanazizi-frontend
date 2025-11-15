'use client'

import { User } from '@/types/user'
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
import { Mail, Phone, MapPin, Calendar, Shield, CheckCircle, XCircle } from 'lucide-react'

interface UserDetailsDialogProps {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserDetailsDialog({ user, open, onOpenChange }: UserDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback className="text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex gap-2 mt-2">
                <Badge>{user.role}</Badge>
                {user.isBlocked && <Badge variant="destructive">Blocked</Badge>}
                {user.isActive && !user.isBlocked && (
                  <Badge className="bg-green-500">Active</Badge>
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
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              </div>
            </div>

            {user.address && (
              <div className="flex items-start gap-3 sm:col-span-2">
                <MapPin className="size-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{user.address}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Joined</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(user.createdAt), 'PPP')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(user.updatedAt), 'PPP')}
                </p>
              </div>
            </div>

            {user.provider && (
              <div className="flex items-start gap-3">
                <Shield className="size-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Auth Provider</p>
                  <p className="text-sm text-muted-foreground capitalize">{user.provider}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Account Status</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                {user.isEmailVerified ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">Email Verified</span>
              </div>
              <div className="flex items-center gap-2">
                {user.isActive ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">Active</span>
              </div>
              <div className="flex items-center gap-2">
                {user.isBlocked ? (
                  <XCircle className="size-4 text-destructive" />
                ) : (
                  <CheckCircle className="size-4 text-green-500" />
                )}
                <span className="text-sm">{user.isBlocked ? 'Blocked' : 'Not Blocked'}</span>
              </div>
              <div className="flex items-center gap-2">
                {user.isDeleted ? (
                  <XCircle className="size-4 text-destructive" />
                ) : (
                  <CheckCircle className="size-4 text-green-500" />
                )}
                <span className="text-sm">{user.isDeleted ? 'Deleted' : 'Not Deleted'}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
