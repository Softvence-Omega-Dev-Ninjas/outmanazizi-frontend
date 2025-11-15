import { Card } from '@/components/ui/card'
import { Star, MessageSquare, TrendingUp } from 'lucide-react'

interface ReviewStatsProps {
  totalReviews: number
  averageRating: string
  fiveStarCount: number
}

export function ReviewStats({ totalReviews, averageRating, fiveStarCount }: ReviewStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <MessageSquare className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
            <p className="text-2xl font-bold">{totalReviews}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
            <Star className="size-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
            <p className="text-2xl font-bold">{averageRating}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <TrendingUp className="size-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">5-Star Reviews</p>
            <p className="text-2xl font-bold">{fiveStarCount}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
