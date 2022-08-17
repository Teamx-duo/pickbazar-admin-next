import { useMutation, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import Question from '@repositories/question';
import { AnswerQuestionInput } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

export const useAnswerQuestionMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    (data: AnswerQuestionInput) => {
      return Question.answer(
        `${API_ENDPOINTS.ANSWER_QUESTION}/${data.id}`,
        data
      );
    },
    {
      onSuccess: () => {
        toast.success(t('common:successfully-updated'));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.QUESTIONS);
      },
    }
  );
};
