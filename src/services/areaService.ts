import { api } from '@/lib/api'

export const areaService = {
  getAllAreas: async (token: string): Promise<any> => {
    return api.get('/admin/all-area-and-services', token)
  },

  createArea: async (data: { area: string }, token: string) => {
    return api.post('/admin/create-area', data, token)
  },

  updateArea: async (locationId: string, data: { area: string }, token: string) => {
    return api.patch(`/admin/update-location/${locationId}`, data, token)
  },

  deleteArea: async (locationId: string, token: string) => {
    return api.delete(`/admin/delete-location/${locationId}`, token)
  },
}
