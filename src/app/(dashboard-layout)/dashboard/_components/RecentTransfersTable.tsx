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
import { Transfer } from "@/types/stripe";
import { ArrowRightLeft } from "lucide-react";

interface RecentTransfersTableProps {
  transfers: Transfer[];
  isLoading: boolean;
}

export function RecentTransfersTable({
  transfers,
  isLoading,
}: RecentTransfersTableProps) {
  const formatAmount = (amount: number) => {
    return `$${(amount / 100).toFixed(2)}`;
  };

  return (
    <Card className="border-cyan-200 bg-cyan-50/50 dark:bg-cyan-950/20 dark:border-cyan-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="size-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
            <ArrowRightLeft className="size-5 text-cyan-600 dark:text-cyan-400" />
          </div>
          <span>Recent Transfers</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[320px] overflow-y-auto">
          <div className="border rounded-lg overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transfer ID</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : transfers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No recent transfers
                  </TableCell>
                </TableRow>
              ) : (
                transfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell className="font-mono text-xs">
                      {transfer.id}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {transfer.destination}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatAmount(transfer.amount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
