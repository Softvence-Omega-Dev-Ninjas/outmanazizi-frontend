import { api } from '@/lib/api'

export const reviewService = {
  getAllReviews: async (token: string): Promise<any> => {
    return api.get('/review/all-reviews', token)
  },
}
