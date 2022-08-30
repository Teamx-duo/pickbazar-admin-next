import { QueryParamsType, QueryOptionsType } from '@ts-types/custom.types';
import { stringifySearchQuery } from '@utils/data-mappers';
import { useQuery } from 'react-query';
import Tax from '@repositories/tax';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { IPaginator, ITax } from '@ts-types/generated';

const fetchTaxes = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    text,
    orderBy = 'updatedAt',
    sortedBy = 'desc',
  } = params as QueryOptionsType;
  const searchString = stringifySearchQuery({
    name: text,
  });
  const url = `${API_ENDPOINTS.TAXES}?search=${searchString}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { docs, ...rest },
  } = await Tax.all(url);
  return { taxes: { data: docs, paginatorInfo: rest } };
};

const useTaxesQuery = (options: QueryOptionsType = {}) => {
  return useQuery<{ taxes: IPaginator<ITax> }, Error>(
    [API_ENDPOINTS.TAXES, options],
    fetchTaxes,
    {
      keepPreviousData: true,
    }
  );
};

export { useTaxesQuery, fetchTaxes };
