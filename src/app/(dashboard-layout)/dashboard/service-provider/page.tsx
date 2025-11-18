"use client";

import { useState, useEffect, useMemo } from "react";
import { ServiceProvider } from "@/types/serviceProvider";
import { ProvidersTable } from "./_components/ProvidersTable";
import { ProvidersHeader } from "./_components/ProvidersHeader";
import { Pagination } from "../users/_components/Pagination";
import { RoleChangeDialog } from "@/components/admin/RoleChangeDialog";
import {
  useServiceProviders,
  useBlockServiceProvider,
  useDeleteServiceProvider,
  useVerifyServiceProvider,
} from "@/hooks/useServiceProviders";

const ITEMS_PER_PAGE = 10;

export default function ServiceProviderPage() {
  const { data: providers = [], isLoading } = useServiceProviders();
  const blockProviderMutation = useBlockServiceProvider();
  const deleteProviderMutation = useDeleteServiceProvider();
  const verifyProviderMutation = useVerifyServiceProvider();

  // Debug: Log providers data
  console.log("Service Providers Data:", providers);
  console.log("Total Providers:", providers.length);
  if (providers.length > 0) {
    console.log("First Provider Sample:", providers[0]);
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [verifiedFilter, setVerifiedFilter] = useState<string[]>([]);
  const [profileFilter, setProfileFilter] = useState<string[]>([]);
  const [selectedUserForRole, setSelectedUserForRole] = useState<any>(null);
  const [showRoleDialog, setShowRoleDialog] = useState(false);

  const filteredProviders = useMemo(() => {
    let filtered = providers;
    console.log("Filtering providers, total:", filtered.length);

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (provider: ServiceProvider) =>
          provider.user.name.toLowerCase().includes(query) ||
          provider.user.email.toLowerCase().includes(query) ||
          provider.user.phone.includes(query)
      );
    }

    // Status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter((provider: ServiceProvider) => {
        if (statusFilter.includes("blocked") && provider.user.isBlocked)
          return true;
        if (
          statusFilter.includes("active") &&
          provider.user.isActive &&
          !provider.user.isBlocked
        )
          return true;
        return false;
      });
    }

    // Verified filter
    if (verifiedFilter.length > 0) {
      filtered = filtered.filter((provider: ServiceProvider) => {
        if (verifiedFilter.includes("verified") && provider.isVerifiedFromAdmin)
          return true;
        if (
          verifiedFilter.includes("not-verified") &&
          !provider.isVerifiedFromAdmin
        )
          return true;
        return false;
      });
    }

    // Profile filter
    if (profileFilter.length > 0) {
      filtered = filtered.filter((provider: ServiceProvider) => {
        if (profileFilter.includes("completed") && provider.isProfileCompleted)
          return true;
        if (
          profileFilter.includes("incomplete") &&
          !provider.isProfileCompleted
        )
          return true;
        return false;
      });
    }

    console.log("Filtered providers result:", filtered.length);
    return filtered;
  }, [providers, searchQuery, statusFilter, verifiedFilter, profileFilter]);

  const paginatedProviders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProviders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProviders, currentPage]);

  const totalPages = Math.ceil(filteredProviders.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, verifiedFilter, profileFilter]);

  const handleResetFilters = () => {
    setStatusFilter([]);
    setVerifiedFilter([]);
    setProfileFilter([]);
  };

  const handleBlock = (userId: string) => {
    blockProviderMutation.mutate(userId);
  };

  const handleUnblock = (userId: string) => {
    blockProviderMutation.mutate(userId);
  };

  const handleVerify = (providerId: string) => {
    // Find provider's userId
    const provider = providers.find(
      (p: ServiceProvider) => p.id === providerId
    );
    if (provider) {
      verifyProviderMutation.mutate(provider.userId);
    }
  };

  const handleUnverify = (providerId: string) => {
    // Unverify is same as verify (toggle)
    const provider = providers.find(
      (p: ServiceProvider) => p.id === providerId
    );
    if (provider) {
      verifyProviderMutation.mutate(provider.userId);
    }
  };

  const handleDelete = (userId: string) => {
    deleteProviderMutation.mutate(userId);
  };

  const handleRoleChange = (provider: ServiceProvider) => {
    setSelectedUserForRole({
      id: provider.user.id,
      name: provider.user.name,
      email: provider.user.email,
      role: provider.user.role || "SERVICE_PROVIDER"
    });
    setShowRoleDialog(true);
  };

  return (
    <div className="space-y-6">
      <ProvidersHeader
        totalProviders={providers.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        verifiedFilter={verifiedFilter}
        profileFilter={profileFilter}
        onStatusChange={setStatusFilter}
        onVerifiedChange={setVerifiedFilter}
        onProfileChange={setProfileFilter}
        onResetFilters={handleResetFilters}
      />

      <ProvidersTable
        providers={paginatedProviders}
        loading={isLoading}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
        onVerify={handleVerify}
        onUnverify={handleUnverify}
        onDelete={handleDelete}
        onRoleChange={handleRoleChange}
      />

      <RoleChangeDialog
        user={selectedUserForRole}
        open={showRoleDialog}
        onOpenChange={setShowRoleDialog}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredProviders.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
