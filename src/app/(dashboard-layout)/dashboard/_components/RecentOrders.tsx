import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'

export function RecentOrders() {
  const orders = [
    {
      id: 'ord1',
      customer: 'John Doe',
      service: 'Plumbing',
      amount: '$150',
      status: 'completed',
      time: '2024-11-08T10:00:00Z',
    },
    {
      id: 'ord2',
      customer: 'Jane Smith',
      service: 'Electrical',
      amount: '$200',
      status: 'in-progress',
      time: '2024-11-08T09:30:00Z',
    },
    {
      id: 'ord3',
      customer: 'Mike Johnson',
      service: 'Cleaning',
      amount: '$300',
      status: 'pending',
      time: '2024-11-08T08:45:00Z',
    },
    {
      id: 'ord4',
      customer: 'Sarah Williams',
      service: 'Carpentry',
      amount: '$120',
      status: 'completed',
      time: '2024-11-07T16:20:00Z',
    },
    {
      id: 'ord5',
      customer: 'David Brown',
      service: 'Painting',
      amount: '$400',
      status: 'pending',
      time: '2024-11-07T14:10:00Z',
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>
      case 'in-progress':
        return <Badge className="bg-blue-500">In Progress</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
            <div className="flex-1">
              <p className="font-medium">{order.customer}</p>
              <p className="text-sm text-muted-foreground">{order.service}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(order.time), { addSuffix: true })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-semibold text-green-600">{order.amount}</p>
              {getStatusBadge(order.status)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
