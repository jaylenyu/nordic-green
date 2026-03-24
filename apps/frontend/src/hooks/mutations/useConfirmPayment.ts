'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';

interface ConfirmPaymentInput {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ConfirmPaymentInput) =>
      apiClient.post(API_PATHS.PAYMENTS.CONFIRM, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
  });
};
