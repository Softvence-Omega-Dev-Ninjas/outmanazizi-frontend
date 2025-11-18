"use client";

import { useState, useMemo } from "react";
import { Dispute } from "@/types/dispute";
import { Input } from "@/components/ui/input";
import { DisputesTable } from "./_components/DisputesTable";
import { DisputeDetailsDialog } from "./_components/DisputeDetailsDialog";
import { DisputeFilters } from "./_components/DisputeFilters";
import { Search } from "lucide-react";
import {
  useDisputes,
  useResolveDispute,
  useDeleteDispute,
} from "@/hooks/useDisputes";

export default function DisputesPage() {
  const { data: disputes = [], isLoading } = useDisputes();
  const resolveDisputeMutation = useResolveDispute();
  const deleteDisputeMutation = useDeleteDispute();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  console.log(disputes);

  const filteredDisputes = useMemo(() => {
    let filtered = disputes;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (dispute: Dispute) =>
          dispute.details?.toLowerCase().includes(query) ||
          dispute.id?.toLowerCase().includes(query) ||
          dispute.serviceid?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter((dispute: Dispute) => {
        if (statusFilter.includes("resolved") && dispute.isSolved) return true;
        if (statusFilter.includes("pending") && !dispute.isSolved) return true;
        return false;
      });
    }

    return filtered;
  }, [disputes, searchQuery, statusFilter]);

  const handleViewDetails = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setShowDetailsDialog(true);
  };

  const handleResolve = (disputeId: string) => {
    resolveDisputeMutation.mutate(disputeId);
  };

  const handleDelete = (disputeId: string) => {
    deleteDisputeMutation.mutate(disputeId);
  };

  const handleResetFilters = () => {
    setStatusFilter([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Disputes</h1>
        <p className="text-muted-foreground">
          Manage all service disputes ({disputes.length} total)
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by details, dispute ID, or service ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <DisputeFilters
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onReset={handleResetFilters}
        />
      </div>

      <DisputesTable
        disputes={filteredDisputes}
        loading={isLoading}
        onViewDetails={handleViewDetails}
        onResolve={handleResolve}
        onDelete={handleDelete}
      />

      <DisputeDetailsDialog
        dispute={selectedDispute}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
      />
    </div>
  );
}
