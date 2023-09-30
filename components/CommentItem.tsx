import { Rate } from "antd";
import { format } from "date-fns";
import React from "react";
import { CommentsItemType } from "types/type";
import { EditorState, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(() => import("./Editor"), {
  ssr: false,
});

export default function CommentItem({ item }: { item: CommentsItemType }) {
  const maskedUserId = item.userId
    ? `${item.userId.slice(0, 3)}*****`
    : "Anonymous";

  return (
    <div className="border-b mb-10">
      <div className="flex justify-between">
        <div className="flex">
          <div className="font-bold mb-3 mr-3">{maskedUserId}</div>
          <div className="text-sm">({item.quantity}개 구매)</div>
        </div>
        <div className="text-sm text-slate-500">
          {format(new Date(item.updatedAt), "yyyy년 M월 d일")}
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-5">{<Rate disabled value={item.rate} />}</div>
      </div>
      <CustomEditor
        editorState={EditorState.createWithContent(
          convertFromRaw(JSON.parse(item.contents ?? ""))
        )}
        readOnly
      />
    </div>
  );
}
