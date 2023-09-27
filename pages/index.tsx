import { products } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { BLUR_IMAGE, CATEGORY_MAP, FILTERS, TAKE } from "constants/products";
import { Pagination, Select, Space, Input, Button, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "hooks/useDebounce";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [activePage, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("name");
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceSearchValue = useDebounce<string>(searchValue);
  const skip = TAKE * (activePage - 1);
  const TOTAL_QUERY_KEY = `/api/get-products-count?category=${selectedCategory}&contains=${debounceSearchValue}`;
  const PRODUCTS_QUERY_KEY = `/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debounceSearchValue}`;

  const { data: total } = useQuery([TOTAL_QUERY_KEY], () =>
    axios.get(TOTAL_QUERY_KEY).then((res) => Math.ceil(res.data.items / TAKE))
  );

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >([PRODUCTS_QUERY_KEY], () =>
    axios.get(PRODUCTS_QUERY_KEY).then((res) => res.data.items)
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
    <div className="flex flex-col items-center px-32">
      <div className="flex justify-between w-full mb-20">
        <div>
          <Button
            className="text-2xl h-12"
            type="text"
            onClick={() => handleCategory("ALL")}
          >
            ALL
          </Button>
          {CATEGORY_MAP.map((categoryName, index) => (
            <Button
              className="h-12 ml-10 text-2xl"
              type="text"
              onClick={() => handleCategory(categoryName)}
              key={index}
            >
              {categoryName}
            </Button>
          ))}
        </div>
        <Space>
          <Select
            className="w-32"
            defaultValue={FILTERS[0].value}
            onChange={handleFilterChange}
            options={FILTERS.map(({ label, value }) => ({ label, value }))}
          />
        </Space>
      </div>
      <div>
        <Input
          className="relative w-96 mb-20"
          placeholder="제품명 검색"
          value={searchValue}
          size="large"
          onChange={handleSearchInput}
          suffix={<SearchOutlined />}
        />
      </div>
      <div className="grid grid-cols-3 gap-10 justify-items-center w-full">
        {products?.map((item) => (
          <Card
            className="w-80"
            key={item.id}
            onClick={() => router.push(`/products/${item.id}`)}
            hoverable
            bordered={false}
            cover={
              <Image
                alt={item.name}
                src={item.image_url ?? ""}
                width={320}
                height={320}
                placeholder="blur"
                blurDataURL={BLUR_IMAGE}
              />
            }
          >
            <div className="h-12 w-full">{item.name}</div>
            <div className="text-zinc-400">
              {CATEGORY_MAP[item.category_id - 1]}
            </div>
            <div>{item.price.toLocaleString()}원</div>
          </Card>
        ))}
      </div>
      <Pagination
        className="mt-20"
        total={total}
        pageSize={1}
        defaultCurrent={1}
        current={activePage}
        onChange={(value) => setPage(value)}
      />
    </div>
  );
}
