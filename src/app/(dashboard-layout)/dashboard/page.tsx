import { StatsCards } from './_components/StatsCards'
import { RecentOrders } from './_components/RecentOrders'
import { RecentReviews } from './_components/RecentReviews'
import { QuickActions } from './_components/QuickActions'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <QuickActions />
        <RecentReviews />
      </div>

      <RecentOrders />
    </div>
  )
}
