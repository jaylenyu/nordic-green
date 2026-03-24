'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';

interface OrderItemInput {
  productId: number;
  quantity: number;
  price: number;
  amount: number;
}

interface AddOrderInput {
  items: OrderItemInput[];
  receiver?: string;
  address?: string;
  phoneNumber?: string;
}

export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: AddOrderInput) => apiClient.post(API_PATHS.ORDERS.ADD, order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
