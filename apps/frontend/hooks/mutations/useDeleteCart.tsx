import { Cart } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API_PATHS from "api";
import axios from "axios";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, number, any>(
    async (id) => {
      try {
        const { data } = await axios.post(API_PATHS.CART.DELETE, {
          id,
        });
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries([API_PATHS.CART.GET]);
        const prev = queryClient.getQueriesData([API_PATHS.CART.GET]);
        queryClient.setQueryData<Cart[]>([API_PATHS.CART.GET], (old) =>
          old?.filter((category) => category.id !== id)
        );
        return { prev };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([API_PATHS.CART.GET], context.prev);
        console.error(error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([API_PATHS.CART.GET]);
      },
    }
  );
};
