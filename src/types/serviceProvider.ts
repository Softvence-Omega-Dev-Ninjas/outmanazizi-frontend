export interface ServiceProvider {
  id: string
  userId: string
  user: {
    id: string
    email: string
    name: string
    phone: string
    picture?: string
    address?: string
    isActive: boolean
    isBlocked: boolean
    isEmailVerified: boolean
    provider?: string
    role?: string
    createdAt: string
    updatedAt: string
  }
  address: string
  serviceArea: string[]
  serviceCategories: string[]
  documents?: string
  isProfileCompleted: boolean
  isVerifiedFromAdmin: boolean
  myCurrentRating?: number
  ratingGetFromUsers: number
  createdAt: string
  updatedAt: string
}
