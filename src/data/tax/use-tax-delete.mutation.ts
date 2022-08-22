import { useMutation, useQueryClient } from "react-query";
import Tax from "@repositories/tax";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";

export const useDeleteTaxMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Tax.delete(`${API_ENDPOINTS.TAXES}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.TAXES);
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
