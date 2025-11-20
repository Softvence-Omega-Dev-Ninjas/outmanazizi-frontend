"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useOrderDetails } from "@/hooks/useOrders";
import { format } from "date-fns";
import {
  User,
  DollarSign,
  Calendar,
  MapPin,
  FileText,
  Star,
  Image as ImageIcon,
} from "lucide-react";

interface OrderDetailsDialogProps {
  orderId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({
  orderId,
  open,
  onOpenChange,
}: OrderDetailsDialogProps) {
  const { data: order, isLoading } = useOrderDetails(orderId);

  console.log("Oder Data :", order);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : order ? (
          <div className="space-y-6">
            {/* Order Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-mono text-sm">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  className={
                    order.status === "COMPLETED"
                      ? "bg-green-100 text-green-800"
                      : order.status === "IN_PROGRESS"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {order.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Intent</p>
                <p className="font-mono text-xs">{order.paymentIntentId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="text-sm">
                  {format(new Date(order.createdAt), "PPP")}
                </p>
              </div>
            </div>

            <Separator />

            {/* Service Details */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <FileText className="size-5" />
                Service Details
              </h3>
              <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                <div>
                  <p className="text-sm font-medium">
                    {order.bid.service.serviceName}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {order.bid.service.description}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="size-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-sm font-medium">
                        ${order.bid.service.budget}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="size-4 text-green-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">Bid Price</p>
                      <p className="text-sm font-medium text-green-600">
                        ${order.bid.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Start Time
                      </p>
                      <p className="text-sm">
                        {order.bid.service.startTime
                          .replace(":00Z", "")
                          .replace("T", " ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">End Time</p>
                      <p className="text-sm">
                        {order.bid.service.endTime
                          .replace(":00Z", "")
                          .replace("T", " ")}
                      </p>
                    </div>
                  </div>
                </div>
                {order.bid.serviceProviderProposal && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground mb-1">
                      Service Provider Proposal
                    </p>
                    <p className="text-sm italic">
                      &quot;{order.bid.serviceProviderProposal}&quot;
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Service Provider & Consumer */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="size-5" />
                  Service Provider
                </h3>
                <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    {order.bid.serviceProvider.user.picture && (
                      <img
                        src={order.bid.serviceProvider.user.picture}
                        alt=""
                        className="size-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium">
                        {order.bid.serviceProvider.user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.bid.serviceProvider.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">
                      {order.bid.serviceProvider.myCurrentRating} (
                      {order.bid.serviceProvider.ratingGetFromUsers} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-muted-foreground" />
                    <span className="text-sm">
                      {order.bid.serviceProvider.address}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="size-5" />
                  Consumer
                </h3>
                <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    {order.consumer.picture && (
                      <img
                        src={order.consumer.picture}
                        alt=""
                        className="size-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium">{order.consumer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.consumer.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">{order.consumer.phone}</p>
                </div>
              </div>
            </div>

            {/* Service Images */}
            {order.bid.service.file && order.bid.service.file.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <ImageIcon className="size-5" />
                    Service Images
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {order.bid.service.file.map((img: string, idx: number) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Service ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No order details found
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
