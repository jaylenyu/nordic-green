'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) =>
      apiClient.post(API_PATHS.WISHLIST.TOGGLE, { productId }).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist-ids'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-items'] });
    },
  });
};
