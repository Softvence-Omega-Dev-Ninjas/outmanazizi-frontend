"use client";

import { useState, useMemo } from "react";
import { ServiceProvider } from "@/types/serviceProvider";
import { VerificationStats } from "./_components/VerificationStats";
import { VerificationTabs } from "./_components/VerificationTabs";
import { ProviderDetailsDialog } from "../service-provider/_components/ProviderDetailsDialog";
import {
  useVerifications,
  useRejectProvider,
  useApproveProvider,
} from "@/hooks/useVerifications";

type VerificationStatus = "pending" | "approved" | "rejected";

export default function VerificationsPage() {
  const { data: providers = [] } = useVerifications();
  const rejectProviderMutation = useRejectProvider();
  const approveProviderMutation = useApproveProvider();
  const [activeTab, setActiveTab] = useState<VerificationStatus>("pending");
  const [selectedProvider, setSelectedProvider] =
    useState<ServiceProvider | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const stats = useMemo(() => {
    const pending = providers.filter(
      (p: ServiceProvider) => !p.isVerifiedFromAdmin && !p.user.isBlocked
    ).length;
    const approved = providers.filter(
      (p: ServiceProvider) => p.isVerifiedFromAdmin
    ).length;
    const rejected = providers.filter(
      (p: ServiceProvider) => p.user.isBlocked
    ).length;
    return { pending, approved, rejected, total: providers.length };
  }, [providers]);

  const filteredProviders = useMemo(() => {
    if (activeTab === "pending") {
      return providers.filter(
        (p: ServiceProvider) => !p.isVerifiedFromAdmin && !p.user.isBlocked
      );
    } else if (activeTab === "approved") {
      return providers.filter((p: ServiceProvider) => p.isVerifiedFromAdmin);
    } else {
      return providers.filter((p: ServiceProvider) => p.user.isBlocked);
    }
  }, [providers, activeTab]);

  const handleApprove = (providerId: string) => {
    const provider = providers.find(
      (p: ServiceProvider) => p.id === providerId
    );
    if (provider) {
      approveProviderMutation.mutate(provider.userId);
    }
  };

  const handleReject = (providerId: string) => {
    const provider = providers.find(
      (p: ServiceProvider) => p.id === providerId
    );
    if (provider) {
      rejectProviderMutation.mutate(provider.userId);
    }
  };

  const handleViewDetails = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setShowDetailsDialog(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Service Provider Verifications</h1>
        <p className="text-muted-foreground">
          Review and verify service provider applications
        </p>
      </div>

      <VerificationStats
        pending={stats.pending}
        approved={stats.approved}
        rejected={stats.rejected}
        total={stats.total}
      />

      <VerificationTabs
        providers={filteredProviders}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onApprove={handleApprove}
        onReject={handleReject}
        onViewDetails={handleViewDetails}
      />

      {selectedProvider && (
        <ProviderDetailsDialog
          provider={selectedProvider}
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
        />
      )}
    </div>
  );
}
