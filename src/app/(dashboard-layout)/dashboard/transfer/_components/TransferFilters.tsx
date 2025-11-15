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

interface TransferFiltersProps {
  statusFilter: string[]
  onStatusChange: (status: string[]) => void
  onReset: () => void
}

export function TransferFilters({ statusFilter, onStatusChange, onReset }: TransferFiltersProps) {
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
            checked={statusFilter.includes('processing')}
            onCheckedChange={(checked) => {
              onStatusChange(
                checked
                  ? [...statusFilter, 'processing']
                  : statusFilter.filter((s) => s !== 'processing')
              )
            }}
          >
            Processing
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes('completed')}
            onCheckedChange={(checked) => {
              onStatusChange(
                checked
                  ? [...statusFilter, 'completed']
                  : statusFilter.filter((s) => s !== 'completed')
              )
            }}
          >
            Completed
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes('failed')}
            onCheckedChange={(checked) => {
              onStatusChange(
                checked
                  ? [...statusFilter, 'failed']
                  : statusFilter.filter((s) => s !== 'failed')
              )
            }}
          >
            Failed
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
