'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.delete(API_PATHS.WISHLIST.DELETE),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist-ids'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist-items'] });
    },
  });
};
