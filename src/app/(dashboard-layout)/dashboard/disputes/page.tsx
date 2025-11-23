"use client";

import { useState, useMemo, useEffect } from "react";
import { Dispute } from "@/types/dispute";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DisputesTable } from "./_components/DisputesTable";
import { DisputeDetailsDialog } from "./_components/DisputeDetailsDialog";
import { DisputeFilters } from "./_components/DisputeFilters";
import { Pagination } from "../users/_components/Pagination";
import { Search, ArrowUpDown } from "lucide-react";
import {
  useDisputes,
  useResolveDispute,
  useDeleteDispute,
} from "@/hooks/useDisputes";

const ITEMS_PER_PAGE = 10;

export default function DisputesPage() {
  const { data: disputes = [], isLoading } = useDisputes();
  const resolveDisputeMutation = useResolveDispute();
  const deleteDisputeMutation = useDeleteDispute();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
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

    // Sort by date
    filtered = filtered.sort((a: Dispute, b: Dispute) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [disputes, searchQuery, statusFilter, sortOrder]);

  const paginatedDisputes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDisputes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredDisputes, currentPage]);

  const totalPages = Math.ceil(filteredDisputes.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortOrder]);

  const handleViewDetails = (dispute: Dispute) => {
    setSelectedDisputeId(dispute.id);
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
          Manage all service disputes ({filteredDisputes.length} of {disputes.length} total)
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
        <div className="flex gap-2">
          <DisputeFilters
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            onReset={handleResetFilters}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          >
            <ArrowUpDown className="mr-2 size-4" />
            {sortOrder === "desc" ? "Latest" : "Oldest"}
          </Button>
        </div>
      </div>

      <DisputesTable
        disputes={paginatedDisputes}
        loading={isLoading}
        onViewDetails={handleViewDetails}
        onResolve={handleResolve}
        onDelete={handleDelete}
      />

      <DisputeDetailsDialog
        disputeId={selectedDisputeId}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredDisputes.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
