import axios from 'axios';
import { API_PATHS } from './api-paths';

const apiClient = axios.create({
  withCredentials: true,
});

let _accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  _accessToken = token;
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

export default apiClient;
