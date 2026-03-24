'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';

interface UpsertCommentInput {
  orderItemId: number;
  rate: number;
  contents?: string;
  images?: string;
}

export const useUpsertComment = (productId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: UpsertCommentInput) =>
      apiClient.post(API_PATHS.COMMENTS.UPSERT, comment).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', productId] });
    },
  });
};
