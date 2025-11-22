"use client";

import { useState } from "react";
import { usePlatformFee } from "@/hooks/usePlatformFee";
import { Pencil, Plus, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

export const PlatformFeeDisplay = () => {
  const {
    platformFee,
    isLoading,
    createPlatformFee,
    updatePlatformFee,
    isUpdating,
  } = usePlatformFee();
  const [showEdit, setShowEdit] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newFee, setNewFee] = useState("");

  const handleUpdate = () => {
    if (platformFee && newFee) {
      updatePlatformFee({ id: platformFee.id, fee: Number(newFee) });
      setEditDialogOpen(false);
      setNewFee("");
    }
  };

  const handleCreate = () => {
    if (newFee) {
      createPlatformFee(Number(newFee));
      setCreateDialogOpen(false);
      setNewFee("");
    }
  };

  if (isLoading) {
    return <Skeleton className="h-10 w-40" />;
  }

  if (!platformFee) {
    return (
      <>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          size="sm"
          className="gap-2"
        >
          <Plus className="size-4" />
          Set Platform Fee
        </Button>

        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Platform Fee</DialogTitle>
              <DialogDescription>
                Set the platform fee percentage
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fee (%)</label>
                <Input
                  type="number"
                  placeholder="Enter fee percentage"
                  value={newFee}
                  onChange={(e) => setNewFee(e.target.value)}
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!newFee}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setShowEdit(true)}
        onMouseLeave={() => setShowEdit(false)}
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-all hover:shadow-md">
          <div className="size-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <DollarSign className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Platform Fee</p>
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
              {platformFee.amount}%
            </p>
          </div>

          {showEdit && (
            <button
              onClick={() => {
                setNewFee(platformFee?.amount?.toString() || "");
                setEditDialogOpen(true);
              }}
              aria-label="Edit platform fee"
              title="Edit platform fee"
              className="ml-auto size-7 rounded-full bg-emerald-100 dark:bg-emerald-900/50 hover:bg-emerald-200 dark:hover:bg-emerald-900 flex items-center justify-center transition-colors"
            >
              <Pencil className="size-3.5 text-emerald-700 dark:text-emerald-400" />
            </button>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Platform Fee</DialogTitle>
            <DialogDescription>
              Change the platform fee percentage
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fee (%)</label>
              <Input
                type="number"
                placeholder="Enter fee percentage"
                value={newFee}
                onChange={(e) => setNewFee(e.target.value)}
                min="0"
                max="100"
                step="0.01"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={!newFee || isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
