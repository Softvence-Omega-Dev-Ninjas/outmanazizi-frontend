import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminService } from '@/services/adminService'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export function useChangeUserRole() {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      if (!token) throw new Error('No token')
      return adminService.changeUserRole(userId, role, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['service-providers'] })
      toast.success('User role changed successfully')
    },
    onError: () => {
      toast.error('Failed to change user role')
    },
  })
}

export function useVerifyServiceProvider() {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!token) throw new Error('No token')
      return adminService.verifyServiceProvider(userId, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-providers'] })
      toast.success('Service provider verification updated')
    },
    onError: () => {
      toast.error('Failed to update verification')
    },
  })
}

export function useBlockUser() {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!token) throw new Error('No token')
      return adminService.blockUser(userId, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['service-providers'] })
      toast.success('User block status updated')
    },
    onError: () => {
      toast.error('Failed to update block status')
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!token) throw new Error('No token')
      return adminService.deleteUser(userId, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['service-providers'] })
      toast.success('User deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete user')
    },
  })
}

export function useServiceDetails(serviceId: string) {
  const { token } = useAuth()

  return useQuery({
    queryKey: ['service-details', serviceId],
    queryFn: async () => {
      if (!token) throw new Error('No token')
      const response = await adminService.getServiceDetails(serviceId, token)
      return response.data
    },
    enabled: !!token && !!serviceId,
  })
}

export function useAreaDetails(areaId: string) {
  const { token } = useAuth()

  return useQuery({
    queryKey: ['area-details', areaId],
    queryFn: async () => {
      if (!token) throw new Error('No token')
      const response = await adminService.getAreaDetails(areaId, token)
      return response.data
    },
    enabled: !!token && !!areaId,
  })
}