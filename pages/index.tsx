import { products } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { BLUR_IMAGE, CATEGORY_MAP, FILTERS, TAKE } from "constants/products";
import { Pagination, Select, Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "hooks/useDebounce";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [activePage, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("name");
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceSearchValue = useDebounce<string>(searchValue);
  const skip = TAKE * (activePage - 1);

  const { data: total } = useQuery(
    [
      `/api/get-products-count?category=${selectedCategory}&contains=${debounceSearchValue}`,
    ],
    () =>
      fetch(
        `/api/get-products-count?category=${selectedCategory}&contains=${debounceSearchValue}`
      )
        .then((res) => res.json())
        .then((data) => Math.ceil(data.items / TAKE))
  );

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [
      `/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debounceSearchValue}`,
    ],
    () =>
      fetch(
        `/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debounceSearchValue}`
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );

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

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-32">
      <div>
        <Input
          className="relative w-96 mb-10"
          placeholder="제품명 검색"
          value={searchValue}
          size="large"
          onChange={handleSearchInput}
          suffix={<SearchOutlined />}
        />
      </div>
      <div className="flex gap-10 mb-10">
        <Space>
          <Select
            className="w-32"
            defaultValue={FILTERS[0].value}
            onChange={handleFilterChange}
            options={FILTERS.map(({ label, value }) => ({ label, value }))}
          />
        </Space>
        <div>
          <button onClick={() => handleCategory("ALL")}>ALL</button>
          {CATEGORY_MAP.map((categoryName, index) => (
            <button onClick={() => handleCategory(categoryName)} key={index}>
              {categoryName}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 justify-items-center w-full">
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
              width={320}
              height={320}
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
