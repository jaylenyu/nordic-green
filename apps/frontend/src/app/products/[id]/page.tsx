'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
const Carousel = require('nuka-carousel').default as React.ComponentType<any>;
import { format } from 'date-fns';
import { convertFromRaw, EditorState } from 'draft-js';
import { Heart, ShoppingCart, ShoppingBag } from 'lucide-react';
import CustomEditor from '@/components/comment/Editor';
import CountControl from '@/components/ui/CountControl';
import CommentItem from '@/components/comment/CommentItem';
import SpinnerComponent from '@/components/ui/Spinner';
import { BLUR_IMAGE } from 'constants/products';
import { Button } from '@/components/ui/button';
import { useComments, useWishlist } from '@/hooks/queries/useQuery';
import { useToggleWishlist } from '@/hooks/mutations/useToggleWishlist';
import useValidation from '@/hooks/useValidation';
import { API_PATHS } from '@/lib/api-paths';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => apiClient.get(API_PATHS.PRODUCTS.DETAIL(productId)).then((res) => res.data),
    enabled: !!productId,
  });

  const { data: session } = useSession();
  const { mutate: toggleWishlist } = useToggleWishlist();
  const { data: wishlistIds } = useWishlist();
  const { data: comments } = useComments(productId);
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState<number | undefined>(1);
  const validate = useValidation(product);

  const productImages = product ? [product.image_url, product.image_url] : [];

  const editorState = product?.contents
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(product.contents)))
    : EditorState.createEmpty();

  const isWished = wishlistIds != null ? (wishlistIds as number[]).includes(productId) : false;

  if (isLoading || !product) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row pt-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto gap-8 lg:gap-12">
        {/* 이미지 영역 */}
        <div className="flex gap-3 lg:w-3/5">
          <div className="flex flex-col gap-2 shrink-0">
            {productImages.map((url: string, idx: number) => (
              <div
                key={idx}
                className="w-16 h-16 cursor-pointer rounded-lg overflow-hidden border border-border hover:opacity-70 transition-opacity"
              >
                <Image
                  src={url}
                  alt="image"
                  width={64}
                  height={64}
                  priority
                  unoptimized
                  placeholder="blur"
                  blurDataURL={BLUR_IMAGE}
                  className="object-cover w-full h-full"
                  onMouseOver={() => setIndex(idx)}
                />
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-xl overflow-hidden">
            <Carousel animation="zoom" withoutControls wrapAround speed={200} slideIndex={index}>
              {productImages.map((url: string, idx: number) => (
                <Image
                  key={idx}
                  src={url}
                  alt="image"
                  width={600}
                  height={600}
                  priority
                  unoptimized
                  className="object-cover w-full"
                />
              ))}
            </Carousel>
          </div>
        </div>

        {/* 상품 정보 영역 */}
        <div className="lg:w-2/5 flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              등록일: {format(new Date(product.createAt), 'yyyy년 M월 d일')}
            </p>
          </div>

          {product.contents && (
            <div className="text-sm text-muted-foreground">
              <CustomEditor editorState={editorState} readOnly />
            </div>
          )}

          <p className="text-xl font-semibold">{product.price.toLocaleString()} ₩</p>

          <div className="flex items-center justify-between py-3 border-y border-border">
            <span className="text-sm text-muted-foreground">수량</span>
            <CountControl disabled={false} value={quantity} setValue={setQuantity} />
          </div>

          <div className="text-right font-bold">
            총 가격: {quantity && (quantity * product.price).toLocaleString()} ₩
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <Button
              className="w-full"
              onClick={() => {
                if (session == null) {
                  alert('로그인 하세요.');
                  signIn();
                  return;
                }
                validate('cart', quantity);
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              장바구니
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                if (session == null) {
                  alert('로그인 하세요.');
                  signIn();
                  return;
                }
                toggleWishlist(productId);
              }}
            >
              <Heart className={`w-4 h-4 mr-2 ${isWished ? 'fill-primary text-primary' : ''}`} />
              위시리스트
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                if (session == null) {
                  alert('로그인 하세요.');
                  signIn();
                  return;
                }
                validate('order', quantity);
              }}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              결제하기
            </Button>
          </div>
        </div>
      </div>

      {/* 후기 섹션 */}
      <div className="mt-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto py-10 border-t border-border">
        <p className="text-lg font-bold mb-8">제품 후기</p>
        {comments && comments.length > 0 ? (
          [...comments]
            .reverse()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((comment: any, idx: number) => (
              <CommentItem key={idx} item={comment} productId={productId} />
            ))
        ) : (
          <div className="text-muted-foreground">후기가 없습니다.</div>
        )}
      </div>
    </>
  );
}
