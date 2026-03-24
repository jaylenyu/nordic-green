'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.delete(API_PATHS.CART.DELETE(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
