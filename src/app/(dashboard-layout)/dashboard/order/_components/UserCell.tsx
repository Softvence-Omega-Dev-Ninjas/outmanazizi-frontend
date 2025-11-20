"use client";

import { useUsers } from "@/hooks/useUsers";
import { useServiceProviders } from "@/hooks/useServiceProviders";
import { Skeleton } from "@/components/ui/skeleton";

interface UserCellProps {
  userId: string;
}

export function UserCell({ userId }: UserCellProps) {
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { data: serviceProviders = [], isLoading: spLoading } = useServiceProviders();

  if (usersLoading || spLoading) {
    return <Skeleton className="h-4 w-32" />;
  }

  // Check in consumers first
  let user = users.find((u: any) => u.id === userId);
  
  // If not found, check in service providers using main id field
  if (!user) {
    const sp = serviceProviders.find((sp: any) => sp.id === userId);
    if (sp) {
      user = sp.user;
    }
  }

  if (!user) {
    return (
      <div>
        <p className="font-mono text-xs text-muted-foreground">
          {userId.slice(0, 8)}...
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="font-medium text-sm">{user.name}</p>
      <p className="font-mono text-xs text-muted-foreground">
        {userId.slice(0, 8)}...
      </p>
    </div>
  );
}
