import { products } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { WISHLIST_GET_QUERY_KEY } from "api";
import axios from "axios";
import { BLUR_IMAGE, CATEGORY_MAP } from "constants/products";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Wishlist() {
  const router = useRouter();

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >([WISHLIST_GET_QUERY_KEY], () =>
    axios.get(WISHLIST_GET_QUERY_KEY).then((res) => res.data.items)
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
