export interface User {
  id: string
  email: string
  name: string
  phone: string
  role: 'ADMIN' | 'CONSUMER' | 'SERVICE_PROVIDER' | 'SUPER_ADMIN'
  isActive: boolean
  isDeleted: boolean
  isBlocked: boolean
  isEmailVerified: boolean
  picture?: string
  address?: string
  provider?: string
  createdAt: string
  updatedAt: string
}
