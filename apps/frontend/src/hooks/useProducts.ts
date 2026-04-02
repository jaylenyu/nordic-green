'use client';

import { useState, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';
import useDebounce from '@/hooks/useDebounce';
import { CATEGORY_MAP, TAKE } from 'constants/products';

export default function useProductManagement() {
  const [activePage, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<string>('name');
  const [selectedCategory, setSelectedCategory] = useState<string>('-1');
  const [searchValue, setSearchValue] = useState<string>('');
  const debounceSearchValue = useDebounce<string>(searchValue);
  const skip = TAKE * (activePage - 1);

  const category = selectedCategory === '-1' ? undefined : selectedCategory;

  const { data: total } = useQuery({
    queryKey: ['products-count', category, debounceSearchValue],
    queryFn: () =>
      apiClient
        .get(API_PATHS.PRODUCTS.COUNT, { params: { category, contains: debounceSearchValue } })
        .then((res) => Math.ceil(res.data.total / TAKE)),
  });

  const { data: products } = useQuery({
    queryKey: ['products', skip, TAKE, category, selectedFilter, debounceSearchValue],
    queryFn: () =>
      apiClient
        .get(API_PATHS.PRODUCTS.LIST, {
          params: {
            skip,
            take: TAKE,
            category,
            orderBy: selectedFilter,
            contains: debounceSearchValue,
          },
        })
        .then((res) => res.data),
  });

  const handleCategory = (categoryName: string) => {
    if (categoryName === 'ALL') {
      setSelectedCategory('-1');
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
    selectedCategory,
    searchValue,
    total,
    products,
    handleCategory,
    handleFilterChange,
    handleSearchInput,
  };
}
