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
import { Button } from "@components/ui/button";
import StarRating from "@components/ui/StarRating";
import { toast } from "sonner";

const CustomEditor = dynamic(() => import("./Editor"), { ssr: false });

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
  const [editorState, setEditorState] = useState<EditorState | undefined>(undefined);
  const maskedUserId = item.userId ? `${item.userId.slice(0, 3)}*****` : "Anonymous";

  const fetchComment = async () => {
    if (item && item.contents) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(item.contents))));
      setRate(item.rate);
    } else {
      setEditorState(EditorState.createEmpty());
    }
  };

  const handleSave = async () => {
    if (editorState && productId != null) {
      const rawContent = editorState.getCurrentContent();
      const textContent = rawContent.getPlainText().trim();

      if (!textContent) {
        toast.error("후기를 입력하세요!");
        return;
      }

      try {
        await axios.post(API_PATHS.COMMENTS.UPDATE, {
          rate,
          orderItemIds: Number(item.orderItemIds),
          contents: JSON.stringify(convertToRaw(rawContent)),
          images: [],
        });
        toast.success("후기 등록 성공!");
      } catch (error) {
        console.error(error);
        toast.error("후기 등록 실패!");
      } finally {
        queryClient.invalidateQueries([API_PATHS.COMMENTS.GET, productId]);
        setEditMode(false);
      }
    }
  };

  const handleDeleteComment = async () => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      await axios.delete(API_PATHS.COMMENTS.DELETE, {
        data: { orderItemIds: item.orderItemIds },
      });
      queryClient.invalidateQueries([API_PATHS.COMMENTS.GET, productId]);
      toast.success("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("댓글 삭제 실패. 다시 시도해주세요.");
    }
  };

  useEffect(() => { fetchComment(); }, [productId]);

  return (
    <div className="border-b border-border pb-6 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{maskedUserId}</span>
          <span className="text-xs text-muted-foreground">({item.quantity}개 구매)</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {format(new Date(item.updatedAt), "yyyy년 M월 d일")}
        </span>
      </div>

      {editMode ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <StarRating value={rate} onChange={setRate} />
            <span className="text-xs text-muted-foreground">{tooltips[rate - 1]}</span>
          </div>
          <CustomEditor editorState={editorState} onEditorStateChange={setEditorState} onSave={handleSave} />
          {item.userId === user?.id && (
            <div className="flex gap-2 justify-end">
              <Button size="sm" onClick={handleSave}>저장</Button>
              <Button size="sm" variant="outline" onClick={() => setEditMode(false)}>취소</Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <StarRating value={item.rate} disabled />
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <CustomEditor
                editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(item.contents ?? "{}")))}
                readOnly
              />
            </div>
            {item.userId === user?.id && (
              <div className="flex gap-1 shrink-0">
                <Button size="sm" variant="ghost" onClick={() => setEditMode(true)}>수정</Button>
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={handleDeleteComment}>삭제</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
