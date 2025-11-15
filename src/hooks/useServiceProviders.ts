import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/userService'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export function useServiceProviders() {
  const { token } = useAuth()

  return useQuery({
    queryKey: ['service-providers'],
    queryFn: async () => {
      if (!token) throw new Error('No token')
      const response = await userService.getAllUsers(token)
      
      // Filter only SERVICE_PROVIDER role users with serviceProvider data and not deleted
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

export function useBlockServiceProvider() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!token) throw new Error('No token')
      return userService.blockUser(userId, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-providers'] })
      toast.success('Service provider status updated successfully')
    },
    onError: () => {
      toast.error('Failed to update service provider status')
    },
  })
}

export function useDeleteServiceProvider() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!token) throw new Error('No token')
      return userService.deleteUser(userId, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-providers'] })
      toast.success('Service provider deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete service provider')
    },
  })
}

export function useVerifyServiceProvider() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!token) throw new Error('No token')
      return userService.verifyServiceProvider(userId, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-providers'] })
      toast.success('Service provider verified successfully')
    },
    onError: () => {
      toast.error('Failed to verify service provider')
    },
  })
}
