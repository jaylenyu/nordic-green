import { useRouter } from "next/router";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Carousel from "nuka-carousel";
import axios from "axios";
import { format } from "date-fns";
import { convertFromRaw, EditorState } from "draft-js";
import { products } from "@prisma/client";
import CustomEditor from "@components/comment/Editor";
import CountControl from "@components/UI/CountControl";
import CommentItem from "@components/comment/CommentItem";
import SpinnerComponent from "@components/UI/Spinner";
import API_PATHS from "api";
import { CommentsItemType } from "types/type";
import { BLUR_IMAGE } from "constants/products";
import {
  CustomButton,
  CustomWhiteButton,
  CustomWhiteWrap,
} from "styles/common.styled";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Head from "next/head";
import { useComments, useDetailWishlist } from "hooks/queries/useQuery";
import { useUpdateWishlist } from "hooks/mutations/useUpdateWishlist";
import useValidation from "hooks/useValidation";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const responseProduct = await axios.get(API_PATHS.PRODUCT.GET, {
      params: { id: context.params?.id },
    });
    const product = responseProduct.data.items;
    const responseComments = await axios.get(API_PATHS.COMMENTS.GET, {
      params: { productId: context.params?.id },
    });
    const comments = responseComments.data.items;

    return {
      props: {
        product: { ...product, images: [product.image_url, product.image_url] },
        comments: comments,
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default function ProductsDetail(props: {
  product: products & { images: string[] };
  comments: CommentsItemType[];
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const product = props.product;
  const { data: session } = useSession();
  const { id: productId } = router.query;
  const { mutate: updateWishlist } = useUpdateWishlist();
  const { data: wishlist } = useDetailWishlist();
  const { data: comments } = useComments(String(productId));
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState<number | undefined>(1);
  const validate = useValidation(product);
  const [editorState] = useState<EditorState | undefined>(() => {
    if (!product) {
      return EditorState.createEmpty();
    }

    return product.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(product.contents))
        )
      : EditorState.createEmpty();
  });

  const isWished =
    wishlist != null && productId != null
      ? wishlist.includes(productId)
      : false;

  return (
    <>
      {product != null && productId != null ? (
        <>
          <div className="flex pt-40 sx:flex-col sx:justify-center sx:items-center">
            <Head>
              <title>{product.name} - Nordic Green</title>
              <meta
                name="description"
                content={`Discover ${product.name} on Nordic Green. Elevate your indoor spaces with our premium products.`}
              />
              <meta
                name="keywords"
                content={`${product.name}, plants, Nordic Green, boutique`}
              />
              <meta
                property="og:title"
                content={`${product.name} - Nordic Green`}
              />
              <meta
                property="og:description"
                content={`Discover ${product.name} on Nordic Green. Elevate your indoor spaces with our premium products.`}
              />
              <meta property="og:image" content={product.images[0]} />
              <meta
                property="og:url"
                content={`https://nordic-green.vercel.app/products/${product.id}`}
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex justify-end w-3/5 sm:w-full sm:justify-center sx:w-full sx:justify-center">
              <div>
                {product.images.map((url, idx) => (
                  <div
                    key={idx}
                    className="mb-5 mr-5 hover:opacity-50 w-20 h-20"
                  >
                    <Image
                      src={url}
                      alt="image"
                      className="rounded-2xl"
                      width={80}
                      height={80}
                      priority
                      unoptimized
                      placeholder="blur"
                      blurDataURL={BLUR_IMAGE}
                      onMouseOver={() => setIndex(idx)}
                    />
                  </div>
                ))}
              </div>
              <div className="w-2/3">
                <Carousel
                  animation="zoom"
                  withoutControls
                  wrapAround
                  speed={200}
                  slideIndex={index}
                >
                  {product.images.map((url, idx) => (
                    <Image
                      className="rounded-2xl"
                      key={idx}
                      src={url}
                      alt="image"
                      width={500}
                      height={500}
                      priority
                      unoptimized
                    />
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="w-2/5 px-20 flex flex-col justify-between sm:w-full sm:mt-5 sx:w-full sx:mt-3 md:px-10 sm:px-10 sx:px-10">
              <div className="text-2xl font-bold md:text-xl sm:text-xl sx:text-lg">
                {product.name}
              </div>
              <div className="text-slate-500 sm:text-sm sx:text-xs">
                등록일 : {format(new Date(product.createAt), "yyyy년 M월 d일")}
              </div>
              {editorState != null && (
                <div className="text-slate-500 sm:text-sm sx:text-sm">
                  <CustomEditor editorState={editorState} readOnly />
                </div>
              )}
              <div className="text-lg md:text-base sm:text-sm sx:text-sm">
                {product.price.toLocaleString()} ₩
              </div>
              <div className="flex justify-between sm:flex-col sx:flex-col">
                <div>
                  <span className="md:text-sm sm:text-sm sx:text-sm">
                    수량 :{" "}
                  </span>
                  <CountControl
                    disabled={false}
                    value={quantity}
                    setValue={setQuantity}
                  />
                </div>
                <div className="font-bold md:text-sm sm:text-sm sx:text-sm">
                  총 가격 :{" "}
                  {quantity && (quantity * product.price).toLocaleString()} ₩
                </div>
              </div>
              <div className="mt-5 grid gap-5 md:gap-4 sm:gap-3 sx:gap-2">
                <CustomButton
                  onClick={() => {
                    if (session == null) {
                      alert("로그인 하세요.");
                      signIn();
                      return;
                    }
                    validate("cart", quantity);
                  }}
                  icon={<ShoppingCartOutlined />}
                >
                  장바구니
                </CustomButton>
                <CustomWhiteButton
                  onClick={() => {
                    if (session == null) {
                      alert("로그인 하세요.");
                      signIn();
                      return;
                    }
                    updateWishlist(String(productId));
                  }}
                  icon={isWished ? <HeartFilled /> : <HeartOutlined />}
                >
                  위시리스트
                </CustomWhiteButton>
                <CustomButton
                  onClick={() => {
                    if (session == null) {
                      alert("로그인 하세요.");
                      signIn();
                      return;
                    }
                    validate("order", quantity);
                  }}
                  icon={<ShoppingOutlined />}
                >
                  결제하기
                </CustomButton>
              </div>
            </div>
          </div>
          <CustomWhiteWrap>
            <p className="text-lg font-bold mb-12 sm:mb-5 sx:mb-3 sm:text-base sx:text-sm">
              제품 후기
            </p>
            {comments && comments.length > 0 ? (
              comments
                .map((comment: any, idx: number) => (
                  <CommentItem
                    key={idx}
                    item={comment}
                    queryClient={queryClient}
                    productId={productId}
                  />
                ))
                .reverse()
            ) : (
              <div>후기가 없습니다.</div>
            )}
          </CustomWhiteWrap>
        </>
      ) : (
        <SpinnerComponent />
      )}
    </>
  );
}
