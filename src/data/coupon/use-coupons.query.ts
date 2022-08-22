import { QueryParamsType, QueryOptionsType } from '@ts-types/custom.types';
import { mapPaginatorData, stringifySearchQuery } from '@utils/data-mappers';
import { useQuery } from 'react-query';
import Coupon from '@repositories/coupon';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { Coupon as ICoupon, IPaginator } from '@ts-types/generated';

const fetchCoupons = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 15,
    orderBy = 'updatedAt',
    sortedBy = 'desc',
  } = params as QueryOptionsType;
  const url = `${API_ENDPOINTS.COUPONS}?${
    text ? `search=${text}` : ''
  }&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { docs, ...rest },
  } = await Coupon.all(url);
  return { coupons: { data: docs, paginatorInfo: rest } };
};

const useCouponsQuery = (options: QueryOptionsType) => {
  return useQuery<{ coupons: IPaginator<ICoupon> }, Error>(
    [API_ENDPOINTS.COUPONS, options],
    fetchCoupons,
    {
      keepPreviousData: true,
    }
  );
};

export { useCouponsQuery, fetchCoupons };
