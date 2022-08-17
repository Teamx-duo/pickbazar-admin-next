import { useMutation, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import Question from '@repositories/question';

export const useDeleteQuestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Question.delete(`${API_ENDPOINTS.QUESTIONS}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.QUESTIONS);
      },
    }
  );
};
