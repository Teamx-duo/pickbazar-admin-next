import {
  QueryParamsType,
  ProductsQueryOptionsType,
} from '@ts-types/custom.types';
import { mapPaginatorData, stringifySearchQuery } from '@utils/data-mappers';
import { useQuery } from 'react-query';
import Product from '@repositories/product';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { IPaginator, Product as TProduct } from '@ts-types/generated';

const fetchProducts = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    type,
    category,
    shop_id,
    status,
    limit = 15,
    orderBy = 'updatedAt',
    sortedBy = 'desc',
  } = params as ProductsQueryOptionsType;
  const searchString = stringifySearchQuery({
    name: text,
    type,
    category,
    status,
    shop_id,
  });
  const url = `${API_ENDPOINTS.PRODUCTS}?${text ? `search=${text}` : ''}${
    type ? `&type=${type}` : ''
  }${category ? `&category=${category}` : ''}${
    shop_id ? `shop=${shop_id}` : ''
  }${
    status ? `&status=${status}` : ''
  }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { docs, ...rest },
  } = await Product.all(url);
  return { products: { data: docs, paginatorInfo: { ...rest } } };
};

const useProductsQuery = (
  params: ProductsQueryOptionsType,
  options: any = {}
) => {
  return useQuery<{ products: IPaginator<TProduct> }, Error>(
    [API_ENDPOINTS.PRODUCTS, params],
    fetchProducts,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export { useProductsQuery, fetchProducts };
