import CustomEditor from "@components/Editor";
import { useQuery } from "@tanstack/react-query";
import { Button, Rate } from "antd";
import { ORDER_GET_QUERY_KEY } from "api";
import axios from "axios";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CustomTitle, ItemTitle } from "styles/common.styled";
import { OrderDetail } from "types/type";
import { tooltips } from "constants/comment";

export default function CommentEdit() {
  const router = useRouter();
  const [rate, setRate] = useState(5);
  const { orderItemIds } = router.query;
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );

  const { data } = useQuery<{ items: OrderDetail[] }, unknown, OrderDetail[]>(
    [ORDER_GET_QUERY_KEY],
    () => axios.get(ORDER_GET_QUERY_KEY).then((res) => res.data.items)
  );

  const commentProduct = data
    ?.find((item) =>
      item.orderItems.some((orderItem) => orderItem.id === Number(orderItemIds))
    )
    ?.orderItems.find((orderItem) => orderItem.id === Number(orderItemIds));

  const fetchComment = async () => {
    if (orderItemIds != null) {
      try {
        const response = await axios.get(
          `/api/get-comment?orderItemIds=${orderItemIds}`
        );
        const data = response.data;
        if (data.items.contents) {
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(data.items.contents))
            )
          );
          setRate(data.items.rate);
        } else {
          setEditorState(EditorState.createEmpty());
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchComment();
  }, [orderItemIds]);

  const handleSave = async () => {
    if (editorState && orderItemIds != null) {
      try {
        const response = await axios.post("/api/update-comment", {
          rate: rate,
          orderItemIds: Number(orderItemIds),
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
          images: [],
        });
      } catch (error) {
        console.log(error);
      }
      alert("후기 등록 성공!");
      router.push(`/products/${commentProduct?.productId}`);
    } else {
      alert("후기 등록 실패");
    }
  };

  return (
    <>
      <div className="pt-40 px-60">
        <CustomTitle>후기 작성</CustomTitle>
        <div className="flex items-center justify-center">
          {commentProduct && (
            <>
              <div>
                <Image
                  src={commentProduct?.image_url}
                  alt={commentProduct?.name}
                  width={200}
                  height={200}
                  priority
                  className="rounded-2xl"
                />
              </div>
              <div className="pl-20 flex flex-col">
                <ItemTitle>{commentProduct?.name}</ItemTitle>
                <div>가격 : {commentProduct.price.toLocaleString()} ₩</div>
                <div>수량 : {commentProduct.quantity} 개</div>
                <div>
                  합계 :{" "}
                  <span className="font-bold">
                    {commentProduct.amount.toLocaleString()} ₩
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-10 px-60 bg-white py-20">
        {editorState != null && (
          <>
            <p className="text-lg font-bold">제품 후기를 남겨주세요 !</p>
            <Rate
              tooltips={tooltips}
              defaultValue={5}
              value={rate}
              onChange={setRate}
              allowClear={false}
              className="my-5"
            />
            {rate ? (
              <Button className="ml-3 text-xs">{tooltips[rate - 1]}</Button>
            ) : (
              ""
            )}
            <CustomEditor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              onSave={handleSave}
            />
          </>
        )}
      </div>
    </>
  );
}
