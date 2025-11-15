import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserPlus, CheckCircle, FileText, DollarSign } from 'lucide-react'
import Link from 'next/link'

export function QuickActions() {
  const actions = [
    {
      title: 'Verify Providers',
      description: '5 pending verifications',
      icon: CheckCircle,
      href: '/dashboard/verifications',
      color: 'blue',
    },
    {
      title: 'Manage Orders',
      description: '12 active orders',
      icon: FileText,
      href: '/dashboard/order',
      color: 'orange',
    },
    {
      title: 'Process Transfers',
      description: '3 pending transfers',
      icon: DollarSign,
      href: '/dashboard/transfer',
      color: 'green',
    },
    {
      title: 'Add Service',
      description: 'Create new service',
      icon: UserPlus,
      href: '/dashboard/services',
      color: 'purple',
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Button
              variant="outline"
              className="w-full h-auto p-4 flex items-start gap-3 hover:bg-accent"
            >
              <div className={`p-2 rounded-lg ${getColorClasses(action.color)}`}>
                <action.icon className="size-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  )
}
