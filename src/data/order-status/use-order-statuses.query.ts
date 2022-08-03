import { QueryParamsType, QueryOptionsType } from '@ts-types/custom.types';
import { mapPaginatorData, stringifySearchQuery } from '@utils/data-mappers';
import { useQuery } from 'react-query';
import OrderStatus from '@repositories/order-status';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { IPaginator, OrderStatus as IOrderStatus } from '@ts-types/generated';

const fetchOrderStatuses = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 15,
    orderBy = 'serial',
    sortedBy = 'ASC',
  } = params as QueryOptionsType;
  const searchString = stringifySearchQuery({
    name: text,
  });
  const url = `${API_ENDPOINTS.ORDER_STATUS}?search=${searchString}&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { docs, ...rest },
  } = await OrderStatus.all(url);
  return {
    order_statuses: { data: docs, paginatorInfo: rest },
  };
};

const useOrderStatusesQuery = (options: QueryOptionsType) => {
  return useQuery<{ order_statuses: IPaginator<IOrderStatus> }, Error>(
    [API_ENDPOINTS.ORDER_STATUS, options],
    fetchOrderStatuses,
    {
      keepPreviousData: true,
    }
  );
};

export { useOrderStatusesQuery, fetchOrderStatuses };
