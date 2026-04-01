import EmptyBox from "@components/ui/EmptyBox";
import SpinnerComponent from "@components/ui/Spinner";
import { BLUR_IMAGE, CATEGORY_MAP } from "constants/products";
import { useDeleteWishlist } from "hooks/mutations/useDeleteWishlist";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { WishlistItem } from "types/type";
import { useWishlistAll } from "hooks/queries/useQuery";

export default function Wishlist() {
  const { data: products } = useWishlistAll();

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        <h1 className="text-2xl font-bold mb-8">
          Wishlist ({products?.length ?? 0})
        </h1>
        <div className="space-y-3">
          {products ? (
            products.length > 0 ? (
              products.map((item, idx) => <Item key={idx} {...item} />)
            ) : (
              <EmptyBox />
            )
          ) : (
            <SpinnerComponent />
          )}
        </div>
      </div>
    </main>
  );
}

const Item = (props: WishlistItem) => {
  const router = useRouter();
  const deleteWishlist = useDeleteWishlist();

  return (
    <div className="flex gap-4 p-4 border border-border rounded-lg relative bg-card">
      <Image
        className="rounded-md object-cover cursor-pointer shrink-0"
        alt={props.name}
        src={props.image_url ?? ""}
        width={100}
        height={100}
        priority
        unoptimized
        placeholder="blur"
        blurDataURL={BLUR_IMAGE}
        onClick={() => router.push(`/products/${props.id}`)}
      />
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{props.name}</p>
        <div>
          <p className="text-xs text-muted-foreground">{CATEGORY_MAP[props.category_id - 1]}</p>
          <p className="text-sm mt-0.5">{props.price.toLocaleString()} ₩</p>
        </div>
      </div>
      <button
        className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
        onClick={() => deleteWishlist.mutate(props.id)}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
