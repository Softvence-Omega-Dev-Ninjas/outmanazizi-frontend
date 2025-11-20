import { api } from '@/lib/api'

export const stripeService = {
  getStripeInfo: async (token: string): Promise<any> => {
    return api.get('/stripe/admin/stripe-info', token)
  },
}
