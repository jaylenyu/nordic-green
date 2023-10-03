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
import {
  CART_DELETE_QUERY_KEY,
  CART_GET_QUERY_KEY,
  CART_RECOMMENDED_QUERY_KEY,
  CART_UPDATE_QUERY_KEY,
  ORDER_ADD_QUERY_KEY,
  ORDER_GET_QUERY_KEY,
} from "api";
import { CartItem } from "types/type";
import {
  CartInfoContent,
  CustomButton,
  CustomTitle,
  CustomWrap,
  ItemList,
  ItemTitle,
} from "styles/common.styled";
import { Card } from "antd";

export default function CartPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery<{ items: CartItem[] }, unknown, CartItem[]>(
    [CART_GET_QUERY_KEY],
    () => axios.get(CART_GET_QUERY_KEY).then((res) => res.data.items)
  );

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >([CART_RECOMMENDED_QUERY_KEY], () =>
    axios.get(CART_RECOMMENDED_QUERY_KEY).then((res) => res.data.items)
  );

  const randomProducts = useMemo(
    () => useRandomProducts(products || [], 5),
    products
  );

  const { mutate: addOrder } = useMutation<
    unknown,
    unknown,
    Omit<OrderItem, "id">[],
    any
  >(
    async (items) => {
      try {
        const { data } = await axios.post(ORDER_ADD_QUERY_KEY, {
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
        queryClient.invalidateQueries([ORDER_GET_QUERY_KEY]);
      },
      onSuccess: () => {
        alert("결제화면으로 이동합니다.");
        router.push("/mypage");
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
    <CustomWrap>
      <CustomTitle>Cart ({data ? data?.length : 0})</CustomTitle>
      <div className="flex relative">
        <div className="w-2/3">
          {data ? (
            data.length > 0 ? (
              data?.map((item, idx) => <Item key={idx} {...item} />)
            ) : (
              <p>장바구니에 아무것도 없습니다.</p>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="px-10 mt-10 w-1/3">
          <div className="sticky top-10">
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
              <span className="font-bold">{amount?.toLocaleString()} ₩</span>
            </CartInfoContent>
            <CustomButton className="mt-10" onClick={handleOrder}>
              결제하기
            </CustomButton>
          </div>
        </div>
      </div>
      <div className="my-20">
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
      </div>
    </CustomWrap>
  );
}

const Item = (props: CartItem) => {
  const router = useRouter();
  const queryClient = useQueryClient();
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
        const { data } = await axios.post(CART_UPDATE_QUERY_KEY, {
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
        await queryClient.cancelQueries([CART_GET_QUERY_KEY]);

        const prev = queryClient.getQueryData([CART_GET_QUERY_KEY]);

        queryClient.setQueryData<Cart[]>([CART_GET_QUERY_KEY], (old) =>
          old?.map((category) => (category.id === item.id ? item : category))
        );
        return { prev };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([CART_GET_QUERY_KEY], context.prev);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_GET_QUERY_KEY]);
      },
    }
  );

  const { mutate: deleteCart } = useMutation<unknown, unknown, number, any>(
    async (id) => {
      try {
        const { data } = await axios.post(CART_DELETE_QUERY_KEY, {
          id,
        });
        console.log(data);

        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries([CART_GET_QUERY_KEY]);

        const prev = queryClient.getQueriesData([CART_GET_QUERY_KEY]);

        queryClient.setQueryData<Cart[]>([CART_GET_QUERY_KEY], (old) =>
          old?.filter((category) => category.id !== id)
        );
        return { prev };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([CART_GET_QUERY_KEY], context.prev);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_GET_QUERY_KEY]);
      },
    }
  );

  const handleItemDelete = async () => {
    await deleteCart(props.id);
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
        src={props.image_url}
        width={150}
        height={150}
        alt={props.name}
        onClick={() => router.push(`/products/${props.productId}`)}
      />
      <div className="w-full flex flex-col ml-5 justify-between">
        <div>
          <ItemTitle>{props.name}</ItemTitle>
          <span>가격 : {props.price.toLocaleString()} ₩</span>
        </div>
        <div className="flex w-full">
          <div>
            <span>수량 : </span>
            <CountControl
              value={quantity}
              setValue={setQuantity}
              disabled={false}
            />
            <SyncOutlined className="ml-3" onClick={handleItemUpdate} />
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
