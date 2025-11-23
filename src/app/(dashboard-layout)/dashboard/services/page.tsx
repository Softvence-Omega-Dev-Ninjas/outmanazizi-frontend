"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "./_components/ServiceCard";
import { CreateServiceDialog } from "./_components/CreateServiceDialog";
import { EditServiceDialog } from "./_components/EditServiceDialog";
import { CreateSubServiceDialog } from "./_components/CreateSubServiceDialog";
import { ServicesSkeleton } from "./_components/ServicesSkeleton";

import { Search, Plus, ArrowUpDown } from "lucide-react";
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteSubService,
  useCreateSubService,
} from "@/hooks/useServices";
import { Service } from "@/types/service";

export default function ServicesPage() {
  const { data: services = [], isLoading } = useServices();
  const createServiceMutation = useCreateService();
  const updateServiceMutation = useUpdateService();
  const deleteSubServiceMutation = useDeleteSubService();
  const createSubServiceMutation = useCreateSubService();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showSubServiceDialog, setShowSubServiceDialog] = useState(false);

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = services
    .filter((service: Service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a: Service, b: Service) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground">
            Manage service categories and sub-services ({services.length} total)
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 size-4" />
          Add Service
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-blue-500" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border-blue-200 focus:border-blue-400"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="flex items-center gap-2"
        >
          <ArrowUpDown className="size-4" />
          {sortOrder === "desc" ? "Latest First" : "Oldest First"}
        </Button>
      </div>

      {isLoading ? (
        <ServicesSkeleton />
      ) : filteredServices.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">
            {searchQuery ? "No services found" : "No services available"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service: Service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={(service) => {
                setSelectedService(service);
                setShowEditDialog(true);
              }}
              onDelete={() => {}}
              onAddSubService={(serviceId) => {
                setSelectedService(service);
                setShowSubServiceDialog(true);
              }}
              onEditSubService={() => {}}
              onDeleteSubService={(serviceId, subServiceId) => {
                if (
                  confirm("Are you sure you want to delete this sub-service?")
                ) {
                  deleteSubServiceMutation.mutate(subServiceId);
                }
              }}
            />
          ))}
        </div>
      )}

      <CreateServiceDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={(name) => createServiceMutation.mutate({ name })}
      />

      {selectedService && (
        <EditServiceDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          serviceName={selectedService.name}
          onSubmit={(name) => {
            updateServiceMutation.mutate(
              { serviceId: selectedService.id, name },
              {
                onSuccess: () => setShowEditDialog(false)
              }
            );
          }}
        />
      )}

      {selectedService && (
        <>
          <CreateSubServiceDialog
            open={showSubServiceDialog}
            onOpenChange={setShowSubServiceDialog}
            serviceName={selectedService.name}
            onSubmit={(name) =>
              createSubServiceMutation.mutate({
                serviceId: selectedService.id,
                name,
              })
            }
          />
        </>
      )}
    </div>
  );
}
