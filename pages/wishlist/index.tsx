import { DeleteOutlined } from "@ant-design/icons";
import EmptyBox from "@components/EmptyBox";
import SpinnerComponent from "@components/Spinner";
import { WishList, products } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API_PATHS from "api";
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
  >([API_PATHS.WISHLIST.GET_ALL], () =>
    axios.get(API_PATHS.WISHLIST.GET_ALL).then((res) => res.data.items)
  );

  return (
    <CustomWrap>
      <CustomTitle>
        Wishlists ({products?.length ? products?.length : 0})
      </CustomTitle>
      <div>
        {products ? (
          products && products.length > 0 ? (
            products?.map((item, idx) => <Item key={idx} {...item} />)
          ) : (
            <EmptyBox />
          )
        ) : (
          <SpinnerComponent />
        )}
      </div>
    </CustomWrap>
  );
}

const Item = (props: WishlistItem) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: deleteWishlist } = useMutation(
    async (productId: number) => {
      await axios.post(API_PATHS.WISHLIST.DELETE, { productId });
    },
    {
      onMutate: async (productId) => {
        await queryClient.cancelQueries([API_PATHS.WISHLIST.GET_ALL]);
        const prev = queryClient.getQueryData([API_PATHS.WISHLIST.GET_ALL]);
        queryClient.setQueryData<WishList[]>(
          [API_PATHS.WISHLIST.GET_ALL],
          (old) => old?.filter((item) => item.id !== productId)
        );

        return { prev };
      },
      onError: (error, _, context: any) => {
        queryClient.setQueryData([API_PATHS.WISHLIST.GET_ALL], context.prev);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([API_PATHS.WISHLIST.GET_ALL]);
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
        priority={true}
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
