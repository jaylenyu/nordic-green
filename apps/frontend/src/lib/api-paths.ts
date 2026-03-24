const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export const API_PATHS = {
  PRODUCTS: {
    LIST: `${BASE}/products`,
    COUNT: `${BASE}/products/count`,
    DETAIL: (id: number) => `${BASE}/products/${id}`,
    UPDATE: (id: number) => `${BASE}/products/${id}`,
  },
  CART: {
    GET: `${BASE}/cart`,
    ADD: `${BASE}/cart`,
    UPDATE: (id: number) => `${BASE}/cart/${id}`,
    DELETE: (id: number) => `${BASE}/cart/${id}`,
  },
  ORDERS: {
    GET: `${BASE}/orders`,
    ADD: `${BASE}/orders`,
    UPDATE_STATUS: (id: number) => `${BASE}/orders/${id}/status`,
    DELETE: (id: number) => `${BASE}/orders/${id}`,
  },
  WISHLIST: {
    GET_IDS: `${BASE}/wishlist`,
    GET_ITEMS: `${BASE}/wishlist/items`,
    TOGGLE: `${BASE}/wishlist/toggle`,
    DELETE: `${BASE}/wishlist`,
  },
  COMMENTS: {
    GET: `${BASE}/comments`,
    GET_ONE: (id: number) => `${BASE}/comments/${id}`,
    UPSERT: `${BASE}/comments`,
    DELETE: (id: number) => `${BASE}/comments/${id}`,
  },
  AUTH: {
    SIGNUP: `${BASE}/auth/signup`,
    TOKEN: `${BASE}/auth/token`,
    EMAIL_SIGNUP: `${BASE}/auth/signup/email`,
    EMAIL_LOGIN: `${BASE}/auth/login/email`,
  },
  PAYMENTS: {
    CONFIRM: `${BASE}/payments/confirm`,
    GET: (orderId: number) => `${BASE}/payments/${orderId}`,
    CANCEL: (orderId: number) => `${BASE}/payments/${orderId}/cancel`,
  },
  USER: {
    ME: `${BASE}/user/me`,
    POINTS: `${BASE}/user/me/points`,
    GRADE: `${BASE}/user/me/grade`,
  },
} as const;
