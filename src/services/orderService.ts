import { api } from '@/lib/api'

export const orderService = {
  getAllOrders: async (token: string): Promise<any> => {
    return api.get('/job', token)
  },
  
  getOrderById: async (id: string, token: string): Promise<any> => {
    return api.get(`/job/${id}`, token)
  },
  
  updateOrder: async (id: string, data: any, token: string): Promise<any> => {
    return api.patch(`/job/${id}`, data, token)
  },
  
  deleteOrder: async (id: string, token: string): Promise<any> => {
    return api.delete(`/job/${id}`, token)
  },
}
