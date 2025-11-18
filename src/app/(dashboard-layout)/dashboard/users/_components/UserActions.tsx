'use client'

import { useState } from 'react'
import { User } from '@/types/user'
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
import { MoreHorizontal, Ban, CheckCircle, Trash2, Eye, UserCog } from 'lucide-react'
import { UserDetailsDialog } from './UserDetailsDialog'
import { SuperAdminOnly } from '@/components/auth/RoleGuard'

interface UserActionsProps {
  user: User
  onBlock: (userId: string) => void
  onUnblock: (userId: string) => void
  onDelete: (userId: string) => void
  onRoleChange: (user: User) => void
}

export function UserActions({ user, onBlock, onUnblock, onDelete, onRoleChange }: UserActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleBlock = async () => {
    setLoading(true)
    await onBlock(user.id)
    setLoading(false)
  }

  const handleUnblock = async () => {
    setLoading(true)
    await onUnblock(user.id)
    setLoading(false)
  }

  const handleDelete = async () => {
    setLoading(true)
    await onDelete(user.id)
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
          <DropdownMenuItem onClick={() => setShowDetailsDialog(true)}>
            <Eye className="mr-2 size-4" />
            View Details
          </DropdownMenuItem>
          <SuperAdminOnly>
            <DropdownMenuItem onClick={() => onRoleChange(user)}>
              <UserCog className="mr-2 size-4" />
              Change Role
            </DropdownMenuItem>
          </SuperAdminOnly>
          {user.isBlocked ? (
            <DropdownMenuItem onClick={handleUnblock} disabled={loading}>
              <CheckCircle className="mr-2 size-4" />
              Unblock User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={handleBlock} disabled={loading}>
              <Ban className="mr-2 size-4" />
              Block User
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <SuperAdminOnly>
            <DropdownMenuItem
              onClick={() => setShowDeleteDialog(true)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 size-4" />
              Delete User
            </DropdownMenuItem>
          </SuperAdminOnly>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {user.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UserDetailsDialog
        user={user}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
      />
    </>
  )
}
