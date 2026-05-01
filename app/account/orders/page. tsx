import { getCookie } from 'cookies-next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function OrdersPage() {
  const token = getCookie('customerToken');
  if (!token) redirect('/account/login');

  // Mock order data since Customer API needs Admin access
  const orders = [
    { id: '1', orderNumber: 1001, date: '2026-04-15', status: 'Delivered', total: '1,300 BDT' },
    { id: '2', orderNumber: 1002, date: '2026-04-20', status: 'In Transit', total: '2,500 BDT' },
  ];

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <Link href="/account">
            <Button variant="ghost">Back to Account</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border border-border rounded-xl p-4 hover:border-primary transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">Order #{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div className="text-right space-y-1">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'Delivered'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {order.status}
                </span>
                <p className="text-sm font-medium text-primary">{order.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}