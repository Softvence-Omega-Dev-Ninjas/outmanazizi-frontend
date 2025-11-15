"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { ReviewCard } from "./_components/ReviewCard";
import { ReviewStats } from "./_components/ReviewStats";
import { ReviewFilters } from "./_components/ReviewFilters";
import { Search } from "lucide-react";
import { useReviews, useDeleteReview } from "@/hooks/useReviews";
import { Review } from "@/types/review";

export default function ReviewsPage() {
  const { data: reviews = [], isLoading } = useReviews();
  const deleteReviewMutation = useDeleteReview();
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number[]>([]);

  const stats = useMemo(() => {
    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? (
            reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) /
            totalReviews
          ).toFixed(1)
        : "0.0";
    const fiveStarCount = reviews.filter((r: Review) => r.rating === 5).length;
    return { totalReviews, averageRating, fiveStarCount };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    let filtered = reviews;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (review: Review) =>
          review.fromReviewName.toLowerCase().includes(query) ||
          review.toReviewName.toLowerCase().includes(query) ||
          review.fromReviewEmail.toLowerCase().includes(query) ||
          review.toReviewEmail.toLowerCase().includes(query) ||
          review.serviceTitle?.toLowerCase().includes(query) ||
          review.comment?.toLowerCase().includes(query)
      );
    }

    // Rating filter
    if (ratingFilter.length > 0) {
      filtered = filtered.filter((review: Review) =>
        ratingFilter.includes(review.rating)
      );
    }

    return filtered;
  }, [reviews, searchQuery, ratingFilter]);

  const handleDelete = (reviewId: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteReviewMutation.mutate(reviewId);
    }
  };

  const handleResetFilters = () => {
    setRatingFilter([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reviews</h1>
        <p className="text-muted-foreground">
          Manage all platform reviews and ratings
        </p>
      </div>

      <ReviewStats
        totalReviews={stats.totalReviews}
        averageRating={stats.averageRating}
        fiveStarCount={stats.fiveStarCount}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <ReviewFilters
          ratingFilter={ratingFilter}
          onRatingChange={setRatingFilter}
          onReset={handleResetFilters}
        />
      </div>

      {isLoading ? (
        <div className="border rounded-lg p-8 text-center">
          <div className="inline-block size-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          <p className="mt-4 text-muted-foreground">Loading reviews...</p>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">
            {searchQuery || ratingFilter.length > 0
              ? "No reviews found"
              : "No reviews yet"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((review: Review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
