import { useMutation, useQueryClient } from "react-query";
import Type from "@repositories/type";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";

export const useDeleteTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Type.delete(`${API_ENDPOINTS.TYPES}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.TYPES);
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
