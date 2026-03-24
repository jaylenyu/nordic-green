'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_PATHS } from '@/lib/api-paths';
import { setAccessToken } from '@/lib/api-client';

interface EmailSignUpInput {
  email: string;
  name: string;
  password: string;
  phone?: string;
}

export const useEmailSignUp = () => {
  return useMutation({
    mutationFn: async (input: EmailSignUpInput) => {
      const { data } = await axios.post(API_PATHS.AUTH.EMAIL_SIGNUP, input);
      return data as { accessToken: string; user: { id: string; name: string; email: string } };
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
  });
};
