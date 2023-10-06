import { DeleteOutlined } from "@ant-design/icons";
import EmptyBox from "@components/EmptyBox";
import SpinnerComponent from "@components/Spinner";
import { Cart } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import {
  ORDER_DELETE_QUERY_KEY,
  ORDER_GET_QUERY_KEY,
  ORDER_UPDATE_QUERY_KEY,
} from "api";
import axios from "axios";
import { ORDER_STATUS_MAP } from "constants/order";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  CustomTitle,
  CustomWhiteButton,
  CustomWrap,
} from "styles/common.styled";
import { OrderDetail, OrderItemDetail } from "types/type";

export default function MyPage() {
  const router = useRouter();

  const { data } = useQuery<{ items: OrderDetail[] }, unknown, OrderDetail[]>(
    [ORDER_GET_QUERY_KEY],
    () => axios.get(ORDER_GET_QUERY_KEY).then((res) => res.data.items)
  );

  return (
    <CustomWrap>
      <CustomTitle>Orders ({data ? data?.length : 0})</CustomTitle>
      <div>
        {data ? (
          data.length > 0 ? (
            data
              ?.map((item, idx) => <DetailItem key={idx} {...item} />)
              .reverse()
          ) : (
            <EmptyBox />
          )
        ) : (
          <SpinnerComponent />
        )}
      </div>
    </CustomWrap>
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

  const { mutate: deleteOrder } = useMutation<unknown, unknown, number, any>(
    async (id) => {
      try {
        const { data } = await axios.post(ORDER_DELETE_QUERY_KEY, {
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
        await queryClient.cancelQueries([ORDER_GET_QUERY_KEY]);
        const prev = queryClient.getQueriesData([ORDER_GET_QUERY_KEY]);
        queryClient.setQueryData<Cart[]>([ORDER_GET_QUERY_KEY], (old) =>
          old?.filter((category) => category.id !== id)
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

  const handleOrderDelete = async () => {
    const isConfirmed = window.confirm("삭제하시겠습니까?");

    if (isConfirmed) {
      await deleteOrder(props.id);
    } else {
      return;
    }
  };

  return (
    <>
      <div className="flex justify-between relative">
        <div className="w-2/3">
          <div className="w-full">
            {props.orderItems.map((orderItem, idx) => (
              <Item key={idx} {...orderItem} status={props.status} />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between ml-10 w-1/3 ">
          <div className="sticky top-32">
            <div className="text-xl mb-10">주문 정보</div>
            <DeleteOutlined
              onClick={handleOrderDelete}
              className="absolute top-0 right-0 text-2xl hover:cursor-pointer"
            />
            <div className="flex justify-between">
              <div>주문 상태</div>
              <div className="font-bold">
                {ORDER_STATUS_MAP[props.status + 1]}
              </div>
            </div>
            <div className="flex justify-between mt-5 border-b">
              <div>총 주문 금액</div>
              <div className="font-bold">
                {props.orderItems
                  .map((item) => item.amount)
                  .reduce((prev, curr) => prev + curr, 0)
                  .toLocaleString()}{" "}
                ₩
              </div>
            </div>
            <div className="mt-20">
              {props.status === -1 || props.status === 0 ? (
                <CustomButton onClick={() => updateOrderStatus(2)}>
                  결제처리
                </CustomButton>
              ) : (
                <CustomWhiteButton onClick={() => updateOrderStatus(-1)}>
                  취소처리
                </CustomWhiteButton>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end text-sm text-gray-500 border-b py-10 mb-20">
        주문일자 : {format(new Date(props.createAt), "yyyy년 M월 d일 HH:mm:ss")}
      </div>
    </>
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

  const handleComment = () => {
    router.push(`/comment/edit?orderItemIds=${props.id}`);
  };

  return (
    <div className="flex w-full py-3 border-b justify-between">
      <div className="flex w-4/5">
        <div className="object-cover relative hover:cursor-pointer">
          <Image
            className="rounded-2xl"
            width="200"
            height="200"
            priority
            src={props.image_url}
            alt={props.name}
            onClick={() => router.push(`/products/${props.productId}`)}
          />
        </div>
        <div className="flex flex-col justify-between ml-10 w-full">
          <div className="font-bold">{props.name}</div>
          <div className="text-sm">
            <div>가격 : {props.price.toLocaleString()} ₩</div>
            <div>수량 : {quantity} 개</div>
            <div>합계 : {amount.toLocaleString()} ₩</div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {props.status === 2 && (
          <Button className="h-10 rounded-full" onClick={handleComment}>
            후기작성
          </Button>
        )}
      </div>
    </div>
  );
};