import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

interface OrderFiltersProps {
  statusFilter: string[];
  onStatusChange: (status: string[]) => void;
  onReset: () => void;
}

export function OrderFilters({
  statusFilter,
  onStatusChange,
  onReset,
}: OrderFiltersProps) {
  const hasFilters = statusFilter.length > 0;

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 size-4" />
            Status
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes("pending")}
            onCheckedChange={(checked) => {
              onStatusChange(
                checked
                  ? [...statusFilter, "pending"]
                  : statusFilter.filter((s) => s !== "pending")
              );
            }}
          >
            Pending
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes("in-progress")}
            onCheckedChange={(checked) => {
              onStatusChange(
                checked
                  ? [...statusFilter, "in-progress"]
                  : statusFilter.filter((s) => s !== "in-progress")
              );
            }}
          >
            In Progress
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes("completed")}
            onCheckedChange={(checked) => {
              onStatusChange(
                checked
                  ? [...statusFilter, "completed"]
                  : statusFilter.filter((s) => s !== "completed")
              );
            }}
          >
            Completed
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={statusFilter.includes("delete-request")}
            onCheckedChange={(checked) => {
              onStatusChange(
                checked
                  ? [...statusFilter, "delete-request"]
                  : statusFilter.filter((s) => s !== "delete-request")
              );
            }}
          >
            Delete Request
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset ({statusFilter.length})
        </Button>
      )}
    </div>
  );
}
