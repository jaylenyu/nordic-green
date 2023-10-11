const API_PATHS = {
  MAIN: {
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all?skip=1&take=8&category=&orderBy=&contains=`,
  },
  PRODUCT: {
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get`,
    UPDATE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/update`,
    RECOMMENDED: `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all?skip=&take=100`,
  },
  COMMENTS: {
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/get-all`,
    UPDATE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/update`,
    DELETE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/delete`,
  },
  ORDER: {
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/get`,
    UPDATE_STATUS: `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/update-status`,
    DELETE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/delete`,
    ADD: `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/add`,
  },
  CART: {
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/get`,
    UPDATE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/update`,
    DELETE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/delete`,
    ADD: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/add`,
  },
  WISHLIST: {
    GET_ALL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/get-all`,
    DELETE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/delete`,
    UPDATE: `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/update`,
    GET: `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/get`,
  },
};

export default API_PATHS;
