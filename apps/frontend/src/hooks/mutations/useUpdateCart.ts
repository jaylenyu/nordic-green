'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';

interface UpdateCartInput {
  id: number;
  quantity: number;
  amount: number;
}

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity, amount }: UpdateCartInput) =>
      apiClient.patch(API_PATHS.CART.UPDATE(id), { quantity, amount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
