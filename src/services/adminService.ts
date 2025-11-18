import { api } from '@/lib/api'

export const adminService = {
  changeUserRole: async (userId: string, role: string, token: string): Promise<any> => {
    return api.patch(`/admin/change-role/${userId}/${role}`, {}, token)
  },
  
  verifyServiceProvider: async (userId: string, token: string): Promise<any> => {
    return api.patch(`/admin/verify-service-provider/${userId}`, {}, token)
  },
  
  blockUser: async (userId: string, token: string): Promise<any> => {
    return api.patch(`/admin/blocked/${userId}`, {}, token)
  },
  
  deleteUser: async (userId: string, token: string): Promise<any> => {
    return api.patch(`/admin/delete/${userId}`, {}, token)
  },
}