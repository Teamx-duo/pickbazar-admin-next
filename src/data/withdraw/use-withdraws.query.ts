import {
  QueryParamsType,
  WithdrawsQueryOptionsType,
} from '@ts-types/custom.types';
import { mapPaginatorData } from '@utils/data-mappers';
import { useQuery } from 'react-query';
import Withdraw from '@repositories/withdraw';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import {
  IPaginator,
  Withdraw as IWithdraw,
  WithdrawPaginator,
} from '@ts-types/generated';

const fetchWithdraws = async ({
  queryKey,
}: QueryParamsType): Promise<{ withdraws: WithdrawPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    limit = 15,
    shop_id,
    orderBy = 'updatedAt',
    sortedBy = 'DESC',
  } = params as WithdrawsQueryOptionsType;

  const url = `${API_ENDPOINTS.WITHDRAWS}?${
    shop_id ? `shop_id=${shop_id}` : ''
  }&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;

  const {
    data: { docs, ...rest },
  } = await Withdraw.all(url);
  return {
    withdraws: {
      data: docs,
      paginatorInfo: rest,
    },
  };
};

const useWithdrawsQuery = (
  params: WithdrawsQueryOptionsType,
  options: any = {}
) => {
  return useQuery<{ withdraws: IPaginator<IWithdraw> }, Error>(
    [API_ENDPOINTS.WITHDRAWS, params],
    fetchWithdraws,
    { ...options, keepPreviousData: true }
  );
};

export { useWithdrawsQuery, fetchWithdraws };
