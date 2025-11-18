export interface Dispute {
  id: string
  serviceid: string
  userId: string
  againstId: string
  details: string
  isSolved: boolean
  pictures: string[]
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    name: string
    email: string
    phone: string
    picture: string
  }
  against?: {
    id: string
    name: string
    email: string
    phone: string
    picture: string
  }
  service?: {
    id: string
    serviceName: string
    description: string
  }
}