import {
  QueryParamsType,
  ReviewsQueryOptionsType,
} from '@ts-types/custom.types';
import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { IPaginator, Review, ReviewPaginator } from '@ts-types/generated';
import review from '@repositories/reviews';

const fetchReviews = async ({
  queryKey,
}: QueryParamsType): Promise<{ reviews: ReviewPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    limit = 15,
    shop_id,
    orderBy = 'updatedAt',
    sortedBy = 'desc',
    user,
    product,
  } = params as ReviewsQueryOptionsType;

  const url = `${API_ENDPOINTS.REVIEWS}?${
    shop_id ? `shop=${shop_id}` : ''
  }&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}${
    user ? `&user=${user}` : ''
  }${product ? `&product=${product}` : ''}`;

  const {
    data: { docs, ...rest },
  } = await review.all(url);
  return {
    reviews: {
      data: docs,
      paginatorInfo: rest,
    },
  };
};

const useReviewsQuery = (
  params: ReviewsQueryOptionsType,
  options: any = {}
) => {
  return useQuery<{ reviews: IPaginator<Review> }, Error>(
    [API_ENDPOINTS.REVIEWS, params],
    fetchReviews,
    { ...options, keepPreviousData: true }
  );
};

export { useReviewsQuery, fetchReviews };
