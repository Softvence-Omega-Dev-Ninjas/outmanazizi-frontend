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

interface DisputeFiltersProps {
  statusFilter: string[]
  onStatusChange: (status: string[]) => void
  onReset: () => void
}

export function DisputeFilters({ statusFilter, onStatusChange, onReset }: DisputeFiltersProps) {
  const hasFilters = statusFilter.length > 0

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
            checked={statusFilter.includes('pending')}
            onCheckedChange={(checked) => {
              onStatusChange(
                checked
                  ? [...statusFilter, 'pending']
                  : statusFilter.filter((s) => s !== 'pending')
              )
            }}
          >
            Pending
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes('resolved')}
            onCheckedChange={(checked) => {
              onStatusChange(
                checked
                  ? [...statusFilter, 'resolved']
                  : statusFilter.filter((s) => s !== 'resolved')
              )
            }}
          >
            Resolved
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset ({statusFilter.length})
        </Button>
      )}
    </div>
  )
}