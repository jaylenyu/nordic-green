import axios from 'axios';
import { API_PATHS } from './api-paths';

const apiClient = axios.create({
  withCredentials: true,
});

let _accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  _accessToken = token;
}

export function clearAccessToken() {
  _accessToken = null;
}

/**
 * Exchange the NextAuth userId for a short-lived NestJS JWT.
 * Call this after successful NextAuth sign-in.
 */
export async function fetchAndSetToken(userId: string) {
  const { data } = await axios.post(API_PATHS.AUTH.TOKEN, { userId });
  setAccessToken(data.accessToken);
  return data.accessToken as string;
}

apiClient.interceptors.request.use((config) => {
  if (_accessToken) {
    config.headers.Authorization = `Bearer ${_accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAccessToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
