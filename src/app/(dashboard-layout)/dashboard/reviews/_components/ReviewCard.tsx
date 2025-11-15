'use client'

import { Review } from '@/types/review'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Trash2, ArrowRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ReviewCardProps {
  review: Review
  onDelete: (reviewId: string) => void
}

export function ReviewCard({ review, onDelete }: ReviewCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-5 ${
                  i < review.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
            <span className="font-semibold text-lg ml-2">{review.rating}.0</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(review.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        {review.comment && (
          <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
        )}

        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback>{review.fromReviewName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">{review.fromReviewName}</p>
            <p className="text-xs text-muted-foreground">{review.fromReviewEmail}</p>
          </div>
          <ArrowRight className="size-4 text-muted-foreground" />
          <Avatar className="size-10">
            <AvatarFallback>{review.toReviewName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">{review.toReviewName}</p>
            <p className="text-xs text-muted-foreground">{review.toReviewEmail}</p>
          </div>
        </div>

        {review.serviceTitle && (
          <div>
            <Badge variant="outline">{review.serviceTitle}</Badge>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
        </p>
      </div>
    </Card>
  )
}
