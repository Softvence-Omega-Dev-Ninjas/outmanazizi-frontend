"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConnectedAccount } from "@/types/stripe";
import { Users } from "lucide-react";

interface ConnectedAccountsTableProps {
  accounts: ConnectedAccount[];
  isLoading: boolean;
}

export function ConnectedAccountsTable({ accounts, isLoading }: ConnectedAccountsTableProps) {
  return (
    <Card className="border-violet-200 bg-violet-50/50 dark:bg-violet-950/20 dark:border-violet-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="size-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
            <Users className="size-5 text-violet-600 dark:text-violet-400" />
          </div>
          <span>Connected Accounts ({accounts.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account ID</TableHead>
                <TableHead>User ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  </TableRow>
                ))
              ) : accounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                    No connected accounts
                  </TableCell>
                </TableRow>
              ) : (
                accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-mono text-xs">{account.id}</TableCell>
                    <TableCell className="font-mono text-xs">{account.userId.slice(0, 8)}...</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
