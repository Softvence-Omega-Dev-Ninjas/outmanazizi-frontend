import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { UsersFilters } from "./UsersFilters";

interface UsersHeaderProps {
  totalUsers: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string[];
  verifiedFilter: string[];
  providerFilter: string[];
  roleFilter: string[];
  onStatusChange: (status: string[]) => void;
  onVerifiedChange: (verified: string[]) => void;
  onProviderChange: (provider: string[]) => void;
  onRoleChange: (role: string[]) => void;
  onResetFilters: () => void;
  isDevelopmentMode: boolean;
}

export function UsersHeader({
  totalUsers,
  searchQuery,
  onSearchChange,
  statusFilter,
  verifiedFilter,
  providerFilter,
  roleFilter,
  onStatusChange,
  onVerifiedChange,
  onProviderChange,
  onRoleChange,
  onResetFilters,
  isDevelopmentMode,
}: UsersHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Consumers</h1>
          <p className="text-muted-foreground">
            Manage all consumer users ({totalUsers} total)
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email or phone..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <UsersFilters
          statusFilter={statusFilter}
          verifiedFilter={verifiedFilter}
          providerFilter={providerFilter}
          roleFilter={roleFilter}
          onStatusChange={onStatusChange}
          onVerifiedChange={onVerifiedChange}
          onProviderChange={onProviderChange}
          onRoleChange={onRoleChange}
          onReset={onResetFilters}
          isDevelopmentMode={isDevelopmentMode}
        />
      </div>
    </div>
  );
}
