import { useMutation, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import Reviews from '@repositories/reviews';
import { toast } from 'react-toastify';

export const useReviewQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Reviews.delete(`${API_ENDPOINTS.REVIEWS}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.REVIEWS);
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
