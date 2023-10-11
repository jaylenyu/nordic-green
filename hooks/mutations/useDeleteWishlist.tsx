// mutations/useDeleteWishlist.ts
import { WishList } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API_PATHS from "api";
import axios from "axios";

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (productId: number) => {
      await axios.post(API_PATHS.WISHLIST.DELETE, { productId });
    },
    {
      onMutate: async (productId) => {
        await queryClient.cancelQueries([API_PATHS.WISHLIST.GET_ALL]);
        const prev = queryClient.getQueryData([API_PATHS.WISHLIST.GET_ALL]);
        queryClient.setQueryData<WishList[]>(
          [API_PATHS.WISHLIST.GET_ALL],
          (old) => old?.filter((item) => item.id !== productId)
        );

        return { prev };
      },
      onError: (error, _, context: any) => {
        queryClient.setQueryData([API_PATHS.WISHLIST.GET_ALL], context.prev);
        console.error(error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([API_PATHS.WISHLIST.GET_ALL]);
      },
    }
  );
};
