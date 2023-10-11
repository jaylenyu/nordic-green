import { useEffect } from "react";
import { CATEGORY_MAP, FILTERS } from "constants/products";
import { Pagination, Select, Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CategoryButton, CustomWrap } from "styles/common.styled";
import EmptyBox from "@components/EmptyBox";
import SpinnerComponent from "@components/Spinner";
import ProductCard from "@components/ProductCard";
import useProductManagement from "hooks/useProducts";

export default function Products() {
  const {
    activePage,
    setPage,
    selectedCategory,
    searchValue,
    total,
    products,
    handleCategory,
    handleFilterChange,
    handleSearchInput,
  } = useProductManagement();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activePage]);

  return (
    <>
      <CustomWrap padding="150px 120px">
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
        <div className="mb-10">
          <CategoryButton
            type="link"
            selected={selectedCategory === "-1"}
            onClick={() => handleCategory("ALL")}
          >
            ALL
          </CategoryButton>
          {CATEGORY_MAP.map((categoryName, index) => (
            <CategoryButton
              type="link"
              selected={selectedCategory === (index + 1).toString()}
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
          {products ? (
            products.length > 0 ? (
              <div className="grid grid-cols-4 sm:grid-cols-2 sx:grid-cols-2 gap-5 lg:gap-3 md:gap-3 sm:gap-2 sx:gap-2  justify-items-center">
                {products?.map((item, idx) => (
                  <ProductCard key={idx} products={item} />
                ))}
              </div>
            ) : (
              <EmptyBox />
            )
          ) : (
            <SpinnerComponent />
          )}
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
    </>
  );
}
