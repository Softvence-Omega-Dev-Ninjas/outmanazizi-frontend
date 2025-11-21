import { useQuery } from '@tanstack/react-query'
import { notificationService } from '@/services/notificationService'
import { useAuth } from '@/context/AuthContext'

export function useNotifications() {
  const { token } = useAuth()

  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      if (!token) throw new Error('No token')
      const response = await notificationService.getMyNotifications(token)
      return response.data || []
    },
    enabled: !!token,
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}
