import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { reviewService } from '@/services/reviewService'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export function useReviews() {
  const { token } = useAuth()

  return useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      if (!token) throw new Error('No token')
      const response = await reviewService.getAllReviews(token)
      return response.data || []
    },
    enabled: !!token,
  })
}

export function useDeleteReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (reviewId: string) => {
      // TODO: Add delete API endpoint when available
      console.log('Delete review:', reviewId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      toast.success('Review deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete review')
    },
  })
}
