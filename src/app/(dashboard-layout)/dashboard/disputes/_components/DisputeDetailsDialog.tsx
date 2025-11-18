"use client";

import { Dispute } from "@/types/dispute";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  User,
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Image,
  Shield,
} from "lucide-react";

interface DisputeDetailsDialogProps {
  dispute: Dispute | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DisputeDetailsDialog({
  dispute,
  open,
  onOpenChange,
}: DisputeDetailsDialogProps) {
  if (!dispute) return null;

  console.log("Dispute Details:", dispute);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dispute Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="size-5 text-red-500" />
              <h3 className="text-xl font-semibold">
                Dispute #{dispute.id.slice(0, 8)}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Service ID: {dispute.serviceid}
            </p>
            <div className="flex gap-2 mt-2">
              {dispute.isSolved ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="mr-1 size-3" />
                  Resolved
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  <AlertTriangle className="mr-1 size-3" />
                  Pending Resolution
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <User className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Raised By</p>
                <p className="text-sm text-muted-foreground">
                  ID: {dispute.userId}
                </p>
                <p className="text-sm text-muted-foreground">
                  Name: {dispute.user?.name || "Unknown User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {dispute.user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Against</p>
                <p className="text-sm text-muted-foreground">
                  ID: {dispute.againstId}
                </p>
                <p className="text-sm text-muted-foreground">
                  Name: {dispute.against?.name || "Unknown User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {dispute.against?.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(dispute.createdAt), "PPP")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(dispute.updatedAt), "PPP")}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FileText className="size-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Dispute Details</p>
                <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">{dispute.details}</p>
                </div>
              </div>
            </div>
          </div>

          {dispute.pictures && dispute.pictures.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Image className="size-5 text-muted-foreground" />
                  <h4 className="font-medium">
                    Evidence ({dispute.pictures.length})
                  </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {dispute.pictures.map((picture, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={picture}
                        alt={`Evidence ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <p className="text-white text-xs">View Full Size</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {dispute.service && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium">Related Service</h4>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">
                    {dispute.service.serviceName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {dispute.service.description}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
