"use client";

import { useState } from "react";
import { ServiceProvider } from "@/types/serviceProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MoreHorizontal,
  Ban,
  CheckCircle,
  Trash2,
  Eye,
  ShieldCheck,
  ShieldX,
  UserCog,
} from "lucide-react";
import { ProviderDetailsDialog } from "./ProviderDetailsDialog";

interface ProviderActionsProps {
  provider: ServiceProvider;
  onBlock: (userId: string) => void;
  onUnblock: (userId: string) => void;
  onVerify: (providerId: string) => void;
  onUnverify: (providerId: string) => void;
  onDelete: (userId: string) => void;
  onRoleChange: (provider: ServiceProvider) => void;
}

export function ProviderActions({
  provider,
  onBlock,
  onUnblock,
  onVerify,
  onUnverify,
  onDelete,
  onRoleChange,
}: ProviderActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBlock = async () => {
    setLoading(true);
    await onBlock(provider.userId);
    setLoading(false);
  };

  const handleUnblock = async () => {
    setLoading(true);
    await onUnblock(provider.userId);
    setLoading(false);
  };

  const handleVerify = async () => {
    setLoading(true);
    await onVerify(provider.id);
    setLoading(false);
  };

  const handleUnverify = async () => {
    setLoading(true);
    await onUnverify(provider.id);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await onDelete(provider.userId);
    setShowDeleteDialog(false);
    setLoading(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDetailsDialog(true)}>
            <Eye className="mr-2 size-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRoleChange(provider)}>
            <UserCog className="mr-2 size-4" />
            Change Role
          </DropdownMenuItem>
          {/* {provider.isVerifiedFromAdmin ? (
            <DropdownMenuItem onClick={handleUnverify} disabled={loading}>
              <ShieldX className="mr-2 size-4" />
              Unverify Provider
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={handleVerify} disabled={loading}>
              <ShieldCheck className="mr-2 size-4" />
              Verify Provider
            </DropdownMenuItem>
          )} */}
          <DropdownMenuSeparator />
          {provider.user.isBlocked ? (
            <DropdownMenuItem onClick={handleUnblock} disabled={loading}>
              <CheckCircle className="mr-2 size-4" />
              Unblock User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={handleBlock} disabled={loading}>
              <Ban className="mr-2 size-4" />
              Block User
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 size-4" />
            Delete Provider
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service Provider</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {provider.user.name}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ProviderDetailsDialog
        provider={provider}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
      />
    </>
  );
}
