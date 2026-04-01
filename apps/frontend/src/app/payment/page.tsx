'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const amount = Number(searchParams.get('amount') ?? 0);
  const orderName = searchParams.get('orderName') ?? '상품 결제';

  const paymentWidgetRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ?? '';

  useEffect(() => {
    if (!orderId || !amount || !clientKey) return;

    async function initWidget() {
      try {
        const { loadTossPayments } = await import('@tosspayments/tosspayments-sdk');
        const tossPayments = await loadTossPayments(clientKey);

        const widget = tossPayments.widgets({ customerKey: 'ANONYMOUS' });
        paymentWidgetRef.current = widget;

        await widget.setAmount({ currency: 'KRW', value: amount });
        await widget.renderPaymentMethods({ selector: '#payment-widget', variantKey: 'DEFAULT' });
        await widget.renderAgreement({ selector: '#agreement' });

        setReady(true);
      } catch {
        toast.error('결제 모듈 로드에 실패했습니다.');
      }
    }

    initWidget();
  }, [orderId, amount, clientKey]);

  const handlePayment = async () => {
    if (!paymentWidgetRef.current) return;
    try {
      await paymentWidgetRef.current.requestPayment({
        orderId: orderId!,
        orderName,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
        customerEmail: undefined,
        customerName: undefined,
      });
    } catch (err: any) {
      if (err?.code !== 'USER_CANCEL') {
        toast.error('결제 요청에 실패했습니다.');
      }
    }
  };

  return (
    <main className="min-h-screen pt-16">
      <div className="mx-auto max-w-xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold">결제하기</h1>

        <div className="mb-4 rounded-lg border border-border bg-muted/40 p-4 space-y-1">
          <p className="text-xs text-muted-foreground">주문명</p>
          <p className="font-semibold">{orderName}</p>
          <p className="text-xs text-muted-foreground mt-2">결제 금액</p>
          <p className="text-xl font-bold text-primary">₩{amount.toLocaleString()}</p>
        </div>

        {!ready && (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}

        <div id="payment-widget" className="mb-4" />
        <div id="agreement" className="mb-6" />

        {ready && (
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => router.back()}>
              취소
            </Button>
            <Button className="flex-1" onClick={handlePayment}>
              결제하기
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
