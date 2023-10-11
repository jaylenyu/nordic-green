import CustomEditor from "@components/comment/Editor";
import { Button, Rate } from "antd";
import axios from "axios";
import { convertToRaw } from "draft-js";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CustomTitle, ItemTitle } from "styles/common.styled";
import { tooltips } from "constants/comment";
import API_PATHS from "api";
import useComment from "hooks/useComment";

export default function CommentEdit() {
  const router = useRouter();
  const [rate, setRate] = useState(5);
  const { orderItemIds } = router.query;
  const { commentProduct, editorState, setEditorState } = useComment(
    String(orderItemIds)
  );

  const handleSave = async () => {
    if (editorState && orderItemIds != null) {
      try {
        await axios.post(API_PATHS.COMMENTS.UPDATE, {
          rate: rate,
          orderItemIds: Number(orderItemIds),
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
          images: [],
        });
      } catch (error) {
        console.error(error);
      }
      alert("후기 등록 성공!");
      router.push(`/products/${commentProduct?.productId}`);
    } else {
      alert("후기 등록 실패");
    }
  };

  return (
    <>
      <div className="pt-40 px-60 md:px-20 sm:px-10 sx:px-5">
        <CustomTitle>후기 작성</CustomTitle>
        <div className="flex items-center justify-center">
          {commentProduct && (
            <div className="flex items-center md:flex md:flex-col">
              <Image
                src={commentProduct?.image_url}
                alt={commentProduct?.name}
                width={200}
                height={200}
                priority
                unoptimized
                className="rounded-2xl"
              />
              <div className="lg:pl-20 xl:pl-20 md:mt-5 sm:mt-5 sx:mt-3">
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
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 px-80 md:px-40 bg-white py-20 md:p-20 sm:p-10 sx:p-5">
        {editorState != null && (
          <>
            <p className="text-lg font-bold sm:text-base sx:text-sm">
              제품 후기를 남겨주세요 !
            </p>
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
