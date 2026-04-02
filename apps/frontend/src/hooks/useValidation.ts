'use client';

import { useSession, signIn } from 'next-auth/react';
import { useAddCart } from '@/hooks/mutations/useAddCart';
import { useAddOrder } from '@/hooks/mutations/useAddOrder';
import { useRouter } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useValidation(product: any) {
  const { data: session } = useSession();
  const router = useRouter();
  const { mutate: addCart } = useAddCart();
  const { mutate: addOrder } = useAddOrder();

  const validate = (type: 'cart' | 'order', quantity: number | undefined) => {
    if (!session) {
      alert('로그인 하세요.');
      signIn();
      return;
    }

    if (quantity == null) {
      alert('최소 수량을 입력하세요.');
      return;
    }

    if (type === 'cart') {
      addCart({
        productId: product.id,
        quantity,
        amount: product.price * quantity,
      });
      alert('장바구니에 등록되었습니다.');
    }

    if (type === 'order') {
      addOrder({
        items: [
          {
            productId: product.id,
            quantity,
            amount: product.price * quantity,
            price: product.price,
          },
        ],
      });
      router.push('/order');
    }
  };

  return validate;
}
