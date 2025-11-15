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

export function useDeleteService() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (serviceId: string) => {
      if (!token) throw new Error('No token')
      return serviceService.deleteService(serviceId, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('Service deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete service')
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
