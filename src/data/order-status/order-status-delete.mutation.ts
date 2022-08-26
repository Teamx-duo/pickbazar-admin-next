import { useMutation, useQueryClient } from 'react-query';
import OrderStatus from '@repositories/order-status';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { toast } from 'react-toastify';

export const useDeleteOrderStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => OrderStatus.delete(`${API_ENDPOINTS.ORDER_STATUS}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ORDER_STATUS);
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
