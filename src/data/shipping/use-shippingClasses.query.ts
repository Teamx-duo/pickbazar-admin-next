import { QueryParamsType, QueryOptionsType } from '@ts-types/custom.types';
import { stringifySearchQuery } from '@utils/data-mappers';
import { useQuery } from 'react-query';
import Shipping from '@repositories/shipping';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { Shipping as IShipping } from '@ts-types/generated';

const fetchShippingClasses = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    text,
    orderBy = 'updatedAt',
    sortedBy = 'DESC',
  } = params as QueryOptionsType;
  const url = `${API_ENDPOINTS.SHIPPINGS}?${
    text ? `search=${text}` : ''
  }&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const { data } = await Shipping.all(url);
  return { shippingClasses: data };
};

const useShippingClassesQuery = (options: QueryOptionsType = {}) => {
  return useQuery<{ shippingClasses: IShipping[] }, Error>(
    [API_ENDPOINTS.SHIPPINGS, options],
    fetchShippingClasses,
    {
      keepPreviousData: true,
    }
  );
};

export { useShippingClassesQuery, fetchShippingClasses };
