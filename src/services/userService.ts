import { api } from '@/lib/api'
import { User } from '@/types/user'

export const userService = {
  getAllUsers: async (token: string): Promise<any> => {
    return api.get('/admin', token)
  },

  blockUser: async (userId: string, token: string) => {
    return api.patch(`/admin/blocked/${userId}`, {}, token)
  },

  unblockUser: async (userId: string, token: string) => {
    return api.patch(`/admin/blocked/${userId}`, {}, token)
  },

  deleteUser: async (userId: string, token: string) => {
    return api.patch(`/admin/delete/${userId}`, {}, token)
  },

  verifyServiceProvider: async (userId: string, token: string) => {
    return api.patch(`/admin/verify-service-provider/${userId}`, {}, token)
  },
}
