import { useMutation, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import Reviews from '@repositories/reviews';

export const useReviewQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Reviews.delete(`${API_ENDPOINTS.REVIEWS}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.REVIEWS);
      },
    }
  );
};
