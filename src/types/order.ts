export interface Order {
  id: string
  userId: string
  title: string
  serviceName: string
  subServices: string
  description: string
  location: string
  budget: string
  startTime: string
  endTime: string
  toolsNeed: boolean
  file: string[]
  isCompletedFromServiceProvider: boolean
  isCompleteFromConsumer: boolean
  isCompletedFromAdmin: boolean
  isDeleteRequestToAdmin: boolean
  isDeleted: boolean
  assignedServiceProviderId: string | null
  createdAt: string
  updatedAt: string
  bids: Bid[]
}

export interface Bid {
  id: string
  serviceId: string
  serviceProviderId: string
  amount: number
  description: string
  status: string
  createdAt: string
  updatedAt: string
}
