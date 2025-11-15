import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Star } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export function RecentReviews() {
  const reviews = [
    {
      id: 'rev1',
      customer: 'John Doe',
      provider: 'Alex Thompson',
      rating: 5,
      comment: 'Excellent service! Very professional.',
      time: '2024-11-08T11:00:00Z',
    },
    {
      id: 'rev2',
      customer: 'Jane Smith',
      provider: 'Maria Garcia',
      rating: 4,
      comment: 'Good work, took a bit longer.',
      time: '2024-11-08T09:15:00Z',
    },
    {
      id: 'rev3',
      customer: 'Mike Johnson',
      provider: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing! Highly recommend!',
      time: '2024-11-07T18:30:00Z',
    },
    {
      id: 'rev4',
      customer: 'Sarah Williams',
      provider: 'John Smith',
      rating: 3,
      comment: 'Decent work overall.',
      time: '2024-11-07T15:45:00Z',
    },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="pb-4 border-b last:border-0 last:pb-0">
            <div className="flex items-start gap-3">
              <Avatar className="size-10">
                <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{review.customer}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">to {review.provider}</p>
                <p className="text-sm text-muted-foreground mt-1 italic">"{review.comment}"</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(review.time), { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
