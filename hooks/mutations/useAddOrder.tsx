import { OrderItem } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API_PATHS from "api";
import axios from "axios";
import { useRouter } from "next/router";
import { useDeleteCart } from "./useDeleteCart";
import { useCart } from "hooks/queries/useQuery";

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: product } = useCart();
  const { mutate: deleteCart } = useDeleteCart();

  return useMutation<unknown, unknown, Omit<OrderItem, "id">[], any>(
    async (items) => {
      try {
        const { data } = await axios.post(API_PATHS.ORDER.ADD, {
          items,
        });
        return data.items;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onMutate: () => {
        queryClient.invalidateQueries([API_PATHS.ORDER.GET]);
      },
      onSuccess: () => {
        alert("결제화면으로 이동합니다.");
        router.push("/order");
        product?.forEach((cartItem) => {
          deleteCart(cartItem.id);
        });
        queryClient.invalidateQueries([API_PATHS.ORDER.GET]);
      },
    }
  );
};
