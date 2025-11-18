import { api } from '@/lib/api'

export const disputeService = {
  getAllDisputes: async (token: string): Promise<any> => {
    return api.get('/dispute', token)
  },
  
  getDisputeById: async (id: string, token: string): Promise<any> => {
    return api.get(`/dispute/${id}`, token)
  },
  
  resolveDispute: async (id: string, token: string): Promise<any> => {
    return api.patch(`/dispute/resolve/${id}`, {}, token)
  },
  
  deleteDispute: async (id: string, token: string): Promise<any> => {
    return api.delete(`/dispute/${id}`, token)
  },
}