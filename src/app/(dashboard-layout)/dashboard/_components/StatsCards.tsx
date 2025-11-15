import { Card } from '@/components/ui/card'
import { Users, Briefcase, ShoppingCart, DollarSign, TrendingUp, TrendingDown } from 'lucide-react'

export function StatsCards() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Service Providers',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: Briefcase,
      color: 'green',
    },
    {
      title: 'Total Orders',
      value: '789',
      change: '+23%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'orange',
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: '-3%',
      trend: 'down',
      icon: DollarSign,
      color: 'purple',
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <div className="flex items-center gap-1 mt-2">
                {stat.trend === 'up' ? (
                  <TrendingUp className="size-4 text-green-500" />
                ) : (
                  <TrendingDown className="size-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
              <stat.icon className="size-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
