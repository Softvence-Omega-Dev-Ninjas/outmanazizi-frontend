"use client";

import { useState, useEffect } from "react";
import { ServiceProvider } from "@/types/serviceProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ServiceCategoryName } from "@/components/admin/ServiceCategoryName";
import { AreaName } from "@/components/admin/AreaName";
import { format } from "date-fns";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Star,
  Briefcase,
  FileText,
  ExternalLink,
  ShieldCheck,
  ShieldX,
  Ban,
  Trash2,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useVerifyServiceProvider,
  useChangeUserStatus,
} from "@/hooks/useServiceProviders";

interface ProviderDetailsDialogProps {
  provider: ServiceProvider;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBlock: (userId: string) => void;
  onUnblock: (userId: string) => void;
  onDelete: (userId: string) => void;
  onRoleChange: (provider: ServiceProvider) => void;
}

export function ProviderDetailsDialog({
  provider,
  open,
  onOpenChange,
  onBlock,
  onUnblock,
  onDelete,
  onRoleChange,
}: ProviderDetailsDialogProps) {
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(provider.isVerifiedFromAdmin);
  const [currentStatus, setCurrentStatus] = useState(provider.status);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const verifyMutation = useVerifyServiceProvider();
  const changeStatusMutation = useChangeUserStatus();

  useEffect(() => {
    setIsVerified(provider.isVerifiedFromAdmin);
    setCurrentStatus(provider.status);
  }, [provider.isVerifiedFromAdmin, provider.status]);

  const handleVerify = async (isVerifying: boolean) => {
    setLoading(true);
    try {
      await verifyMutation.mutateAsync({
        userId: provider.userId,
        isVerifying,
      });
      setIsVerified(!isVerified);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    setLoading(true);
    try {
      await changeStatusMutation.mutateAsync({
        userId: provider.userId,
        status: "APPROVED",
        message: "Service provider approved by admin",
      });
      setCurrentStatus("APPROVED");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectClick = () => {
    setShowRejectDialog(true);
  };

  const handleRejectConfirm = async () => {
    if (!rejectReason.trim()) {
      return;
    }
    setLoading(true);
    try {
      await changeStatusMutation.mutateAsync({
        userId: provider.userId,
        status: "REJECTED",
        message: rejectReason,
      });
      setCurrentStatus("REJECTED");
      setShowRejectDialog(false);
      setRejectReason("");
    } finally {
      setLoading(false);
    }
  };

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

  const handleDelete = async () => {
    setLoading(true);
    await onDelete(provider.userId);
    setShowDeleteDialog(false);
    setLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Service Provider Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="size-20">
                <AvatarImage
                  src={provider.user.picture}
                  alt={provider.user.name}
                />
                <AvatarFallback className="text-2xl">
                  {provider.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{provider.user.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {provider.user.email}
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Badge>SERVICE PROVIDER</Badge>
                  {provider.user.isBlocked && (
                    <Badge variant="destructive">Blocked</Badge>
                  )}
                  {/* {provider.user.isActive && !provider.user.isBlocked && (
                    <Badge className="bg-green-500">Active</Badge>
                  )} */}
                  {/* {isVerified ? (
                    <Badge className="bg-blue-500">Admin Verified</Badge>
                  ) : (
                    <Badge variant="outline">Not Verified</Badge>
                  )} */}
                  {currentStatus === "APPROVED" ? (
                    <Badge className="bg-green-600">Approved</Badge>
                  ) : currentStatus === "PENDING" ? (
                    <Badge className="bg-yellow-500">Pending</Badge>
                  ) : currentStatus === "REJECTED" ? (
                    <Badge variant="destructive">Rejected</Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Actions</h4>
            <div className="grid gap-2 sm:grid-cols-5">
              <Button
                onClick={handleApprove}
                disabled={currentStatus === "APPROVED" || loading}
                className="bg-green-600 hover:bg-green-700 disabled:cursor-not-allowed cursor-pointer"
                size="sm"
              >
                <ShieldCheck className="mr-2 size-4" />
                Approve
              </Button>
              <Button
                onClick={handleRejectClick}
                disabled={currentStatus === "REJECTED" || loading}
                variant="destructive"
                className="disabled:cursor-not-allowed cursor-pointer hover:bg-red-700"
                size="sm"
              >
                <ShieldX className="mr-2 size-4" />
                Reject
              </Button>
              <Button
                onClick={() => onRoleChange(provider)}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                <UserCog className="mr-2 size-4" />
                Change Role
              </Button>
              {provider.user.isBlocked ? (
                <Button
                  onClick={handleUnblock}
                  disabled={loading}
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                >
                  <CheckCircle className="mr-2 size-4" />
                  Unblock User
                </Button>
              ) : (
                <Button
                  onClick={handleBlock}
                  disabled={loading}
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                >
                  <Ban className="mr-2 size-4" />
                  Block User
                </Button>
              )}
              <Button
                onClick={() => setShowDeleteDialog(true)}
                variant="destructive"
                className="sm:col-span-1 cursor-pointer hover:bg-red-700"
                size="sm"
              >
                <Trash2 className=" size-4" />
                Delete Provider
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Mail className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  {provider.user.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">
                  {provider.user.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <MapPin className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">
                  {provider.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Star className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Rating</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`size-4 ${
                          star <= Math.round(provider.myCurrentRating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {provider.myCurrentRating?.toFixed(1) || "0.0"} (
                    {provider.ratingGetFromUsers} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Joined</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(provider.createdAt), "PPP")}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Briefcase className="size-4" />
              Service Information
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-2">Service Categories</p>
                <div className="flex flex-wrap gap-2">
                  {provider.serviceCategories.map((categoryId, idx) => (
                    <ServiceCategoryName key={idx} serviceId={categoryId} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Service Areas</p>
                <div className="space-y-1">
                  {provider.serviceArea.map((areaId, idx) => (
                    <div key={idx} className="inline-block mr-2">
                      <Badge variant="outline">
                        <AreaName areaId={areaId} />
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FileText className="size-4" />
              Submitted Documents
            </h4>
            {provider.documents ? (
              <div className="flex items-center gap-3">
                <p className="text-sm text-muted-foreground">
                  Document available
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(provider.documents, "_blank")}
                >
                  <ExternalLink className="mr-2 size-4" />
                  View
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No documents submitted
              </p>
            )}
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Account Status</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                {provider.user.isEmailVerified ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">Email Verified</span>
              </div>
              {/* <div className="flex items-center gap-2">
                {provider.user.isActive ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">Active</span>
              </div> */}
              <div className="flex items-center gap-2">
                {provider.user.isBlocked ? (
                  <XCircle className="size-4 text-destructive" />
                ) : (
                  <CheckCircle className="size-4 text-green-500" />
                )}
                <span className="text-sm">
                  {provider.user.isBlocked ? "Blocked" : "Not Blocked"}
                </span>
              </div>
              {/* <div className="flex items-center gap-2">
                {isVerified ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">Admin Verified</span>
              </div> */}
              <div className="flex items-center gap-2">
                {provider.isProfileCompleted ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">Profile Completed</span>
              </div>
              <div className="flex items-center gap-2">
                {currentStatus === "APPROVED" ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : currentStatus === "PENDING" ? (
                  <XCircle className="size-4 text-yellow-500" />
                ) : currentStatus === "REJECTED" ? (
                  <XCircle className="size-4 text-destructive" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">
                  {currentStatus === "APPROVED"
                    ? "Approved"
                    : currentStatus === "PENDING"
                      ? "Pending Approval"
                      : currentStatus === "REJECTED"
                        ? "Rejected"
                        : "No Status"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service Provider</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete {provider.user.name}? This action
            cannot be undone.
          </p>
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

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Service Provider</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please provide a reason for rejecting {provider.user.name}
            </p>
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectDialog(false);
                setRejectReason("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectConfirm}
              disabled={!rejectReason.trim() || loading}
            >
              {loading ? "Rejecting..." : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
