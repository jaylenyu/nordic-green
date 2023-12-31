import { Button, Rate } from "antd";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { CommentsItemType } from "types/type";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import axios from "axios";
import API_PATHS from "api";
import { tooltips } from "constants/comment";
import { getCustomUser } from "constants/user";

const CustomEditor = dynamic(() => import("./Editor"), {
  ssr: false,
});

export default function CommentItem({
  item,
  queryClient,
  productId,
}: {
  item: CommentsItemType;
  queryClient: any;
  productId: string | string[] | undefined;
}) {
  const { data: session } = useSession();
  const user = getCustomUser(session);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [rate, setRate] = useState(5);
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );
  const maskedUserId = item.userId
    ? `${item.userId.slice(0, 3)}*****`
    : "Anonymous";

  const fetchComment = async () => {
    if (item && item.contents) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(item.contents)))
      );
      setRate(item.rate);
    } else {
      setEditorState(EditorState.createEmpty());
    }
  };

  const handleSave = async () => {
    if (editorState && productId != null) {
      const rawContent = editorState.getCurrentContent();
      const textContent = rawContent.getPlainText().trim();

      if (!textContent || textContent.length === 0) {
        alert("후기를 입력하세요!");
        return;
      }

      try {
        await axios.post(API_PATHS.COMMENTS.UPDATE, {
          rate: rate,
          orderItemIds: Number(item.orderItemIds),
          contents: JSON.stringify(convertToRaw(rawContent)),
          images: [],
        });

        alert("후기 등록 성공!");
      } catch (error) {
        console.error(error);
        alert("후기 등록 실패!");
      } finally {
        queryClient.invalidateQueries([API_PATHS.COMMENTS.GET, productId]);
        setEditMode(false);
      }
    }
  };

  const handleDeleteComment = async () => {
    const isConfirmed = confirm("댓글을 삭제하시겠습니까?");

    if (!isConfirmed) return;

    try {
      await axios.delete(API_PATHS.COMMENTS.DELETE, {
        data: { orderItemIds: item.orderItemIds },
      });

      queryClient.invalidateQueries([API_PATHS.COMMENTS.GET, productId]);

      alert("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error("Failed to delete the comment:", error);
      alert("댓글 삭제 실패. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchComment();
  }, [productId]);

  return (
    <div className="border-b mb-10">
      <div className="flex justify-between">
        <div className="flex">
          <div className="font-bold mb-3 mr-3 sm:text-sm sx:text-sm">
            {maskedUserId}
          </div>
          <div className="text-sm sm:text-xs sx:text-xs">
            ({item.quantity}개 구매)
          </div>
        </div>
        <div className="text-sm sm:text-xs sx:text-xs text-slate-500">
          {format(new Date(item.updatedAt), "yyyy년 M월 d일")}
        </div>
      </div>
      <div className="flex justify-between w-full">
        {editMode ? (
          <>
            <div className="w-full">
              <Rate
                tooltips={tooltips}
                defaultValue={5}
                value={rate}
                onChange={setRate}
                allowClear={false}
              />
              {rate && (
                <Button type="text" className="text-center ml-3 text-xs ">
                  {tooltips[rate - 1]}
                </Button>
              )}
              <div className="w-full relative">
                <CustomEditor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  onSave={handleSave}
                />
                {item.userId === user?.id && (
                  <div className="z-20 absolute top-1 right-0">
                    <Button onClick={handleSave}>저장</Button>
                    <Button onClick={() => setEditMode(false)}>취소</Button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full">
              <Rate disabled value={item.rate} />
              <div className="flex justify-between items-center w-full">
                <CustomEditor
                  editorState={EditorState.createWithContent(
                    convertFromRaw(JSON.parse(item.contents ?? ""))
                  )}
                  readOnly
                />
                {item.userId === user?.id && (
                  <div className="flex">
                    <Button onClick={() => setEditMode(true)}>수정</Button>
                    <Button onClick={handleDeleteComment}>삭제</Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
