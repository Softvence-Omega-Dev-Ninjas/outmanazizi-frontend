'use client'

import { useAreaDetails } from '@/hooks/useAdmin'

interface AreaNameProps {
  areaId: string
}

export function AreaName({ areaId }: AreaNameProps) {
  const { data: area, isLoading } = useAreaDetails(areaId)

  if (isLoading) {
    return <span className="text-xs text-muted-foreground">Loading...</span>
  }

  if (!area) {
    return <span className="text-xs text-muted-foreground">{areaId.slice(0, 8)}...</span>
  }

  return <span className="text-xs text-muted-foreground">{area.area}</span>
}