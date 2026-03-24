'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';

interface UpdateOrderStatusInput {
  orderId: number;
  status: number;
}

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: UpdateOrderStatusInput) =>
      apiClient.patch(API_PATHS.ORDERS.UPDATE_STATUS(orderId), { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
