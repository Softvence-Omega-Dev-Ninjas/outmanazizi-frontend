import { api } from '@/lib/api'
import { PlatformFee } from '@/types/platformFee'

export const platformFeeService = {
  create: async (amount: number, token: string): Promise<any> => {
    return api.post(`/admin/create-platform-fee/${amount}`, {}, token)
  },

  get: async (token: string): Promise<any> => {
    return api.get('/admin/get-platform-fee', token)
  },

  update: async (id: string, fee: number, token: string): Promise<any> => {
    return api.patch(`/admin/update-platform-fee/${id}/${fee}`, {}, token)
  },

  delete: async (id: string, token: string): Promise<void> => {
    return api.delete(`/admin/delete-platform-fee/${id}`, token)
  },
}
