'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Spin, message } from 'antd';

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
        await widget.renderPaymentMethods({
          selector: '#payment-widget',
          variantKey: 'DEFAULT',
        });
        await widget.renderAgreement({ selector: '#agreement' });

        setReady(true);
      } catch (err) {
        message.error('결제 모듈 로드에 실패했습니다.');
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
        message.error('결제 요청에 실패했습니다.');
      }
    }
  };

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">결제하기</h1>

      <div className="mb-4 rounded-xl bg-gray-50 p-4">
        <p className="text-sm text-gray-500">주문명</p>
        <p className="font-semibold">{orderName}</p>
        <p className="mt-1 text-sm text-gray-500">결제 금액</p>
        <p className="text-xl font-bold text-green-700">₩{amount.toLocaleString()}</p>
      </div>

      {!ready && (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      )}

      <div id="payment-widget" className="mb-4" />
      <div id="agreement" className="mb-6" />

      {ready && (
        <div className="flex gap-3">
          <Button size="large" block onClick={() => router.back()}>
            취소
          </Button>
          <Button
            type="primary"
            size="large"
            block
            onClick={handlePayment}
            className="bg-green-700 hover:bg-green-800"
          >
            결제하기
          </Button>
        </div>
      )}
    </main>
  );
}
