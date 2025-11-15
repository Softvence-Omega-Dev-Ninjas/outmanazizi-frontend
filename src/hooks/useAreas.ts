import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { areaService } from '@/services/areaService'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export function useAreas() {
  const { token } = useAuth()

  return useQuery({
    queryKey: ['areas'],
    queryFn: async () => {
      if (!token) throw new Error('No token')
      const response = await areaService.getAllAreas(token)
      return response.data.area || []
    },
    enabled: !!token,
  })
}

export function useCreateArea() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { area: string }) => {
      if (!token) throw new Error('No token')
      return areaService.createArea(data, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] })
      toast.success('Area created successfully')
    },
    onError: () => {
      toast.error('Failed to create area')
    },
  })
}
