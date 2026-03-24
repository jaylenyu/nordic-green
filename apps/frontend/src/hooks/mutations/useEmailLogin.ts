'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_PATHS } from '@/lib/api-paths';
import { setAccessToken } from '@/lib/api-client';

interface EmailLoginInput {
  email: string;
  password: string;
}

export const useEmailLogin = () => {
  return useMutation({
    mutationFn: async (input: EmailLoginInput) => {
      const { data } = await axios.post(API_PATHS.AUTH.EMAIL_LOGIN, input);
      return data as { accessToken: string; user: { id: string; name: string; email: string } };
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
  });
};
