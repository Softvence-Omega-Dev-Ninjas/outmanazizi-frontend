import { api } from '@/lib/api'

export const orderService = {
  getAllOrders: async (token: string): Promise<any> => {
    return api.get('/job', token)
  },
}
