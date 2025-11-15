export interface Transfer {
  id: string
  orderId: string
  orderTitle: string
  serviceProviderName: string
  serviceProviderEmail: string
  amount: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  paymentMethod: string
  transactionId?: string
  createdAt: string
  updatedAt: string
  completedAt?: string
}
