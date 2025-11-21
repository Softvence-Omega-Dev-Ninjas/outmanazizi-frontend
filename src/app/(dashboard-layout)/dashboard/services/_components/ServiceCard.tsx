"use client";

import { Service } from "@/types/service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (serviceId: string) => void;
  onAddSubService: (serviceId: string) => void;
  onEditSubService: (serviceId: string, subServiceId: string) => void;
  onDeleteSubService: (serviceId: string, subServiceId: string) => void;
}

export function ServiceCard({
  service,
  onEdit,
  onDelete,
  onAddSubService,
  onEditSubService,
  onDeleteSubService,
}: ServiceCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{service.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {service.subServices.length} sub-service
              {service.subServices.length !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Created{" "}
              {formatDistanceToNow(new Date(service.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(service)}
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <Edit className="size-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Sub-Services</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddSubService(service.id)}
              className="h-7 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-500 border"
            >
              <Plus className="size-3 mr-1" />
              Add Sub Service
            </Button>
          </div>
          {service.subServices.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {service.subServices.map((sub) => (
                <Badge
                  key={sub.id}
                  variant="secondary"
                  className="group cursor-pointer hover:bg-secondary/80 bg-purple-100 text-purple-700 border-purple-200"
                >
                  {sub.name}
                  <button
                    onClick={() => onDeleteSubService(service.id, sub.id)}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No sub-services yet</p>
          )}
        </div>
      </div>
    </Card>
  );
}
