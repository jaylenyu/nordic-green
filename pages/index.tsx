import { products } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";
import { BLUR_IMAGE, CATEGORY_MAP, FILTERS, TAKE } from "constants/products";
import { Pagination, Select, Space, Input, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "hooks/useDebounce";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { CategoryButton, CustomWrap } from "styles/common.styled";
import EmptyBox from "@components/EmptyBox";
import SpinnerComponent from "@components/Spinner";
import { BASE_URL } from "api";

export default function Home() {
  const router = useRouter();
  const [activePage, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("name");
  const [selectedCategory, setSelectedCategory] = useState<string>("-1");
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceSearchValue = useDebounce<string>(searchValue);
  const skip = TAKE * (activePage - 1);
  const TOTAL_QUERY_KEY = `${BASE_URL}/api/get-products-count?category=${selectedCategory}&contains=${debounceSearchValue}`;
  const PRODUCTS_QUERY_KEY = `${BASE_URL}/api/get-products?skip=${skip}&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debounceSearchValue}`;

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

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activePage]);

  return (
    <CustomWrap>
      <div className="flex justify-center">
        <Input
          className="w-96 mb-10"
          placeholder="제품명 검색"
          value={searchValue}
          size="large"
          onChange={handleSearchInput}
          suffix={<SearchOutlined />}
        />
      </div>
      <div>
        <CategoryButton
          className="h-12 text-2xl text-green-700	"
          type="text"
          onClick={() => handleCategory("ALL")}
        >
          ALL
        </CategoryButton>
        {CATEGORY_MAP.map((categoryName, index) => (
          <CategoryButton
            className="h-12 text-2xl text-green-700	"
            type="text"
            onClick={() => handleCategory(categoryName)}
            key={index}
          >
            {categoryName}
          </CategoryButton>
        ))}
      </div>
      <div>
        <Space className="flex justify-end mb-10">
          <Select
            className="w-32"
            defaultValue={FILTERS[0].value}
            onChange={handleFilterChange}
            options={FILTERS.map(({ label, value }) => ({ label, value }))}
          />
        </Space>
        <div className="grid grid-cols-3 gap-10 justify-items-center">
          {products && products?.length > 0 ? (
            products?.map((item) => (
              <Card
                className="w-full"
                key={item.id}
                onClick={() => router.push(`/products/${item.id}`)}
                hoverable
                bordered={false}
                cover={
                  <Image
                    alt={item.name}
                    src={item.image_url ?? ""}
                    width={1000}
                    height={1000}
                    priority={true}
                    unoptimized
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL={BLUR_IMAGE}
                  />
                }
              >
                <div className="flex flex-col justify-between h-24">
                  <div className="w-full text-lg font-bold">{item.name}</div>
                  <div>
                    <div className="text-zinc-400">
                      {CATEGORY_MAP[item.category_id - 1]}
                    </div>
                    <div>{item.price.toLocaleString()} ₩</div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <>
              <div />
              <div>
                {products?.length === 0 ? <EmptyBox /> : <SpinnerComponent />}
              </div>
            </>
          )}
        </div>
      </div>
      <Pagination
        className="flex justify-center mt-20"
        total={total}
        pageSize={1}
        defaultCurrent={1}
        current={activePage}
        onChange={(value) => setPage(value)}
      />
    </CustomWrap>
  );
}
