const API_PATHS = {
  MAIN: {
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-products?skip=1&take=8&category=&orderBy=&contains=`,
  },
  PRODUCT: {
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-product`,
    UPDATE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-product`,
    RECOMMENDED: `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-products?skip=&take=100`,
  },
  COMMENTS: {
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-comments`,
    UPDATE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-comment`,
    DELETE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete-comment`,
  },
  ORDER: {
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-order`,
    UPDATE_STATUS: `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-order-status`,
    DELETE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete-order`,
    ADD: `${process.env.NEXT_PUBLIC_BASE_URL}/api/add-order`,
  },
  CART: {
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-cart`,
    UPDATE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-cart`,
    DELETE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete-cart`,
    ADD: `${process.env.NEXT_PUBLIC_BASE_URL}/api/add-cart`,
  },
  WISHLIST: {
    GET_ALL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-wishlists`,
    DELETE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete-wishlist`,
    UPDATE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-wishlist`,
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-wishlist`,
  },
};

export default API_PATHS;
