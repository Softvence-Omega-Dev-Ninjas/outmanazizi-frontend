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
    picture: string | null
  }
  against?: {
    id: string
    name: string
    email: string
    phone: string
    picture: string | null
  }
  service?: {
    id: string
    serviceName: string
    description: string
  }
}