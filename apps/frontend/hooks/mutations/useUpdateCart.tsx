import { Cart } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API_PATHS from "api";
import axios from "axios";

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, Cart, any>(
    async (item) => {
      try {
        const { data } = await axios.post(API_PATHS.CART.UPDATE, {
          item,
        });
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: async (item) => {
        await queryClient.cancelQueries([API_PATHS.CART.GET]);
        const prev = queryClient.getQueryData([API_PATHS.CART.GET]);
        queryClient.setQueryData<Cart[]>([API_PATHS.CART.GET], (old) =>
          old?.map((category) => (category.id === item.id ? item : category))
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
