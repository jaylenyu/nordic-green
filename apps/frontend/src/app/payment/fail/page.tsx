'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Result, Button } from 'antd';

export default function PaymentFailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorCode = searchParams.get('code') ?? '';
  const errorMessage = searchParams.get('message') ?? '결제가 취소되었습니다.';
  const orderId = searchParams.get('orderId') ?? '';

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Result
        status="error"
        title="결제에 실패했습니다"
        subTitle={
          <div className="text-center">
            <p>{errorMessage}</p>
            {errorCode && <p className="mt-1 text-xs text-gray-400">오류 코드: {errorCode}</p>}
          </div>
        }
        extra={[
          orderId && (
            <Button
              key="retry"
              type="primary"
              className="bg-green-700"
              onClick={() => router.back()}
            >
              다시 시도
            </Button>
          ),
          <Button key="cart" onClick={() => router.push('/cart')}>
            장바구니로 돌아가기
          </Button>,
        ].filter(Boolean)}
      />
    </main>
  );
}
