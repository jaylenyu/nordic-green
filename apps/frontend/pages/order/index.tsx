import { DeleteOutlined } from "@ant-design/icons";
import EmptyBox from "@components/UI/EmptyBox";
import SpinnerComponent from "@components/UI/Spinner";
import { Button } from "antd";
import { ORDER_STATUS_MAP } from "constants/order";
import { format } from "date-fns";
import { useDeleteOrder } from "hooks/mutations/useDeleteOrder";
import { useUpdateOrderStatus } from "hooks/mutations/useUpdateOrderStatus";
import { useOrder } from "hooks/queries/useQuery";
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
  const { data: products } = useOrder();

  return (
    <CustomWrap padding="150px 120px">
      <CustomTitle>Orders ({products ? products?.length : 0})</CustomTitle>
      <div>
        {products ? (
          products && products.length > 0 ? (
            products
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
  const { mutate: updateStatus } = useUpdateOrderStatus();
  const { mutate: deleteOrder } = useDeleteOrder();

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
      <div className="flex justify-between relative sm:flex-col sm:justify-center sx:flex-col sx:justify-center">
        <div className="w-2/3 sm:w-full sx:w-full">
          <div className="w-full">
            {props.orderItems.map((orderItem, idx) => (
              <Item key={idx} {...orderItem} status={props.status} />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between ml-10 w-1/3 pt-10 sm:ml-0 sm:px-10 sm:w-full sx:ml-0 sx:px-5 sx:w-full">
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
            <div className="mt-10 lg:mt-5 md:mt-5 sm:mt-5 sx:mt-3">
              {props.status === -1 || props.status === 0 ? (
                <CustomButton
                  onClick={() =>
                    updateStatus({
                      id: props.id,
                      status: 2,
                      userId: Number(props.userId),
                    })
                  }
                >
                  결제처리
                </CustomButton>
              ) : (
                <CustomWhiteButton
                  onClick={() =>
                    updateStatus({
                      id: props.id,
                      status: -1,
                      userId: Number(props.userId),
                    })
                  }
                >
                  취소처리
                </CustomWhiteButton>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end text-sm text-gray-500 border-b py-10 pb-20">
        주문일자 : {format(new Date(props.createAt), "yyyy년 M월 d일 HH:mm:ss")}
      </div>
    </>
  );
};

const Item = (props: OrderItemDetail & { status: number }) => {
  const router = useRouter();
  const quantity = props.quantity;
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
    <div className="flex w-full py-10 border-b justify-between">
      <div className="flex w-4/5">
        <div className="object-cover relative hover:cursor-pointer">
          <Image
            className="rounded-2xl"
            width="200"
            height="200"
            priority
            unoptimized
            src={props.image_url}
            alt={props.name}
            onClick={() => router.push(`/products/${props.productId}`)}
          />
        </div>
        <div className="flex flex-col justify-between ml-10 py-2 sm:ml-5 sx:ml-5 w-full">
          <div className="font-bold md:text-sm sm:text-sm sx:text-sm">
            {props.name}
          </div>
          <div className="text-sm md:text-sx sm:text-sx sx:text-sx">
            <div>가격 : {props.price.toLocaleString()} ₩</div>
            <div>수량 : {quantity} 개</div>
            <div className="font-bold">합계 : {amount.toLocaleString()} ₩</div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {props.status === 2 && (
          <Button
            className="h-8 w-full rounded-full bg-white text-green-800 sm:h-8 sm:text-sm sx:h-8 sx:text-xs"
            onClick={handleComment}
          >
            후기작성
          </Button>
        )}
      </div>
    </div>
  );
};
