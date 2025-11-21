'use client'

import { useServiceDetails } from '@/hooks/useAdmin'
import { Badge } from '@/components/ui/badge'

interface ServiceCategoryNameProps {
  serviceId: string
}

export function ServiceCategoryName({ serviceId }: ServiceCategoryNameProps) {
  const { data: service, isLoading } = useServiceDetails(serviceId)

  if (isLoading) {
    return <Badge variant="outline" className="text-xs">Loading...</Badge>
  }

  if (!service) {
    return <Badge variant="outline" className="text-xs">{serviceId.slice(0, 8)}...</Badge>
  }

  return <Badge variant="outline" className="text-xs">{service.name}</Badge>
}