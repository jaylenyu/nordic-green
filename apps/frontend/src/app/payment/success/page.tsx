'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useConfirmPayment } from '@/hooks/mutations/useConfirmPayment';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PaymentSuccessPageWrapper() {
  return (
    <Suspense>
      <PaymentSuccessPage />
    </Suspense>
  );
}

function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const confirmed = useRef(false);

  const paymentKey = searchParams.get('paymentKey') ?? '';
  const orderId = searchParams.get('orderId') ?? '';
  const amount = Number(searchParams.get('amount') ?? 0);

  const { mutate: confirmPayment, isPending, isError } = useConfirmPayment();

  useEffect(() => {
    if (!paymentKey || !orderId || !amount || confirmed.current) return;
    confirmed.current = true;
    confirmPayment({ paymentKey, orderId, amount });
  }, [paymentKey, orderId, amount, confirmPayment]);

  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-muted-foreground">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p>결제를 확인하고 있습니다...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-sm text-center">
          <CardContent className="pt-8 pb-6 space-y-4">
            <AlertCircle className="w-14 h-14 mx-auto text-destructive" />
            <div>
              <p className="text-lg font-bold">결제 확인 실패</p>
              <p className="text-sm text-muted-foreground mt-1">
                결제는 완료되었으나 확인 중 오류가 발생했습니다. 고객센터에 문의해 주세요.
              </p>
            </div>
            <Button className="w-full" onClick={() => router.push('/mypage/orders')}>
              주문 내역 확인
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm text-center">
        <CardContent className="pt-8 pb-6 space-y-4">
          <CheckCircle2 className="w-14 h-14 mx-auto text-primary" />
          <div>
            <p className="text-lg font-bold">결제가 완료되었습니다!</p>
            <p className="text-sm text-muted-foreground mt-1">주문 번호: {orderId}</p>
            <p className="text-sm text-muted-foreground">₩{amount.toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => router.push('/')}>
              쇼핑 계속하기
            </Button>
            <Button className="flex-1" onClick={() => router.push('/mypage/orders')}>
              주문 내역 보기
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
