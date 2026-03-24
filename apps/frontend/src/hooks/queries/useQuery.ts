'use client';

import { useQuery } from '@tanstack/react-query';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';

export const useWishlist = () => {
  return useQuery({
    queryKey: ['wishlist-ids'],
    queryFn: () => apiClient.get(API_PATHS.WISHLIST.GET_IDS).then((res) => res.data),
  });
};

export const useWishlistItems = () => {
  return useQuery({
    queryKey: ['wishlist-items'],
    queryFn: () => apiClient.get(API_PATHS.WISHLIST.GET_ITEMS).then((res) => res.data),
  });
};

export const useOrder = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => apiClient.get(API_PATHS.ORDERS.GET).then((res) => res.data),
  });
};

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => apiClient.get(API_PATHS.CART.GET).then((res) => res.data),
  });
};

export const useRecommend = () => {
  return useQuery({
    queryKey: ['recommend'],
    queryFn: () =>
      apiClient
        .get(API_PATHS.PRODUCTS.LIST, { params: { skip: 0, take: 100 } })
        .then((res) => res.data),
  });
};

export const useComments = (productId: number) => {
  return useQuery({
    queryKey: ['comments', productId],
    queryFn: () =>
      apiClient.get(API_PATHS.COMMENTS.GET, { params: { productId } }).then((res) => res.data),
  });
};
