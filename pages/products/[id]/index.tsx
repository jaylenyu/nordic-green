import { useRouter } from "next/router";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Carousel from "nuka-carousel";
import axios from "axios";
import { format } from "date-fns";
import { convertFromRaw, EditorState } from "draft-js";
import { Cart, OrderItem, products } from "@prisma/client";
import CustomEditor from "@components/Editor";
import CountControl from "@components/CountControl";
import CommentItem from "@components/CommentItem";
import SpinnerComponent from "@components/Spinner";
import {
  BASE_URL,
  CART_ADD_QUERY_KEY,
  CART_GET_QUERY_KEY,
  COMMENTS_API_PATH,
  ORDER_ADD_QUERY_KEY,
  ORDER_GET_QUERY_KEY,
  PRODUCT_API_PATH,
  WISHLIST_QUERY_KEY,
  WISHLIST_UPDATE_QUERY_KEY,
} from "api";
import { CommentsItemType } from "types/type";
import { BLUR_IMAGE } from "constants/products";
import { CustomButton } from "styles/common.styled";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const responseProduct = await axios.get(`${BASE_URL}${PRODUCT_API_PATH}`, {
      params: { id: context.params?.id },
    });
    const product = responseProduct.data.items;
    const responseComments = await axios.get(
      `${BASE_URL}${COMMENTS_API_PATH}`,
      {
        params: { productId: context.params?.id },
      }
    );
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

export default function Products(props: {
  product: products & { images: string[] };
  comments: CommentsItemType[];
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { id: productId } = router.query;
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState<number | undefined>(1);
  const [editorState] = useState<EditorState | undefined>(() =>
    props.product.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents))
        )
      : EditorState.createEmpty()
  );

  const { data: comments } = useQuery(
    [COMMENTS_API_PATH, productId],
    async () => {
      const response = await axios.get(`${BASE_URL}${COMMENTS_API_PATH}`, {
        params: { productId: productId },
      });
      return response.data.items;
    },
    {
      initialData: props.comments,
    }
  );

  const { data: wishlist } = useQuery([WISHLIST_QUERY_KEY], async () => {
    try {
      const {
        data: { items },
      } = await axios.get(WISHLIST_QUERY_KEY);
      return items;
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  const { mutate } = useMutation<unknown, unknown, string, any>(
    async (productId) => {
      try {
        const { data } = await axios.post(WISHLIST_UPDATE_QUERY_KEY, {
          productId,
        });
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: async (productId) => {
        await queryClient.cancelQueries([WISHLIST_QUERY_KEY]);
        const prev = queryClient.getQueriesData([WISHLIST_QUERY_KEY]);
        queryClient.setQueryData<string[]>([WISHLIST_QUERY_KEY], (old) =>
          old
            ? old.includes(String(productId))
              ? old.filter((id) => id !== String(productId))
              : old.concat(String(productId))
            : []
        );
        return { prev };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([WISHLIST_QUERY_KEY], context.prev);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([WISHLIST_QUERY_KEY]);
      },
    }
  );

  const { mutate: addCart } = useMutation<
    unknown,
    unknown,
    Omit<Cart, "id" | "userId">,
    any
  >(
    async (item) => {
      try {
        const { data } = await axios.post(CART_ADD_QUERY_KEY, {
          item,
        });
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: () => {
        queryClient.invalidateQueries([CART_GET_QUERY_KEY]);
      },
      onSuccess: () => {
        router.push("/cart");
      },
    }
  );

  const { mutate: addOrder } = useMutation<
    unknown,
    unknown,
    Omit<OrderItem, "id">[],
    any
  >(
    async (items) => {
      try {
        const { data } = await axios.post(ORDER_ADD_QUERY_KEY, {
          items,
        });
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: () => {
        queryClient.invalidateQueries([ORDER_GET_QUERY_KEY]);
      },
      onSuccess: () => {
        router.push("/order");
      },
    }
  );

  const validate = (type: "cart" | "order") => {
    if (quantity == null) {
      alert("최소 수량을 입력하세요.");
      return;
    }
    if (type == "cart") {
      addCart({
        productId: product.id,
        quantity: quantity,
        amount: product.price * quantity,
      });
      alert("장바구니에 등록되었습니다.");
    }
    if (type == "order") {
      addOrder([
        {
          productId: product.id,
          quantity: quantity,
          amount: product.price * quantity,
          price: product.price,
        },
      ]);
      alert("결제화면으로 이동합니다.");
    }
  };

  const product = props.product;

  const isWished =
    wishlist != null && productId != null
      ? wishlist.includes(productId)
      : false;

  return (
    <>
      {product != null && productId != null ? (
        <>
          <div className="flex">
            <div className="flex justify-end w-3/5">
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
                      placeholder="blur"
                      blurDataURL={BLUR_IMAGE}
                      onMouseOver={() => setIndex(idx)}
                    />
                  </div>
                ))}
              </div>
              <div className="w-2/3">
                <Carousel
                  animation="fade"
                  withoutControls
                  wrapAround
                  speed={10}
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
                    />
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="w-2/5 px-20 flex flex-col justify-between">
              <div className="text-2xl">{product.name}</div>
              <div className="text-slate-500 text-sm">
                등록일 : {format(new Date(product.createAt), "yyyy년 M월 d일")}
              </div>
              {editorState != null && (
                <div className="text-slate-500">
                  <CustomEditor editorState={editorState} readOnly />
                </div>
              )}
              <div className="text-lg">{product.price.toLocaleString()} ₩</div>
              <div className="flex justify-between">
                <div>
                  <span>수량 : </span>
                  <CountControl
                    disabled={false}
                    value={quantity}
                    setValue={setQuantity}
                  />
                </div>
                <div>
                  총 가격 :{" "}
                  {quantity && (quantity * product.price).toLocaleString()} ₩
                </div>
              </div>
              <CustomButton
                onClick={() => {
                  if (session == null) {
                    alert("로그인 하세요.");
                    signIn();
                    return;
                  }
                  validate("cart");
                }}
                icon={<ShoppingCartOutlined />}
              >
                장바구니
              </CustomButton>
              <CustomButton
                colorreverse="true"
                onClick={() => {
                  if (session == null) {
                    alert("로그인 하세요.");
                    signIn();
                    return;
                  }
                  mutate(productId);
                }}
                icon={isWished ? <HeartFilled /> : <HeartOutlined />}
              >
                위시리스트
              </CustomButton>
              <CustomButton
                onClick={() => {
                  if (session == null) {
                    alert("로그인 하세요.");
                    signIn();
                    return;
                  }
                  validate("order");
                }}
                icon={<ShoppingOutlined />}
              >
                결제하기
              </CustomButton>
            </div>
          </div>
          <div className="p-32">
            <p className="text-xl font-bold mb-10">제품 후기</p>
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
          </div>
        </>
      ) : (
        <SpinnerComponent />
      )}
    </>
  );
}
