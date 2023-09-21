import { categories, products } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CATEGORY_MAP, FILTERS, TAKE } from "constants/products";
import { Pagination, Select, Space } from "antd";

export default function Products() {
  const [products, setProducts] = useState<products[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<categories[]>([]);
  const [activePage, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("name");
  const [selectedCategory, setSelectedCategory] = useState<string>();

  useEffect(() => {
    fetch("/api/get-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.items));
  }, []);

  useEffect(() => {
    fetch(`/api/get-products-count?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setTotal(Math.ceil(data.items / TAKE)));
  }, [selectedCategory]);

  useEffect(() => {
    const skip = TAKE * (activePage - 1);
    fetch(
      `/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, [activePage, selectedCategory, selectedFilter]);

  const handleCategory = (categoryName: string) => {
    if (categoryName === "ALL") {
      setSelectedCategory("-1");
    } else {
      const categoryIndex = CATEGORY_MAP.indexOf(categoryName);
      if (categoryIndex !== -1) {
        setSelectedCategory((categoryIndex + 1).toString());
      }
    }
    setPage(1);
  };

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col items-center p-32">
      <div className="flex gap-10 mb-10">
        <Space>
          <Select
            defaultValue={FILTERS[0].value}
            style={{ width: 120 }}
            onChange={handleFilterChange}
            options={FILTERS.map(({ label, value }) => ({ label, value }))}
          />
        </Space>
        <button className="border" onClick={() => handleCategory("ALL")}>
          ALL
        </button>
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
        {products?.map((item) => (
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
        total={total}
        pageSize={1}
        defaultCurrent={1}
        current={activePage}
        onChange={(value) => setPage(value)}
      />
    </div>
  );
}
