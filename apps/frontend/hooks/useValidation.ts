import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useAddOrder } from "hooks/mutations/useAddOrder";
import { useAddCart } from "hooks/mutations/useAddCart";

export default function useValidation(product: any) {
  const { data: session } = useSession();
  const { mutate: addOrder } = useAddOrder();
  const { mutate: addCart } = useAddCart();

  const validate = (type: "cart" | "order", quantity: number | undefined) => {
    if (!session) {
      alert("로그인 하세요.");
      signIn();
      return;
    }

    if (quantity == null) {
      alert("최소 수량을 입력하세요.");
      return;
    }

    if (type === "cart") {
      addCart({
        productId: product.id,
        quantity: quantity,
        amount: product.price * quantity,
      });
      alert("장바구니에 등록되었습니다.");
    }

    if (type === "order") {
      addOrder([
        {
          productId: product.id,
          quantity: quantity,
          amount: product.price * quantity,
          price: product.price,
        },
      ]);
    }
  };

  return validate;
}
