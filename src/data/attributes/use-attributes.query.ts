import { QueryParamsType, QueryOptionsType } from '@ts-types/custom.types';
import { stringifySearchQuery } from '@utils/data-mappers';
import { useQuery } from 'react-query';
import Attribute from '@repositories/attribute';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { Attribute as TAttribute, IPaginator } from '@ts-types/generated';

const fetchAttributes = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    text,
    shop_id,
    orderBy = 'updatedAt',
    sortedBy = 'desc',
  } = params as QueryOptionsType;
  const searchString = stringifySearchQuery({
    name: text,
    shop_id: shop_id,
  });
  const url = `${API_ENDPOINTS.ATTRIBUTES}?${text ? `search=${text}&` : ''}${
    shop_id ? `shop=${shop_id}` : ''
  }&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const { data, ...rest } = await Attribute.all(url);
  return { attributes: { data: data.docs, paginatorInfo: rest } };
};

const useAttributesQuery = (
  params: QueryOptionsType = {},
  options: any = {}
) => {
  return useQuery<{ attributes: IPaginator<TAttribute> }, Error>(
    [API_ENDPOINTS.ATTRIBUTES, params],
    fetchAttributes,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export { useAttributesQuery, fetchAttributes };
