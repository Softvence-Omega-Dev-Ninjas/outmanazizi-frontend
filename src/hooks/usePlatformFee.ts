import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { platformFeeService } from '@/services/platformFeeService'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export const usePlatformFee = () => {
  const queryClient = useQueryClient()
  const { token } = useAuth()

  const { data, isLoading, error } = useQuery({
    queryKey: ['platformFee'],
    queryFn: async () => {
      const response = await platformFeeService.get(token!)
      return response.data?.[0] || null
    },
    enabled: !!token,
  })

  const createMutation = useMutation({
    mutationFn: (amount: number) => platformFeeService.create(amount, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platformFee'] })
      toast.success('Platform fee created successfully')
    },
    onError: () => {
      toast.error('Failed to create platform fee')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, fee }: { id: string; fee: number }) =>
      platformFeeService.update(id, fee, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platformFee'] })
      toast.success('Platform fee updated successfully')
    },
    onError: () => {
      toast.error('Failed to update platform fee')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => platformFeeService.delete(id, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platformFee'] })
      toast.success('Platform fee deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete platform fee')
    },
  })

  return {
    platformFee: data,
    isLoading,
    error,
    createPlatformFee: createMutation.mutate,
    updatePlatformFee: updateMutation.mutate,
    deletePlatformFee: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
