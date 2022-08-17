import {
  QueryParamsType,
  QuestionsQueryOptionsType,
} from '@ts-types/custom.types';
import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { IPaginator, Question, QuestionPaginator } from '@ts-types/generated';
import question from '@repositories/question';

const fetchQuestions = async ({
  queryKey,
}: QueryParamsType): Promise<{ questions: QuestionPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    limit = 15,
    shop_id,
    orderBy = 'updatedAt',
    sortedBy = 'DESC',
    user,
    product,
  } = params as QuestionsQueryOptionsType;

  const url = `${API_ENDPOINTS.QUESTIONS}?${
    shop_id ? `shop=${shop_id}` : ''
  }&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}${
    user ? `&user=${user}` : ''
  }${product ? `&product=${product}` : ''}`;

  const {
    data: { docs, ...rest },
  } = await question.all(url);
  return {
    questions: {
      data: docs,
      paginatorInfo: rest,
    },
  };
};

const useQuestionsQuery = (
  params: QuestionsQueryOptionsType,
  options: any = {}
) => {
  return useQuery<{ questions: IPaginator<Question> }, Error>(
    [API_ENDPOINTS.QUESTIONS, params],
    fetchQuestions,
    { ...options, keepPreviousData: true }
  );
};

export { useQuestionsQuery, fetchQuestions };
