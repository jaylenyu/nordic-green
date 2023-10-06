// export const BASE_URL = "http://localhost:3000";
export const BASE_URL = "https://nordic-green.vercel.app";
export const PRODUCT_API_PATH = "/api/get-product";
export const COMMENTS_API_PATH = "/api/get-comments";

const API_PATHS = {
  PRODUCT: {
    GET: `${BASE_URL}/api/get-product`,
    UPDATE: `${BASE_URL}/api/update-product`,
    RECOMMENDED: `${BASE_URL}/api/get-products?skip=&take=100`,
  },
  COMMENTS: {
    GET: `${BASE_URL}/api/get-comments`,
    UPDATE: `${BASE_URL}/api/update-comment`,
    DELETE: `${BASE_URL}/api/delete-comment`,
  },
  ORDER: {
    GET: `${BASE_URL}/api/get-order`,
    UPDATE_STATUS: `${BASE_URL}/api/update-order-status`,
    DELETE: `${BASE_URL}/api/delete-order`,
    ADD: `${BASE_URL}/api/add-order`,
  },
  CART: {
    GET: `${BASE_URL}/api/get-cart`,
    UPDATE: `${BASE_URL}/api/update-cart`,
    DELETE: `${BASE_URL}/api/delete-cart`,
    ADD: `${BASE_URL}/api/add-cart`,
  },
  WISHLIST: {
    GET_ALL: `${BASE_URL}/api/get-wishlists`,
    DELETE: `${BASE_URL}/api/delete-wishlist`,
    UPDATE: `${BASE_URL}/api/update-wishlist`,
    GET: `${BASE_URL}/api/get-wishlist`,
  },
};

export default API_PATHS;
