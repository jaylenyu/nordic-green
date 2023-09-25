import { CloseOutlined } from "@ant-design/icons";
import CountControl from "@components/CountControl";
import { Cart } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ORDER_GET_QUERY_KEY, ORDER_UPDATE_QUERY_KEY } from "api";
import axios from "axios";
import { ORDER_STATUS_MAP } from "constants/order";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { OrderDetail, OrderItemDetail } from "types/type";

export default function MyPage() {
  const router = useRouter();

  const { data } = useQuery<{ items: OrderDetail[] }, unknown, OrderDetail[]>(
    [ORDER_GET_QUERY_KEY],
    () => axios.get(ORDER_GET_QUERY_KEY).then((res) => res.data.items)
  );

  return (
    <div>
      <span className="text-2xl">주문내역 ({data ? data?.length : 0})</span>
      <div className="border">
        {data ? (
          data.length > 0 ? (
            data?.map((item, idx) => <DetailItem key={idx} {...item} />)
          ) : (
            <p>주문내역에 아무것도 없습니다.</p>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

const DetailItem = (props: OrderDetail) => {
  const queryClient = useQueryClient();

  const { mutate: updateOrderStatus } = useMutation<
    unknown,
    unknown,
    number,
    any
  >(
    async (status) => {
      try {
        const { data } = await axios.post(ORDER_UPDATE_QUERY_KEY, {
          id: props.id,
          status: status,
          userId: props.userId,
        });
        console.log("update", data.item);
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: async (status) => {
        await queryClient.cancelQueries([ORDER_GET_QUERY_KEY]);

        const prev = queryClient.getQueryData([ORDER_GET_QUERY_KEY]);

        queryClient.setQueryData<Cart[]>([ORDER_GET_QUERY_KEY], (old) =>
          old?.map((category) => {
            if (category.id === props.id) {
              return { ...category, status: status };
            }
            return category;
          })
        );
        return { prev };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([ORDER_GET_QUERY_KEY], context.prev);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([ORDER_GET_QUERY_KEY]);
      },
    }
  );

  return (
    <div>
      <div>
        <span>{ORDER_STATUS_MAP[props.status + 1]}</span>
        <span>
          <CloseOutlined onClick={() => updateOrderStatus(-1)} />
        </span>
        {props.orderItems.map((orderItem, idx) => (
          <Item key={idx} {...orderItem} status={props.status} />
        ))}
      </div>
      <div>
        <div>주문정보</div>
        <div>받는사람 : {props.receiver ?? "입력필요"}</div>
        <div>주소 : {props.address ?? "입력필요"}</div>
        <div>연락처 : {props.phoneNumber ?? "입력필요"}</div>
      </div>
      <div>
        합계 금액 :{" "}
        {props.orderItems
          .map((item) => item.amount)
          .reduce((prev, curr) => prev + curr, 0)
          .toLocaleString()}
        원
      </div>
      <span>
        주문일자 : {format(new Date(props.createAt), "yyyy년 M월 d일 HH:mm:ss")}
      </span>
      <button onClick={() => updateOrderStatus(5)}>결제처리</button>
    </div>
  );
};

const Item = (props: OrderItemDetail & { status: number }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity);
  const [amount, setAmount] = useState<number>(props.quantity);

  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * Number(props.price));
    }
  }, [quantity, props.price]);

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
      </div>
      <span>{amount.toLocaleString()}</span>
    </div>
  );
};
