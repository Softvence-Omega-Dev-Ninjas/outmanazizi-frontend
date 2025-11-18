"use client";

import { useState, useMemo } from "react";
import { Transfer } from "@/types/transfer";
import { Input } from "@/components/ui/input";
import { TransfersTable } from "./_components/TransfersTable";
import { TransferDetailsDialog } from "./_components/TransferDetailsDialog";
import { TransferStats } from "./_components/TransferStats";
import { TransferFilters } from "./_components/TransferFilters";
import { Search } from "lucide-react";

// Dummy data
const DUMMY_TRANSFERS: Transfer[] = [
  {
    id: "txn1",
    orderId: "ord1",
    orderTitle: "Fix Kitchen Sink Leak",
    serviceProviderName: "Alex Thompson",
    serviceProviderEmail: "alex.plumber@example.com",
    amount: "150",
    status: "completed",
    paymentMethod: "Stripe",
    transactionId: "pi_3Abc123xyz",
    createdAt: "2024-11-01T08:00:00Z",
    updatedAt: "2024-11-02T10:00:00Z",
    completedAt: "2024-11-02T10:00:00Z",
  },
  {
    id: "txn2",
    orderId: "ord2",
    orderTitle: "Install Ceiling Fan",
    serviceProviderName: "Maria Garcia",
    serviceProviderEmail: "maria.electrician@example.com",
    amount: "200",
    status: "processing",
    paymentMethod: "Stripe",
    transactionId: "pi_3Def456uvw",
    createdAt: "2024-11-05T09:30:00Z",
    updatedAt: "2024-11-07T14:20:00Z",
  },
  {
    id: "txn3",
    orderId: "ord3",
    orderTitle: "Deep Cleaning Service",
    serviceProviderName: "Sarah Johnson",
    serviceProviderEmail: "sarah.cleaner@example.com",
    amount: "300",
    status: "pending",
    paymentMethod: "Bank Transfer",
    createdAt: "2024-11-06T11:00:00Z",
    updatedAt: "2024-11-06T11:00:00Z",
  },
  {
    id: "txn4",
    orderId: "ord4",
    orderTitle: "Assemble Furniture",
    serviceProviderName: "John Smith",
    serviceProviderEmail: "john.carpenter@example.com",
    amount: "120",
    status: "failed",
    paymentMethod: "Stripe",
    transactionId: "pi_3Ghi789rst",
    createdAt: "2024-11-03T13:15:00Z",
    updatedAt: "2024-11-04T09:45:00Z",
  },
  {
    id: "txn5",
    orderId: "ord5",
    orderTitle: "Paint Living Room",
    serviceProviderName: "David Brown",
    serviceProviderEmail: "david.painter@example.com",
    amount: "400",
    status: "pending",
    paymentMethod: "Stripe",
    createdAt: "2024-11-07T10:20:00Z",
    updatedAt: "2024-11-07T10:20:00Z",
  },
  {
    id: "txn6",
    orderId: "ord6",
    orderTitle: "AC Repair",
    serviceProviderName: "Robert Miller",
    serviceProviderEmail: "robert.hvac@example.com",
    amount: "250",
    status: "completed",
    paymentMethod: "Bank Transfer",
    transactionId: "bt_789xyz123",
    createdAt: "2024-10-28T14:30:00Z",
    updatedAt: "2024-10-30T11:20:00Z",
    completedAt: "2024-10-30T11:20:00Z",
  },
  {
    id: "txn7",
    orderId: "ord7",
    orderTitle: "Lawn Maintenance",
    serviceProviderName: "Lisa Wilson",
    serviceProviderEmail: "lisa.gardener@example.com",
    amount: "180",
    status: "processing",
    paymentMethod: "Stripe",
    transactionId: "pi_3Jkl012mno",
    createdAt: "2024-11-04T12:00:00Z",
    updatedAt: "2024-11-06T15:30:00Z",
  },
  {
    id: "txn8",
    orderId: "ord8",
    orderTitle: "Lock Installation",
    serviceProviderName: "Jennifer Taylor",
    serviceProviderEmail: "jennifer.locksmith@example.com",
    amount: "220",
    status: "completed",
    paymentMethod: "Stripe",
    transactionId: "pi_3Pqr345stu",
    createdAt: "2024-10-25T08:45:00Z",
    updatedAt: "2024-10-26T10:15:00Z",
    completedAt: "2024-10-26T10:15:00Z",
  },
];

export default function TransferPage() {
  const [transfers, setTransfers] = useState<Transfer[]>(DUMMY_TRANSFERS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(
    null
  );
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const stats = useMemo(() => {
    const totalAmount = transfers
      .reduce((sum, t) => sum + parseFloat(t.amount), 0)
      .toFixed(2);
    const pending = transfers.filter((t) => t.status === "pending").length;
    const completed = transfers.filter((t) => t.status === "completed").length;
    const failed = transfers.filter((t) => t.status === "failed").length;
    return { totalAmount, pending, completed, failed };
  }, [transfers]);

  const filteredTransfers = useMemo(() => {
    let filtered = transfers;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (transfer) =>
          transfer.serviceProviderName.toLowerCase().includes(query) ||
          transfer.serviceProviderEmail.toLowerCase().includes(query) ||
          transfer.orderTitle.toLowerCase().includes(query) ||
          transfer.id.toLowerCase().includes(query) ||
          transfer.orderId.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter((transfer) =>
        statusFilter.includes(transfer.status)
      );
    }

    return filtered;
  }, [transfers, searchQuery, statusFilter]);

  const handleViewDetails = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setShowDetailsDialog(true);
  };

  const handleApprove = (transferId: string) => {
    setTransfers((prev) =>
      prev.map((transfer) =>
        transfer.id === transferId
          ? {
              ...transfer,
              status: "completed" as const,
              completedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : transfer
      )
    );
  };

  const handleReject = (transferId: string) => {
    setTransfers((prev) =>
      prev.map((transfer) =>
        transfer.id === transferId
          ? {
              ...transfer,
              status: "failed" as const,
              updatedAt: new Date().toISOString(),
            }
          : transfer
      )
    );
  };

  const handleResetFilters = () => {
    setStatusFilter([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transfers</h1>
        <p className="text-muted-foreground">
          Manage payment transfers to service providers
        </p>
      </div>

      {/* <TransferStats
        totalAmount={stats.totalAmount}
        pending={stats.pending}
        completed={stats.completed}
        failed={stats.failed}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by provider, order, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <TransferFilters
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onReset={handleResetFilters}
        />
      </div>

      <TransfersTable
        transfers={filteredTransfers}
        loading={loading}
        onViewDetails={handleViewDetails}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <TransferDetailsDialog
        transfer={selectedTransfer}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
      /> */}
    </div>
  );
}
