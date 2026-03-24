'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';

export const useDeleteComment = (productId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) =>
      apiClient.delete(API_PATHS.COMMENTS.DELETE(commentId)).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', productId] });
    },
  });
};
