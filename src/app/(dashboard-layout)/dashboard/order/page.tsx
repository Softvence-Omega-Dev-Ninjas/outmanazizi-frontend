"use client";

import { useState, useMemo } from "react";
import { Order } from "@/types/order";
import { Input } from "@/components/ui/input";
import { OrdersTable } from "./_components/OrdersTable";
import { OrderDetailsDialog } from "./_components/OrderDetailsDialog";
import { OrderFilters } from "./_components/OrderFilters";
import { Search } from "lucide-react";
import { useOrders, useApproveOrder, useDeleteOrder } from "@/hooks/useOrders";

export default function OrderPage() {
  const { data: orders = [], isLoading } = useOrders();
  const approveOrderMutation = useApproveOrder();
  const deleteOrderMutation = useDeleteOrder();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  // Debug: Log orders data
  console.log("Orders Data:", orders);
  console.log("Total Orders:", orders.length);
  if (orders.length > 0) {
    console.log("First Order Sample:", orders[0]);
    console.log("Order Fields:", Object.keys(orders[0]));
  }

  const filteredOrders = useMemo(() => {
    let filtered = orders;
    console.log("Filtering orders, total:", filtered.length);

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order: Order) =>
          order.serviceName?.toLowerCase().includes(query) ||
          order.title?.toLowerCase().includes(query) ||
          order.id?.toLowerCase().includes(query) ||
          order.description?.toLowerCase().includes(query)
      );
    }

    // Status filter - based on order completion status
    if (statusFilter.length > 0) {
      filtered = filtered.filter((order: Order) => {
        if (statusFilter.includes("completed") && order.isCompletedFromAdmin)
          return true;
        if (
          statusFilter.includes("pending") &&
          !order.isCompletedFromAdmin &&
          !order.assignedServiceProviderId
        )
          return true;
        if (
          statusFilter.includes("in-progress") &&
          order.assignedServiceProviderId &&
          !order.isCompletedFromAdmin
        )
          return true;
        return false;
      });
    }

    console.log("Filtered orders result:", filtered.length);
    return filtered;
  }, [orders, searchQuery, statusFilter]);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsDialog(true);
  };

  const handleApprove = (orderId: string) => {
    approveOrderMutation.mutate(orderId);
  };

  const handleDelete = (orderId: string) => {
    deleteOrderMutation.mutate(orderId);
  };

  const handleResetFilters = () => {
    setStatusFilter([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          Manage all service orders ({orders.length} total)
        </p>
      </div>

      {/* <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer, service, or order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <OrderFilters
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onReset={handleResetFilters}
        />
      </div> */}

      <OrdersTable
        orders={filteredOrders}
        loading={isLoading}
        onViewDetails={handleViewDetails}
        onApprove={handleApprove}
        onDelete={handleDelete}
      />

      <OrderDetailsDialog
        order={selectedOrder}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
      />
    </div>
  );
}
