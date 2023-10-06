import { DeleteOutlined, SyncOutlined } from "@ant-design/icons";
import CountControl from "@components/CountControl";
import { Cart, OrderItem, products } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BLUR_IMAGE, CATEGORY_MAP } from "constants/products";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRandomProducts } from "../../hooks/useRandomProducts";
import React, { useEffect, useMemo, useState } from "react";
import API_PATHS from "api";
import { CartItem } from "types/type";
import {
  CartInfoContent,
  CustomButton,
  CustomTitle,
  CustomWhiteWrap,
  CustomWrap,
  ItemList,
  ItemTitle,
} from "styles/common.styled";
import { Button, Card } from "antd";
import EmptyBox from "@components/EmptyBox";
import SpinnerComponent from "@components/Spinner";

export default function CartPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery<{ items: CartItem[] }, unknown, CartItem[]>(
    [API_PATHS.CART.GET],
    () => axios.get(API_PATHS.CART.GET).then((res) => res.data.items)
  );

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >([API_PATHS.PRODUCT.RECOMMENDED], () =>
    axios.get(API_PATHS.PRODUCT.RECOMMENDED).then((res) => res.data.items)
  );

  const randomProducts = useMemo(
    () => useRandomProducts(products || [], 5),
    [products]
  );

  const { mutate: deleteCart } = useMutation<unknown, unknown, number, any>(
    async (id) => {
      try {
        const { data } = await axios.post(API_PATHS.CART.DELETE, {
          id,
        });
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries([API_PATHS.CART.GET]);
        const prev = queryClient.getQueriesData([API_PATHS.CART.GET]);
        queryClient.setQueryData<Cart[]>([API_PATHS.CART.GET], (old) =>
          old?.filter((category) => category.id !== id)
        );
        return { prev };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([API_PATHS.CART.GET], context.prev);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([API_PATHS.CART.GET]);
      },
    }
  );

  const { mutate: addOrder } = useMutation<
    unknown,
    unknown,
    Omit<OrderItem, "id">[],
    any
  >(
    async (items) => {
      try {
        const { data } = await axios.post(API_PATHS.ORDER.ADD, {
          items,
        });
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: () => {
        queryClient.invalidateQueries([API_PATHS.ORDER.GET]);
      },
      onSuccess: () => {
        alert("결제화면으로 이동합니다.");
        router.push("/order");
        data?.forEach((cartItem) => {
          deleteCart(cartItem.id);
        });
      },
    }
  );

  const amount = useMemo(() => {
    if (data == null) {
      return 0;
    }
    return data
      ?.map((item) => Number(item.amount))
      .reduce((prev, curr) => prev + curr, 0);
  }, [data]);

  const handleOrder = () => {
    if (data == null) {
      return;
    }
    addOrder(
      data.map((cart) => ({
        productId: cart.productId,
        price: cart.price,
        amount: cart.amount,
        quantity: cart.quantity,
      }))
    );
  };

  return (
    <>
      <CustomWrap>
        <CustomTitle>Carts ({data ? data?.length : 0})</CustomTitle>
        <div className="flex relative justify-center">
          <div className="w-2/3">
            {data ? (
              data.length > 0 ? (
                data?.map((item, idx) => (
                  <Item key={idx} {...item} deleteCart={deleteCart} />
                ))
              ) : (
                <EmptyBox />
              )
            ) : (
              <SpinnerComponent />
            )}
          </div>
          {data && data.length !== 0 ? (
            <div className="px-10 mt-10 w-1/3">
              <div className="sticky top-32">
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
                <CustomButton className="mt-10" onClick={handleOrder}>
                  결제하기
                </CustomButton>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </CustomWrap>
      <CustomWhiteWrap>
        <CustomTitle>추천상품</CustomTitle>
        <div className="grid grid-cols-5 gap-5">
          {randomProducts?.map((item) => (
            <Card
              className="w-full"
              hoverable
              bordered={false}
              key={item.id}
              onClick={() => router.push(`/products/${item.id}`)}
              cover={
                <Image
                  alt={item.name}
                  src={item.image_url ?? ""}
                  width={1000}
                  height={1000}
                  priority={true}
                  unoptimized
                  className="rounded"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={BLUR_IMAGE}
                />
              }
            >
              <div className="h-8 font-bold truncate">{item.name}</div>
              <div className="text-zinc-400">
                {CATEGORY_MAP[item.category_id - 1]}
              </div>
              <div>{item.price.toLocaleString()}₩</div>
            </Card>
          ))}
        </div>
      </CustomWhiteWrap>
    </>
  );
}

const Item = (props: CartItem & { deleteCart: (id: number) => void }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { deleteCart } = props;
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity);
  const [amount, setAmount] = useState<number>(props.quantity);

  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * Number(props.price));
    }
  }, [quantity, props.price]);

  const { mutate: updateCart } = useMutation<unknown, unknown, Cart, any>(
    async (item) => {
      try {
        const { data } = await axios.post(API_PATHS.CART.UPDATE, {
          item,
        });
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: async (item) => {
        await queryClient.cancelQueries([API_PATHS.CART.GET]);
        const prev = queryClient.getQueryData([API_PATHS.CART.GET]);
        queryClient.setQueryData<Cart[]>([API_PATHS.CART.GET], (old) =>
          old?.map((category) => (category.id === item.id ? item : category))
        );
        return { prev };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([API_PATHS.CART.GET], context.prev);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([API_PATHS.CART.GET]);
      },
    }
  );

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
      <Image
        className="rounded-xl hover:cursor-pointer"
        src={props.image_url}
        width={150}
        height={150}
        priority={true}
        unoptimized
        alt={props.name}
        onClick={() => router.push(`/products/${props.productId}`)}
      />
      <div className="w-full flex flex-col ml-5 justify-between">
        <div>
          <ItemTitle>{props.name}</ItemTitle>
          <span>가격 : {props.price.toLocaleString()} ₩</span>
        </div>
        <div className="flex w-full justify-between">
          <div>
            <span>수량 : </span>
            <CountControl
              value={quantity}
              setValue={setQuantity}
              disabled={false}
            />
            <Button
              className="ml-3 text-sm"
              icon={<SyncOutlined />}
              onClick={handleItemUpdate}
            >
              적용하기
            </Button>
          </div>
          <div>
            총 금액 :{" "}
            <span className="font-bold">{amount.toLocaleString()} ₩</span>
          </div>
        </div>
      </div>
      <DeleteOutlined
        className="absolute right-0 hover:cursor-pointer text-2xl opacity-50"
        onClick={handleItemDelete}
      />
    </ItemList>
  );
};
