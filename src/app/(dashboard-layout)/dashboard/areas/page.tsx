"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateAreaDialog } from "./_components/CreateAreaDialog";
import { UpdateAreaDialog } from "./_components/UpdateAreaDialog";
import { DeleteAreaDialog } from "./_components/DeleteAreaDialog";
import { AreasSkeleton } from "./_components/AreasSkeleton";
import { Search, Plus, Pencil, Trash2, MapPin, Calendar } from "lucide-react";
import { useAreas, useCreateArea, useUpdateArea, useDeleteArea } from "@/hooks/useAreas";
import { Area } from "@/types/area";

export default function AreasPage() {
  const { data: areas = [], isLoading } = useAreas();
  const createAreaMutation = useCreateArea();
  const updateAreaMutation = useUpdateArea();
  const deleteAreaMutation = useDeleteArea();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  const filteredAreas = areas.filter((area: Area) =>
    area?.area?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Areas</h1>
          <p className="text-muted-foreground">
            Manage service areas ({areas.length} total)
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 size-4" />
          Add Area
        </Button>
      </div>

      {/* <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search areas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div> */}

      {isLoading ? (
        <AreasSkeleton />
      ) : filteredAreas.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">
            {searchQuery ? "No areas found" : "No areas available"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAreas.map((area: Area) => (
            <div
              key={area.id}
              className="group relative border rounded-xl p-5 hover:shadow-lg hover:border-primary/50 transition-all duration-200 bg-card"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="size-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{area.area}</h3>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-primary/10 hover:text-primary"
                    onClick={() => {
                      setSelectedArea(area);
                      setShowUpdateDialog(true);
                    }}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    onClick={() => {
                      setSelectedArea(area);
                      setShowDeleteDialog(true);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="size-3.5" />
                <span>{new Date(area.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateAreaDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={(area) => createAreaMutation.mutate({ area })}
      />

      <UpdateAreaDialog
        open={showUpdateDialog}
        onOpenChange={setShowUpdateDialog}
        onSubmit={(locationId, area) => updateAreaMutation.mutate({ locationId, area })}
        area={selectedArea}
      />

      <DeleteAreaDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={(locationId) => deleteAreaMutation.mutate(locationId)}
        area={selectedArea}
      />
    </div>
  );
}
