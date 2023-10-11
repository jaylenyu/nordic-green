import { Cart } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API_PATHS from "api";
import axios from "axios";

export const useAddCart = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, Omit<Cart, "id" | "userId">, any>(
    async (item) => {
      try {
        const { data } = await axios.post(API_PATHS.CART.ADD, {
          item,
        });
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: () => {
        queryClient.invalidateQueries([API_PATHS.CART.GET]);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([API_PATHS.CART.GET]);
      },
    }
  );
};
