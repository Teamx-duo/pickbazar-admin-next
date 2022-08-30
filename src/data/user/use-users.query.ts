import { QueryParamsType, QueryOptionsType } from '@ts-types/custom.types';
import { mapPaginatorData } from '@utils/data-mappers';
import { useQuery } from 'react-query';
import User from '@repositories/user';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { IPaginator, User as IUser } from '@ts-types/generated';

const fetchUsers = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 15,
    orderBy = 'updatedAt',
    sortedBy = 'desc',
  } = params as QueryOptionsType;
  const url = `${API_ENDPOINTS.USERS}?${
    text ? `search=${text}` : ''
  }&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { docs, ...rest },
  } = await User.all(url);
  return { users: { data: docs, paginatorInfo: rest } };
};

const useUsersQuery = (options: QueryOptionsType) => {
  return useQuery<{ users: IPaginator<IUser> }, Error>(
    [API_ENDPOINTS.USERS, options],
    fetchUsers,
    {
      keepPreviousData: true,
    }
  );
};

export { useUsersQuery, fetchUsers };
