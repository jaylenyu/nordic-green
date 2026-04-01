import CustomEditor from "@components/comment/Editor";
import axios from "axios";
import { convertToRaw } from "draft-js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { tooltips } from "constants/comment";
import useComment from "hooks/useComment";
import API_PATHS from "api";
import StarRating from "@components/ui/StarRating";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";

export default function CommentEdit() {
  const router = useRouter();
  const [rate, setRate] = useState(5);
  const { orderItemIds } = router.query;
  const { commentProduct, editorState, setEditorState } = useComment(String(orderItemIds));

  const handleSave = async () => {
    if (editorState && orderItemIds != null) {
      try {
        await axios.post(`${API_PATHS.COMMENTS.UPDATE}`, {
          rate: rate,
          orderItemIds: Number(orderItemIds),
          contents: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
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
    <main className="min-h-screen pt-24 px-4 sm:px-10 lg:px-60 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">후기 작성</h1>

      {commentProduct && (
        <div className="flex items-center gap-6 mb-8 flex-col sm:flex-row">
          <Image
            src={commentProduct.image_url}
            alt={commentProduct.name}
            width={160}
            height={160}
            priority
            unoptimized
            className="rounded-xl object-cover shrink-0"
          />
          <div className="space-y-1">
            <p className="text-lg font-bold">{commentProduct.name}</p>
            <p className="text-sm text-muted-foreground">가격: {commentProduct.price.toLocaleString()} ₩</p>
            <p className="text-sm text-muted-foreground">수량: {commentProduct.quantity}개</p>
            <p className="text-sm font-semibold">합계: {commentProduct.amount.toLocaleString()} ₩</p>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl p-6 sm:p-10">
        {editorState != null && (
          <>
            <p className="text-base font-bold mb-4">제품 후기를 남겨주세요!</p>
            <div className="flex items-center gap-3 mb-5">
              <StarRating value={rate} onChange={setRate} />
              {rate > 0 && (
                <Badge variant="secondary">{tooltips[rate - 1]}</Badge>
              )}
            </div>
            <CustomEditor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              onSave={handleSave}
            />
          </>
        )}
      </div>
    </main>
  );
}
