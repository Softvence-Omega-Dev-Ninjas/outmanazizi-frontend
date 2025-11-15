export interface SubService {
  id: string
  serviceId: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  subServices: SubService[]
}
