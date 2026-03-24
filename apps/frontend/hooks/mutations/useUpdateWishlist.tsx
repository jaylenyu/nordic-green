import { useMutation, useQueryClient } from "@tanstack/react-query";
import API_PATHS from "api";
import axios from "axios";

export const useUpdateWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, string, any>(
    async (productId) => {
      try {
        const { data } = await axios.post(API_PATHS.WISHLIST.UPDATE, {
          productId,
        });
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: async (productId) => {
        await queryClient.cancelQueries([API_PATHS.WISHLIST.GET]);
        const prev = queryClient.getQueriesData([API_PATHS.WISHLIST.GET]);
        queryClient.setQueryData<string[]>([API_PATHS.WISHLIST.GET], (old) =>
          old
            ? old.includes(String(productId))
              ? old.filter((id) => id !== String(productId))
              : old.concat(String(productId))
            : []
        );
        return { prev };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([API_PATHS.WISHLIST.GET], context.prev);
        console.error(error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([API_PATHS.WISHLIST.GET]);
      },
    }
  );
};
