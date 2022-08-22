import { OrderStatusInput } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import OrderStatus from '@repositories/order-status';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { toast } from 'react-toastify';

export interface IOrderStatusCreateVariables {
  variables: {
    input: OrderStatusInput;
  };
}

export const useCreateOrderStatusMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IOrderStatusCreateVariables) =>
      OrderStatus.create(API_ENDPOINTS.ORDER_STATUS, input),
    {
      onSuccess: () => {
        router.push(ROUTES.ORDER_STATUS);
      },
      onError: (error: any) => {
        toast.error(
          typeof error?.response?.data?.message === 'string'
            ? error?.response?.data?.message
            : error?.response?.data?.message?.[0]
        );
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.ORDER_STATUS);
      },
    }
  );
};
