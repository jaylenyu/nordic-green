import { DeleteOutlined } from "@ant-design/icons";
import { WishList, products } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { WISHLIST_DELETE_QUERY_KEY, WISHLIST_GET_QUERY_KEY } from "api";
import axios from "axios";
import { BLUR_IMAGE, CATEGORY_MAP } from "constants/products";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  CustomTitle,
  CustomWrap,
  ItemList,
  ItemTitle,
} from "styles/common.styled";
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
    <div className="min-h-screen h-full px-60">
      <CustomTitle>Wishlist ({products?.length})</CustomTitle>
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
    <ItemList>
      <Image
        className="rounded-xl hover:cursor-pointer"
        alt={props.name}
        src={props.image_url ?? ""}
        width={150}
        height={150}
        placeholder="blur"
        blurDataURL={BLUR_IMAGE}
        onClick={() => router.push(`/products/${props.id}`)}
      />
      <div className="flex flex-col justify-between ml-10">
        <ItemTitle>{props.name}</ItemTitle>
        <div>
          <div className="text-zinc-400">
            {CATEGORY_MAP[props.category_id - 1]}
          </div>
          <div className="">{props.price.toLocaleString()} ₩</div>
        </div>
      </div>
      <DeleteOutlined
        className="absolute right-0 hover:cursor-pointer text-2xl opacity-50"
        onClick={handleWishlistDelete}
      />
    </ItemList>
  );
};
