import { products } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "@mui/material/Pagination";

const TAKE = 9;
export default function Products() {
  const [products, setProducts] = useState<products[]>([]);
  const [total, setTotal] = useState(0);
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/get-products-count")
      .then((res) => res.json())
      .then((data) => setTotal(Math.ceil(data.items / TAKE)));
    fetch(`/api/get-products?skip=0&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, []);

  useEffect(() => {
    const skip = TAKE * (activePage - 1);
    fetch(`/api/get-products?skip=${skip}&take=${TAKE}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, [activePage]);

  return (
    <div className="flex flex-col items-center p-10">
      <div className="grid grid-cols-3 gap-4 justify-items-center w-full">
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
      <Pagination
        count={total}
        page={activePage}
        onChange={(_, value) => setPage(value)}
      />
    </div>
  );
}
