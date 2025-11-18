"use client";

import { User } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserActions } from "./UserActions";
import { UsersTableSkeleton } from "./UsersTableSkeleton";
import { formatDistanceToNow } from "date-fns";

interface UsersTableProps {
  users: User[];
  loading: boolean;
  onBlock: (userId: string) => void;
  onUnblock: (userId: string) => void;
  onDelete: (userId: string) => void;
  onRoleChange: (user: User) => void;
}

export function UsersTable({
  users,
  loading,
  onBlock,
  onUnblock,
  onDelete,
  onRoleChange,
}: UsersTableProps) {
  if (loading) {
    return <UsersTableSkeleton />;
  }

  if (users.length === 0) {
    return (
      <div className="rounded-lg border">
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No consumers found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm" style={{ width: "max-content" }}>
        <thead className="bg-muted/50">
          <tr className="border-b">
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[200px]">
              User
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[150px]">
              Contact
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[100px]">
              Status
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[100px]">
              Role
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[100px]">
              Verified
            </th>
            <th className="h-10 px-2 text-left align-middle font-medium whitespace-nowrap min-w-[120px]">
              Joined
            </th>
            <th className="h-10 px-2 text-right align-middle font-medium whitespace-nowrap min-w-[100px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b transition-colors hover:bg-muted/50"
            >
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <Avatar className="shrink-0">
                    <AvatarImage src={user.picture} alt={user.name} />
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{user.name}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {user.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="text-sm">{user.phone}</div>
                {user.address && (
                  <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {user.address}
                  </div>
                )}
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <div className="flex flex-col gap-1">
                  {user.isBlocked ? (
                    <Badge variant="destructive">Blocked</Badge>
                  ) : user.isActive ? (
                    <Badge className="bg-green-500">Active</Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                  {user.provider && (
                    <Badge variant="outline" className="text-xs">
                      {user.provider}
                    </Badge>
                  )}
                </div>
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                <Badge 
                  className={
                    user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'SERVICE_PROVIDER' ? 'bg-green-100 text-green-800' :
                    user.role === 'SUPER_ADMIN' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }
                >
                  {user.role === 'SERVICE_PROVIDER' ? 'Provider' : 
                   user.role === 'SUPER_ADMIN' ? 'Super Admin' : 
                   user.role}
                </Badge>
              </td>
              <td className="p-2 align-middle whitespace-nowrap">
                {user.isEmailVerified ? (
                  <Badge className="bg-blue-500">Verified</Badge>
                ) : (
                  <Badge variant="outline">Not Verified</Badge>
                )}
              </td>
              <td className="p-2 align-middle whitespace-nowrap text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(user.createdAt), {
                  addSuffix: true,
                })}
              </td>
              <td className="p-2 align-middle whitespace-nowrap text-right">
                <UserActions
                  user={user}
                  onBlock={onBlock}
                  onUnblock={onUnblock}
                  onDelete={onDelete}
                  onRoleChange={onRoleChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
