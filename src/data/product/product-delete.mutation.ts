import { useMutation, useQueryClient } from "react-query";
import Product from "@repositories/product";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Product.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS);
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
