"use client";

import { useStripeInfo } from "@/hooks/useStripe";
import { BalanceCards } from "./_components/BalanceCards";
import { RecentPayments } from "./_components/RecentPayments";
import { RecentTransfersTable } from "./_components/RecentTransfersTable";
import { RecentRefundsTable } from "./_components/RecentRefundsTable";
import { ConnectedAccountsTable } from "./_components/ConnectedAccountsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail } from "lucide-react";
import { PlatformFeeDisplay } from "@/components/shared/dashboard/PlatformFeeDisplay";

export default function DashboardPage() {
  const { data, isLoading } = useStripeInfo();

  console.log("Stripe Data :", data);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Stripe account overview and analytics
          </p>
        </div>
        <PlatformFeeDisplay />
      </div>

      {/* Account Info and Balance Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-purple-200 bg-purple-50/50 dark:bg-purple-950/20 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="size-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Mail className="size-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm">Stripe Account</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Account ID</p>
                  <p className="font-mono text-xs truncate">
                    {data?.account?.id}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm truncate">{data?.account?.email}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <BalanceCards
          available={data?.balance?.available || 0}
          pending={data?.balance?.pending || 0}
          isLoading={isLoading}
        />
      </div>

      {/* Recent Transfers, Refunds and Connected Accounts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Connected Accounts */}
        <ConnectedAccountsTable
          accounts={data?.accountsList || []}
          isLoading={isLoading}
        />
        {/* Recent Payments */}
        <RecentPayments
          payments={data?.recentPaymentsIntents || []}
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentRefundsTable
          refunds={data?.refundList || []}
          isLoading={isLoading}
        />
        <RecentTransfersTable
          transfers={data?.recentTransfers || []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
