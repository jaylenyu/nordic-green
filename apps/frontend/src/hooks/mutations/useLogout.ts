'use client';

import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import apiClient, { clearAccessToken } from '@/lib/api-client';
import { API_PATHS } from '@/lib/api-paths';

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await apiClient.post(API_PATHS.AUTH.LOGOUT).catch(() => {});
    },
    onSettled: async () => {
      clearAccessToken();
      await signOut({ callbackUrl: '/' });
    },
  });
};
