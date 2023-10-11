import { Cart } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API_PATHS from "api";
import axios from "axios";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, number, any>(
    async (id) => {
      try {
        const { data } = await axios.post(API_PATHS.ORDER.DELETE, {
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
        await queryClient.cancelQueries([API_PATHS.ORDER.GET]);
        const prev = queryClient.getQueriesData([API_PATHS.ORDER.GET]);
        queryClient.setQueryData<Cart[]>([API_PATHS.ORDER.GET], (old) =>
          old?.filter((category) => category.id !== id)
        );
        return { prev };
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([API_PATHS.ORDER.GET], context.prev);
        console.error(error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([API_PATHS.ORDER.GET]);
      },
    }
  );
};
