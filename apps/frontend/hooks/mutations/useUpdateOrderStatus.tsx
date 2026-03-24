import { Cart } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API_PATHS from "api";
import axios from "axios";
import { UpdateOrderStatusInput } from "types/type";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, UpdateOrderStatusInput, any>(
    async ({ id, status, userId }) => {
      try {
        const { data } = await axios.post(API_PATHS.ORDER.UPDATE_STATUS, {
          id,
          status,
          userId,
        });
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: async ({ id, status }) => {
        await queryClient.cancelQueries([API_PATHS.ORDER.GET]);
        const prev = queryClient.getQueryData([API_PATHS.ORDER.GET]);
        queryClient.setQueryData<Cart[]>([API_PATHS.ORDER.GET], (old) =>
          old?.map((category) => {
            if (category.id === id) {
              return { ...category, status };
            }
            return category;
          })
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
