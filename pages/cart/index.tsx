import { DeleteOutlined, SyncOutlined } from "@ant-design/icons";
import CountControl from "@components/CountControl";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRandomProducts } from "../../hooks/useRandomProducts";
import React, { useEffect, useMemo, useState } from "react";
import { CartItem } from "types/type";
import {
  CartInfoContent,
  CustomButton,
  CustomTitle,
  CustomWrap,
  ItemList,
  ItemTitle,
} from "styles/common.styled";
import { Button } from "antd";
import EmptyBox from "@components/EmptyBox";
import SpinnerComponent from "@components/Spinner";
import ProductCard from "@components/ProductCard";
import { useScreenWidth } from "hooks/useScreenWidth";
import { useCart, useRecommend } from "hooks/queries/useQuery";
import { useDeleteCart } from "hooks/mutations/useDeleteCart";
import { useAddOrder } from "hooks/mutations/useAddOrder";
import { useUpdateCart } from "hooks/mutations/useUpdateCart";

export default function CartPage() {
  const screenWidth = useScreenWidth();
  const { data: product } = useCart();
  const { data: products } = useRecommend();
  const { mutate: deleteCart } = useDeleteCart();
  const { mutate: addOrder } = useAddOrder();
  const randomProducts = useMemo(
    () => useRandomProducts(products || [], 4),
    [products]
  );

  const amount = useMemo(() => {
    if (product == null) {
      return 0;
    }
    return product
      ?.map((item) => Number(item.amount))
      .reduce((prev, curr) => prev + curr, 0);
  }, [product]);

  const handleOrder = () => {
    if (product == null) {
      return;
    }
    addOrder(
      product.map((cart) => ({
        productId: cart.productId,
        price: cart.price,
        amount: cart.amount,
        quantity: cart.quantity,
      }))
    );
  };

  return (
    <>
      <CustomWrap padding="150px 120px">
        <CustomTitle>Carts ({product ? product?.length : 0})</CustomTitle>
        <div className="flex relative justify-center sm:flex-col sx:flex-col">
          <div className="w-2/3 sm:w-full sx:w-full">
            {product ? (
              product.length > 0 ? (
                product?.map((item, idx) => (
                  <Item key={idx} {...item} deleteCart={deleteCart} />
                ))
              ) : (
                <EmptyBox />
              )
            ) : (
              <SpinnerComponent />
            )}
          </div>
          {product && product.length !== 0 ? (
            <div className="px-10 my-10  w-1/3 sm:w-full sx:w-full">
              <div className="sticky top-32 grid gap-2">
                <div className="text-2xl mb-10">Info</div>
                <CartInfoContent>
                  <span>금액</span>
                  <div>{amount?.toLocaleString()} ₩</div>
                </CartInfoContent>
                <CartInfoContent>
                  <span>배송비</span>
                  <span>0 ₩</span>
                </CartInfoContent>
                <CartInfoContent className="border-b mb-5">
                  <span>할인금액</span>
                  <span>0 ₩</span>
                </CartInfoContent>
                <CartInfoContent className="border-b mb-5">
                  <span>결제금액</span>
                  <span className="font-bold">
                    {amount?.toLocaleString()} ₩
                  </span>
                </CartInfoContent>
                <CustomButton
                  className="mt-10 lg:mt-5 md:mt-5 sm:mt-5 sx:mt-3"
                  onClick={handleOrder}
                >
                  결제하기
                </CustomButton>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </CustomWrap>
      {screenWidth >= 680 && (
        <div className="px-20 py-20 bg-white">
          <CustomTitle>추천상품</CustomTitle>
          <div className="grid grid-cols-4 gap-5">
            {randomProducts?.map((item, idx) => (
              <ProductCard key={idx} products={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const Item = (props: CartItem & { deleteCart: (id: number) => void }) => {
  const router = useRouter();
  const { deleteCart } = props;
  const { mutate: updateCart } = useUpdateCart();
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity);
  const [amount, setAmount] = useState<number>(props.quantity);

  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * Number(props.price));
    }
  }, [quantity, props.price]);

  const handleItemDelete = async () => {
    const isConfirmed = window.confirm("삭제하시겠습니까?");

    if (isConfirmed) {
      await deleteCart(props.id);
    } else {
      return;
    }
  };

  const handleItemUpdate = () => {
    if (quantity == null) {
      alert("최소 수량을 선택하세요.");
      return;
    }
    updateCart({
      ...props,
      quantity: quantity,
      amount: props.price * quantity,
    });
  };

  return (
    <ItemList>
      <div className="block">
        <Image
          className="rounded-xl hover:cursor-pointer"
          src={props.image_url}
          width={150}
          height={150}
          priority
          unoptimized
          alt={props.name}
          onClick={() => router.push(`/products/${props.productId}`)}
        />
      </div>
      <div className="w-full flex flex-col ml-5 justify-between">
        <div>
          <ItemTitle>{props.name}</ItemTitle>
          <span className="md:text-sm sm:text-sm sx:text-sm">
            가격 : {props.price.toLocaleString()} ₩
          </span>
        </div>
        <div className="flex w-full justify-between lg:flex-col md:flex-col sm:flex-col sx:flex-col">
          <div className="flex items-center sx:items-start sx:flex-col">
            <div>
              <span className="mr-2 md:text-sm sm:text-sm sx:text-sm">
                수량 :{" "}
              </span>
              <CountControl
                value={quantity}
                setValue={setQuantity}
                disabled={false}
              />
            </div>
            <Button
              className="flex items-center ml-3 sx:ml-0 sm:flex sm:items-center"
              icon={<SyncOutlined />}
              onClick={handleItemUpdate}
            >
              적용하기
            </Button>
          </div>
          <div className="md:text-sm sm:text-sm sx:text-sm">
            총 금액 :{" "}
            <span className="font-bold">{amount.toLocaleString()} ₩</span>
          </div>
        </div>
      </div>
      <DeleteOutlined
        className="absolute right-5 hover:cursor-pointer text-2xl opacity-50"
        onClick={handleItemDelete}
      />
    </ItemList>
  );
};
