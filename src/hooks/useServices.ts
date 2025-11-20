import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { serviceService } from '@/services/serviceService'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export function useServices() {
  const { token } = useAuth()

  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      if (!token) throw new Error('No token')
      const response = await serviceService.getAllServices(token)
      return response.data.services || []
    },
    enabled: !!token,
  })
}

export function useCreateService() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { name: string }) => {
      if (!token) throw new Error('No token')
      return serviceService.createService(data, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('Service created successfully')
    },
    onError: () => {
      toast.error('Failed to create service')
    },
  })
}

export function useUpdateService() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ serviceId, name }: { serviceId: string; name: string }) => {
      if (!token) throw new Error('No token')
      return serviceService.updateService(serviceId, { name }, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('Service updated successfully')
    },
    onError: () => {
      toast.error('Failed to update service')
    },
  })
}

export function useCreateSubService() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { serviceId: string; name: string }) => {
      if (!token) throw new Error('No token')
      return serviceService.createSubService(data, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('Sub-service created successfully')
    },
    onError: () => {
      toast.error('Failed to create sub-service')
    },
  })
}

export function useDeleteSubService() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (subServiceId: string) => {
      if (!token) throw new Error('No token')
      return serviceService.deleteSubService(subServiceId, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('Sub-service deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete sub-service')
    },
  })
}
