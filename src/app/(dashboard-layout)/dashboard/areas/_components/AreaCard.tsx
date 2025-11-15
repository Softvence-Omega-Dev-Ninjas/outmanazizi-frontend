'use client'

import { Area } from '@/types/area'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, MapPin } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface AreaCardProps {
  area: Area
  onEdit: (area: Area) => void
  onDelete: (areaId: string) => void
}

export function AreaCard({ area, onEdit, onDelete }: AreaCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MapPin className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{area.area}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Created {formatDistanceToNow(new Date(area.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(area)}>
            <Edit className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(area.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
