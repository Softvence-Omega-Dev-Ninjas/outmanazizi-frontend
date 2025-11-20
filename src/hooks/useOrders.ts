import { useQuery } from '@tanstack/react-query'
import { orderService } from '@/services/orderService'
import { useAuth } from '@/context/AuthContext'

export function useOrders() {
  const { token } = useAuth()

  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!token) throw new Error('No token')
      const response = await orderService.getAllOrders(token)
      return response.data || []
    },
    enabled: !!token,
  })
}

export function useOrderDetails(orderId: string | null) {
  const { token } = useAuth()

  return useQuery({
    queryKey: ['order-details', orderId],
    queryFn: async () => {
      if (!token || !orderId) throw new Error('No token or orderId')
      const response = await orderService.getOrderDetails(orderId, token)
      return response.data
    },
    enabled: !!token && !!orderId,
  })
}