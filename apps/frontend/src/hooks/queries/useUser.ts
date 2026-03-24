'use client';

import { useQuery } from '@tanstack/react-query';
import { API_PATHS } from '@/lib/api-paths';
import apiClient from '@/lib/api-client';

export const useMe = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => apiClient.get(API_PATHS.USER.ME).then((res) => res.data),
  });
};

export const usePointHistory = () => {
  return useQuery({
    queryKey: ['user', 'points'],
    queryFn: () => apiClient.get(API_PATHS.USER.POINTS).then((res) => res.data),
  });
};

export const useGrade = () => {
  return useQuery({
    queryKey: ['user', 'grade'],
    queryFn: () => apiClient.get(API_PATHS.USER.GRADE).then((res) => res.data),
  });
};
