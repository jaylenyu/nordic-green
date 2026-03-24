'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';

interface AddCartInput {
  productId: number;
  quantity: number;
  amount: number;
}

export const useAddCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: AddCartInput) => apiClient.post(API_PATHS.CART.ADD, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
