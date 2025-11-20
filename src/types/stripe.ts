export interface StripeInfo {
  account: {
    id: string
    email: string
  }
  balance: {
    available: number
    pending: number
  }
  recentPaymentsIntents: PaymentIntent[]
  recentTransfers: Transfer[]
  accountsList: ConnectedAccount[]
}

export interface PaymentIntent {
  id: string
  amount: number
}

export interface Transfer {
  id: string
  amount: number
  destination: string
}

export interface ConnectedAccount {
  id: string
  userId: string
}
