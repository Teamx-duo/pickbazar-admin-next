import { QueryParamsType, TagsQueryOptionsType } from '@ts-types/custom.types';
import { mapPaginatorData, stringifySearchQuery } from '@utils/data-mappers';
import { useQuery } from 'react-query';
import Tag from '@repositories/tag';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { IPaginator, TagPaginator, Tag as ITag } from '@ts-types/generated';

const fetchTags = async ({
  queryKey,
}: QueryParamsType): Promise<{ tags: TagPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    type,
    limit = 15,
    orderBy = 'updatedAt',
    sortedBy = 'desc',
  } = params as TagsQueryOptionsType;

  const url = `${API_ENDPOINTS.TAGS}?${text ? `search=${text}` : ''}${
    type ? `&type=${type}` : ''
  }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { docs, ...rest },
  } = await Tag.all(url);
  return {
    tags: {
      data: docs,
      paginatorInfo: rest,
    },
  };
};

const useTagsQuery = (options: TagsQueryOptionsType) => {
  return useQuery<{ tags: IPaginator<ITag> }, Error>(
    [API_ENDPOINTS.TAGS, options],
    fetchTags,
    {
      keepPreviousData: true,
    }
  );
};

export { useTagsQuery, fetchTags };
