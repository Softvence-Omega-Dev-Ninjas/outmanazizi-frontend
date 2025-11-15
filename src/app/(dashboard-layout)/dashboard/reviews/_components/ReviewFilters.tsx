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

interface ReviewFiltersProps {
  ratingFilter: number[]
  onRatingChange: (ratings: number[]) => void
  onReset: () => void
}

export function ReviewFilters({ ratingFilter, onRatingChange, onReset }: ReviewFiltersProps) {
  const hasFilters = ratingFilter.length > 0

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 size-4" />
            Rating
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Filter by Rating</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[5, 4, 3, 2, 1].map((rating) => (
            <DropdownMenuCheckboxItem
              key={rating}
              checked={ratingFilter.includes(rating)}
              onCheckedChange={(checked) => {
                onRatingChange(
                  checked
                    ? [...ratingFilter, rating]
                    : ratingFilter.filter((r) => r !== rating)
                )
              }}
            >
              {rating} Star{rating !== 1 ? 's' : ''}
            </DropdownMenuCheckboxItem>
          ))}
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
