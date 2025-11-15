import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ProvidersFilters } from "./ProvidersFilters";

interface ProvidersHeaderProps {
  totalProviders: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string[];
  verifiedFilter: string[];
  profileFilter: string[];
  onStatusChange: (status: string[]) => void;
  onVerifiedChange: (verified: string[]) => void;
  onProfileChange: (profile: string[]) => void;
  onResetFilters: () => void;
}

export function ProvidersHeader({
  totalProviders,
  searchQuery,
  onSearchChange,
  statusFilter,
  verifiedFilter,
  profileFilter,
  onStatusChange,
  onVerifiedChange,
  onProfileChange,
  onResetFilters,
}: ProvidersHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Service Providers</h1>
          <p className="text-muted-foreground">
            Manage all service providers ({totalProviders} total)
          </p>
        </div>
      </div>

      {/* <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email or phone..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <ProvidersFilters
          statusFilter={statusFilter}
          verifiedFilter={verifiedFilter}
          profileFilter={profileFilter}
          onStatusChange={onStatusChange}
          onVerifiedChange={onVerifiedChange}
          onProfileChange={onProfileChange}
          onReset={onResetFilters}
        />
      </div> */}
    </div>
  );
}
