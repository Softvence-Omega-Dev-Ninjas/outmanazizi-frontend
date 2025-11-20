"use client";

import { useState } from "react";
import { Order } from "@/types/order";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, DollarSign, ArrowRightLeft } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import { format } from "date-fns";
import { UserCell } from "./_components/UserCell";
import { OrderDetailsDialog } from "./_components/OrderDetailsDialog";
import { Button } from "@/components/ui/button";

export default function OrderPage() {
  const { data: orders = [], isLoading } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const filteredOrders = orders.filter(
    (order: Order) =>
      order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Oders Data :", orders);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      PENDING: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      IN_PROGRESS: {
        label: "In Progress",
        className: "bg-blue-100 text-blue-800 border-blue-200",
      },
      COMPLETED: {
        label: "Completed",
        className: "bg-green-100 text-green-800 border-green-200",
      },
      CANCELLED: {
        label: "Cancelled",
        className: "bg-red-100 text-red-800 border-red-200",
      },
    };
    const config = statusConfig[status] || { label: status, className: "" };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          Manage all service orders ({orders.length} total)
        </p>
      </div>

      {/* <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search by order ID or status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div> */}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Service Provider ID</TableHead>
              <TableHead>Consumer ID</TableHead>
              {/* <TableHead>Payment Intent ID</TableHead> */}
              <TableHead>Bid ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-muted-foreground"
                >
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order: Order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">
                    {order.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <UserCell userId={order.serviceProviderId} />
                  </TableCell>
                  <TableCell>
                    <UserCell userId={order.consumerId} />
                  </TableCell>
                  {/* <TableCell className="font-mono text-xs">
                    {order.paymentIntentId}
                  </TableCell> */}
                  <TableCell className="font-mono text-xs">
                    {order.bidId.slice(0, 8)}...
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    {format(new Date(order.createdAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedOrderId(order.id);
                          setShowDetailsDialog(true);
                        }}
                      >
                        <Eye className="mr-2 size-4" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log("Refund", order.id)}
                      >
                        <DollarSign className="mr-2 size-4" />
                        Refund
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log("Transfer", order.id)}
                      >
                        <ArrowRightLeft className="mr-2 size-4" />
                        Transfer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <OrderDetailsDialog
        orderId={selectedOrderId}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
      />
    </div>
  );
}
