import { QueryParamsType, ShopsQueryOptionsType } from '@ts-types/custom.types';
import { mapPaginatorData, stringifySearchQuery } from '@utils/data-mappers';
import { useQuery } from 'react-query';
import Shop from '@repositories/shop';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { IPaginator, Shop as TShop } from '@ts-types/generated';

const fetchShops = async ({
  queryKey,
}: QueryParamsType): Promise<{ shops: IPaginator<TShop> }> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    limit = 15,
    orderBy = 'updatedAt',
    sortedBy = 'desc',
  } = params as ShopsQueryOptionsType;

  // const searchString = stringifySearchQuery({
  //   name: text,
  // });
  const url = `${API_ENDPOINTS.SHOPS}?${
    text ? `&search=${text}` : ''
  }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { docs, ...rest },
  } = await Shop.all(url);
  return {
    shops: {
      data: docs,
      paginatorInfo: rest,
    },
  };
};

const useShopsQuery = (options: ShopsQueryOptionsType) => {
  return useQuery<{ shops: IPaginator<TShop> }, Error>(
    [API_ENDPOINTS.SHOPS, options],
    fetchShops,
    {
      keepPreviousData: true,
    }
  );
};

export { useShopsQuery, fetchShops };
