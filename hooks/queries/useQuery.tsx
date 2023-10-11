import { useQuery } from "@tanstack/react-query";
import API_PATHS from "api";
import axios from "axios";
import { products } from "@prisma/client";
import { CartItem, CommentsItemType, OrderDetail } from "types/type";

export const useWishlist = () => {
  return useQuery<{ items: products[] }, unknown, products[]>(
    [API_PATHS.WISHLIST.GET],
    () => axios.get(API_PATHS.WISHLIST.GET).then((res) => res.data.items)
  );
};

export const useWishlistAll = () => {
  return useQuery<{ items: products[] }, unknown, products[]>(
    [API_PATHS.WISHLIST.GET_ALL],
    () => axios.get(API_PATHS.WISHLIST.GET_ALL).then((res) => res.data.items)
  );
};

export const useOrder = () => {
  return useQuery<{ items: OrderDetail[] }, unknown, OrderDetail[]>(
    [API_PATHS.ORDER.GET],
    () => axios.get(API_PATHS.ORDER.GET).then((res) => res.data.items)
  );
};

export const useCart = () => {
  return useQuery<{ items: CartItem[] }, unknown, CartItem[]>(
    [API_PATHS.CART.GET],
    () => axios.get(API_PATHS.CART.GET).then((res) => res.data.items)
  );
};

export const useRecommend = () => {
  return useQuery<{ items: products[] }, unknown, products[]>(
    [API_PATHS.PRODUCT.RECOMMENDED],
    () => axios.get(API_PATHS.PRODUCT.RECOMMENDED).then((res) => res.data.items)
  );
};

export const useDetailWishlist = () => {
  const { data: wishlist } = useQuery([API_PATHS.WISHLIST.GET], async () => {
    const {
      data: { items },
    } = await axios.get(API_PATHS.WISHLIST.GET);
    return items;
  });
  return { data: wishlist };
};

export const useComments = (productId: string) => {
  return useQuery<{ items: CommentsItemType[] }, unknown, CommentsItemType[]>(
    [API_PATHS.COMMENTS.GET, productId],
    () =>
      axios
        .get(API_PATHS.COMMENTS.GET, { params: { productId } })
        .then((res) => res.data.items)
  );
};
