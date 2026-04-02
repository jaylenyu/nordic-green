'use client';

import EmptyBox from '@/components/ui/EmptyBox';
import SpinnerComponent from '@/components/ui/Spinner';
import { ORDER_STATUS_MAP } from 'constants/order';
import { format } from 'date-fns';
import { useDeleteOrder } from '@/hooks/mutations/useDeleteOrder';
import { useUpdateOrderStatus } from '@/hooks/mutations/useUpdateOrderStatus';
import { useOrder } from '@/hooks/queries/useQuery';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { OrderDetail, OrderItemDetail } from '@/types/type';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const STATUS_CLASS: Record<number, string> = {
  0: 'bg-muted text-muted-foreground',
  1: 'bg-blue-100 text-blue-700',
  2: 'bg-primary/10 text-primary',
  3: 'bg-cyan-100 text-cyan-700',
  4: 'bg-sky-100 text-sky-700',
  5: 'bg-green-100 text-green-700',
  6: 'bg-red-100 text-red-700',
  7: 'bg-orange-100 text-orange-700',
};

export default function OrderPage() {
  const { data: orders } = useOrder();

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        <h1 className="text-2xl font-bold mb-8">Orders ({orders?.length ?? 0})</h1>
        <div className="space-y-6">
          {orders ? (
            orders.length > 0 ? (
              [...orders]
                .reverse()
                .map((item: OrderDetail, idx: number) => <DetailItem key={idx} {...item} />)
            ) : (
              <EmptyBox />
            )
          ) : (
            <SpinnerComponent />
          )}
        </div>
      </div>
    </main>
  );
}

const DetailItem = (props: OrderDetail) => {
  const { mutate: updateStatus } = useUpdateOrderStatus();
  const { mutate: deleteOrder } = useDeleteOrder();
  const total = props.orderItems.map((i) => i.amount).reduce((a, b) => a + b, 0);

  const handleOrderDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) await deleteOrder(props.id);
  };

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Badge className={cn('border-0', STATUS_CLASS[props.status] ?? STATUS_CLASS[0])}>
            {ORDER_STATUS_MAP[props.status + 1]}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {format(new Date(props.createAt), 'yyyy년 M월 d일 HH:mm')}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">{total.toLocaleString()} ₩</span>
          <button
            onClick={handleOrderDelete}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {props.orderItems.map((orderItem, idx) => (
          <Item key={idx} {...orderItem} status={props.status} />
        ))}
      </div>

      <div className="px-5 py-4 border-t border-border flex justify-end gap-2">
        {props.status === -1 || props.status === 0 ? (
          <Button size="sm" onClick={() => updateStatus({ orderId: props.id, status: 2 })}>
            결제처리
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateStatus({ orderId: props.id, status: -1 })}
          >
            취소처리
          </Button>
        )}
      </div>
    </div>
  );
};

const Item = (props: OrderItemDetail & { status: number }) => {
  const router = useRouter();
  const quantity = props.quantity;
  const [amount, setAmount] = useState<number>(props.quantity);

  useEffect(() => {
    if (quantity != null) setAmount(quantity * Number(props.price));
  }, [quantity, props.price]);

  return (
    <div className="flex gap-4 px-5 py-4">
      <Image
        className="rounded-md object-cover cursor-pointer shrink-0"
        width={80}
        height={80}
        priority
        unoptimized
        src={props.image_url}
        alt={props.name}
        onClick={() => router.push(`/products/${props.productId}`)}
      />
      <div className="flex flex-1 justify-between items-start min-w-0 gap-4">
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate">{props.name}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {props.price.toLocaleString()} ₩ × {quantity}개
          </p>
          <p className="text-sm font-medium mt-0.5">{amount.toLocaleString()} ₩</p>
        </div>
        {props.status === 2 && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/comment/edit?orderItemIds=${props.id}`)}
          >
            후기작성
          </Button>
        )}
      </div>
    </div>
  );
};
