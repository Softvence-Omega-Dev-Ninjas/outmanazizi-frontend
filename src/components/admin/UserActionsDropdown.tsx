'use client'

import { useState } from 'react'
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
import { 
  MoreHorizontal, 
  UserCog, 
  Shield, 
  ShieldCheck, 
  Ban, 
  Trash2,
  Eye 
} from 'lucide-react'
import { useVerifyServiceProvider, useBlockUser, useDeleteUser } from '@/hooks/useAdmin'

interface User {
  id: string
  name: string
  email: string
  role: string
  isBlocked: boolean
  isDeleted: boolean
  serviceProvider?: {
    isVerifiedFromAdmin: boolean
  }
}

interface UserActionsDropdownProps {
  user: User
  onRoleChange: (user: User) => void
  onViewDetails?: (user: User) => void
}

export function UserActionsDropdown({ user, onRoleChange, onViewDetails }: UserActionsDropdownProps) {
  const [showBlockDialog, setShowBlockDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  
  const verifyMutation = useVerifyServiceProvider()
  const blockMutation = useBlockUser()
  const deleteMutation = useDeleteUser()

  const handleVerify = () => {
    verifyMutation.mutate(user.id)
  }

  const handleBlock = () => {
    blockMutation.mutate(user.id, {
      onSuccess: () => setShowBlockDialog(false)
    })
  }

  const handleDelete = () => {
    deleteMutation.mutate(user.id, {
      onSuccess: () => setShowDeleteDialog(false)
    })
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
          
          {onViewDetails && (
            <DropdownMenuItem onClick={() => onViewDetails(user)}>
              <Eye className="mr-2 size-4" />
              View Details
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem onClick={() => onRoleChange(user)}>
            <UserCog className="mr-2 size-4" />
            Change Role
          </DropdownMenuItem>
          
          {user.role === 'SERVICE_PROVIDER' && (
            <DropdownMenuItem onClick={handleVerify}>
              {user.serviceProvider?.isVerifiedFromAdmin ? (
                <>
                  <Shield className="mr-2 size-4" />
                  Unverify Provider
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 size-4" />
                  Verify Provider
                </>
              )}
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => setShowBlockDialog(true)}
            className={user.isBlocked ? "text-green-600" : "text-orange-600"}
          >
            <Ban className="mr-2 size-4" />
            {user.isBlocked ? 'Unblock User' : 'Block User'}
          </DropdownMenuItem>
          
          {!user.isDeleted && (
            <DropdownMenuItem 
              onClick={() => setShowDeleteDialog(true)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 size-4" />
              Delete User
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{user.isBlocked ? 'Unblock' : 'Block'} User</DialogTitle>
            <DialogDescription>
              Are you sure you want to {user.isBlocked ? 'unblock' : 'block'} {user.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant={user.isBlocked ? "default" : "destructive"}
              onClick={handleBlock}
              disabled={blockMutation.isPending}
            >
              {blockMutation.isPending ? 'Processing...' : (user.isBlocked ? 'Unblock' : 'Block')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}