import { DeleteOutlined } from "@ant-design/icons";
import EmptyBox from "@components/EmptyBox";
import SpinnerComponent from "@components/Spinner";
import { BLUR_IMAGE, CATEGORY_MAP } from "constants/products";
import { useScreenWidth } from "hooks/useScreenWidth";
import { useDeleteWishlist } from "hooks/mutations/useDeleteWishlist";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  CustomTitle,
  CustomWrap,
  ItemList,
  ItemTitle,
} from "styles/common.styled";
import { WishlistItem } from "types/type";
import { useWishlistAll } from "hooks/queries/useQuery";

export default function Wishlist() {
  const { data: products } = useWishlistAll();

  return (
    <CustomWrap padding="150px 120px">
      <CustomTitle>
        Wishlists ({products?.length ? products?.length : 0})
      </CustomTitle>
      <div className="px-20">
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
  const router = useRouter();
  const screenWitdh = useScreenWidth();
  const deleteWishlist = useDeleteWishlist();

  const handleWishlistDelete = async () => {
    try {
      await deleteWishlist.mutate(props.id);
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
        width={screenWitdh >= 768 ? 150 : 100}
        height={screenWitdh >= 768 ? 150 : 100}
        priority
        unoptimized
        placeholder="blur"
        blurDataURL={BLUR_IMAGE}
        onClick={() => router.push(`/products/${props.id}`)}
      />
      <div className="flex flex-col justify-between ml-10 sm:ml-3 sx:ml-1">
        <ItemTitle>{props.name}</ItemTitle>
        <div>
          <div className="text-zinc-400 sm:text-sm sx:text-xs">
            {CATEGORY_MAP[props.category_id - 1]}
          </div>
          <div className="sm:text-sm sx:text-xs">
            {props.price.toLocaleString()} ₩
          </div>
        </div>
      </div>
      <DeleteOutlined
        className="absolute right-5 hover:cursor-pointer text-2xl opacity-50 sm:text-base sx:text-base"
        onClick={handleWishlistDelete}
      />
    </ItemList>
  );
};
