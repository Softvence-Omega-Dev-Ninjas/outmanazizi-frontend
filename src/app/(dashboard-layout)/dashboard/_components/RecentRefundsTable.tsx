"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign } from "lucide-react";

interface Refund {
  id: string;
  amount: number;
  payment_intent: string;
}

interface RecentRefundsTableProps {
  refunds: Refund[];
  isLoading: boolean;
}

export function RecentRefundsTable({
  refunds,
  isLoading,
}: RecentRefundsTableProps) {
  return (
    <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 dark:border-orange-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="size-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <DollarSign className="size-5 text-orange-600 dark:text-orange-400" />
          </div>
          Recent Refunds
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg max-h-80 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Refund ID</TableHead>
                <TableHead>Payment Intent</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : refunds.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No refunds found
                  </TableCell>
                </TableRow>
              ) : (
                refunds.slice(0, 10).map((refund) => (
                  <TableRow key={refund.id}>
                    <TableCell className="font-mono text-xs">
                      {refund.id}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {refund.payment_intent}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${(refund.amount / 100).toFixed(2)}
                    </TableCell>
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
