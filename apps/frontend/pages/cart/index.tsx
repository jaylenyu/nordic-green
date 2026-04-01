import CountControl from "@components/ui/CountControl";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRandomProducts } from "../../hooks/useRandomProducts";
import { useEffect, useMemo, useState } from "react";
import { CartItem } from "types/type";
import { Trash2, RefreshCw } from "lucide-react";
import EmptyBox from "@components/ui/EmptyBox";
import SpinnerComponent from "@components/ui/Spinner";
import ProductCard from "@components/product/ProductCard";
import { useCart, useRecommend } from "hooks/queries/useQuery";
import { useDeleteCart } from "hooks/mutations/useDeleteCart";
import { useAddOrder } from "hooks/mutations/useAddOrder";
import { useUpdateCart } from "hooks/mutations/useUpdateCart";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";

export default function CartPage() {
  const { data: product } = useCart();
  const { data: products } = useRecommend();
  const { mutate: deleteCart } = useDeleteCart();
  const { mutate: addOrder } = useAddOrder();
  const randomProducts = useMemo(() => useRandomProducts(products || [], 4), [products]);

  const amount = useMemo(() => {
    if (!product) return 0;
    return product.map((item) => Number(item.amount)).reduce((a, b) => a + b, 0);
  }, [product]);

  const handleOrder = () => {
    if (!product) return;
    addOrder(product.map((cart) => ({
      productId: cart.productId,
      price: cart.price,
      amount: cart.amount,
      quantity: cart.quantity,
    })));
  };

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        <h1 className="text-2xl font-bold mb-8">Cart ({product?.length ?? 0})</h1>

        <div className="flex gap-10 flex-col lg:flex-row">
          {/* Item List */}
          <div className="flex-1 space-y-4">
            {product ? (
              product.length > 0 ? (
                product.map((item, idx) => (
                  <Item key={idx} {...item} deleteCart={deleteCart} />
                ))
              ) : (
                <EmptyBox />
              )
            ) : (
              <SpinnerComponent />
            )}
          </div>

          {/* Order Summary */}
          {product && product.length > 0 && (
            <div className="lg:w-72 shrink-0">
              <div className="sticky top-24 border border-border rounded-lg p-6 space-y-3">
                <h2 className="font-semibold mb-4">주문 요약</h2>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">금액</span>
                  <span>{amount.toLocaleString()} ₩</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">배송비</span>
                  <span>0 ₩</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">할인금액</span>
                  <span>0 ₩</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm font-bold">
                  <span>결제금액</span>
                  <span>{amount.toLocaleString()} ₩</span>
                </div>
                <Button className="w-full mt-2" size="lg" onClick={handleOrder}>
                  결제하기
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div className="hidden sm:block mt-20">
          <h2 className="text-xl font-bold mb-6">추천상품</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {randomProducts?.map((item, idx) => (
              <ProductCard key={idx} products={item} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

const Item = (props: CartItem & { deleteCart: (id: number) => void }) => {
  const router = useRouter();
  const { deleteCart } = props;
  const { mutate: updateCart } = useUpdateCart();
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity);
  const [amount, setAmount] = useState<number>(props.quantity);

  useEffect(() => {
    if (quantity != null) setAmount(quantity * Number(props.price));
  }, [quantity, props.price]);

  const handleItemDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) await deleteCart(props.id);
  };

  const handleItemUpdate = () => {
    if (!quantity) return;
    updateCart({ ...props, quantity, amount: props.price * quantity });
  };

  return (
    <div className="flex gap-4 p-4 border border-border rounded-lg relative bg-card">
      <Image
        className="rounded-md object-cover cursor-pointer shrink-0"
        src={props.image_url}
        width={100}
        height={100}
        priority
        unoptimized
        alt={props.name}
        onClick={() => router.push(`/products/${props.productId}`)}
      />
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <p className="font-semibold text-sm truncate">{props.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{props.price.toLocaleString()} ₩</p>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
          <div className="flex items-center gap-2">
            <CountControl value={quantity} setValue={setQuantity} disabled={false} />
            <Button size="sm" variant="ghost" onClick={handleItemUpdate}>
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              적용
            </Button>
          </div>
          <p className="text-sm">
            <span className="text-muted-foreground">합계</span>{" "}
            <span className="font-bold">{amount.toLocaleString()} ₩</span>
          </p>
        </div>
      </div>
      <button
        onClick={handleItemDelete}
        className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
