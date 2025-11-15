"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateAreaDialog } from "./_components/CreateAreaDialog";
import { AreasSkeleton } from "./_components/AreasSkeleton";
import { Search, Plus } from "lucide-react";
import { useAreas, useCreateArea } from "@/hooks/useAreas";
import { Area } from "@/types/area";

export default function AreasPage() {
  const { data: areas = [], isLoading } = useAreas();
  const createAreaMutation = useCreateArea();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);

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
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg">{area.area}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Created: {new Date(area.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <CreateAreaDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={(area) => createAreaMutation.mutate({ area })}
      />
    </div>
  );
}
