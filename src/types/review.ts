export interface Review {
  id: string
  rating: number
  comment?: string
  serviceId?: string
  serviceTitle?: string
  fromReviewId: string
  fromReviewName: string
  fromReviewEmail: string
  toReviewId: string
  toReviewName: string
  toReviewEmail: string
  createdAt: string
  updatedAt: string
}
