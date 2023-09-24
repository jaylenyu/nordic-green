import { products } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { BLUR_IMAGE, CATEGORY_MAP } from "constants/products";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Wishlist() {
  const router = useRouter();

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    ["/api/get-wishlists"],
    () => fetch("/api/get-wishlists").then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );

  return (
    <div>
      <div>Wishlist</div>
      <p>찜목록</p>
      <div>
        {products?.map((item) => (
          <div
            key={item.id}
            className="max-w-xs border"
            onClick={() => router.push(`/products/${item.id}`)}
          >
            <Image
              className="rounded"
              alt={item.name}
              src={item.image_url ?? ""}
              width={120}
              height={120}
              placeholder="blur"
              blurDataURL={BLUR_IMAGE}
            />
            <div>
              <div className="h-12">{item.name}</div>
              <div className="text-zinc-400">
                {CATEGORY_MAP[item.category_id - 1]}
              </div>
              <div>{item.price.toLocaleString()}원</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
