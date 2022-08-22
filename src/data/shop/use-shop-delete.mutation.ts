import { useMutation, useQueryClient } from "react-query";
import Shop from "@repositories/shop";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";

export const useDeleteShopMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Shop.delete(`${API_ENDPOINTS.SHOPS}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.SHOPS);
      },
      onError: (error: any) => {
        toast.error(
          typeof error?.response?.data?.message === 'string'
            ? error?.response?.data?.message
            : error?.response?.data?.message?.[0]
        );
      },
    }
  );
};
