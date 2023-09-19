import { categories, products } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "@mui/material/Pagination";
import { CATEGORY_MAP, TAKE } from "constants/products";

export default function Products() {
  const [products, setProducts] = useState<products[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<categories[]>([]);
  const [activePage, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("-1");

  useEffect(() => {
    fetch("/api/get-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.items));
  }, []);

  useEffect(() => {
    fetch(`/api/get-products-count?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        setTotal(Math.ceil(data.items / TAKE));
        console.log(data);
      });
  }, [selectedCategory]);

  useEffect(() => {
    const skip = TAKE * (activePage - 1);
    fetch(
      `/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, [activePage, selectedCategory]);

  const handleCategory = (categoryName: string) => {
    if (categoryName === "ALL") {
      setSelectedCategory("-1");
    } else {
      const categoryIndex = CATEGORY_MAP.indexOf(categoryName);
      if (categoryIndex !== -1) {
        setSelectedCategory((categoryIndex + 1).toString());
      }
    }
  };
  console.log(selectedCategory);

  return (
    <div className="flex flex-col items-center p-32">
      <div className="flex gap-10 mb-10">
        <button onClick={() => handleCategory("ALL")}>ALL</button>
        {CATEGORY_MAP.map((categoryName, index) => (
          <button
            className="border"
            onClick={() => handleCategory(categoryName)}
            key={index}
          >
            {categoryName}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 justify-items-center w-full">
        {products.map((item) => (
          <div key={item.id} className="max-w-xs border">
            <Image
              className="rounded"
              alt={item.name}
              src={item.image_url ?? ""}
              width={320}
              height={320}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcVg8AAdEBJz4pG4wAAAAASUVORK5CYII="
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
      <Pagination
        count={total}
        page={activePage}
        onChange={(_, value) => setPage(value)}
      />
    </div>
  );
}
