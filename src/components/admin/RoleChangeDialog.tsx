'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useChangeUserRole } from '@/hooks/useAdmin'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface RoleChangeDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ROLES = [
  { value: 'CONSUMER', label: 'Consumer', color: 'bg-blue-100 text-blue-800' },
  { value: 'SERVICE_PROVIDER', label: 'Service Provider', color: 'bg-green-100 text-green-800' },
  { value: 'ADMIN', label: 'Admin', color: 'bg-purple-100 text-purple-800' },
  { value: 'SUPER_ADMIN', label: 'Super Admin', color: 'bg-red-100 text-red-800' },
]

export function RoleChangeDialog({ user, open, onOpenChange }: RoleChangeDialogProps) {
  const [selectedRole, setSelectedRole] = useState<string>('')
  const changeRoleMutation = useChangeUserRole()

  const handleRoleChange = async () => {
    if (!user || !selectedRole) return
    
    changeRoleMutation.mutate(
      { userId: user.id, role: selectedRole },
      {
        onSuccess: () => {
          onOpenChange(false)
          setSelectedRole('')
        }
      }
    )
  }

  const getCurrentRoleInfo = () => {
    return ROLES.find(role => role.value === user?.role)
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription>
            Change the role for {user.name} ({user.email})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Current Role</label>
            <div className="mt-1">
              <Badge className={getCurrentRoleInfo()?.color}>
                {getCurrentRoleInfo()?.label}
              </Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">New Role</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select new role" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem 
                    key={role.value} 
                    value={role.value}
                    disabled={role.value === user.role}
                  >
                    <div className="flex items-center gap-2">
                      <Badge className={role.color} variant="outline">
                        {role.label}
                      </Badge>
                      {role.value === user.role && (
                        <span className="text-xs text-muted-foreground">(Current)</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedRole && selectedRole !== user.role && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Warning:</strong> Changing user role will affect their permissions and access level.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleRoleChange} 
            disabled={!selectedRole || selectedRole === user.role || changeRoleMutation.isPending}
          >
            {changeRoleMutation.isPending ? 'Changing...' : 'Change Role'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}