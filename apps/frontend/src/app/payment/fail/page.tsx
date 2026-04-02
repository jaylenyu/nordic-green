'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PaymentFailPageWrapper() {
  return (
    <Suspense>
      <PaymentFailPage />
    </Suspense>
  );
}

function PaymentFailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorCode = searchParams.get('code') ?? '';
  const errorMessage = searchParams.get('message') ?? '결제가 취소되었습니다.';
  const orderId = searchParams.get('orderId') ?? '';

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm text-center">
        <CardContent className="pt-8 pb-6 space-y-4">
          <XCircle className="w-14 h-14 mx-auto text-destructive" />
          <div>
            <p className="text-lg font-bold">결제에 실패했습니다</p>
            <p className="text-sm text-muted-foreground mt-1">{errorMessage}</p>
            {errorCode && (
              <p className="text-xs text-muted-foreground mt-0.5">오류 코드: {errorCode}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => router.push('/cart')}>
              장바구니로 돌아가기
            </Button>
            {orderId && (
              <Button className="flex-1" onClick={() => router.back()}>
                다시 시도
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
