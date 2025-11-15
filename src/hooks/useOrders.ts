import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService } from '@/services/orderService'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

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

export function useApproveOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (orderId: string) => {
      // TODO: Add approve API endpoint when available
      console.log('Approve order:', orderId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      toast.success('Order approved successfully')
    },
    onError: () => {
      toast.error('Failed to approve order')
    },
  })
}

export function useDeleteOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (orderId: string) => {
      // TODO: Add delete API endpoint when available
      console.log('Delete order:', orderId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      toast.success('Order deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete order')
    },
  })
}
