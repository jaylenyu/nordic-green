import { products } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const TAKE = 9;
export default function Products() {
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState<products[]>([]);

  useEffect(() => {
    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, []);

  const getProducts = useCallback(() => {
    const next = skip + TAKE;
    fetch(`/api/get-products?skip=${next}&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => {
        const list = products.concat(data.items);
        setProducts(list);
      });
    setSkip(next);
  }, [skip, products]);

  return (
    <div className="px-36 mt-36 mb-36">
      {products && (
        <div className="grid gird-cols-4 gap-5">
          {products.map((item) => (
            <div key={item.id}>
              <Image
                className="rounded"
                alt={item.name}
                src={item.image_url ?? ""}
                width={300}
                height={200}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcVg8AAdEBJz4pG4wAAAAASUVORK5CYII="
              />
              <div className="flex">
                <span>{item.name}</span>
                <span>{item.price.toLocaleString()}원</span>
              </div>
              <span className="text-zinc-400">
                {item.category_id === 1 && "의류"}
              </span>
            </div>
          ))}
        </div>
      )}
      <button
        className="w-full rounded mt-20 bg-slate-200 p-4"
        onClick={getProducts}
      >
        더보기
      </button>
    </div>
  );
}
