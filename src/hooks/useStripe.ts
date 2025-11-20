import { useQuery } from '@tanstack/react-query'
import { stripeService } from '@/services/stripeService'
import { useAuth } from '@/context/AuthContext'

export function useStripeInfo() {
  const { token } = useAuth()

  return useQuery({
    queryKey: ['stripe-info'],
    queryFn: async () => {
      if (!token) throw new Error('No token')
      const response = await stripeService.getStripeInfo(token)
      return response
    },
    enabled: !!token,
  })
}
