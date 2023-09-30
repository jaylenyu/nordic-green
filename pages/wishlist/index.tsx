import { DeleteFilled } from "@ant-design/icons";
import { WishList, products } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  WISHLIST_DELETE_QUERY_KEY,
  WISHLIST_GET_QUERY_KEY,
  WISHLIST_QUERY_KEY,
} from "api";
import axios from "axios";
import { BLUR_IMAGE, CATEGORY_MAP } from "constants/products";
import Image from "next/image";
import { useRouter } from "next/router";
import { WishlistItem } from "types/type";

export default function Wishlist() {
  const router = useRouter();

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >([WISHLIST_GET_QUERY_KEY], () =>
    axios.get(WISHLIST_GET_QUERY_KEY).then((res) => res.data.items)
  );

  const queryClient = useQueryClient();

  console.log(products);

  return (
    <div className="px-32">
      <div className="text-2xl">Wishlist ({products?.length})</div>
      <div>
        {products?.map((item, idx) => (
          <Item key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}

const Item = (props: WishlistItem) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: deleteWishlist } = useMutation(
    async (productId) => {
      await axios.post(WISHLIST_DELETE_QUERY_KEY, { productId });
    },
    {
      onMutate: async (productId) => {
        await queryClient.cancelQueries([WISHLIST_GET_QUERY_KEY]);

        const prev = queryClient.getQueryData([WISHLIST_GET_QUERY_KEY]);

        queryClient.setQueryData<WishList[]>([WISHLIST_GET_QUERY_KEY], (old) =>
          old?.filter((item) => item.id !== productId)
        );

        return { prev };
      },
      onError: (error, _, context: any) => {
        queryClient.setQueryData([WISHLIST_GET_QUERY_KEY], context.prev);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([WISHLIST_GET_QUERY_KEY]);
      },
    }
  );

  const handleWishlistDelete = async () => {
    try {
      await deleteWishlist(props.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-5 border flex">
      <Image
        className="rounded hover:cursor-pointer"
        alt={props.name}
        src={props.image_url ?? ""}
        width={120}
        height={120}
        placeholder="blur"
        blurDataURL={BLUR_IMAGE}
        onClick={() => router.push(`/products/${props.id}`)}
      />
      <div>
        <div className="h-12">{props.name}</div>
        <div className="text-zinc-400">
          {CATEGORY_MAP[props.category_id - 1]}
        </div>
        <div>{props.price.toLocaleString()}원</div>
      </div>
      <DeleteFilled
        className="hover:cursor-pointer"
        onClick={handleWishlistDelete}
      />
    </div>
  );
};
