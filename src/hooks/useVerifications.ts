import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/userService'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export function useVerifications() {
  const { token } = useAuth()

  return useQuery({
    queryKey: ['verifications'],
    queryFn: async () => {
      if (!token) throw new Error('No token')
      const response = await userService.getAllUsers(token)
      
      const serviceProviders = response.data
        .filter(
          (user: any) =>
            user.role === 'SERVICE_PROVIDER' && user.serviceProvider && !user.isDeleted
        )
        .map((user: any) => ({
          ...user.serviceProvider,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            picture: user.picture,
            address: user.address,
            isActive: user.isActive,
            isBlocked: user.isBlocked,
            isEmailVerified: user.isEmailVerified,
            provider: user.provider,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        }))
      
      return serviceProviders
    },
    enabled: !!token,
  })
}

export function useRejectProvider() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!token) throw new Error('No token')
      return userService.blockUser(userId, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] })
      toast.success('Provider rejected successfully')
    },
    onError: () => {
      toast.error('Failed to reject provider')
    },
  })
}

export function useApproveProvider() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!token) throw new Error('No token')
      return userService.verifyServiceProvider(userId, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] })
      toast.success('Provider approved successfully')
    },
    onError: () => {
      toast.error('Failed to approve provider')
    },
  })
}
