'use client';

import { Tag, Card, Empty, Button } from 'antd';
import { useOrder } from '@/hooks/queries/useQuery';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';

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

const STATUS_COLOR: Record<number, string> = {
  0: 'default', 1: 'processing', 2: 'success',
  3: 'blue', 4: 'cyan', 5: 'green',
  6: 'red', 7: 'orange',
};

export default function OrdersPage() {
  const { data: orders, isLoading } = useOrder();

  if (isLoading) return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">주문 내역</h1>

      {!orders?.length ? (
        <Empty description="주문 내역이 없습니다.">
          <Link href="/products">
            <Button type="primary" className="bg-green-700">쇼핑하러 가기</Button>
          </Link>
        </Empty>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <Card key={order.id} className="rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">
                  {format(new Date(order.createdAt), 'yyyy.MM.dd HH:mm', { locale: ko })}
                </span>
                <Tag color={STATUS_COLOR[order.status]}>{STATUS_LABEL[order.status]}</Tag>
              </div>

              <div className="space-y-2">
                {order.orderItems.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3">
                    {item.product?.imageUrl && (
                      <img src={item.product.imageUrl} alt={item.product.name} className="h-14 w-14 rounded-lg object-cover" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.product?.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity}개 · ₩{item.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 border-t pt-3 text-right">
                <span className="font-semibold">
                  총 ₩{order.orderItems.reduce((s: number, i: any) => s + i.amount, 0).toLocaleString()}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
