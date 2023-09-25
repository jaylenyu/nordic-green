import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Carousel from "nuka-carousel";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import axios from "axios";
import { format } from "date-fns";
import { convertFromRaw, EditorState } from "draft-js";
import { Cart, OrderItem, products } from "@prisma/client";
import CustomEditor from "@components/Editor";
import CountControl from "@components/CountControl";
import {
  BASE_URL,
  CART_ADD_QUERY_KEY,
  CART_GET_QUERY_KEY,
  ORDER_ADD_QUERY_KEY,
  ORDER_GET_QUERY_KEY,
  PRODUCT_API_PATH,
  WISHLIST_QUERY_KEY,
  WISHLIST_UPDATE_QUERY_KEY,
} from "api";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const response = await axios.get(`${BASE_URL}${PRODUCT_API_PATH}`, {
      params: { id: context.params?.id },
    });

    const product = response.data.items;

    return {
      props: {
        product: { ...product, images: [product.image_url, product.image_url] },
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default function Products(props: {
  product: products & { images: string[] };
}) {
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState<number>();
  const { data: session } = useSession();

  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: productId } = router.query;

  const [editorState] = useState<EditorState | undefined>(() =>
    props.product.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents))
        )
      : EditorState.createEmpty()
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
        router.push("/mypage");
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
          <div>
            <div>
              <Carousel
                animation="fade"
                withoutControls
                wrapAround
                speed={10}
                slideIndex={index}
              >
                {product.images.map((url, idx) => (
                  <Image
                    key={idx}
                    src={url}
                    alt="image"
                    width={300}
                    height={200}
                  />
                ))}
              </Carousel>
            </div>
            <div className="flex">
              {product.images.map((url, idx) => (
                <div key={idx} onClick={() => setIndex(idx)}>
                  <Image src={url} alt="image" width={100} height={60} />
                </div>
              ))}
            </div>
            {editorState != null && (
              <CustomEditor editorState={editorState} readOnly />
            )}
          </div>
          <div>제품 카테고리: {product.category_id}</div>
          <div>제품명: {product.name}</div>
          <div>제품 가격: {product.price.toLocaleString()} 원</div>
          <div>{wishlist}</div>

          <div>
            <span>수량 : </span>
            <CountControl value={quantity} setValue={setQuantity} />
          </div>
          <button
            type="button"
            className="w-20 border hover:bg-slate-400"
            onClick={() => {
              if (session == null) {
                alert("로그인 하세요.");
                router.push("/auth/login");
                return;
              }
              validate("cart");
            }}
          >
            장바구니
          </button>
          <button
            type="button"
            className="w-20 border hover:bg-slate-400"
            onClick={() => {
              if (session == null) {
                alert("로그인 하세요.");
                router.push("/auth/login");
                return;
              }
              mutate(productId);
            }}
          >
            {isWished ? "찜함" : "찜하기"}
          </button>
          <div>
            등록일: {format(new Date(product.createAt), "yyyy년 M월 d일")}
          </div>
          <button
            type="button"
            className="w-20 border hover:bg-slate-400"
            onClick={() => {
              if (session == null) {
                alert("로그인 하세요.");
                router.push("/auth/login");
                return;
              }
              validate("order");
            }}
          >
            결제하기
          </button>
        </>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
