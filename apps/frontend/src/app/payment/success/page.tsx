'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Result, Button, Spin } from 'antd';
import { useConfirmPayment } from '@/hooks/mutations/useConfirmPayment';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const confirmed = useRef(false);

  const paymentKey = searchParams.get('paymentKey') ?? '';
  const orderId = searchParams.get('orderId') ?? '';
  const amount = Number(searchParams.get('amount') ?? 0);

  const { mutate: confirmPayment, isPending, isSuccess, isError } = useConfirmPayment();

  useEffect(() => {
    if (!paymentKey || !orderId || !amount || confirmed.current) return;
    confirmed.current = true;
    confirmPayment({ paymentKey, orderId, amount });
  }, [paymentKey, orderId, amount, confirmPayment]);

  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Spin size="large" />
        <p className="text-gray-500">결제를 확인하고 있습니다...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Result
          status="error"
          title="결제 확인 실패"
          subTitle="결제는 완료되었으나 확인 중 오류가 발생했습니다. 고객센터에 문의해 주세요."
          extra={
            <Button type="primary" onClick={() => router.push('/mypage/orders')} className="bg-green-700">
              주문 내역 확인
            </Button>
          }
        />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Result
        status="success"
        title="결제가 완료되었습니다!"
        subTitle={`주문 번호: ${orderId} · ₩${amount.toLocaleString()}`}
        extra={[
          <Button key="orders" type="primary" onClick={() => router.push('/mypage/orders')} className="bg-green-700">
            주문 내역 보기
          </Button>,
          <Button key="home" onClick={() => router.push('/')}>
            쇼핑 계속하기
          </Button>,
        ]}
      />
    </main>
  );
}
