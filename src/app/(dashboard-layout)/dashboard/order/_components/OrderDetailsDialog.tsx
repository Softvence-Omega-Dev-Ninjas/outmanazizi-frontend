"use client";

import { Order } from "@/types/order";
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
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  Wrench,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface OrderDetailsDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
}: OrderDetailsDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">{order.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Order ID: {order.id}
            </p>
            <div className="flex gap-2 mt-2">
              {order.isCompletedFromAdmin && (
                <Badge className="bg-green-500">Completed</Badge>
              )}
              {order.isDeleteRequestToAdmin && (
                <Badge variant="destructive">Delete Request</Badge>
              )}
              {order.assignedServiceProviderId &&
                !order.isCompletedFromAdmin && (
                  <Badge className="bg-blue-500">In Progress</Badge>
                )}
              {!order.assignedServiceProviderId &&
                !order.isCompletedFromAdmin && (
                  <Badge variant="outline">Pending</Badge>
                )}
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <User className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Customer</p>
                <p className="text-sm text-muted-foreground">
                  User ID: {order.userId}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Service</p>
                <p className="text-sm text-muted-foreground">
                  {order.serviceName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {order.subServices}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {order.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Budget</p>
                <p className="text-sm text-muted-foreground">${order.budget}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Start Time</p>
                <p className="text-sm text-muted-foreground">
                  {order.startTime}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">End Time</p>
                <p className="text-sm text-muted-foreground">{order.endTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Wrench className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Tools Required</p>
                <p className="text-sm text-muted-foreground">
                  {order.toolsNeed ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(order.createdAt), "PPP")}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FileText className="size-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {order.description}
                </p>
              </div>
            </div>
          </div>

          {order.assignedServiceProviderId && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium">Assigned Provider</h4>
                <p className="text-sm text-muted-foreground">
                  Provider ID: {order.assignedServiceProviderId}
                </p>
              </div>
            </>
          )}

          {order.file.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium">Attachments</h4>
                <div className="flex flex-wrap gap-2">
                  {order.file.map((file, idx) => (
                    <Badge key={idx} variant="outline">
                      File {idx + 1}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Completion Status</h4>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                {order.isCompletedFromServiceProvider ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">Provider</span>
              </div>
              <div className="flex items-center gap-2">
                {order.isCompleteFromConsumer ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">Consumer</span>
              </div>
              <div className="flex items-center gap-2">
                {order.isCompletedFromAdmin ? (
                  <CheckCircle className="size-4 text-green-500" />
                ) : (
                  <XCircle className="size-4 text-muted-foreground" />
                )}
                <span className="text-sm">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
