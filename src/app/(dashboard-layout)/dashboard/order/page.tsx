"use client";

import { useState, useMemo, useEffect } from "react";
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
import {
  Eye,
  DollarSign,
  ArrowRightLeft,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pagination } from "../users/_components/Pagination";
import { useOrders } from "@/hooks/useOrders";
import { format } from "date-fns";
import { UserCell } from "./_components/UserCell";
import { OrderDetailsDialog } from "./_components/OrderDetailsDialog";
import { RefundDialog } from "./_components/RefundDialog";
import { TransferDialog } from "./_components/TransferDialog";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 10;

export default function OrderPage() {
  const { data: orders = [], isLoading } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order: Order) =>
          order.id?.toLowerCase().includes(query) ||
          order.status?.toLowerCase().includes(query) ||
          order.bidId?.toLowerCase().includes(query),
      );
    }

    // Status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter((order: Order) =>
        statusFilter.includes(order.status),
      );
    }

    // Sort by date
    filtered = filtered.sort((a: Order, b: Order) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [orders, searchQuery, statusFilter, sortOrder]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortOrder]);

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

  const getPaymentStatusBadge = (orderStatus: string) => {
    if (orderStatus === "CANCELLED") {
      return (
        <Badge className="bg-orange-100 text-orange-800 border-orange-200">
          Refund
        </Badge>
      );
    }
    if (orderStatus === "COMPLETED") {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Transfer
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-800 border-gray-200">
        Pending
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          Manage all service orders ({filteredOrders.length} of {orders.length}{" "}
          total)
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID, bid ID or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 size-4" />
                Status {statusFilter.length > 0 && `(${statusFilter.length})`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("PENDING")}
                onCheckedChange={(checked) => {
                  setStatusFilter(
                    checked
                      ? [...statusFilter, "PENDING"]
                      : statusFilter.filter((s) => s !== "PENDING"),
                  );
                }}
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("IN_PROGRESS")}
                onCheckedChange={(checked) => {
                  setStatusFilter(
                    checked
                      ? [...statusFilter, "IN_PROGRESS"]
                      : statusFilter.filter((s) => s !== "IN_PROGRESS"),
                  );
                }}
              >
                In Progress
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("COMPLETED")}
                onCheckedChange={(checked) => {
                  setStatusFilter(
                    checked
                      ? [...statusFilter, "COMPLETED"]
                      : statusFilter.filter((s) => s !== "COMPLETED"),
                  );
                }}
              >
                Completed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("CANCELLED")}
                onCheckedChange={(checked) => {
                  setStatusFilter(
                    checked
                      ? [...statusFilter, "CANCELLED"]
                      : statusFilter.filter((s) => s !== "CANCELLED"),
                  );
                }}
              >
                Cancelled
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          >
            <ArrowUpDown className="mr-2 size-4" />
            {sortOrder === "desc" ? "Latest" : "Oldest"}
          </Button>
          {statusFilter.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStatusFilter([])}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Service Provider</TableHead>
              <TableHead>Consumer</TableHead>
              <TableHead>Bid ID</TableHead>
              <TableHead>Order Status</TableHead>

              <TableHead className="text-center text-sm!">
                Job Done by
                <br />
                Provider
              </TableHead>
              <TableHead className="text-center text-sm!">
                Accepted by <br />
                Consumer
              </TableHead>
              <TableHead>
                Payment <br /> Status
              </TableHead>
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
                    <Skeleton className="h-4 w-20" />
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
                  colSpan={10}
                  className="text-center py-8 text-muted-foreground"
                >
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order: Order) => (
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
                  <TableCell className="font-mono text-xs">
                    {order.bidId.slice(0, 8)}...
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>

                  <TableCell className="text-center">
                    {order.isCompletedFromProvider ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        No
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.isCompletedFromConsumer ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        No
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{getPaymentStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    {format(new Date(order.createdAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/20 border border-blue-200 rounded-full"
                        onClick={() => {
                          setSelectedOrderId(order.id);
                          setShowDetailsDialog(true);
                        }}
                      >
                        <Eye className="mr-2 size-4" />
                        View
                      </Button>
                      {/* Show buttons based on completion status and order status */}
                      {!order.isCompletedFromConsumer &&
                        order.isCompletedFromProvider &&
                        order.status !== "CANCELLED" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-950/20 border border-orange-200 rounded-full"
                            onClick={() => {
                              setSelectedOrderId(order.id);
                              setShowRefundDialog(true);
                            }}
                          >
                            <DollarSign className="mr-2 size-4" />
                            Refund
                          </Button>
                        )}
                      {order.isCompletedFromConsumer &&
                        order.isCompletedFromProvider &&
                        order.status !== "COMPLETED" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/20 border border-green-200 rounded-full"
                            onClick={() => {
                              setSelectedOrderId(order.id);
                              setShowTransferDialog(true);
                            }}
                          >
                            <ArrowRightLeft className="mr-2 size-4" />
                            Transfer
                          </Button>
                        )}
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

      <RefundDialog
        orderId={selectedOrderId}
        open={showRefundDialog}
        onOpenChange={setShowRefundDialog}
      />

      <TransferDialog
        orderId={selectedOrderId}
        open={showTransferDialog}
        onOpenChange={setShowTransferDialog}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredOrders.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
