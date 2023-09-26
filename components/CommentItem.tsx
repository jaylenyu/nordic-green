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
  return (
    <div className="border">
      <div>{<Rate disabled value={item.rate} />}</div>
      <div>{format(new Date(item.updatedAt), "yyyy년 M월 d일")}</div>
      <div>{item.quantity}개 구매</div>
      <CustomEditor
        editorState={EditorState.createWithContent(
          convertFromRaw(JSON.parse(item.contents ?? ""))
        )}
        readOnly
      />
    </div>
  );
}
