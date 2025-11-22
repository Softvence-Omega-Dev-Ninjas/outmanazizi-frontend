"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, TrendingUp } from "lucide-react";

interface BalanceCardsProps {
  available: number;
  pending: number;
  isLoading: boolean;
}

export function BalanceCards({
  available,
  pending,
  isLoading,
}: BalanceCardsProps) {
  const formatAmount = (amount: number) => {
    return `$${(amount / 100).toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <>
        <Card>
          <CardHeader>
            <Skeleton className="h-10 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-10 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <DollarSign className="size-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm">Available Balance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              {formatAmount(available)}
            </div>
            <p className="text-xs text-muted-foreground">Ready to transfer</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <TrendingUp className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm">Pending Balance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {formatAmount(pending)}
            </div>
            <p className="text-xs text-muted-foreground">Processing payments</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
