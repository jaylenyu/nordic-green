'use client';

import CustomEditor from '@/components/comment/Editor';
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { tooltips } from 'constants/comment';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';
import StarRating from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/badge';
import { useOrder } from '@/hooks/queries/useQuery';
import { useUpsertComment } from '@/hooks/mutations/useUpsertComment';
import { toast } from 'sonner';

export default function CommentEditPage() {
  return (
    <Suspense>
      <CommentEdit />
    </Suspense>
  );
}

function CommentEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderItemIds = searchParams.get('orderItemIds');
  const [rate, setRate] = useState(5);
  const [editorState, setEditorState] = useState<EditorState | undefined>(undefined);

  const { data: orders } = useOrder();
  const { mutate: upsertComment } = useUpsertComment();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const commentProduct = orders
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ?.find((order: any) => order.orderItems.some((item: any) => item.id === Number(orderItemIds)))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ?.orderItems.find((item: any) => item.id === Number(orderItemIds));

  useEffect(() => {
    if (!orderItemIds) return;

    apiClient
      .get(API_PATHS.COMMENTS.GET, { params: { orderItemId: orderItemIds } })
      .then((res) => {
        const contents = res.data?.contents;
        if (contents) {
          setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(contents))));
        } else {
          setEditorState(EditorState.createEmpty());
        }
      })
      .catch(() => setEditorState(EditorState.createEmpty()));
  }, [orderItemIds]);

  const handleSave = () => {
    if (!editorState || orderItemIds == null) {
      toast.error('후기 등록 실패');
      return;
    }

    upsertComment(
      {
        orderItemId: Number(orderItemIds),
        rate,
        contents: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        images: '',
      },
      {
        onSuccess: () => {
          toast.success('후기 등록 성공!');
          router.push(`/products/${commentProduct?.productId}`);
        },
        onError: () => toast.error('후기 등록 실패'),
      },
    );
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
            <p className="text-sm text-muted-foreground">
              가격: {commentProduct.price.toLocaleString()} ₩
            </p>
            <p className="text-sm text-muted-foreground">수량: {commentProduct.quantity}개</p>
            <p className="text-sm font-semibold">
              합계: {commentProduct.amount.toLocaleString()} ₩
            </p>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl p-6 sm:p-10">
        {editorState != null && (
          <>
            <p className="text-base font-bold mb-4">제품 후기를 남겨주세요!</p>
            <div className="flex items-center gap-3 mb-5">
              <StarRating value={rate} onChange={setRate} />
              {rate > 0 && <Badge variant="secondary">{tooltips[rate - 1]}</Badge>}
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
