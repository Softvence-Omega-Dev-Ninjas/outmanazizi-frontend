import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Filter } from 'lucide-react'

interface UsersFiltersProps {
  statusFilter: string[]
  verifiedFilter: string[]
  providerFilter: string[]
  onStatusChange: (status: string[]) => void
  onVerifiedChange: (verified: string[]) => void
  onProviderChange: (provider: string[]) => void
  onReset: () => void
}

export function UsersFilters({
  statusFilter,
  verifiedFilter,
  providerFilter,
  onStatusChange,
  onVerifiedChange,
  onProviderChange,
  onReset,
}: UsersFiltersProps) {
  const hasFilters = statusFilter.length > 0 || verifiedFilter.length > 0 || providerFilter.length > 0

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 size-4" />
            Status
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes('active')}
            onCheckedChange={(checked) => {
              onStatusChange(
                checked
                  ? [...statusFilter, 'active']
                  : statusFilter.filter((s) => s !== 'active')
              )
            }}
          >
            Active
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes('blocked')}
            onCheckedChange={(checked) => {
              onStatusChange(
                checked
                  ? [...statusFilter, 'blocked']
                  : statusFilter.filter((s) => s !== 'blocked')
              )
            }}
          >
            Blocked
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes('inactive')}
            onCheckedChange={(checked) => {
              onStatusChange(
                checked
                  ? [...statusFilter, 'inactive']
                  : statusFilter.filter((s) => s !== 'inactive')
              )
            }}
          >
            Inactive
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 size-4" />
            Verified
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Filter by Verification</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={verifiedFilter.includes('verified')}
            onCheckedChange={(checked) => {
              onVerifiedChange(
                checked
                  ? [...verifiedFilter, 'verified']
                  : verifiedFilter.filter((v) => v !== 'verified')
              )
            }}
          >
            Verified
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={verifiedFilter.includes('not-verified')}
            onCheckedChange={(checked) => {
              onVerifiedChange(
                checked
                  ? [...verifiedFilter, 'not-verified']
                  : verifiedFilter.filter((v) => v !== 'not-verified')
              )
            }}
          >
            Not Verified
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 size-4" />
            Provider
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Filter by Auth Provider</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={providerFilter.includes('google')}
            onCheckedChange={(checked) => {
              onProviderChange(
                checked
                  ? [...providerFilter, 'google']
                  : providerFilter.filter((p) => p !== 'google')
              )
            }}
          >
            Google
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={providerFilter.includes('facebook')}
            onCheckedChange={(checked) => {
              onProviderChange(
                checked
                  ? [...providerFilter, 'facebook']
                  : providerFilter.filter((p) => p !== 'facebook')
              )
            }}
          >
            Facebook
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={providerFilter.includes('email')}
            onCheckedChange={(checked) => {
              onProviderChange(
                checked
                  ? [...providerFilter, 'email']
                  : providerFilter.filter((p) => p !== 'email')
              )
            }}
          >
            Email/Password
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      )}
    </div>
  )
}
