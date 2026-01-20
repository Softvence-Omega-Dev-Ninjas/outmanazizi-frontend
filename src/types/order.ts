export interface Order {
  id: string
  serviceProviderId: string
  consumerId: string
  paymentIntentId: string
  bidId: string
  status: string
  createdAt: string
  updatedAt: string
  isCompletedFromProvider: boolean
  isCompletedFromConsumer: boolean
}

export interface OrderDetails extends Order {
  bid: {
    id: string
    serviceId: string
    serviceProviderId: string
    price: string
    consumerId: string
    serviceProviderProposal: string
    status: string
    createdAt: string
    updatedAt: string
    serviceProvider: {
      id: string
      userId: string
      address: string
      myCurrentRating: number
      ratingGetFromUsers: number
      user: {
        id: string
        email: string
        name: string
        phone: string
        picture: string | null
      }
    }
    service: {
      id: string
      userId: string
      serviceName: string
      title: string
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
    }
  }
  consumer: {
    id: string
    email: string
    name: string
    phone: string
    picture: string | null
  }
}
