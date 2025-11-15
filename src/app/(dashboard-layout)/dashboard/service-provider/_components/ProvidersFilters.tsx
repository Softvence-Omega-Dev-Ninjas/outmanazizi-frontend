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

interface ProvidersFiltersProps {
  statusFilter: string[]
  verifiedFilter: string[]
  profileFilter: string[]
  onStatusChange: (status: string[]) => void
  onVerifiedChange: (verified: string[]) => void
  onProfileChange: (profile: string[]) => void
  onReset: () => void
}

export function ProvidersFilters({
  statusFilter,
  verifiedFilter,
  profileFilter,
  onStatusChange,
  onVerifiedChange,
  onProfileChange,
  onReset,
}: ProvidersFiltersProps) {
  const hasFilters = statusFilter.length > 0 || verifiedFilter.length > 0 || profileFilter.length > 0

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
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 size-4" />
            Verification
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Filter by Admin Verification</DropdownMenuLabel>
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
            Profile
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Filter by Profile Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={profileFilter.includes('completed')}
            onCheckedChange={(checked) => {
              onProfileChange(
                checked
                  ? [...profileFilter, 'completed']
                  : profileFilter.filter((p) => p !== 'completed')
              )
            }}
          >
            Completed
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={profileFilter.includes('incomplete')}
            onCheckedChange={(checked) => {
              onProfileChange(
                checked
                  ? [...profileFilter, 'incomplete']
                  : profileFilter.filter((p) => p !== 'incomplete')
              )
            }}
          >
            Incomplete
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
