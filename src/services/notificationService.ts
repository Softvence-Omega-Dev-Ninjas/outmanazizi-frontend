import { api } from '@/lib/api'

export const notificationService = {
  getMyNotifications: async (token: string): Promise<any> => {
    return api.get('/consumer/my-notifications', token)
  },
}
