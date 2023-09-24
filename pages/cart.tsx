import { DeleteOutlined, SyncOutlined } from "@ant-design/icons";
import CountControl from "@components/CountControl";
import { Cart, products } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BLUR_IMAGE, CATEGORY_MAP } from "constants/products";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

interface CartItem extends Cart {
  name: string;
  price: number;
  image_url: string;
}

export const CART_QUERY_KEY = "/api/get-cart";

export default function CartPage() {
  const router = useRouter();

  const { data } = useQuery<{ items: CartItem[] }, unknown, CartItem[]>(
    [CART_QUERY_KEY],
    () =>
      fetch(CART_QUERY_KEY)
        .then((res) => res.json())
        .then((data) => data.items)
  );

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    ["/api/get-products?skip=0&take=3"],
    () => fetch("/api/get-products?skip=0&take=3").then((res) => res.json()),
    {
      select: (data) => data.items,
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
    console.log({ data }, "주문오더접수");
  };

  return (
    <div>
      <span>Cart ({data ? data?.length : 0})</span>
      <div className="flex felx-col">
        <div>
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
        <div>
          <span>info</span>
          <div>
            <span>금액 : </span>
            <span>{amount?.toLocaleString()} 원</span>
          </div>
          <div>
            <span>배송비 : </span>
            <span>0 원</span>
          </div>
          <div>
            <span>할인금액 : </span>
            <span>0 원</span>
          </div>
          <div>
            <span>결제금액 : </span>
            <span>{amount?.toLocaleString()} 원</span>
          </div>
          <button onClick={handleOrder}>결제하기</button>
        </div>
      </div>
      <div>
        <p>추천상품</p>
        <div className="flex">
          {products?.map((item) => (
            <div
              key={item.id}
              className="max-w-xs border"
              onClick={() => router.push(`/products/${item.id}`)}
            >
              <Image
                className="rounded"
                alt={item.name}
                src={item.image_url ?? ""}
                width={120}
                height={120}
                placeholder="blur"
                blurDataURL={BLUR_IMAGE}
              />
              <div>
                <div className="h-12">{item.name}</div>
                <div className="text-zinc-400">
                  {CATEGORY_MAP[item.category_id - 1]}
                </div>
                <div>{item.price.toLocaleString()}원</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
        const { data } = await axios.post("api/update-cart", {
          item,
        });
        console.log("update", data.item);
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: async (item) => {
        await queryClient.cancelQueries([CART_QUERY_KEY]);

        const prev = queryClient.getQueriesData([CART_QUERY_KEY]);

        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) =>
          old?.filter((category) => category.id !== item.id).concat(item)
        );
        return { prev };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([CART_QUERY_KEY], context.prev);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
      },
    }
  );

  const { mutate: deleteCart } = useMutation<unknown, unknown, number, any>(
    async (id) => {
      try {
        const { data } = await axios.post("api/delete-cart", {
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
        await queryClient.cancelQueries([CART_QUERY_KEY]);

        const prev = queryClient.getQueriesData([CART_QUERY_KEY]);

        queryClient.setQueryData<Cart[]>([CART_QUERY_KEY], (old) =>
          old?.filter((category) => category.id !== id)
        );
        return { prev };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([CART_QUERY_KEY], context.prev);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY]);
      },
    }
  );

  const handleItemDelete = async () => {
    console.log(`${props.name} 삭제`);
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
    <div>
      <Image
        src={props.image_url}
        width={150}
        height={200}
        alt={props.name}
        onClick={() => router.push(`/products/${props.productId}`)}
      />
      <div>
        <span>{props.name}</span>
        <span>가격 : {props.price.toLocaleString()} 원</span>
      </div>
      <div>
        <CountControl value={quantity} setValue={setQuantity} />
        <SyncOutlined onClick={handleItemUpdate} />
      </div>
      <span>{amount.toLocaleString()}</span>
      <DeleteOutlined onClick={handleItemDelete} />
    </div>
  );
};
