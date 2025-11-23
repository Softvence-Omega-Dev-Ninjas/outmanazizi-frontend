"use client";

import { useState, useEffect, useMemo } from "react";
import { User } from "@/types/user";
import { UsersTable } from "./_components/UsersTable";
import { UsersHeader } from "./_components/UsersHeader";
import { Pagination } from "./_components/Pagination";
import { RoleChangeDialog } from "@/components/admin/RoleChangeDialog";
import { useUsers, useBlockUser, useDeleteUser } from "@/hooks/useUsers";

const ITEMS_PER_PAGE = 10;
const isDevelopmentMode = process.env.NODE_ENV === "development";

export default function UsersPage() {
  const { data: allUsers = [], isLoading } = useUsers();
  const blockUserMutation = useBlockUser();
  const deleteUserMutation = useDeleteUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [verifiedFilter, setVerifiedFilter] = useState<string[]>([]);
  const [providerFilter, setProviderFilter] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [selectedUserForRole, setSelectedUserForRole] = useState<User | null>(null);
  const [showRoleDialog, setShowRoleDialog] = useState(false);

  const users = useMemo(() => {
    return allUsers.filter((user: User) => user.role === "CONSUMER");
  }, [allUsers]);

  const filteredUsers = useMemo(() => {
    let filtered = allUsers;

    // Role filter
    if (roleFilter.length > 0) {
      filtered = filtered.filter((user: User) => roleFilter.includes(user.role));
    } else {
      // Default: show only CONSUMER if no role filter
      filtered = filtered.filter((user: User) => user.role === "CONSUMER");
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user: User) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.phone.includes(query)
      );
    }

    // Status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter((user: User) => {
        if (statusFilter.includes("blocked") && user.isBlocked) return true;
        if (statusFilter.includes("active") && user.isActive && !user.isBlocked)
          return true;
        if (
          statusFilter.includes("inactive") &&
          !user.isActive &&
          !user.isBlocked
        )
          return true;
        return false;
      });
    }

    // Verified filter
    if (verifiedFilter.length > 0) {
      filtered = filtered.filter((user: User) => {
        if (verifiedFilter.includes("verified") && user.isEmailVerified)
          return true;
        if (verifiedFilter.includes("not-verified") && !user.isEmailVerified)
          return true;
        return false;
      });
    }

    // Provider filter
    if (providerFilter.length > 0) {
      filtered = filtered.filter((user: User) => {
        if (providerFilter.includes("email") && !user.provider) return true;
        if (user.provider && providerFilter.includes(user.provider))
          return true;
        return false;
      });
    }

    return filtered;
  }, [allUsers, searchQuery, statusFilter, verifiedFilter, providerFilter, roleFilter]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, verifiedFilter, providerFilter, roleFilter]);

  const handleResetFilters = () => {
    setStatusFilter([]);
    setVerifiedFilter([]);
    setProviderFilter([]);
    setRoleFilter([]);
  };

  const handleBlock = (userId: string) => {
    blockUserMutation.mutate(userId);
  };

  const handleUnblock = (userId: string) => {
    blockUserMutation.mutate(userId);
  };

  const handleDelete = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  const handleRoleChange = (user: User) => {
    setSelectedUserForRole(user);
    setShowRoleDialog(true);
  };

  return (
    <div className="space-y-6">
      <UsersHeader
        totalUsers={filteredUsers.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        verifiedFilter={verifiedFilter}
        providerFilter={providerFilter}
        roleFilter={roleFilter}
        onStatusChange={setStatusFilter}
        onVerifiedChange={setVerifiedFilter}
        onProviderChange={setProviderFilter}
        onRoleChange={setRoleFilter}
        onResetFilters={handleResetFilters}
        isDevelopmentMode={isDevelopmentMode}
      />

      <UsersTable
        users={paginatedUsers}
        loading={isLoading}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
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
          totalItems={filteredUsers.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
