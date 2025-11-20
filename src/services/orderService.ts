import { api } from '@/lib/api'

export const orderService = {
  getAllOrders: async (token: string): Promise<any> => {
    return api.get('/admin/all-orders', token)
  },

  getOrderDetails: async (orderId: string, token: string): Promise<any> => {
    return api.get(`/admin/order-details/${orderId}`, token)
  },
}
