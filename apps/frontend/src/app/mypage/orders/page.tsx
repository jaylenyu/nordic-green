'use client';

import { useOrder } from '@/hooks/queries/useQuery';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';
import { PackageOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STATUS_LABEL: Record<number, string> = {
  0: '주문대기',
  1: '결제준비',
  2: '결제완료',
  3: '배송준비',
  4: '배송중',
  5: '배송완료',
  6: '주문취소',
  7: '환불',
};

const STATUS_CLASS: Record<number, string> = {
  0: 'bg-muted text-muted-foreground',
  1: 'bg-blue-100 text-blue-700',
  2: 'bg-green-100 text-green-700',
  3: 'bg-blue-100 text-blue-700',
  4: 'bg-cyan-100 text-cyan-700',
  5: 'bg-emerald-100 text-emerald-700',
  6: 'bg-red-100 text-red-700',
  7: 'bg-orange-100 text-orange-700',
};

export default function OrdersPage() {
  const { data: orders, isLoading } = useOrder();

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        로딩 중...
      </div>
    );

  return (
    <main className="min-h-screen pt-16">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold">주문 내역</h1>

        {!orders?.length ? (
          <div className="flex flex-col items-center gap-4 py-20 text-muted-foreground">
            <PackageOpen className="w-12 h-12" />
            <p>주문 내역이 없습니다.</p>
            <Link href="/products">
              <Button>쇼핑하러 가기</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {orders.map((order: any) => (
              <Card key={order.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(order.createdAt), 'yyyy.MM.dd HH:mm', { locale: ko })}
                    </span>
                    <Badge
                      className={cn('border-0', STATUS_CLASS[order.status] ?? STATUS_CLASS[0])}
                    >
                      {STATUS_LABEL[order.status]}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {order.orderItems.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-3">
                        {item.product?.imageUrl && (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="h-14 w-14 rounded-md object-cover shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.product?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity}개 · ₩{item.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 border-t pt-3 text-right">
                    <span className="font-semibold text-sm">
                      총 ₩
                      {order.orderItems
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .reduce((s: number, i: any) => s + i.amount, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
