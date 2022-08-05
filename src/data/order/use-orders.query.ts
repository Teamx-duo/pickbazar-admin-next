import { QueryParamsType, QueryOptionsType } from '@ts-types/custom.types';
import { mapPaginatorData, stringifySearchQuery } from '@utils/data-mappers';
import { useQuery } from 'react-query';
import Orders from '@repositories/type';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { IPaginator, Order as IOrder } from '@ts-types/generated';

const fetchOrders = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    text,
    shop_id,
    page = 1,
    limit = 20,
    orderBy = 'updatedAt',
    sortedBy = 'DESC',
  } = params as QueryOptionsType;
  const searchString = stringifySearchQuery({
    tracking_number: text,
  });
  const url = `${API_ENDPOINTS.ORDERS}?${text ? `search=${text}` : ''}&${
    shop_id ? `shop=${shop_id}` : ''
  }&page=${page}&limit=${limit}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { docs, ...rest },
  } = await Orders.all(url);
  return { orders: { data: docs, paginatorInfo: rest } };
};

const useOrdersQuery = (params: QueryOptionsType = {}, options: any = {}) => {
  return useQuery<{ orders: IPaginator<IOrder> }, Error>(
    [API_ENDPOINTS.ORDERS, params],
    fetchOrders,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export { useOrdersQuery, fetchOrders };
