'use client'

import { ServiceProvider } from '@/types/serviceProvider'
import { VerificationCard } from './VerificationCard'
import { Button } from '@/components/ui/button'

interface VerificationTabsProps {
  providers: ServiceProvider[]
  activeTab: 'pending' | 'approved' | 'rejected'
  onTabChange: (tab: 'pending' | 'approved' | 'rejected') => void
  onApprove: (providerId: string) => void
  onReject: (providerId: string) => void
  onViewDetails: (provider: ServiceProvider) => void
}

export function VerificationTabs({
  providers,
  activeTab,
  onTabChange,
  onApprove,
  onReject,
  onViewDetails,
}: VerificationTabsProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b">
        <Button
          variant={activeTab === 'pending' ? 'default' : 'ghost'}
          onClick={() => onTabChange('pending')}
          className="rounded-b-none"
        >
          Pending
        </Button>
        <Button
          variant={activeTab === 'approved' ? 'default' : 'ghost'}
          onClick={() => onTabChange('approved')}
          className="rounded-b-none"
        >
          Approved
        </Button>
        <Button
          variant={activeTab === 'rejected' ? 'default' : 'ghost'}
          onClick={() => onTabChange('rejected')}
          className="rounded-b-none"
        >
          Rejected
        </Button>
      </div>

      <div className="space-y-4">
        {providers.length === 0 ? (
          <div className="border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">
              No {activeTab} verifications found
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <VerificationCard
                key={provider.id}
                provider={provider}
                onApprove={onApprove}
                onReject={onReject}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
