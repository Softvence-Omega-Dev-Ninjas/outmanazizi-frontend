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
  
  getServiceDetails: async (serviceId: string, token: string): Promise<any> => {
    return api.get(`/admin/service-details/${serviceId}`, token)
  },
  
  getAreaDetails: async (areaId: string, token: string): Promise<any> => {
    return api.get(`/admin/area-details/${areaId}`, token)
  },
}