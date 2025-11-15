import { api } from '@/lib/api'

export const areaService = {
  getAllAreas: async (token: string): Promise<any> => {
    return api.get('/admin/all-area-and-services', token)
  },

  createArea: async (data: { area: string }, token: string) => {
    return api.post('/admin/create-area', data, token)
  },
}
