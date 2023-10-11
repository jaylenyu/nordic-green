import { useState, ChangeEvent } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "hooks/useDebounce";
import { CATEGORY_MAP, TAKE } from "constants/products";
import { products } from "@prisma/client";

export default function useProductManagement() {
  const [activePage, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("name");
  const [selectedCategory, setSelectedCategory] = useState<string>("-1");
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceSearchValue = useDebounce<string>(searchValue);
  const skip = TAKE * (activePage - 1);

  const TOTAL_QUERY_KEY = `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-count?category=${selectedCategory}&contains=${debounceSearchValue}`;
  const PRODUCTS_QUERY_KEY = `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all?skip=${skip}&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debounceSearchValue}`;

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

  return {
    activePage,
    setPage,
    selectedFilter,
    setSelectedFilter,
    selectedCategory,
    setSelectedCategory,
    searchValue,
    setSearchValue,
    total,
    products,
    handleCategory,
    handleFilterChange,
    handleSearchInput,
  };
}
